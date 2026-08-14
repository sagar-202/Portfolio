/**
 * Home — Phase 2
 * Query display at top reads from QueryContext.
 * All layout and visual design unchanged from Phase 1.
 */

import { useEffect } from 'react';
import { motion, type Easing } from 'framer-motion';
import { PageShell } from '../components/PageShell';
import { QueryDisplay } from '../components/QueryDisplay';
import { QueryExecution } from '../components/QueryExecution';

import { QueryResult } from '../components/QueryResult';
import { profile } from '../data/profile';
import { useQueryContext } from '../context/QueryContext';
import { COMMANDS } from '../query/commands';

// Respect prefers-reduced-motion
const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const EASE_OUT: Easing = 'easeOut';

const fadeInUp = prefersReducedMotion
  ? { initial: {}, animate: {}, transition: {} }
  : {
      initial: { opacity: 0, y: 14 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.35, ease: EASE_OUT },
    };

const stagger = (delay: number) =>
  prefersReducedMotion
    ? {}
    : { duration: 0.35, ease: EASE_OUT, delay };

export function Home() {
  const { setActiveCommand, state } = useQueryContext();

  // Mark HOME as the active command on mount
  useEffect(() => {
    setActiveCommand('HOME');
  }, [setActiveCommand]);

  // Determine which query to show at top
  // During navigation from this page, show the executing command's query
  const activeCmd = state.activeCommandId ? COMMANDS[state.activeCommandId] : null;
  const displayQuery =
    (state.status === 'executing' || state.status === 'success') && activeCmd?.query
      ? activeCmd.query
      : profile.queries.home;

  const showSuccess =
    state.status === 'success' && state.activeCommandId !== null;

  return (
    <PageShell>
      {/* Responsive two-column grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr)',
          gap: '40px',
          alignItems: 'start',
        }}
        className="home-grid"
      >
        {/* ── LEFT COLUMN ── */}
        <div style={{ minWidth: 0 }}>

          {/* Query block */}
          <motion.div
            initial={fadeInUp.initial}
            animate={fadeInUp.animate}
            transition={{ ...fadeInUp.transition, delay: 0 }}
            style={{ marginBottom: '4px' }}
          >
            <QueryDisplay query={displayQuery} />
          </motion.div>

          <motion.div
            initial={fadeInUp.initial}
            animate={fadeInUp.animate}
            transition={stagger(0.08)}
            style={{ marginBottom: '32px' }}
          >
            {showSuccess && activeCmd ? (
              <QueryExecution
                rowCount={activeCmd.successMessage.split('/')[1]?.trim()
                  ? `/ ${activeCmd.successMessage.split('/')[1].trim()}`
                  : undefined}
              />
            ) : (
              <QueryExecution />
            )}
          </motion.div>

          {/* Record metadata */}
          <motion.div
            initial={fadeInUp.initial}
            animate={fadeInUp.animate}
            transition={stagger(0.13)}
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
              RECORD / 001 — INTRODUCTION
            </span>
          </motion.div>

          {/* Hero heading — editorial scale */}
          <motion.h1
            initial={fadeInUp.initial}
            animate={fadeInUp.animate}
            transition={stagger(0.19)}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(42px, 6.5vw, 72px)',
              fontWeight: 800,
              color: '#F2F4F5',
              lineHeight: 1.04,
              letterSpacing: '-0.03em',
              margin: 0,
              marginBottom: '16px',
            }}
          >
            Hello, I'm Sagar.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={fadeInUp.initial}
            animate={fadeInUp.animate}
            transition={stagger(0.25)}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '15px',
              fontWeight: 400,
              color: '#9AA2AA',
              margin: 0,
              marginBottom: '10px',
              lineHeight: 1.5,
            }}
          >
            {profile.title}
          </motion.p>

          {/* Tags */}
          <motion.div
            initial={fadeInUp.initial}
            animate={fadeInUp.animate}
            transition={stagger(0.31)}
            style={{ marginBottom: '20px' }}
          >
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.14em',
                color: '#5EE6A8',
              }}
            >
              {profile.tags.join(' • ')}
            </span>
          </motion.div>

          {/* Bio */}
          <motion.p
            initial={fadeInUp.initial}
            animate={fadeInUp.animate}
            transition={stagger(0.37)}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '14px',
              fontWeight: 400,
              color: '#9AA2AA',
              lineHeight: 1.7,
              margin: 0,
              marginBottom: '36px',
              maxWidth: '460px',
            }}
          >
            {profile.bio}
          </motion.p>

        </div>

        {/* ── RIGHT COLUMN (panel) ── */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, x: 16 }}
          animate={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
          transition={prefersReducedMotion ? {} : { duration: 0.4, delay: 0.22, ease: 'easeOut' }}
          className="query-result-panel"
          style={{ width: '100%' }}
        >
          <QueryResult
            query={profile.queries.profile}
            name={profile.queryResult.name}
            title={profile.queryResult.title}
            details={profile.queryResult.details}
          />
        </motion.div>
      </div>

      {/* Responsive grid styles */}
      <style>{`
        @media (min-width: 768px) {
          .home-grid {
            grid-template-columns: minmax(0, 1.3fr) 280px !important;
            gap: 48px !important;
          }
        }
        @media (min-width: 1024px) {
          .home-grid {
            grid-template-columns: minmax(0, 1.45fr) 310px !important;
          }
        }
      `}</style>
    </PageShell>
  );
}
