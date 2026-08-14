/**
 * ContactPage — /contact
 * Phase 6: Contact records & messaging page.
 *
 * Features:
 * - 4 database-style contact cards (Email, LinkedIn, GitHub, Phone)
 * - Mailto-based "SEND MESSAGE" composer section
 * - Clear "RESUME — COMING SOON" indicator
 * - Selected card updates Query Result panel dynamically with 260ms execution state
 * - Desktop two-column layout + mobile stacked layout
 */

import { useEffect, useState, useMemo, useCallback, useRef, type FormEvent } from 'react';
import { motion, AnimatePresence, type Easing } from 'framer-motion';
import { Mail, ExternalLink, Phone, FileText } from 'lucide-react';

import { PageShell } from '../components/PageShell';
import { QueryDisplay } from '../components/QueryDisplay';
import { QueryExecution } from '../components/QueryExecution';
import { QueryNavigation } from '../components/QueryNavigation';
import { QueryResult } from '../components/QueryResult';
import { ContactCard } from '../components/ContactCard';
import { useQueryContext } from '../context/QueryContext';
import { contactData, contactCards } from '../data/contact';
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

export function ContactPage() {
  const { setActiveCommand } = useQueryContext();

  const [selectedCardId, setSelectedCardId] = useState<string | 'default'>('default');
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Form state for compose email
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [messageBody, setMessageBody] = useState('');

  // Sync with global query engine
  useEffect(() => {
    setActiveCommand('CONTACT');
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [setActiveCommand]);

  const handleSelectCard = useCallback(
    (id: string) => {
      if (id === selectedCardId && !isExecuting) return;

      if (prefersReducedMotion) {
        setSelectedCardId(id);
        return;
      }

      setSelectedCardId(id);
      setIsExecuting(true);

      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setIsExecuting(false);
      }, CARD_EXEC_MS);
    },
    [selectedCardId, isExecuting]
  );

  const selectedCard = useMemo(() => {
    if (selectedCardId === 'default') return null;
    return contactCards.find((c) => c.id === selectedCardId) || null;
  }, [selectedCardId]);

  const handleComposeSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Portfolio Inquiry from ${senderName || 'Visitor'}`
    );
    const body = encodeURIComponent(
      `Name: ${senderName}\nEmail: ${senderEmail}\n\nMessage:\n${messageBody}`
    );
    window.location.href = `mailto:${contactData.email}?subject=${subject}&body=${body}`;
  };

  const cmd = COMMANDS.CONTACT;

  // Active query result configuration
  const activeResult = useMemo(() => {
    if (!selectedCard) {
      return {
        query: contactData.defaultQueryResult.query,
        name: contactData.defaultQueryResult.name,
        details: contactData.defaultQueryResult.details,
        action: null,
      };
    }

    return {
      query: selectedCard.query,
      name: selectedCard.resultHeading,
      details: selectedCard.resultDetails,
      action: (
        <a
          href={selectedCard.href}
          target={selectedCard.isExternal ? '_blank' : undefined}
          rel={selectedCard.isExternal ? 'noopener noreferrer' : undefined}
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
          {selectedCard.id === 'phone' ? (
            <Phone size={12} />
          ) : (
            <ExternalLink size={12} />
          )}
          {selectedCard.actionLabel}
        </a>
      ),
    };
  }, [selectedCard]);

  return (
    <PageShell>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr)',
          gap: '40px',
          alignItems: 'start',
        }}
        className="contact-grid"
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
            <QueryExecution rowCount={contactData.successMessage} />
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
              {contactData.recordLabel}
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
            {contactData.heading}
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
              marginBottom: '32px',
              maxWidth: '520px',
            }}
          >
            {contactData.subtitle}
          </motion.p>

          {/* Contact Cards Grid */}
          <motion.div
            {...fadeInUp}
            transition={stagger(0.25)}
            style={{ marginBottom: '36px' }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                gap: '14px',
              }}
              role="group"
              aria-label="Contact records"
            >
              {contactCards.map((card) => (
                <ContactCard
                  key={card.id}
                  card={card}
                  isSelected={selectedCardId === card.id}
                  isExecuting={isExecuting && selectedCardId === card.id}
                  onSelect={() => handleSelectCard(card.id)}
                />
              ))}
            </div>
          </motion.div>

          {/* Mobile Query Result Panel (below cards) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCardId + '-mobile'}
              initial={prefersReducedMotion ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={prefersReducedMotion ? {} : { opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="contact-result-mobile"
              style={{ marginBottom: '36px' }}
            >
              <QueryResult
                query={activeResult.query}
                name={activeResult.name}
                details={activeResult.details}
                isExecuting={isExecuting}
                action={activeResult.action}
              />
            </motion.div>
          </AnimatePresence>

          {/* ── SEND MESSAGE SECTION ── */}
          <motion.div
            {...fadeInUp}
            transition={stagger(0.3)}
            style={{
              backgroundColor: '#111418',
              border: '1px solid #252A30',
              borderRadius: '6px',
              padding: '24px',
              marginBottom: '32px',
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
              <Mail size={14} color="#5EE6A8" />
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  color: '#F2F4F5',
                  textTransform: 'uppercase',
                }}
              >
                SEND MESSAGE
              </span>
            </div>

            <form onSubmit={handleComposeSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
                <div>
                  <label
                    htmlFor="senderName"
                    style={{
                      display: 'block',
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '10px',
                      color: '#626A73',
                      marginBottom: '6px',
                    }}
                  >
                    YOUR NAME
                  </label>
                  <input
                    id="senderName"
                    type="text"
                    required
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="e.g. Alex Morgan"
                    style={{
                      width: '100%',
                      backgroundColor: '#0B0D0F',
                      border: '1px solid #252A30',
                      borderRadius: '4px',
                      padding: '8px 12px',
                      color: '#F2F4F5',
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '13px',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="senderEmail"
                    style={{
                      display: 'block',
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '10px',
                      color: '#626A73',
                      marginBottom: '6px',
                    }}
                  >
                    YOUR EMAIL
                  </label>
                  <input
                    id="senderEmail"
                    type="email"
                    required
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    placeholder="e.g. alex@example.com"
                    style={{
                      width: '100%',
                      backgroundColor: '#0B0D0F',
                      border: '1px solid #252A30',
                      borderRadius: '4px',
                      padding: '8px 12px',
                      color: '#F2F4F5',
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '13px',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="messageBody"
                  style={{
                    display: 'block',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '10px',
                    color: '#626A73',
                    marginBottom: '6px',
                  }}
                >
                  MESSAGE
                </label>
                <textarea
                  id="messageBody"
                  required
                  rows={3}
                  value={messageBody}
                  onChange={(e) => setMessageBody(e.target.value)}
                  placeholder="Write your message here..."
                  style={{
                    width: '100%',
                    backgroundColor: '#0B0D0F',
                    border: '1px solid #252A30',
                    borderRadius: '4px',
                    padding: '8px 12px',
                    color: '#F2F4F5',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '13px',
                    outline: 'none',
                    resize: 'vertical',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div>
                <button
                  type="submit"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    padding: '9px 18px',
                    border: '1px solid #5EE6A8',
                    borderRadius: '3px',
                    backgroundColor: '#17382A',
                    color: '#5EE6A8',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    outline: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                  onFocus={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.boxShadow =
                      '0 0 0 2px rgba(94,230,168,0.4)';
                  }}
                  onBlur={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = 'none';
                  }}
                >
                  <Mail size={12} />
                  [ COMPOSE EMAIL ]
                </button>
              </div>
            </form>
          </motion.div>

          {/* Resume button (honest indicator) */}
          <motion.div
            {...fadeInUp}
            transition={stagger(0.35)}
            style={{ marginBottom: '36px' }}
          >
            <button
              id="btn-resume-contact"
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
              <FileText size={12} strokeWidth={1.5} aria-hidden="true" />
              [ RESUME — COMING SOON ]
            </button>
          </motion.div>

          {/* Navigation bar */}
          <motion.div {...fadeInUp} transition={stagger(0.4)}>
            <QueryNavigation />
          </motion.div>
        </div>

        {/* ── RIGHT COLUMN — Result Panel (Desktop) ── */}
        <div className="contact-result-desktop" style={{ width: '100%', position: 'sticky', top: '90px' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCardId}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? {} : { opacity: 0, y: -4 }}
              transition={{ duration: 0.22, ease: EASE_OUT }}
            >
              <QueryResult
                query={activeResult.query}
                name={activeResult.name}
                details={activeResult.details}
                isExecuting={isExecuting}
                action={activeResult.action}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Responsive layout CSS */}
      <style>{`
        @media (min-width: 768px) {
          .contact-grid {
            grid-template-columns: minmax(0, 1.4fr) 300px !important;
            gap: 40px !important;
          }
          .contact-result-mobile {
            display: none !important;
          }
        }
        @media (min-width: 1024px) {
          .contact-grid {
            grid-template-columns: minmax(0, 1.5fr) 320px !important;
            gap: 48px !important;
          }
        }
        @media (max-width: 767px) {
          .contact-result-desktop {
            display: none !important;
          }
        }
      `}</style>
    </PageShell>
  );
}
