/**
 * SAGAR.DB Query Engine — Parser
 *
 * Parses raw terminal input strings into CommandIds.
 * Returns null commandId + error message on unknown input.
 */

import type { CommandId } from './commands';

export interface ParseResult {
  commandId: CommandId | null;
  error: string | null;
}

/**
 * Alias table: normalized input → CommandId
 * All entries are lowercase.
 */
const ALIAS_MAP: Record<string, CommandId> = {
  // HOME
  home: 'HOME',
  '/': 'HOME',
  index: 'HOME',

  // ME / PROFILE
  me: 'ME',
  about: 'ME',
  profile: 'ME',
  who: 'ME',

  // PROJECTS
  projects: 'PROJECTS',
  project: 'PROJECTS',
  work: 'PROJECTS',
  portfolio: 'PROJECTS',

  // SKILLS
  skills: 'SKILLS',
  skill: 'SKILLS',
  stack: 'SKILLS',
  tech: 'SKILLS',

  // CONTACT
  contact: 'CONTACT',
  email: 'CONTACT',
  reach: 'CONTACT',
  hire: 'CONTACT',

  // HELP
  help: 'HELP',
  '?': 'HELP',
  '--help': 'HELP',
  '-h': 'HELP',
  man: 'HELP',
  ls: 'HELP',

  // CLEAR
  clear: 'CLEAR',
  cls: 'CLEAR',
  reset: 'CLEAR',

  // RESUME
  resume: 'RESUME',
  cv: 'RESUME',

  // GITHUB
  github: 'GITHUB',
  git: 'GITHUB',

  // LINKEDIN
  linkedin: 'LINKEDIN',
};

/**
 * Parse raw terminal input into a CommandId.
 * Strips leading/trailing whitespace and lowercases.
 */
export function parseTerminalInput(raw: string): ParseResult {
  const normalized = raw.trim().toLowerCase();

  if (!normalized) {
    return { commandId: null, error: null }; // empty input — no-op
  }

  const commandId = ALIAS_MAP[normalized] ?? null;

  if (commandId === null) {
    return {
      commandId: null,
      error: `Command not found: ${raw.trim()}\nType "help" to see available commands.`,
    };
  }

  return { commandId, error: null };
}
