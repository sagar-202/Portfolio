/**
 * SkillCard — Clean Recruiter-Friendly Technical Skill Card for SAGAR.DB.
 * Displays Skill Name, Category, 1-2 sentence description, and concise footer tag:
 * "CORE · Used in X projects" or "WORKING · Used in X projects".
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

  const projectCountText =
    skill.relatedProjects.length > 0
      ? `Used in ${skill.relatedProjects.length} ${
          skill.relatedProjects.length === 1 ? 'project' : 'projects'
        }`
      : 'Foundational practice';

  const footerText = `${skill.level} · ${projectCountText}`;

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
          ? '#13281E'
          : isExecuting && isSelected
          ? '#0F1F18'
          : '#111418',
        cursor: isExecuting ? 'wait' : 'pointer',
        transition: 'all 0.18s cubic-bezier(0.16, 1, 0.3, 1)',
        outline: 'none',
        height: '100%',
        boxSizing: 'border-box',
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
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        if (isSelected) return;
        (e.currentTarget as HTMLDivElement).style.borderColor = '#252A30';
        (e.currentTarget as HTMLDivElement).style.backgroundColor = '#111418';
        (e.currentTarget as HTMLDivElement).style.transform = 'none';
      }}
    >
      <div>
        {/* Header: Skill Name & Category */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            gap: '4px 10px',
            marginBottom: '8px',
            minWidth: 0,
          }}
        >
          <h3
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '16px',
              fontWeight: 800,
              color: '#F2F4F5',
              margin: 0,
              textTransform: 'uppercase',
              letterSpacing: '-0.01em',
              overflowWrap: 'anywhere',
            }}
          >
            {skill.name}
          </h3>

          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '10px',
              fontWeight: 600,
              letterSpacing: '0.08em',
              color: '#5EE6A8',
              textTransform: 'uppercase',
              overflowWrap: 'break-word',
              maxWidth: '100%',
            }}
          >
            {skill.category}
          </span>
        </div>

        {/* Short Description */}
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '13px',
            fontWeight: 400,
            color: '#9AA2AA',
            margin: 0,
            lineHeight: 1.5,
            marginBottom: '16px',
          }}
        >
          {skill.description}
        </p>
      </div>

      {/* Footer: Concise Proficiency + Usage string */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '12px',
          borderTop: '1px solid #1C2128',
        }}
      >
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '10px',
            fontWeight: 600,
            letterSpacing: '0.06em',
            color: skill.level === 'CORE' ? '#5EE6A8' : '#9AA2AA',
            textTransform: 'uppercase',
          }}
        >
          {footerText}
        </span>
      </div>
    </div>
  );
}
