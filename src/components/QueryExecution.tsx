interface QueryExecutionProps {
  /** Optional row count suffix, e.g. "/ 001 row" */
  rowCount?: string;
  className?: string;
}

/**
 * QueryExecution — shows the "✓ Query executed successfully." confirmation line.
 */
export function QueryExecution({ rowCount, className = '' }: QueryExecutionProps) {
  return (
    <div
      className={`flex items-center gap-2 ${className}`}
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '12px',
        lineHeight: 1.6,
        color: '#5EE6A8',
      }}
      role="status"
      aria-live="polite"
    >
      <span style={{ fontWeight: 600 }}>✓</span>
      <span style={{ fontWeight: 400 }}>
        Query executed successfully.
        {rowCount && (
          <span style={{ color: '#626A73', marginLeft: '6px' }}>
            {rowCount}
          </span>
        )}
      </span>
    </div>
  );
}
