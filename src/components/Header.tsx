import { Database } from 'lucide-react';
import { QueryNavigation } from './QueryNavigation';

/**
 * Header — SAGAR.DB sticky top navigation bar
 * Left: brand logo
 * Center: sticky navigation buttons [ ME ] [ PROJECTS ] [ SKILLS ] [ CONTACT ]
 * Right: online status indicator
 */
export function Header() {
  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{
        backgroundColor: '#111418',
        borderBottom: '1px solid #252A30',
        backdropFilter: 'blur(8px)',
      }}
      role="banner"
    >
      <div
        className="flex flex-col md:flex-row items-center justify-between w-full px-4 sm:px-6 py-2.5 gap-3"
        style={{ maxWidth: '1400px', margin: '0 auto' }}
      >
        {/* Brand & Mobile Status */}
        <div className="flex items-center justify-between w-full md:w-auto gap-4">
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center rounded"
              style={{
                width: '28px',
                height: '28px',
                backgroundColor: '#17382A',
                border: '1px solid #5EE6A8',
                flexShrink: 0,
              }}
              aria-hidden="true"
            >
              <Database size={14} color="#5EE6A8" strokeWidth={1.5} />
            </div>

            <div className="flex flex-col leading-none">
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '13px',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  color: '#F2F4F5',
                }}
              >
                SAGAR.DB
              </span>
              <span
                className="hidden sm:block"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '9px',
                  fontWeight: 400,
                  letterSpacing: '0.12em',
                  color: '#626A73',
                  marginTop: '2px',
                }}
              >
                PERSONAL / PROFESSIONAL DATABASE
              </span>
            </div>
          </div>

          {/* Status (Mobile) */}
          <div className="flex md:hidden items-center gap-2">
            <span
              className="dot-pulse"
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#5EE6A8',
              }}
            />
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '10px',
                color: '#5EE6A8',
              }}
            >
              ONLINE
            </span>
          </div>
        </div>

        {/* Sticky Navigation Bar */}
        <div className="w-full md:w-auto flex justify-center overflow-x-auto py-0.5 md:py-0">
          <QueryNavigation />
        </div>

        {/* Status + Year (Desktop) */}
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span
              className="dot-pulse"
              style={{
                display: 'inline-block',
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#5EE6A8',
                flexShrink: 0,
              }}
              aria-label="Online"
            />
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.08em',
                color: '#5EE6A8',
              }}
            >
              ONLINE
            </span>
          </div>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '11px',
              fontWeight: 400,
              letterSpacing: '0.06em',
              color: '#626A73',
            }}
          >
            2026
          </span>
        </div>
      </div>
    </header>
  );
}
