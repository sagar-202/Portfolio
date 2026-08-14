/**
 * SkillCard — SAGAR.DB skill card.
 * Content-first hierarchy with subtle SQL metadata tag.
 */

import type { Skill } from '../data/skills';

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
        padding: '18px 20px',
        border: isActive
          ? '1px solid #5EE6A8'
          : isExecuting && isSelected
          ? '1px solid #3D5A4A'
          : '1px solid #252A30',
        borderRadius: '6px',
        backgroundColor: isActive
          ? '#142E22'
          : isExecuting && isSelected
          ? '#0F1F18'
          : '#111418',
        cursor: isExecuting ? 'wait' : 'pointer',
        transition: 'all 0.18s ease',
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
        (e.currentTarget as HTMLDivElement).style.backgroundColor = '#151A21';
      }}
      onMouseLeave={(e) => {
        if (isSelected) return;
        (e.currentTarget as HTMLDivElement).style.borderColor = '#252A30';
        (e.currentTarget as HTMLDivElement).style.backgroundColor = '#111418';
      }}
    >
      <div>
        {/* Subtle SQL Query Tag (Level 4 element) */}
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '10px',
            color: '#626A73',
            marginBottom: '8px',
          }}
        >
          <span style={{ color: '#3D444B' }}>&gt;</span> SELECT usage FROM {skill.id};
        </div>

        {/* Skill Name (Level 1 Content) */}
        <h3
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '17px',
            fontWeight: 800,
            color: '#F2F4F5',
            margin: 0,
            marginBottom: '4px',
            lineHeight: 1.25,
            textTransform: 'uppercase',
            letterSpacing: '-0.01em',
          }}
        >
          {skill.name}
        </h3>

        {/* Category & Proficiency Level */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '10px',
          }}
        >
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '10px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              color: '#5EE6A8',
              textTransform: 'uppercase',
            }}
          >
            {skill.category}
          </span>
          <span style={{ color: '#252A30', fontSize: '10px' }} aria-hidden="true">
            •
          </span>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '10px',
              fontWeight: 500,
              color: '#9AA2AA',
            }}
          >
            {skill.level === 'WORKING' ? 'Working' : skill.level === 'FOUNDATIONAL' ? 'Foundational' : 'Familiar'}
          </span>
        </div>

        {/* Description */}
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '13px',
            fontWeight: 400,
            color: '#9AA2AA',
            margin: 0,
            lineHeight: 1.55,
            marginBottom: '14px',
          }}
        >
          {skill.description}
        </p>

        {/* Related projects preview */}
        {skill.relatedProjects.length > 0 && (
          <div style={{ marginBottom: '16px' }}>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '10px',
                color: '#626A73',
                marginBottom: '4px',
                textTransform: 'uppercase',
              }}
            >
              Related projects:
            </div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '12px',
                color: isActive ? '#5EE6A8' : '#626A73',
                lineHeight: 1.4,
              }}
            >
              {skill.relatedProjects.join(' • ')}
            </div>
          </div>
        )}
      </div>

      {/* Action button */}
      <div
        style={{
          paddingTop: '12px',
          borderTop: '1px solid #1C2128',
        }}
      >
        <button
          type="button"
          tabIndex={-1}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '10px',
            fontWeight: 600,
            letterSpacing: '0.08em',
            color: isActive ? '#5EE6A8' : '#9AA2AA',
            backgroundColor: 'transparent',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
          }}
        >
          [ VIEW RECORD ]
        </button>
      </div>
    </div>
  );
}
