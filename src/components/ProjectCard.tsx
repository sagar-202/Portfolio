/**
 * ProjectCard — SAGAR.DB project card.
 * Content-first hierarchy with subtle SQL metadata tag.
 */

import { ExternalLink } from 'lucide-react';
import type { Project } from '../data/projects';

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
      aria-label={`View project details for ${project.name}`}
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
        padding: '22px 22px',
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
        {/* Subtle SQL query tag (Level 4 element) */}
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '10px',
            color: '#626A73',
            marginBottom: '10px',
            lineHeight: 1.4,
          }}
        >
          <span style={{ color: '#3D444B' }}>&gt;</span> SELECT project FROM projects WHERE id = '{project.id}';
        </div>

        {/* Primary Project Name (Level 1 Content) */}
        <h3
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '18px',
            fontWeight: 800,
            color: '#F2F4F5',
            margin: 0,
            marginBottom: '6px',
            lineHeight: 1.25,
            letterSpacing: '-0.02em',
          }}
        >
          {project.name}
        </h3>

        {/* Category Badge */}
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '10px',
            fontWeight: 600,
            letterSpacing: '0.12em',
            color: '#5EE6A8',
            marginBottom: '14px',
            textTransform: 'uppercase',
          }}
        >
          {project.category}
        </div>

        {/* Project Description (Primary Content) */}
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '14px',
            fontWeight: 400,
            color: '#9AA2AA',
            margin: 0,
            lineHeight: 1.6,
            marginBottom: '18px',
          }}
        >
          {project.description}
        </p>

        {/* Technologies List */}
        <div style={{ marginBottom: '20px' }}>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '10px',
              color: '#626A73',
              marginBottom: '6px',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            Technologies:
          </div>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '6px',
            }}
          >
            {project.technologies.map((tech) => (
              <span
                key={tech}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '10px',
                  fontWeight: 500,
                  color: isActive ? '#5EE6A8' : '#9AA2AA',
                  backgroundColor: isActive ? '#0D241A' : '#0B0D0F',
                  border: isActive ? '1px solid #1F4D38' : '1px solid #252A30',
                  padding: '3px 8px',
                  borderRadius: '3px',
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          paddingTop: '14px',
          borderTop: '1px solid #1C2128',
        }}
      >
        <button
          type="button"
          tabIndex={-1}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.08em',
            color: isActive ? '#5EE6A8' : '#9AA2AA',
            backgroundColor: 'transparent',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
          }}
        >
          [ VIEW PROJECT ]
        </button>

        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.08em',
              color: '#5EE6A8',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            [ VIEW CODE ]
            <ExternalLink size={10} />
          </a>
        )}
      </div>
    </div>
  );
}
