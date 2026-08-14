/**
 * SAGAR.DB — useQuery hook
 *
 * State machine for query execution.
 * Shared by navigation buttons and terminal input.
 *
 * States: idle → executing → success → [navigate]
 *                                └→ error (for bad commands)
 */

import { useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { COMMANDS, type CommandId } from '../query/commands';
import { parseTerminalInput } from '../query/parser';
import { EXEC_DURATION_MS, SUCCESS_DURATION_MS } from '../query/executor';

export type QueryStatus = 'idle' | 'executing' | 'success' | 'error';

export interface QueryState {
  status: QueryStatus;
  activeCommandId: CommandId | null;
  errorMessage: string | null;
}

export interface UseQueryReturn {
  state: QueryState;
  /** Execute a known CommandId (from nav buttons) */
  execute: (commandId: CommandId) => void;
  /** Parse + execute raw terminal string input */
  executeRaw: (input: string) => string | null; // returns error string or null
  /** Reset to idle */
  clear: () => void;
  /** Set the active command without animating (for page mount) */
  setActiveCommand: (commandId: CommandId) => void;
}

// Detect reduced motion once at module level
const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function useQuery(): UseQueryReturn {
  const navigate = useNavigate();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [state, setState] = useState<QueryState>({
    status: 'idle',
    activeCommandId: null,
    errorMessage: null,
  });

  const clearTimers = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const execute = useCallback(
    (commandId: CommandId) => {
      const command = COMMANDS[commandId];
      if (!command) return;

      // Clear any running animation
      clearTimers();

      // CLEAR is a special no-navigate command handled by context
      if (commandId === 'CLEAR') {
        setState({ status: 'idle', activeCommandId: null, errorMessage: null });
        return;
      }

      // RESUME — placeholder, no navigate yet
      if (commandId === 'RESUME') {
        setState({ status: 'success', activeCommandId: commandId, errorMessage: null });
        timerRef.current = setTimeout(() => {
          setState({ status: 'idle', activeCommandId: commandId, errorMessage: null });
        }, 1200);
        return;
      }

      // HELP — no navigate, show success briefly
      if (commandId === 'HELP') {
        setState({ status: 'success', activeCommandId: commandId, errorMessage: null });
        return;
      }

      // If reduced motion — skip animation, navigate immediately
      if (prefersReducedMotion) {
        setState({ status: 'success', activeCommandId: commandId, errorMessage: null });
        if (command.route) navigate(command.route);
        return;
      }

      // Normal flow: executing → success → navigate
      setState({ status: 'executing', activeCommandId: commandId, errorMessage: null });

      timerRef.current = setTimeout(() => {
        setState({ status: 'success', activeCommandId: commandId, errorMessage: null });

        timerRef.current = setTimeout(() => {
          if (command.route) {
            navigate(command.route);
          }
        }, SUCCESS_DURATION_MS);
      }, EXEC_DURATION_MS);
    },
    [navigate, clearTimers]
  );

  const executeRaw = useCallback(
    (input: string): string | null => {
      const { commandId, error } = parseTerminalInput(input);

      if (error) {
        setState((prev) => ({ ...prev, status: 'error', errorMessage: error }));
        return error;
      }

      if (commandId === null) return null; // empty input

      execute(commandId);
      return null;
    },
    [execute]
  );

  const clear = useCallback(() => {
    clearTimers();
    setState({ status: 'idle', activeCommandId: null, errorMessage: null });
  }, [clearTimers]);

  const setActiveCommand = useCallback((commandId: CommandId) => {
    setState({ status: 'idle', activeCommandId: commandId, errorMessage: null });
  }, []);

  return { state, execute, executeRaw, clear, setActiveCommand };
}
