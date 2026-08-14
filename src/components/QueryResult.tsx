import { QueryDisplay } from './QueryDisplay';

interface DetailLine {
  label: string;
  value: string;
}

interface QueryResultProps {
  query?: string;
  name: string;
  title?: string;
  details?: readonly DetailLine[];
  /** Show executing state in panel header */
  isExecuting?: boolean;
  /** Optional action element (e.g. Github button) */
  action?: React.ReactNode;
}

/**
 * QueryResult — Right-side panel showing query output.
 * Matches the "QUERY RESULT" floating panel from the Uizard design.
 * Expanded to include detail arrow-lines below the primary result.
 */
export function QueryResult({
  query = 'SELECT profile FROM sagar;',
  name,
  title,
  details,
  isExecuting = false,
  action,
}: QueryResultProps) {
  return (
    <aside
      aria-label="Query result panel"
      style={{
        backgroundColor: '#111418',
        border: '1px solid #252A30',
        borderRadius: '6px',
        overflow: 'hidden',
        width: '100%',
      }}
    >
      {/* Panel Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 14px',
          borderBottom: '1px solid #252A30',
          backgroundColor: '#0F1215',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            className={isExecuting ? undefined : 'dot-pulse'}
            style={{
              display: 'inline-block',
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: isExecuting ? '#626A73' : '#5EE6A8',
              flexShrink: 0,
            }}
            aria-hidden="true"
          />
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '10px',
              fontWeight: 600,
              letterSpacing: '0.12em',
              color: '#9AA2AA',
              textTransform: 'uppercase',
            }}
          >
            QUERY RESULT
          </span>
        </div>

        {/* Decorative window controls */}
        <div
          aria-hidden="true"
          style={{ opacity: 0.35, display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '10px',
              color: '#626A73',
            }}
          >
            —
          </span>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '10px',
              color: '#626A73',
            }}
          >
            □
          </span>
        </div>
      </div>

      {/* Panel Body */}
      <div style={{ padding: '18px 16px 20px' }}>
        {/* Query line */}
        <div style={{ marginBottom: '16px' }}>
          <QueryDisplay query={query} />
        </div>

        {/* Divider */}
        <div
          style={{
            height: '1px',
            backgroundColor: '#252A30',
            marginBottom: '18px',
          }}
          aria-hidden="true"
        />

        {/* Primary result */}
        <div style={{ marginBottom: details && details.length > 0 ? '20px' : 0 }}>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '15px',
              fontWeight: 700,
              color: '#F2F4F5',
              margin: 0,
              marginBottom: title ? '6px' : 0,
              lineHeight: 1.35,
              whiteSpace: 'pre-line',
            }}
          >
            {name}
          </p>
          {title && (
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '12px',
                fontWeight: 400,
                color: '#9AA2AA',
                margin: 0,
                lineHeight: 1.4,
              }}
            >
              {title}
            </p>
          )}
        </div>

        {/* Detail lines */}
        {details && details.length > 0 && (
          <div
            style={{
              borderTop: '1px solid #1C2128',
              paddingTop: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '9px',
            }}
          >
            {details.map((d) => (
              <div
                key={d.label}
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '8px',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '11px',
                  lineHeight: 1.5,
                }}
              >
                <span
                  style={{ color: '#5EE6A8', flexShrink: 0, fontWeight: 500 }}
                  aria-hidden="true"
                >
                  →
                </span>
                <span style={{ color: '#626A73', flexShrink: 0 }}>
                  {d.label}:
                </span>
                <span style={{ color: '#9AA2AA', fontWeight: 400 }}>
                  {d.value}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Action element (e.g. View Github button) */}
        {action && (
          <div
            style={{
              marginTop: '18px',
              paddingTop: '14px',
              borderTop: '1px solid #1C2128',
            }}
          >
            {action}
          </div>
        )}
      </div>
    </aside>
  );
}
