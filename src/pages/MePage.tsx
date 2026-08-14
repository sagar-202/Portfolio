/**
 * MePage — /me
 * Recruiter-focused profile page.
 * Includes Profile Snapshot, Work Experience, Verified Certifications,
 * Interactive Record Cards, and Download Resume CTA.
 */

import { useEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence, type Easing } from 'framer-motion';
import { Download, Briefcase, Award, GraduationCap, CheckCircle2 } from 'lucide-react';

import { PageShell } from '../components/PageShell';
import { QueryDisplay } from '../components/QueryDisplay';
import { QueryExecution } from '../components/QueryExecution';
import { QueryResult } from '../components/QueryResult';
import { ProfileCard } from '../components/ProfileCard';
import { useQueryContext } from '../context/QueryContext';
import {
  meProfile,
  profileCards,
  profileSnapshot,
  experiences,
  certifications,
  type CardId,
} from '../data/profile';

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

type CardExecState = 'idle' | 'executing' | 'ready';

export function MePage() {
  const { setActiveCommand } = useQueryContext();

  const [selectedCardId, setSelectedCardId] = useState<CardId>('education');
  const [cardExecState, setCardExecState] = useState<CardExecState>('ready');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
          {/* Query block */}
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

          {/* Subtitle + accent tags */}
          <motion.div
            {...fadeInUp}
            transition={stagger(0.2)}
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
            <span style={{ color: '#252A30', fontSize: '12px' }} aria-hidden="true">
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
              marginBottom: '28px',
              maxWidth: '520px',
            }}
          >
            {meProfile.bio}
          </motion.p>

          {/* Action Buttons: Resume Download */}
          <motion.div
            {...fadeInUp}
            transition={stagger(0.28)}
            style={{ marginBottom: '36px' }}
          >
            <a
              id="btn-download-resume"
              href="/resume.pdf"
              download="Sagar_Patgar_Resume.pdf"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.1em',
                padding: '10px 20px',
                border: '1px solid #5EE6A8',
                borderRadius: '4px',
                backgroundColor: '#17382A',
                color: '#5EE6A8',
                textDecoration: 'none',
                transition: 'all 0.15s ease',
              }}
            >
              <Download size={13} strokeWidth={2} />
              [ DOWNLOAD RESUME ↓ ]
            </a>
          </motion.div>

          {/* ── PROFILE SNAPSHOT ── */}
          <motion.div
            {...fadeInUp}
            transition={stagger(0.32)}
            style={{
              backgroundColor: '#111418',
              border: '1px solid #252A30',
              borderRadius: '6px',
              padding: '20px',
              marginBottom: '36px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '16px',
              }}
            >
              <GraduationCap size={14} color="#5EE6A8" />
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  color: '#5EE6A8',
                  textTransform: 'uppercase',
                }}
              >
                PROFILE SNAPSHOT
              </span>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '14px',
              }}
            >
              <div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#626A73', textTransform: 'uppercase', marginBottom: '2px' }}>
                  EDUCATION
                </div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 600, color: '#F2F4F5' }}>
                  {profileSnapshot.education}
                </div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#5EE6A8' }}>
                  {profileSnapshot.cgpa}
                </div>
              </div>

              <div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#626A73', textTransform: 'uppercase', marginBottom: '2px' }}>
                  PRIMARY FOCUS
                </div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 600, color: '#F2F4F5' }}>
                  {profileSnapshot.primaryFocus}
                </div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: '#9AA2AA' }}>
                  Secondary: {profileSnapshot.secondaryFocus}
                </div>
              </div>

              <div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#626A73', textTransform: 'uppercase', marginBottom: '2px' }}>
                  CORE STACK
                </div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: '#5EE6A8' }}>
                  {profileSnapshot.coreStack}
                </div>
              </div>

              <div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#626A73', textTransform: 'uppercase', marginBottom: '2px' }}>
                  TARGET ROLES
                </div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: '#9AA2AA' }}>
                  {profileSnapshot.targetRoles}
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── WORK EXPERIENCE ── */}
          <motion.div
            {...fadeInUp}
            transition={stagger(0.36)}
            style={{ marginBottom: '36px' }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '16px',
              }}
            >
              <Briefcase size={14} color="#5EE6A8" />
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  color: '#5EE6A8',
                  textTransform: 'uppercase',
                }}
              >
                EXPERIENCE
              </span>
            </div>

            {experiences.map((exp) => (
              <div
                key={exp.id}
                style={{
                  backgroundColor: '#111418',
                  border: '1px solid #252A30',
                  borderRadius: '6px',
                  padding: '20px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                    gap: '8px',
                    marginBottom: '6px',
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '16px',
                      fontWeight: 700,
                      color: '#F2F4F5',
                      margin: 0,
                    }}
                  >
                    {exp.title}
                  </h3>
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '11px',
                      color: '#5EE6A8',
                    }}
                  >
                    {exp.company} • {exp.period}
                  </span>
                </div>

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                    marginTop: '12px',
                  }}
                >
                  {exp.highlights.map((item, idx) => (
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
                        size={13}
                        color="#5EE6A8"
                        style={{ flexShrink: 0, marginTop: '3px' }}
                      />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>

          {/* ── CERTIFICATIONS ── */}
          <motion.div
            {...fadeInUp}
            transition={stagger(0.4)}
            style={{ marginBottom: '36px' }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '16px',
              }}
            >
              <Award size={14} color="#5EE6A8" />
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  color: '#5EE6A8',
                  textTransform: 'uppercase',
                }}
              >
                CERTIFICATIONS
              </span>
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              {certifications.map((cert) => (
                <div
                  key={cert.id}
                  style={{
                    backgroundColor: '#111418',
                    border: '1px solid #252A30',
                    borderRadius: '6px',
                    padding: '16px 20px',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '10px',
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '14px',
                        fontWeight: 600,
                        color: '#F2F4F5',
                      }}
                    >
                      {cert.name}
                    </div>
                    <div
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '11px',
                        color: '#626A73',
                        marginTop: '2px',
                      }}
                    >
                      ISSUER: {cert.issuer.toUpperCase()} • YEAR: {cert.year}
                    </div>
                  </div>

                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '10px',
                      fontWeight: 600,
                      color: '#5EE6A8',
                      backgroundColor: '#17382A',
                      border: '1px solid #1F4D38',
                      padding: '4px 10px',
                      borderRadius: '3px',
                    }}
                  >
                    VERIFIED
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Interactive Profile Cards ── */}
          <motion.div
            {...fadeInUp}
            transition={stagger(0.44)}
            style={{ marginBottom: '28px' }}
          >
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '10px',
                color: '#626A73',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                marginBottom: '12px',
              }}
            >
              RECORD INSPECTOR / SELECT FIELD
            </div>
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

          {/* Mobile-only result panel */}
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
        </div>

        {/* ── RIGHT COLUMN — Result panel (desktop) ── */}
        <div className="me-result-desktop" style={{ width: '100%', position: 'sticky', top: '90px' }}>
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

      <style>{`
        @media (min-width: 768px) {
          .me-grid {
            grid-template-columns: minmax(0, 1.3fr) 280px !important;
            gap: 48px !important;
          }
          .me-result-mobile {
            display: none !important;
          }
        }
        @media (min-width: 1024px) {
          .me-grid {
            grid-template-columns: minmax(0, 1.4fr) 300px !important;
          }
        }
        @media (max-width: 767px) {
          .me-result-desktop {
            display: none !important;
          }
          .profile-cards {
            flex-direction: column !important;
          }
        }
      `}</style>
    </PageShell>
  );
}
