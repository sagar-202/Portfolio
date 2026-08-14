/**
 * SAGAR.DB Query Engine — Commands
 *
 * Single source of truth for all navigable commands.
 * No backend. No real SQL. SQL is an interaction metaphor.
 */

export type CommandId =
  | 'HOME'
  | 'ME'
  | 'PROJECTS'
  | 'SKILLS'
  | 'CONTACT'
  | 'HELP'
  | 'CLEAR'
  | 'RESUME';

export interface Command {
  id: CommandId;
  /** The SQL string displayed in the query area */
  query: string;
  /** Route to navigate to. null = no navigation (HELP, CLEAR, RESUME) */
  route: string | null;
  /** Success message shown after execution */
  successMessage: string;
  /** Short description for the help output */
  description: string;
}

export const COMMANDS: Record<CommandId, Command> = {
  HOME: {
    id: 'HOME',
    query: 'SELECT * FROM sagar;',
    route: '/',
    successMessage: '✓ Query executed successfully. / 001 row',
    description: 'Return to homepage',
  },
  ME: {
    id: 'ME',
    query: 'SELECT profile FROM sagar;',
    route: '/me',
    successMessage: '✓ Query executed successfully. / 001 row',
    description: 'View profile record',
  },
  PROJECTS: {
    id: 'PROJECTS',
    query: 'SELECT * FROM projects;',
    route: '/projects',
    successMessage: '✓ Query executed successfully. / 006 rows',
    description: 'List all projects',
  },
  SKILLS: {
    id: 'SKILLS',
    query: 'SELECT * FROM skills;',
    route: '/skills',
    successMessage: '✓ Query executed successfully. / 018 rows',
    description: 'View skills index',
  },
  CONTACT: {
    id: 'CONTACT',
    query: 'SELECT contact FROM sagar;',
    route: '/contact',
    successMessage: '✓ Query executed successfully. / 001 record',
    description: 'Open contact record',
  },
  HELP: {
    id: 'HELP',
    query: 'SELECT * FROM commands;',
    route: null,
    successMessage: '✓ Query executed successfully.',
    description: 'Show available commands',
  },
  CLEAR: {
    id: 'CLEAR',
    query: '',
    route: null,
    successMessage: '',
    description: 'Clear terminal output',
  },
  RESUME: {
    id: 'RESUME',
    query: 'SELECT resume FROM sagar;',
    route: null,
    successMessage: '✓ Resume record loaded.',
    description: 'Open resume (coming soon)',
  },
};

/** Navigable commands — those that have a route */
export const NAV_COMMANDS: CommandId[] = ['HOME', 'ME', 'PROJECTS', 'SKILLS', 'CONTACT'];

/** Help output lines */
export const HELP_LINES: Array<{ cmd: string; desc: string }> = [
  { cmd: 'home', desc: 'Return to homepage' },
  { cmd: 'me / about', desc: 'View profile record' },
  { cmd: 'projects', desc: 'List all projects' },
  { cmd: 'skills', desc: 'View skills index' },
  { cmd: 'contact', desc: 'Open contact record' },
  { cmd: 'resume', desc: 'Open resume (coming soon)' },
  { cmd: 'help', desc: 'Show this help' },
  { cmd: 'clear', desc: 'Clear terminal' },
];
