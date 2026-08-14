import type { ReactNode } from 'react';
import { Header } from './Header';
import { Terminal } from './Terminal';

interface PageShellProps {
  children: ReactNode;
}

/**
 * PageShell — full-page layout wrapper.
 * Sticky Header top, sticky Terminal bottom, scrollable main content.
 */
export function PageShell({ children }: PageShellProps) {
  return (
    <div
      style={{
        minHeight: '100dvh',
        backgroundColor: '#0B0D0F',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Header />

      <main
        id="main-content"
        style={{
          flex: 1,
          width: '100%',
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '32px 24px 120px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {children}
      </main>

      <Terminal />
    </div>
  );
}

