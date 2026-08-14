/**
 * SAGAR.DB — App Root
 *
 * Phase 2: BrowserRouter + QueryProvider + Routes.
 * Init sequence preserved from Phase 1.
 * QueryProvider must be inside BrowserRouter (useNavigate requires it).
 */

import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import { QueryProvider } from './context/QueryContext';
import { Home } from './pages/Home';
import { MePage } from './pages/MePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { SkillsPage } from './pages/SkillsPage';
import { ContactPage } from './pages/ContactPage';

import './index.css';

// ─── Init Sequence ────────────────────────────────────────────────────────────

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

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

// ─── Router Content ───────────────────────────────────────────────────────────

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

/**
 * AppRoutes — rendered inside BrowserRouter + QueryProvider.
 * QueryProvider must be here (not outside BrowserRouter) because
 * useQuery calls useNavigate which needs the Router context.
 */
function AppRoutes() {
  return (
    <QueryProvider>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/me" element={<MePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:id" element={<ProjectsPage />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        {/* Fallback — redirect unknown routes to home */}
        <Route path="*" element={<Home />} />
      </Routes>
    </QueryProvider>
  );
}

// ─── App Root ─────────────────────────────────────────────────────────────────

function App() {
  const [showInit, setShowInit] = useState(!prefersReducedMotion);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const t = setTimeout(() => setShowInit(false), TOTAL_INIT_MS);
    return () => clearTimeout(t);
  }, []);

  return (
    <BrowserRouter>
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
            key="app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <AppRoutes />
          </motion.div>
        )}
      </AnimatePresence>
    </BrowserRouter>
  );
}

export default App;
