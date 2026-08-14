interface SqlToken {
  text: string;
  type: 'keyword' | 'punctuation' | 'table' | 'default';
}

/**
 * Parse a SQL string into colour-coded tokens.
 * Keywords: SELECT, FROM, WHERE, *
 * Punctuation: ; ,
 * Everything else: table/column names
 */
function tokenize(sql: string): SqlToken[] {
  const keywords = new Set(['SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'NOT', 'INSERT', 'UPDATE', 'DELETE', 'INTO', 'VALUES', 'SET']);
  const parts = sql.split(/(\s+|;|,|\*)/);

  return parts.map((part): SqlToken => {
    if (!part) return { text: part, type: 'default' };
    if (part === ';' || part === ',') return { text: part, type: 'punctuation' };
    if (part === '*') return { text: part, type: 'keyword' };
    if (keywords.has(part.toUpperCase())) return { text: part, type: 'keyword' };
    return { text: part, type: 'table' };
  });
}

interface QueryDisplayProps {
  query: string;
  /** Show the prompt arrow. Defaults to true. */
  showPrompt?: boolean;
  className?: string;
}

/**
 * QueryDisplay — renders a SQL query with syntax highlighting.
 * Uses JetBrains Mono.
 */
export function QueryDisplay({ query, showPrompt = true, className = '' }: QueryDisplayProps) {
  const tokens = tokenize(query);

  return (
    <div
      className={`flex items-center gap-2 ${className}`}
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '13px',
        lineHeight: 1.6,
      }}
    >
      {showPrompt && (
        <span style={{ color: '#5EE6A8', fontWeight: 600, userSelect: 'none' }}>
          &gt;
        </span>
      )}
      <span>
        {tokens.map((token, i) => {
          switch (token.type) {
            case 'keyword':
              return (
                <span key={i} style={{ color: '#5EE6A8', fontWeight: 500 }}>
                  {token.text}
                </span>
              );
            case 'punctuation':
              return (
                <span key={i} style={{ color: '#9AA2AA' }}>
                  {token.text}
                </span>
              );
            case 'table':
              return (
                <span key={i} style={{ color: '#F2F4F5' }}>
                  {token.text}
                </span>
              );
            default:
              return <span key={i}>{token.text}</span>;
          }
        })}
      </span>
    </div>
  );
}
