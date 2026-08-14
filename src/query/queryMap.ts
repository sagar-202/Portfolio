/**
 * SAGAR.DB Query Engine — Query Map
 *
 * Maps navigation button labels → CommandIds.
 * Used by QueryNavigation so buttons and terminal share the same engine.
 */

import type { CommandId } from './commands';

/** Nav button label → CommandId */
export const NAV_LABEL_TO_COMMAND: Record<string, CommandId> = {
  ME: 'ME',
  PROJECTS: 'PROJECTS',
  SKILLS: 'SKILLS',
  CONTACT: 'CONTACT',
};

/** Route pathname → CommandId (for marking active nav button) */
export const ROUTE_TO_COMMAND: Record<string, CommandId> = {
  '/': 'HOME',
  '/me': 'ME',
  '/projects': 'PROJECTS',
  '/skills': 'SKILLS',
  '/contact': 'CONTACT',
};
