/**
 * ProjectsPage — Phase 2 placeholder
 * Route: /projects
 * Query: SELECT * FROM projects;
 */

import { useEffect } from 'react';
import { PageShell } from '../components/PageShell';
import { QueryDisplay } from '../components/QueryDisplay';
import { QueryExecution } from '../components/QueryExecution';
import { QueryNavigation } from '../components/QueryNavigation';
import { useQueryContext } from '../context/QueryContext';
import { COMMANDS } from '../query/commands';
import { motion } from 'framer-motion';

export function ProjectsPage() {
  const { setActiveCommand } = useQueryContext();

  useEffect(() => {
    setActiveCommand('PROJECTS');
  }, [setActiveCommand]);

  const cmd = COMMANDS.PROJECTS;

  return (
    <PageShell>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
      >
        {/* Query block */}
        <div style={{ marginBottom: '4px' }}>
          <QueryDisplay query={cmd.query} />
        </div>
        <div style={{ marginBottom: '28px' }}>
          <QueryExecution rowCount="/ 003 rows" />
        </div>

        {/* Record label */}
        <div style={{ marginBottom: '20px' }}>
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
            TABLE / projects — 003 rows
          </span>
        </div>

        <h1
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(36px, 5.5vw, 60px)',
            fontWeight: 800,
            color: '#F2F4F5',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            margin: 0,
            marginBottom: '20px',
          }}
        >
          Projects.
        </h1>

        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '14px',
            color: '#626A73',
            margin: 0,
            marginBottom: '40px',
            letterSpacing: '0.04em',
          }}
        >
          — Project records coming in Phase 3
        </p>

        <QueryNavigation />
      </motion.div>
    </PageShell>
  );
}
