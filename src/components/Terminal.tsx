/**
 * Terminal — bottom sticky bar
 * Left: sagar@portfolio:~$ prompt + blinking cursor
 * Right: "ENTER TO RUN" hint
 * Very bottom: READ-ONLY DEMO INSTANCE / LOCAL SESSION / NO DATA STORED
 */
export function Terminal() {
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
      {/* Main terminal row */}
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
        {/* Left: Prompt */}
        <div
          className="flex items-center gap-0"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '12px',
            lineHeight: 1,
          }}
        >
          {/* sagar@portfolio:~$ */}
          <span style={{ color: '#5EE6A8', fontWeight: 500 }}>
            sagar@portfolio
          </span>
          <span style={{ color: '#9AA2AA', fontWeight: 400 }}>
            :~$
          </span>
          <span
            style={{
              color: '#626A73',
              fontWeight: 400,
              marginLeft: '8px',
            }}
          >
            type help to explore
          </span>
          {/* Blinking cursor */}
          <span
            className="cursor-blink"
            style={{
              display: 'inline-block',
              width: '8px',
              height: '14px',
              backgroundColor: '#5EE6A8',
              marginLeft: '4px',
              opacity: 0.8,
              verticalAlign: 'middle',
            }}
            aria-hidden="true"
          />
        </div>

        {/* Right: hint */}
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '10px',
            fontWeight: 400,
            letterSpacing: '0.08em',
            color: '#626A73',
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
            fontWeight: 400,
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
            fontWeight: 400,
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
