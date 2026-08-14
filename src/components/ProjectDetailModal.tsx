/**
 * ProjectDetailModal — SAGAR.DB Project Inspector Modal.
 * Displays project breakdown (Overview, Problem, Approach, Features, Tech, Links)
 * while preserving dark database aesthetic.
 */

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Code2, Layers, CheckCircle2 } from 'lucide-react';
import type { Project } from '../data/projects';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            backgroundColor: 'rgba(5, 7, 9, 0.82)',
            backdropFilter: 'blur(8px)',
          }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#111418',
              border: '1px solid #252A30',
              borderRadius: '8px',
              maxWidth: '680px',
              width: '100%',
              maxHeight: '85vh',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)',
              overflow: 'hidden',
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 22px',
                borderBottom: '1px solid #252A30',
                backgroundColor: '#0F1215',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '10px',
                    fontWeight: 600,
                    letterSpacing: '0.14em',
                    color: '#5EE6A8',
                    textTransform: 'uppercase',
                  }}
                >
                  PROJECT RECORD / {project.id}
                </span>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#626A73',
                  cursor: 'pointer',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '10px',
                  transition: 'color 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color = '#F2F4F5';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color = '#626A73';
                }}
              >
                [ ESC <X size={14} /> ]
              </button>
            </div>

            {/* Modal Content Scrollable Area */}
            <div
              style={{
                padding: '24px 24px 28px',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
              }}
            >
              {/* Category & Title */}
              <div>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '10px',
                    fontWeight: 600,
                    letterSpacing: '0.14em',
                    color: '#5EE6A8',
                    textTransform: 'uppercase',
                  }}
                >
                  {project.category}
                </span>
                <h2
                  id="modal-project-title"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '22px',
                    fontWeight: 800,
                    color: '#F2F4F5',
                    margin: 0,
                    marginTop: '6px',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.25,
                  }}
                >
                  {project.name}
                </h2>
              </div>

              {/* Overview */}
              <div>
                <h4
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '10px',
                    color: '#626A73',
                    margin: 0,
                    marginBottom: '6px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                  }}
                >
                  OVERVIEW
                </h4>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '14px',
                    lineHeight: 1.65,
                    color: '#9AA2AA',
                    margin: 0,
                  }}
                >
                  {project.description}
                </p>
              </div>

              {/* Problem & Approach */}
              {(project.problem || project.approach) && (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                    gap: '16px',
                    backgroundColor: '#0B0D0F',
                    padding: '16px',
                    borderRadius: '6px',
                    border: '1px solid #1C2128',
                  }}
                >
                  {project.problem && (
                    <div>
                      <h4
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: '10px',
                          color: '#5EE6A8',
                          margin: 0,
                          marginBottom: '6px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.1em',
                        }}
                      >
                        PROBLEM STATEMENT
                      </h4>
                      <p
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: '13px',
                          lineHeight: 1.6,
                          color: '#9AA2AA',
                          margin: 0,
                        }}
                      >
                        {project.problem}
                      </p>
                    </div>
                  )}

                  {project.approach && (
                    <div>
                      <h4
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: '10px',
                          color: '#5EE6A8',
                          margin: 0,
                          marginBottom: '6px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.1em',
                        }}
                      >
                        APPROACH & ARCHITECTURE
                      </h4>
                      <p
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: '13px',
                          lineHeight: 1.6,
                          color: '#9AA2AA',
                          margin: 0,
                        }}
                      >
                        {project.approach}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Key Features */}
              {project.keyFeatures && project.keyFeatures.length > 0 && (
                <div>
                  <h4
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '10px',
                      color: '#626A73',
                      margin: 0,
                      marginBottom: '10px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <Layers size={12} color="#5EE6A8" />
                    KEY FEATURES & FUNCTIONALITY
                  </h4>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                    }}
                  >
                    {project.keyFeatures.map((feature, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '8px',
                          fontSize: '13px',
                          fontFamily: "'Inter', sans-serif",
                          color: '#9AA2AA',
                          lineHeight: 1.5,
                        }}
                      >
                        <CheckCircle2
                          size={14}
                          color="#5EE6A8"
                          style={{ flexShrink: 0, marginTop: '3px' }}
                        />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Technologies */}
              <div>
                <h4
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '10px',
                    color: '#626A73',
                    margin: 0,
                    marginBottom: '8px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <Code2 size={12} color="#5EE6A8" />
                  TECHNOLOGY STACK
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '11px',
                        fontWeight: 500,
                        color: '#5EE6A8',
                        backgroundColor: '#17382A',
                        border: '1px solid #1F4D38',
                        padding: '4px 10px',
                        borderRadius: '4px',
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div
              style={{
                padding: '14px 22px',
                borderTop: '1px solid #252A30',
                backgroundColor: '#0F1215',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
              }}
            >
              <div style={{ display: 'flex', gap: '12px' }}>
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '11px',
                      fontWeight: 600,
                      color: '#5EE6A8',
                      backgroundColor: '#17382A',
                      border: '1px solid #5EE6A8',
                      padding: '6px 14px',
                      borderRadius: '3px',
                      textDecoration: 'none',
                    }}
                  >
                    [ GITHUB <ExternalLink size={12} /> ]
                  </a>
                )}

                {project.demoUrl ? (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '11px',
                      fontWeight: 600,
                      color: '#F2F4F5',
                      backgroundColor: '#252A30',
                      border: '1px solid #3D444B',
                      padding: '6px 14px',
                      borderRadius: '3px',
                      textDecoration: 'none',
                    }}
                  >
                    [ LIVE DEMO <ExternalLink size={12} /> ]
                  </a>
                ) : (
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '11px',
                      fontWeight: 500,
                      color: '#626A73',
                      padding: '6px 12px',
                    }}
                  >
                    [ LOCAL / REPO DEMO ]
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={onClose}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '11px',
                  fontWeight: 500,
                  color: '#9AA2AA',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                [ CLOSE ]
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
