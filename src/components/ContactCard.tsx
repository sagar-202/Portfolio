/**
 * ContactCard — Database-style contact record card for SAGAR.DB.
 * Matches SAGAR.DB design system with near-black bg, thin borders,
 * JetBrains Mono query tags, and green accent on selection.
 */

import { ExternalLink } from 'lucide-react';
import type { ContactCardData } from '../data/contact';
import { QueryDisplay } from './QueryDisplay';

interface ContactCardProps {
  card: ContactCardData;
  isSelected: boolean;
  isExecuting: boolean;
  onSelect: () => void;
}

export function ContactCard({
  card,
  isSelected,
  isExecuting,
  onSelect,
}: ContactCardProps) {
  const isActive = isSelected && !isExecuting;

  return (
    <div
      onClick={onSelect}
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      aria-label={`Select contact record for ${card.label}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect();
        }
      }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '16px 18px',
        border: isActive
          ? '1px solid #5EE6A8'
          : isExecuting && isSelected
          ? '1px solid #3D5A4A'
          : '1px solid #252A30',
        borderRadius: '6px',
        backgroundColor: isActive
          ? '#17382A'
          : isExecuting && isSelected
          ? '#0F1F18'
          : '#111418',
        cursor: isExecuting ? 'wait' : 'pointer',
        transition: 'border-color 0.18s ease, background-color 0.18s ease',
        outline: 'none',
      }}
      onFocus={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          '0 0 0 2px rgba(94,230,168,0.3)';
      }}
      onBlur={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
      }}
      onMouseEnter={(e) => {
        if (isSelected) return;
        (e.currentTarget as HTMLDivElement).style.borderColor = '#3D444B';
        (e.currentTarget as HTMLDivElement).style.backgroundColor = '#141920';
      }}
      onMouseLeave={(e) => {
        if (isSelected) return;
        (e.currentTarget as HTMLDivElement).style.borderColor = '#252A30';
        (e.currentTarget as HTMLDivElement).style.backgroundColor = '#111418';
      }}
    >
      <div>
        {/* SQL query tag */}
        <div style={{ marginBottom: '8px' }}>
          <QueryDisplay
            query={card.query}
            className="text-xs opacity-80"
          />
        </div>

        {/* Card Type Header */}
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '10px',
            fontWeight: 600,
            letterSpacing: '0.12em',
            color: '#5EE6A8',
            marginBottom: '6px',
            textTransform: 'uppercase',
          }}
        >
          {card.label}
        </div>

        {/* Card Value */}
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '14px',
            fontWeight: 600,
            color: '#F2F4F5',
            margin: 0,
            marginBottom: '14px',
            wordBreak: 'break-all',
          }}
        >
          {card.value}
        </div>
      </div>

      {/* Direct Action Link */}
      <div>
        <a
          href={card.href}
          target={card.isExternal ? '_blank' : undefined}
          rel={card.isExternal ? 'noopener noreferrer' : undefined}
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '10px',
            fontWeight: 600,
            letterSpacing: '0.08em',
            color: isActive ? '#5EE6A8' : '#9AA2AA',
            backgroundColor: 'transparent',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          {card.actionLabel}
          {card.isExternal && <ExternalLink size={10} />}
        </a>
      </div>
    </div>
  );
}
