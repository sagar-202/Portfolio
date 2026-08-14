/**
 * MePage — /me
 * Phase 3: Full profile record implementation.
 *
 * Layout mirrors the home page two-column grid.
 * Cards use a local state machine — card selection ≠ page navigation.
 * The global query engine is only used for page-level navigation.
 */

import { useEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence, type Easing } from 'framer-motion';
import { Download } from 'lucide-react';

import { PageShell } from '../components/PageShell';
import { QueryDisplay } from '../components/QueryDisplay';
import { QueryExecution } from '../components/QueryExecution';
import { QueryNavigation } from '../components/QueryNavigation';
import { QueryResult } from '../components/QueryResult';
import { ProfileCard } from '../components/ProfileCard';
import { useQueryContext } from '../context/QueryContext';
import { meProfile, profileCards, type CardId } from '../data/profile';

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

// ─── Card execution timing ──────────────────────────────────────────────────

const CARD_EXEC_MS = 260;

type CardExecState = 'idle' | 'executing' | 'ready';

// ─── MePage ───────────────────────────────────────────────────────────────────

export function MePage() {
  const { setActiveCommand } = useQueryContext();

  // Local card state — separate from global navigation query engine
  const [selectedCardId, setSelectedCardId] = useState<CardId>('education');
  const [cardExecState, setCardExecState] = useState<CardExecState>('ready');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Set global nav active state
  useEffect(() => {
    setActiveCommand('ME');
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [setActiveCommand]);

  const handleCardSelect = useCallback(
    (cardId: CardId) => {
      if (cardId === selectedCardId && cardExecState === 'ready') return;
      if (cardExecState === 'executing') return;

      if (prefersReducedMotion) {
        setSelectedCardId(cardId);
        setCardExecState('ready');
        return;
      }

      setSelectedCardId(cardId);
      setCardExecState('executing');

      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setCardExecState('ready');
      }, CARD_EXEC_MS);
    },
    [selectedCardId, cardExecState]
  );

  // Derive display values from selected card
  const selectedCard = profileCards.find((c) => c.id === selectedCardId)!;
  const isExecuting = cardExecState === 'executing';

  return (
    <PageShell>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr)',
          gap: '40px',
          alignItems: 'start',
        }}
        className="me-grid"
      >
        {/* ── LEFT COLUMN ── */}
        <div style={{ minWidth: 0 }}>

          {/* Page-level query */}
          <motion.div {...fadeIn} style={{ marginBottom: '4px' }}>
            <QueryDisplay query={meProfile.query} />
          </motion.div>

          <motion.div
            {...fadeIn}
            transition={stagger(0.06)}
            style={{ marginBottom: '32px' }}
          >
            <QueryExecution rowCount={meProfile.successMessage} />
          </motion.div>

          {/* Record label */}
          <motion.div
            {...fadeInUp}
            transition={stagger(0.10)}
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
              {meProfile.recordLabel}
            </span>
          </motion.div>

          {/* Hero heading */}
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
            {meProfile.heading}
          </motion.h1>

          {/* Subtitle + accent tags on one line */}
          <motion.div
            {...fadeInUp}
            transition={stagger(0.20)}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '18px',
            }}
          >
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '15px',
                fontWeight: 400,
                color: '#9AA2AA',
              }}
            >
              {meProfile.subtitle}
            </span>
            <span
              style={{ color: '#252A30', fontSize: '12px' }}
              aria-hidden="true"
            >
              •
            </span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.12em',
                color: '#5EE6A8',
              }}
            >
              {meProfile.accentLine}
            </span>
          </motion.div>

          {/* Bio */}
          <motion.p
            {...fadeInUp}
            transition={stagger(0.25)}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '14px',
              fontWeight: 400,
              color: '#9AA2AA',
              lineHeight: 1.7,
              margin: 0,
              marginBottom: '32px',
              maxWidth: '480px',
            }}
          >
            {meProfile.bio}
          </motion.p>

          {/* ── Cards ── */}
          <motion.div
            {...fadeInUp}
            transition={stagger(0.30)}
            style={{ marginBottom: '28px' }}
          >
            <div
              style={{
                display: 'flex',
                gap: '10px',
                flexWrap: 'wrap',
              }}
              className="profile-cards"
              role="group"
              aria-label="Profile record fields"
            >
              {profileCards.map((card) => (
                <ProfileCard
                  key={card.id}
                  card={card}
                  isSelected={selectedCardId === card.id}
                  isExecuting={isExecuting && selectedCardId === card.id}
                  onClick={() => handleCardSelect(card.id)}
                />
              ))}
            </div>
          </motion.div>

          {/* ── Mobile-only result panel (below cards) ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCardId + '-mobile'}
              initial={prefersReducedMotion ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={prefersReducedMotion ? {} : { opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="me-result-mobile"
              style={{ marginBottom: '28px' }}
            >
              <QueryResult
                query={selectedCard.query}
                name={selectedCard.resultHeading}
                details={selectedCard.resultDetails}
                isExecuting={isExecuting}
              />
            </motion.div>
          </AnimatePresence>

          {/* Resume button */}
          <motion.div
            {...fadeInUp}
            transition={stagger(0.35)}
            style={{ marginBottom: '36px' }}
          >
            <button
              id="btn-open-resume"
              type="button"
              disabled
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.1em',
                padding: '9px 16px',
                border: '1px solid #252A30',
                borderRadius: '3px',
                backgroundColor: 'transparent',
                color: '#626A73',
                cursor: 'not-allowed',
              }}
            >
              <Download size={12} strokeWidth={1.5} aria-hidden="true" />
              [ RESUME — COMING SOON ]
            </button>
          </motion.div>

          {/* Navigation */}
          <motion.div {...fadeInUp} transition={stagger(0.40)}>
            <QueryNavigation />
          </motion.div>
        </div>

        {/* ── RIGHT COLUMN — result panel (desktop) ── */}
        <div className="me-result-desktop" style={{ width: '100%' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCardId}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? {} : { opacity: 0, y: -4 }}
              transition={{ duration: 0.22, ease: EASE_OUT }}
            >
              <QueryResult
                query={selectedCard.query}
                name={selectedCard.resultHeading}
                details={selectedCard.resultDetails}
                isExecuting={isExecuting}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Responsive grid + card layout styles */}
      <style>{`
        /* Desktop: two-column grid, mirror home page */
        @media (min-width: 768px) {
          .me-grid {
            grid-template-columns: minmax(0, 1.3fr) 280px !important;
            gap: 48px !important;
          }
          /* Hide mobile result panel on desktop */
          .me-result-mobile {
            display: none !important;
          }
        }
        @media (min-width: 1024px) {
          .me-grid {
            grid-template-columns: minmax(0, 1.4fr) 300px !important;
          }
        }

        /* Mobile: show mobile panel, hide desktop column */
        @media (max-width: 767px) {
          .me-result-desktop {
            display: none !important;
          }
          /* Cards stack full-width on mobile */
          .profile-cards {
            flex-direction: column !important;
          }
        }
      `}</style>
    </PageShell>
  );
}
