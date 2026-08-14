/**
 * ProjectCard — Portfolio Project Card for SAGAR.DB.
 *
 * Content-first hierarchy:
 * 1. Project Title (dominant)
 * 2. Category badge
 * 3. Description
 * 4. Technology pills
 * 5. Actions ([ VIEW PROJECT → ], [ VIEW CODE ])
 *
 * NO internal SQL query tags inside individual cards.
 */

import { ExternalLink, ArrowRight } from 'lucide-react';
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
        padding: '24px',
        border: isActive
          ? '1px solid #5EE6A8'
          : isExecuting && isSelected
          ? '1px solid #3D5A4A'
          : '1px solid #252A30',
        borderRadius: '8px',
        backgroundColor: isActive
          ? '#13281E'
          : isExecuting && isSelected
          ? '#0F1F18'
          : '#111418',
        cursor: isExecuting ? 'wait' : 'pointer',
        transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
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
        {/* Category Badge */}
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '10px',
            fontWeight: 600,
            letterSpacing: '0.14em',
            color: '#5EE6A8',
            marginBottom: '10px',
            textTransform: 'uppercase',
          }}
        >
          {project.category}
        </div>

        {/* Project Title (Visually Dominant - Level 1) */}
        <h3
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '18px',
            fontWeight: 800,
            color: '#F2F4F5',
            margin: 0,
            marginBottom: '12px',
            lineHeight: 1.3,
            letterSpacing: '-0.02em',
          }}
        >
          {project.name}
        </h3>

        {/* Short Description (Readable Body) */}
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '14px',
            fontWeight: 400,
            color: '#9AA2AA',
            margin: 0,
            lineHeight: 1.6,
            marginBottom: '20px',
          }}
        >
          {project.description}
        </p>

        {/* Technology Pills */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '6px',
            marginBottom: '22px',
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
              [ {tech} ]
            </span>
          ))}
        </div>
      </div>

      {/* Action Footer */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '16px',
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
            color: isActive ? '#5EE6A8' : '#F2F4F5',
            backgroundColor: 'transparent',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          [ VIEW PROJECT <ArrowRight size={12} /> ]
        </button>

        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '10px',
              fontWeight: 600,
              letterSpacing: '0.08em',
              color: '#5EE6A8',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            [ CODE <ExternalLink size={10} /> ]
          </a>
        )}
      </div>
    </div>
  );
}
