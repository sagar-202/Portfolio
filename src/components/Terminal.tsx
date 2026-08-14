/**
 * Terminal — interactive bottom bar
 *
 * Phase 2: accepts real text input.
 * Shares the same query engine as QueryNavigation.
 * Supports: help, home, me, about, projects, skills, contact, resume, clear
 * Unknown commands → descriptive error message.
 */

import { useState, useRef, useCallback, type KeyboardEvent } from 'react';
import { useQueryContext } from '../context/QueryContext';
import { COMMANDS, HELP_LINES } from '../query/commands';
import { motion, AnimatePresence } from 'framer-motion';

interface TerminalLine {
  id: number;
  type: 'input' | 'output' | 'error' | 'help' | 'success';
  text: string;
}

let lineIdCounter = 0;

export function Terminal() {
  const { executeRaw, state } = useQueryContext();
  const [inputValue, setInputValue] = useState('');
  const [history, setHistory] = useState<TerminalLine[]>([]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  const addLine = useCallback((line: Omit<TerminalLine, 'id'>) => {
    setHistory((prev) => [...prev.slice(-20), { ...line, id: lineIdCounter++ }]);
  }, []);

  const handleSubmit = useCallback(() => {
    const raw = inputValue.trim();
    setInputValue('');
    setHistoryIndex(-1);

    if (!raw) return;

    // Echo the command
    addLine({ type: 'input', text: raw });
    setCmdHistory((prev) => [raw, ...prev.slice(0, 49)]);

    const normalized = raw.toLowerCase();

    // Handle CLEAR locally
    if (normalized === 'clear' || normalized === 'cls') {
      setHistory([]);
      return;
    }

    // Handle HELP locally (show inline help table)
    if (normalized === 'help' || normalized === '?') {
      addLine({ type: 'help', text: '__HELP__' });
      return;
    }

    // Delegate everything else to query engine
    const error = executeRaw(raw);
    if (error) {
      const [line1, line2] = error.split('\n');
      addLine({ type: 'error', text: line1 });
      if (line2) addLine({ type: 'output', text: line2 });
    } else {
      // Show the executed query in terminal output
      const { commandId } = (() => {
        const n = raw.toLowerCase();
        const alias: Record<string, string> = {
          home: 'HOME', index: 'HOME',
          me: 'ME', about: 'ME', profile: 'ME', who: 'ME',
          projects: 'PROJECTS', project: 'PROJECTS', work: 'PROJECTS',
          skills: 'SKILLS', skill: 'SKILLS', stack: 'SKILLS', tech: 'SKILLS',
          contact: 'CONTACT', email: 'CONTACT', reach: 'CONTACT', hire: 'CONTACT',
          resume: 'RESUME', cv: 'RESUME',
        };
        return { commandId: alias[n] };
      })();

      if (commandId && COMMANDS[commandId as keyof typeof COMMANDS]) {
        const cmd = COMMANDS[commandId as keyof typeof COMMANDS];
        if (cmd.query) {
          addLine({ type: 'success', text: `> ${cmd.query}` });
        }
      }
    }
  }, [inputValue, executeRaw, addLine]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        handleSubmit();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const newIndex = Math.min(historyIndex + 1, cmdHistory.length - 1);
        setHistoryIndex(newIndex);
        if (cmdHistory[newIndex]) setInputValue(cmdHistory[newIndex]);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        const newIndex = Math.max(historyIndex - 1, -1);
        setHistoryIndex(newIndex);
        setInputValue(newIndex === -1 ? '' : cmdHistory[newIndex] ?? '');
      }
    },
    [handleSubmit, historyIndex, cmdHistory]
  );

  // Active query from context for the executing/success banner
  const activeCmd =
    state.activeCommandId ? COMMANDS[state.activeCommandId] : null;

  return (
    <footer
      aria-label="Terminal"
      style={{
        position: 'sticky',
        bottom: 0,
        zIndex: 50,
        backgroundColor: '#0F1215',
        borderTop: '1px solid #252A30',
        width: '100%',
      }}
    >
      {/* Query execution banner — shown during executing/success state */}
      <AnimatePresence>
        {(state.status === 'executing' || state.status === 'success') && activeCmd && activeCmd.query && (
          <motion.div
            key="exec-banner"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.15 }}
            style={{
              borderBottom: '1px solid #1C2128',
              padding: '8px 24px',
              maxWidth: '1400px',
              margin: '0 auto',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '11px',
              }}
            >
              <span style={{ color: '#5EE6A8' }}>{'>'}</span>
              <span style={{ color: '#5EE6A8', fontWeight: 500 }}>
                {activeCmd.query}
              </span>
              {state.status === 'executing' && (
                <span style={{ color: '#626A73', marginLeft: '8px' }}>
                  Executing...
                </span>
              )}
              {state.status === 'success' && (
                <span style={{ color: '#5EE6A8', marginLeft: '8px' }}>
                  {activeCmd.successMessage}
                </span>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Terminal history (last few lines) */}
      <AnimatePresence>
        {history.length > 0 && (
          <motion.div
            key="history"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.15 }}
            style={{
              borderBottom: '1px solid #1C2128',
              padding: '6px 24px',
              maxWidth: '1400px',
              margin: '0 auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '3px',
              maxHeight: '140px',
              overflowY: 'auto',
            }}
          >
            {history.map((line) => {
              if (line.type === 'help') {
                return (
                  <div
                    key={line.id}
                    style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}
                  >
                    {HELP_LINES.map((h) => (
                      <div
                        key={h.cmd}
                        style={{
                          display: 'flex',
                          gap: '16px',
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: '10px',
                        }}
                      >
                        <span style={{ color: '#5EE6A8', minWidth: '100px' }}>
                          {h.cmd}
                        </span>
                        <span style={{ color: '#626A73' }}>{h.desc}</span>
                      </div>
                    ))}
                  </div>
                );
              }

              const colors: Record<TerminalLine['type'], string> = {
                input: '#9AA2AA',
                output: '#626A73',
                error: '#E87070',
                help: '#9AA2AA',
                success: '#5EE6A8',
              };

              return (
                <div
                  key={line.id}
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '11px',
                    color: colors[line.type],
                    lineHeight: 1.5,
                  }}
                >
                  {line.type === 'input' && (
                    <span style={{ color: '#626A73', marginRight: '6px' }}>
                      $
                    </span>
                  )}
                  {line.text}
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main prompt row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 24px',
          maxWidth: '1400px',
          margin: '0 auto',
        }}
      >
        {/* Left: Prompt + input */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flex: 1,
            minWidth: 0,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '12px',
            lineHeight: 1,
          }}
        >
          <span style={{ color: '#5EE6A8', fontWeight: 500, flexShrink: 0 }}>
            sagar@portfolio
          </span>
          <span style={{ color: '#9AA2AA', fontWeight: 400, flexShrink: 0 }}>
            :~$
          </span>

          {/* Actual text input */}
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="type help to explore"
            aria-label="Terminal input"
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            style={{
              flex: 1,
              minWidth: 0,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#9AA2AA',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '12px',
              marginLeft: '8px',
              padding: 0,
              caretColor: '#5EE6A8',
            }}
          />
          {/* Blinking cursor — only shown when input is empty */}
          {!inputValue && (
            <span
              className="cursor-blink"
              style={{
                display: 'inline-block',
                width: '7px',
                height: '13px',
                backgroundColor: '#5EE6A8',
                opacity: 0.8,
                verticalAlign: 'middle',
                flexShrink: 0,
              }}
              aria-hidden="true"
            />
          )}
        </div>

        {/* Right: hint */}
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '10px',
            fontWeight: 400,
            letterSpacing: '0.08em',
            color: '#626A73',
            flexShrink: 0,
            marginLeft: '16px',
          }}
          aria-hidden="true"
        >
          ENTER TO RUN
        </span>
      </div>

      {/* Footer status bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '4px 24px',
          maxWidth: '1400px',
          margin: '0 auto',
          borderTop: '1px solid #1A1F24',
        }}
      >
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '9px',
            letterSpacing: '0.08em',
            color: '#3D444B',
            textTransform: 'uppercase',
          }}
        >
          READ-ONLY DEMO INSTANCE
        </span>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '9px',
            letterSpacing: '0.08em',
            color: '#3D444B',
            textTransform: 'uppercase',
          }}
        >
          LOCAL SESSION / NO DATA STORED
        </span>
      </div>
    </footer>
  );
}
