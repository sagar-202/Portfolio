interface NavItem {
  label: string;
  id: string;
  active?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'ME', id: 'nav-me', active: true },
  { label: 'PROJECTS', id: 'nav-projects' },
  { label: 'SKILLS', id: 'nav-skills' },
  { label: 'CONTACT', id: 'nav-contact' },
];

/**
 * QueryNavigation — bracketed nav buttons [ ME ] [ PROJECTS ] [ SKILLS ] [ CONTACT ]
 *
 * Phase 1: Visual only. No routing. [ ME ] is active state.
 */
export function QueryNavigation() {
  return (
    <nav
      aria-label="Portfolio sections"
      className="flex flex-wrap gap-2"
    >
      {NAV_ITEMS.map((item) => (
        <button
          key={item.id}
          id={item.id}
          type="button"
          aria-current={item.active ? 'page' : undefined}
          aria-label={`Navigate to ${item.label} section`}
          disabled={!item.active}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.1em',
            padding: '7px 14px',
            border: item.active
              ? '1px solid #5EE6A8'
              : '1px solid #252A30',
            borderRadius: '3px',
            backgroundColor: item.active ? '#17382A' : 'transparent',
            color: item.active ? '#5EE6A8' : '#626A73',
            cursor: item.active ? 'default' : 'not-allowed',
            transition: 'border-color 0.15s ease, color 0.15s ease, background-color 0.15s ease',
            outline: 'none',
          }}
          onFocus={(e) => {
            if (!item.active) return;
            (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 0 2px #5EE6A8';
          }}
          onBlur={(e) => {
            (e.currentTarget as HTMLButtonElement).style.boxShadow = 'none';
          }}
          onMouseEnter={(e) => {
            if (item.active) return;
            (e.currentTarget as HTMLButtonElement).style.borderColor = '#626A73';
            (e.currentTarget as HTMLButtonElement).style.color = '#9AA2AA';
          }}
          onMouseLeave={(e) => {
            if (item.active) return;
            (e.currentTarget as HTMLButtonElement).style.borderColor = '#252A30';
            (e.currentTarget as HTMLButtonElement).style.color = '#626A73';
          }}
        >
          [ {item.label} ]
        </button>
      ))}
    </nav>
  );
}
