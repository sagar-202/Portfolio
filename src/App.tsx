import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Home } from './pages/Home';
import './index.css';

/** Init sequence lines shown during the loading screen */
interface InitLine {
  text: string;
  color: string;
  delay: number;
  isQuery?: boolean;
}

const INIT_LINES: InitLine[] = [
  { text: 'Initializing portfolio...', color: '#9AA2AA', delay: 0 },
  { text: '✓ Database connection established.', color: '#5EE6A8', delay: 280 },
  { text: '> SELECT * FROM sagar;', color: '#5EE6A8', isQuery: true, delay: 560 },
  { text: '✓ Query executed successfully.', color: '#5EE6A8', delay: 860 },
];

const TOTAL_INIT_MS = 1300;

// Detect reduced motion preference
const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * InitScreen — shown for ~1.3s on first load.
 * Skipped entirely if prefers-reduced-motion is set.
 */
function InitScreen() {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    INIT_LINES.forEach((line, i) => {
      const t = setTimeout(() => {
        setVisibleLines((prev) => [...prev, i]);
      }, line.delay);
      timers.push(t);
    });

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#0B0D0F',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
      }}
      aria-live="polite"
      aria-label="Loading portfolio"
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          minWidth: '320px',
          padding: '0 24px',
        }}
      >
        {/* Logo */}
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.16em',
            color: '#5EE6A8',
            marginBottom: '20px',
            opacity: 0.6,
          }}
        >
          SAGAR.DB
        </div>

        {/* Init lines */}
        {INIT_LINES.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: visibleLines.includes(i) ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '12px',
              fontWeight: line.isQuery ? 500 : 400,
              color: line.color,
              lineHeight: 1.6,
            }}
          >
            {line.text}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/**
 * App — root component.
 * Shows InitScreen for TOTAL_INIT_MS, then fades in Home.
 * If prefers-reduced-motion, skips straight to Home.
 */
function App() {
  const [showInit, setShowInit] = useState(!prefersReducedMotion);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const t = setTimeout(() => {
      setShowInit(false);
    }, TOTAL_INIT_MS);

    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {showInit ? (
          <motion.div
            key="init"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <InitScreen />
          </motion.div>
        ) : (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <Home />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
