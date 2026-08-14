/**
 * SkillCard — Database-style skill record card for SAGAR.DB.
 * Matches SAGAR.DB design system with near-black bg, thin borders,
 * JetBrains Mono query tags, and green accent on selection.
 */

import type { Skill } from '../data/skills';
import { QueryDisplay } from './QueryDisplay';

interface SkillCardProps {
  skill: Skill;
  isSelected: boolean;
  isExecuting: boolean;
  onSelect: () => void;
}

export function SkillCard({
  skill,
  isSelected,
  isExecuting,
  onSelect,
}: SkillCardProps) {
  const isActive = isSelected && !isExecuting;

  return (
    <div
      onClick={onSelect}
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      aria-label={`View skill record for ${skill.name}`}
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
        {/* SQL Query tag */}
        <div style={{ marginBottom: '8px' }}>
          <QueryDisplay
            query={`SELECT usage FROM ${skill.id};`}
            className="text-xs opacity-80"
          />
        </div>

        {/* Skill Name */}
        <h3
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '15px',
            fontWeight: 700,
            color: '#F2F4F5',
            margin: 0,
            marginBottom: '4px',
            lineHeight: 1.3,
            textTransform: 'uppercase',
            letterSpacing: '-0.01em',
          }}
        >
          {skill.name}
        </h3>

        {/* Category & Level tag */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px',
            marginBottom: '10px',
          }}
        >
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '10px',
              fontWeight: 600,
              letterSpacing: '0.12em',
              color: '#5EE6A8',
              textTransform: 'uppercase',
            }}
          >
            {skill.category}
          </span>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '9px',
              fontWeight: 500,
              color: '#626A73',
              border: '1px solid #252A30',
              padding: '1px 6px',
              borderRadius: '3px',
              textTransform: 'uppercase',
            }}
          >
            {skill.level}
          </span>
        </div>

        {/* Description */}
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '12px',
            fontWeight: 400,
            color: '#9AA2AA',
            margin: 0,
            lineHeight: 1.55,
            marginBottom: '16px',
          }}
        >
          {skill.description}
        </p>
      </div>

      {/* Action button */}
      <div>
        <button
          type="button"
          tabIndex={-1}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '10px',
            fontWeight: 600,
            letterSpacing: '0.08em',
            color: isActive ? '#5EE6A8' : '#626A73',
            backgroundColor: 'transparent',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          [ VIEW RECORD ]
        </button>
      </div>
    </div>
  );
}
