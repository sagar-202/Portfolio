/**
 * QueryNavigation — [ ME ] [ PROJECTS ] [ SKILLS ] [ CONTACT ]
 *
 * Phase 2: All buttons are live. Active state derived from current route.
 * Clicking triggers the query engine (same as terminal commands).
 */

import { useLocation } from 'react-router-dom';
import { useQueryContext } from '../context/QueryContext';
import { ROUTE_TO_COMMAND } from '../query/queryMap';
import type { CommandId } from '../query/commands';

interface NavItem {
  label: string;
  id: string;
  commandId: CommandId;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'ME',       id: 'nav-me',       commandId: 'ME' },
  { label: 'PROJECTS', id: 'nav-projects', commandId: 'PROJECTS' },
  { label: 'SKILLS',   id: 'nav-skills',   commandId: 'SKILLS' },
  { label: 'CONTACT',  id: 'nav-contact',  commandId: 'CONTACT' },
];

export function QueryNavigation() {
  const { pathname } = useLocation();
  const { execute, state } = useQueryContext();

  // Determine which button should show as "active"
  const activeCommandId = ROUTE_TO_COMMAND[pathname] ?? null;
  const isExecuting = state.status === 'executing' || state.status === 'success';

  return (
    <nav aria-label="Portfolio sections" className="flex flex-wrap gap-2">
      {NAV_ITEMS.map((item) => {
        const isActive = activeCommandId === item.commandId;
        const isPending = state.activeCommandId === item.commandId && isExecuting;

        return (
          <button
            key={item.id}
            id={item.id}
            type="button"
            aria-current={isActive ? 'page' : undefined}
            aria-label={`Navigate to ${item.label} section`}
            onClick={() => execute(item.commandId)}
            disabled={isPending}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.1em',
              padding: '7px 14px',
              border: isActive
                ? '1px solid #5EE6A8'
                : '1px solid #252A30',
              borderRadius: '3px',
              backgroundColor: isActive ? '#17382A' : 'transparent',
              color: isActive ? '#5EE6A8' : '#626A73',
              cursor: isPending ? 'not-allowed' : 'pointer',
              transition: 'border-color 0.15s ease, color 0.15s ease, background-color 0.15s ease',
              outline: 'none',
              opacity: isPending ? 0.5 : 1,
            }}
            onFocus={(e) => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                '0 0 0 2px rgba(94,230,168,0.4)';
            }}
            onBlur={(e) => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow = 'none';
            }}
            onMouseEnter={(e) => {
              if (isActive || isPending) return;
              (e.currentTarget as HTMLButtonElement).style.borderColor = '#626A73';
              (e.currentTarget as HTMLButtonElement).style.color = '#9AA2AA';
            }}
            onMouseLeave={(e) => {
              if (isActive || isPending) return;
              (e.currentTarget as HTMLButtonElement).style.borderColor = '#252A30';
              (e.currentTarget as HTMLButtonElement).style.color = '#626A73';
            }}
          >
            [ {item.label} ]
          </button>
        );
      })}
    </nav>
  );
}
