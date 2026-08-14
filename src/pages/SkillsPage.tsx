/**
 * SkillsPage — /skills
 * Phase 7 UI Polish: Technical Skills Showcase
 *
 * Features:
 * - Grouped category grid layout & responsive compact tiles
 * - Category filters: [ ALL ], [ DATA ANALYTICS ], [ AI / ML ], [ PROGRAMMING ], [ FRONTEND ], [ BACKEND ], [ TOOLS ]
 * - Main heading: Skills & Technologies
 * - Subtitle: A practical toolkit I use across data analytics, AI/ML and software development.
 * - Compact right-side Query Result inspector showing dynamic query + skill overview
 */

import { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { motion, AnimatePresence, type Easing } from 'framer-motion';

import { PageShell } from '../components/PageShell';
import { QueryDisplay } from '../components/QueryDisplay';
import { QueryExecution } from '../components/QueryExecution';

import { QueryResult } from '../components/QueryResult';
import { SkillCard } from '../components/SkillCard';
import { useQueryContext } from '../context/QueryContext';
import { skillsData, type SkillFilterCategory, type Skill } from '../data/skills';
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

const FILTER_OPTIONS: SkillFilterCategory[] = [
  'ALL',
  'DATA ANALYTICS',
  'AI / ML',
  'PROGRAMMING',
  'FRONTEND',
  'BACKEND',
  'TOOLS',
];

const CATEGORY_ORDER: SkillFilterCategory[] = [
  'DATA ANALYTICS',
  'AI / ML',
  'PROGRAMMING',
  'FRONTEND',
  'BACKEND',
  'TOOLS',
];

export function SkillsPage() {
  const { setActiveCommand } = useQueryContext();

  const [activeFilter, setActiveFilter] = useState<SkillFilterCategory>('ALL');
  const [selectedSkillId, setSelectedSkillId] = useState<string>(skillsData[0].id);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sync with global query engine
  useEffect(() => {
    setActiveCommand('SKILLS');
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [setActiveCommand]);

  // Filter skills list
  const filteredSkills = useMemo(() => {
    if (activeFilter === 'ALL') return skillsData;
    return skillsData.filter((s) => s.filterCategory === activeFilter);
  }, [activeFilter]);

  // Grouped skills when ALL is selected
  const groupedSkills = useMemo(() => {
    const map = new Map<SkillFilterCategory, Skill[]>();
    CATEGORY_ORDER.forEach((cat) => map.set(cat, []));
    filteredSkills.forEach((skill) => {
      const list = map.get(skill.filterCategory);
      if (list) list.push(skill);
      else map.set(skill.filterCategory, [skill]);
    });
    return Array.from(map.entries()).filter(([_, list]) => list.length > 0);
  }, [filteredSkills]);

  // Keep valid selected skill when filter changes
  useEffect(() => {
    if (filteredSkills.length > 0) {
      const exists = filteredSkills.some((s) => s.id === selectedSkillId);
      if (!exists) {
        setSelectedSkillId(filteredSkills[0].id);
      }
    }
  }, [filteredSkills, selectedSkillId]);

  const handleSelectSkill = useCallback(
    (id: string) => {
      if (id === selectedSkillId && !isExecuting) return;

      if (prefersReducedMotion) {
        setSelectedSkillId(id);
        return;
      }

      setSelectedSkillId(id);
      setIsExecuting(true);

      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setIsExecuting(false);
      }, CARD_EXEC_MS);
    },
    [selectedSkillId, isExecuting]
  );

  const selectedSkill = useMemo(() => {
    return skillsData.find((s) => s.id === selectedSkillId) || skillsData[0];
  }, [selectedSkillId]);

  const cmd = COMMANDS.SKILLS;
  const rowCountStr = `/ ${String(filteredSkills.length).padStart(3, '0')} rows`;

  return (
    <PageShell>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr)',
          gap: '40px',
          alignItems: 'start',
        }}
        className="skills-grid"
      >
        {/* ── LEFT COLUMN (Main Content) ── */}
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
              RECORDS / {String(skillsData.length).padStart(3, '0')} — SKILLS
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
            Skills & Technologies
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
              maxWidth: '580px',
            }}
          >
            A practical toolkit I use across data analytics, AI/ML and software development.
          </motion.p>

          {/* Filter Bar */}
          <motion.div
            {...fadeInUp}
            transition={stagger(0.25)}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
              marginBottom: '32px',
              paddingBottom: '16px',
              borderBottom: '1px solid #252A30',
            }}
          >
            {/* Filter buttons */}
            <div
              style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}
              role="toolbar"
              aria-label="Skill category filters"
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
                      padding: '6px 14px',
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

            {/* Skill count indicator */}
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '10px',
                fontWeight: 500,
                color: '#626A73',
                letterSpacing: '0.08em',
              }}
            >
              {filteredSkills.length} skill {filteredSkills.length === 1 ? 'record' : 'records'}
            </div>
          </motion.div>

          {/* Grouped Skills Showcase */}
          <motion.div
            {...fadeInUp}
            transition={stagger(0.3)}
            style={{ marginBottom: '32px' }}
          >
            {filteredSkills.length === 0 ? (
              <div
                style={{
                  padding: '32px',
                  border: '1px solid #252A30',
                  borderRadius: '6px',
                  color: '#626A73',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '12px',
                  textAlign: 'center',
                }}
              >
                No skill records found for selected filter.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
                {groupedSkills.map(([categoryName, skillsInGroup]) => (
                  <div key={categoryName}>
                    {/* Category Group Header */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        marginBottom: '16px',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: '11px',
                          fontWeight: 600,
                          letterSpacing: '0.14em',
                          color: '#5EE6A8',
                          textTransform: 'uppercase',
                        }}
                      >
                        {categoryName}
                      </span>
                      <div
                        style={{
                          flex: 1,
                          height: '1px',
                          backgroundColor: '#1C2128',
                        }}
                      />
                      <span
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: '10px',
                          color: '#626A73',
                        }}
                      >
                        {skillsInGroup.length}
                      </span>
                    </div>

                    {/* Skill Tiles Grid */}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                        gap: '14px',
                      }}
                    >
                      {skillsInGroup.map((skill) => (
                        <SkillCard
                          key={skill.id}
                          skill={skill}
                          isSelected={selectedSkillId === skill.id}
                          isExecuting={isExecuting && selectedSkillId === skill.id}
                          onSelect={() => handleSelectSkill(skill.id)}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Mobile Query Result Panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedSkillId + '-mobile'}
              initial={prefersReducedMotion ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={prefersReducedMotion ? {} : { opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="skills-result-mobile"
              style={{ marginBottom: '36px' }}
            >
              {selectedSkill && (
                <QueryResult
                  query={`SELECT * FROM skills WHERE name = '${selectedSkill.id}';`}
                  name={selectedSkill.name.toUpperCase()}
                  details={[
                    { label: 'category', value: selectedSkill.category },
                    {
                      label: 'proficiency',
                      value:
                        selectedSkill.level === 'WORKING'
                          ? 'Working (● ● ● ● ○)'
                          : 'Foundational (● ● ● ○ ○)',
                    },
                    { label: 'usage', value: selectedSkill.usage.join(' • ') },
                    {
                      label: 'projects',
                      value:
                        selectedSkill.relatedProjects.length > 0
                          ? `${selectedSkill.relatedProjects.length} projects (${selectedSkill.relatedProjects.slice(0, 2).join(', ')})`
                          : 'Foundational practice',
                    },
                  ]}
                  isExecuting={isExecuting}
                />
              )}
            </motion.div>
          </AnimatePresence>

        </div>

        {/* ── RIGHT COLUMN — Result Panel (Desktop) ── */}
        <div className="skills-result-desktop" style={{ width: '100%', position: 'sticky', top: '90px' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedSkillId}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? {} : { opacity: 0, y: -4 }}
              transition={{ duration: 0.22, ease: EASE_OUT }}
            >
              {selectedSkill && (
                <QueryResult
                  query={`SELECT * FROM skills WHERE name = '${selectedSkill.id}';`}
                  name={selectedSkill.name.toUpperCase()}
                  details={[
                    { label: 'category', value: selectedSkill.category },
                    { label: 'proficiency', value: selectedSkill.level },
                    { label: 'usage', value: selectedSkill.usage.join(' • ') },
                    {
                      label: 'skill index',
                      value: `${skillsData.length} technologies • Primary: Python, SQL, Pandas • Focus: Data Analytics & AI/ML`,
                    },
                  ]}
                  isExecuting={isExecuting}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Responsive layout CSS */}
      <style>{`
        @media (min-width: 768px) {
          .skills-grid {
            grid-template-columns: minmax(0, 1.45fr) 290px !important;
            gap: 40px !important;
          }
          .skills-result-mobile {
            display: none !important;
          }
        }
        @media (min-width: 1024px) {
          .skills-grid {
            grid-template-columns: minmax(0, 1.55fr) 300px !important;
            gap: 48px !important;
          }
        }
        @media (max-width: 767px) {
          .skills-result-desktop {
            display: none !important;
          }
        }
      `}</style>
    </PageShell>
  );
}
