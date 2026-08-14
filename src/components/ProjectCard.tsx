/**
 * ProjectCard — Database-style project record card for SAGAR.DB.
 * Matches SAGAR.DB design system with near-black bg, thin borders,
 * JetBrains Mono query tags, and green accent on selection.
 */

import type { Project } from '../data/projects';
import { QueryDisplay } from './QueryDisplay';

interface ProjectCardProps {
  project: Project;
  isSelected: boolean;
  isExecuting: boolean;
  onSelect: () => void;
}

export function ProjectCard({
  project,
  isSelected,
  isExecuting,
  onSelect,
}: ProjectCardProps) {
  const isActive = isSelected && !isExecuting;

  return (
    <div
      onClick={onSelect}
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      aria-label={`View record for ${project.name}`}
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
        {/* SQL Query Identifier */}
        <div style={{ marginBottom: '10px' }}>
          <QueryDisplay
            query={`SELECT project FROM projects WHERE id = '${project.id}';`}
            className="text-xs opacity-80"
          />
        </div>

        {/* Project Name */}
        <h3
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '16px',
            fontWeight: 700,
            color: '#F2F4F5',
            margin: 0,
            marginBottom: '4px',
            lineHeight: 1.3,
            letterSpacing: '-0.01em',
          }}
        >
          {project.name}
        </h3>

        {/* Category */}
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '10px',
            fontWeight: 600,
            letterSpacing: '0.12em',
            color: '#5EE6A8',
            marginBottom: '12px',
            textTransform: 'uppercase',
          }}
        >
          {project.category}
        </div>

        {/* Technology tags */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '6px',
            marginBottom: '14px',
          }}
        >
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '10px',
                fontWeight: 500,
                color: isActive ? '#9AA2AA' : '#626A73',
                backgroundColor: isActive ? '#0F261C' : '#0B0D0F',
                border: '1px solid #252A30',
                padding: '2px 8px',
                borderRadius: '3px',
              }}
            >
              [ {tech} ]
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '10px',
                color: '#626A73',
                alignSelf: 'center',
              }}
            >
              +{project.technologies.length - 4} more
            </span>
          )}
        </div>

        {/* Short Description */}
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '13px',
            fontWeight: 400,
            color: '#9AA2AA',
            margin: 0,
            lineHeight: 1.6,
            marginBottom: '18px',
          }}
        >
          {project.shortDescription}
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
