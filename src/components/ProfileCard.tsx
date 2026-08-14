/**
 * ProfileCard — interactive card for the ME page.
 * Shows a label + summary line. Accent treatment when selected.
 */

import type { ProfileCard as ProfileCardData } from '../data/profile';

interface ProfileCardProps {
  card: ProfileCardData;
  isSelected: boolean;
  isExecuting: boolean;
  onClick: () => void;
}

export function ProfileCard({ card, isSelected, isExecuting, onClick }: ProfileCardProps) {
  const isActive = isSelected && !isExecuting;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isSelected}
      aria-label={`View ${card.label} details`}
      disabled={isExecuting && isSelected}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        padding: '14px 16px',
        border: isActive
          ? '1px solid #5EE6A8'
          : isExecuting && isSelected
          ? '1px solid #3D5A4A'
          : '1px solid #252A30',
        borderRadius: '4px',
        backgroundColor: isActive
          ? '#17382A'
          : isExecuting && isSelected
          ? '#0F1F18'
          : '#111418',
        cursor: isExecuting ? 'wait' : 'pointer',
        textAlign: 'left',
        flex: 1,
        minWidth: 0,
        transition: 'border-color 0.18s ease, background-color 0.18s ease',
        outline: 'none',
      }}
      onFocus={(e) => {
        (e.currentTarget as HTMLButtonElement).style.boxShadow =
          '0 0 0 2px rgba(94,230,168,0.3)';
      }}
      onBlur={(e) => {
        (e.currentTarget as HTMLButtonElement).style.boxShadow = 'none';
      }}
      onMouseEnter={(e) => {
        if (isSelected) return;
        (e.currentTarget as HTMLButtonElement).style.borderColor = '#3D444B';
        (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#141920';
      }}
      onMouseLeave={(e) => {
        if (isSelected) return;
        (e.currentTarget as HTMLButtonElement).style.borderColor = '#252A30';
        (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#111418';
      }}
    >
      {/* Card label */}
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '9px',
          fontWeight: 600,
          letterSpacing: '0.14em',
          color: isActive ? '#5EE6A8' : '#626A73',
          textTransform: 'uppercase',
          transition: 'color 0.18s ease',
        }}
      >
        {card.label}
      </span>

      {/* Card summary */}
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '10px',
          fontWeight: 500,
          letterSpacing: '0.04em',
          color: isActive ? '#9AA2AA' : '#626A73',
          lineHeight: 1.5,
          transition: 'color 0.18s ease',
        }}
      >
        {card.summary}
      </span>
    </button>
  );
}
