/**
 * ProjectsPage — /projects
 * Phase 4: Interactive project records page.
 *
 * Features:
 * - 2-column project grid + right-side Query Result panel (desktop)
 * - Single-column stacked cards + panel below (mobile)
 * - Client-side filter row: [ ALL ], [ DATA ], [ AI / ML ], [ SOFTWARE ], [ TOOLS ]
 * - Sort indicator: SORT: NEWEST
 * - Selected project updates Query Result panel with SQL query and details
 * - 260ms execution transition state on card select
 */

import { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { motion, AnimatePresence, type Easing } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

import { PageShell } from '../components/PageShell';
import { QueryDisplay } from '../components/QueryDisplay';
import { QueryExecution } from '../components/QueryExecution';
import { QueryNavigation } from '../components/QueryNavigation';
import { QueryResult } from '../components/QueryResult';
import { ProjectCard } from '../components/ProjectCard';
import { useQueryContext } from '../context/QueryContext';
import { projectsData, type FilterCategory } from '../data/projects';
import { COMMANDS } from '../query/commands';

// ─── Motion config ─────────────────────────────────────────────────────────────

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const EASE_OUT: Easing = 'easeOut';

const fadeIn = prefersReducedMotion
  ? {}
  : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.25, ease: EASE_OUT } };

const fadeInUp = prefersReducedMotion
  ? {}
  : { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 } };

const stagger = (delay: number) =>
  prefersReducedMotion ? {} : { duration: 0.3, ease: EASE_OUT, delay };

const CARD_EXEC_MS = 260;

const FILTER_OPTIONS: FilterCategory[] = ['ALL', 'DATA', 'AI / ML', 'SOFTWARE', 'TOOLS'];

export function ProjectsPage() {
  const { setActiveCommand } = useQueryContext();

  const [activeFilter, setActiveFilter] = useState<FilterCategory>('ALL');
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projectsData[0].id);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sync with global query engine
  useEffect(() => {
    setActiveCommand('PROJECTS');
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [setActiveCommand]);

  // Filter project list
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'ALL') return projectsData;
    return projectsData.filter((p) => p.filterCategory === activeFilter);
  }, [activeFilter]);

  // Keep a selected project even when filters change
  useEffect(() => {
    if (filteredProjects.length > 0) {
      const exists = filteredProjects.some((p) => p.id === selectedProjectId);
      if (!exists) {
        setSelectedProjectId(filteredProjects[0].id);
      }
    }
  }, [filteredProjects, selectedProjectId]);

  const handleSelectProject = useCallback(
    (id: string) => {
      if (id === selectedProjectId && !isExecuting) return;

      if (prefersReducedMotion) {
        setSelectedProjectId(id);
        return;
      }

      setSelectedProjectId(id);
      setIsExecuting(true);

      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setIsExecuting(false);
      }, CARD_EXEC_MS);
    },
    [selectedProjectId, isExecuting]
  );

  const selectedProject = useMemo(() => {
    return projectsData.find((p) => p.id === selectedProjectId) || projectsData[0];
  }, [selectedProjectId]);

  const cmd = COMMANDS.PROJECTS;
  const rowCountStr = `/ ${String(filteredProjects.length).padStart(3, '0')} rows`;

  return (
    <PageShell>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr)',
          gap: '40px',
          alignItems: 'start',
        }}
        className="projects-grid"
      >
        {/* ── LEFT COLUMN ── */}
        <div style={{ minWidth: 0 }}>
          {/* Query block */}
          <motion.div {...fadeIn} style={{ marginBottom: '4px' }}>
            <QueryDisplay query={cmd.query} />
          </motion.div>

          <motion.div
            {...fadeIn}
            transition={stagger(0.06)}
            style={{ marginBottom: '32px' }}
          >
            <QueryExecution rowCount={rowCountStr} />
          </motion.div>

          {/* Record label */}
          <motion.div
            {...fadeInUp}
            transition={stagger(0.1)}
            style={{ marginBottom: '16px' }}
          >
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '10px',
                fontWeight: 400,
                letterSpacing: '0.14em',
                color: '#626A73',
                textTransform: 'uppercase',
              }}
            >
              RECORDS / {String(projectsData.length).padStart(3, '0')} — PROJECTS
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            {...fadeInUp}
            transition={stagger(0.15)}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(36px, 5.5vw, 62px)',
              fontWeight: 800,
              color: '#F2F4F5',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              margin: 0,
              marginBottom: '14px',
            }}
          >
            Projects, built.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            {...fadeInUp}
            transition={stagger(0.2)}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '15px',
              fontWeight: 400,
              color: '#9AA2AA',
              lineHeight: 1.6,
              margin: 0,
              marginBottom: '28px',
              maxWidth: '560px',
            }}
          >
            A collection of practical projects across data analytics, AI and software development.
          </motion.p>

          {/* Filter & Sort Bar */}
          <motion.div
            {...fadeInUp}
            transition={stagger(0.25)}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
              marginBottom: '24px',
              paddingBottom: '16px',
              borderBottom: '1px solid #252A30',
            }}
          >
            {/* Filter buttons */}
            <div
              style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}
              role="toolbar"
              aria-label="Project filter options"
            >
              {FILTER_OPTIONS.map((filter) => {
                const isActive = activeFilter === filter;
                return (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setActiveFilter(filter)}
                    aria-pressed={isActive}
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '10px',
                      fontWeight: 600,
                      letterSpacing: '0.08em',
                      padding: '5px 12px',
                      border: isActive ? '1px solid #5EE6A8' : '1px solid #252A30',
                      borderRadius: '3px',
                      backgroundColor: isActive ? '#17382A' : 'transparent',
                      color: isActive ? '#5EE6A8' : '#626A73',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      outline: 'none',
                    }}
                    onFocus={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.boxShadow =
                        '0 0 0 2px rgba(94,230,168,0.3)';
                    }}
                    onBlur={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.boxShadow = 'none';
                    }}
                  >
                    [ {filter} ]
                  </button>
                );
              })}
            </div>

            {/* Sort indicator */}
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '10px',
                fontWeight: 500,
                color: '#626A73',
                letterSpacing: '0.08em',
              }}
            >
              SORT: NEWEST
            </div>
          </motion.div>

          {/* Project Grid */}
          <motion.div
            {...fadeInUp}
            transition={stagger(0.3)}
            style={{ marginBottom: '32px' }}
          >
            {filteredProjects.length === 0 ? (
              <div
                style={{
                  padding: '32px',
                  border: '1px border #252A30',
                  borderRadius: '6px',
                  color: '#626A73',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '12px',
                  textAlign: 'center',
                }}
              >
                No project records found for current query filter.
              </div>
            ) : (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                  gap: '16px',
                }}
              >
                {filteredProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    isSelected={selectedProjectId === project.id}
                    isExecuting={isExecuting && selectedProjectId === project.id}
                    onSelect={() => handleSelectProject(project.id)}
                  />
                ))}
              </div>
            )}
          </motion.div>

          {/* Mobile-only Query Result panel (below project cards) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedProjectId + '-mobile'}
              initial={prefersReducedMotion ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={prefersReducedMotion ? {} : { opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="projects-result-mobile"
              style={{ marginBottom: '36px' }}
            >
              {selectedProject && (
                <QueryResult
                  query={`SELECT * FROM projects WHERE id = '${selectedProject.id}';`}
                  name={selectedProject.name}
                  details={[
                    { label: 'category', value: selectedProject.category },
                    { label: 'description', value: selectedProject.description },
                    { label: 'tools', value: selectedProject.technologies.join(' • ') },
                  ]}
                  isExecuting={isExecuting}
                  action={
                    selectedProject.githubUrl ? (
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: '11px',
                          fontWeight: 500,
                          color: '#5EE6A8',
                          textDecoration: 'none',
                        }}
                      >
                        <ExternalLink size={12} />
                        [ VIEW GITHUB ]
                      </a>
                    ) : undefined
                  }
                />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation bar */}
          <motion.div {...fadeInUp} transition={stagger(0.35)}>
            <QueryNavigation />
          </motion.div>
        </div>

        {/* ── RIGHT COLUMN — Result Panel (Desktop) ── */}
        <div className="projects-result-desktop" style={{ width: '100%' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedProjectId}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? {} : { opacity: 0, y: -4 }}
              transition={{ duration: 0.22, ease: EASE_OUT }}
            >
              {selectedProject && (
                <QueryResult
                  query={`SELECT * FROM projects WHERE id = '${selectedProject.id}';`}
                  name={selectedProject.name}
                  details={[
                    { label: 'category', value: selectedProject.category },
                    { label: 'description', value: selectedProject.description },
                    { label: 'tools', value: selectedProject.technologies.join(' • ') },
                  ]}
                  isExecuting={isExecuting}
                  action={
                    selectedProject.githubUrl ? (
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: '11px',
                          fontWeight: 500,
                          color: '#5EE6A8',
                          textDecoration: 'none',
                        }}
                      >
                        <ExternalLink size={12} />
                        [ VIEW GITHUB ]
                      </a>
                    ) : undefined
                  }
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Responsive layout CSS */}
      <style>{`
        @media (min-width: 768px) {
          .projects-grid {
            grid-template-columns: minmax(0, 1.4fr) 300px !important;
            gap: 40px !important;
          }
          .projects-result-mobile {
            display: none !important;
          }
        }
        @media (min-width: 1024px) {
          .projects-grid {
            grid-template-columns: minmax(0, 1.5fr) 320px !important;
            gap: 48px !important;
          }
        }
        @media (max-width: 767px) {
          .projects-result-desktop {
            display: none !important;
          }
        }
      `}</style>
    </PageShell>
  );
}
