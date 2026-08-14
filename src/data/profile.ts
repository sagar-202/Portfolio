/**
 * SAGAR.DB — Profile Data
 *
 * This is the single source of truth for homepage content.
 * No invented experience, companies, achievements, or projects.
 */

export const profile = {
  name: 'Sagar Dayanand Patgar',
  title: 'Computer Science Engineer',
  tags: ['DATA', 'AI', 'SOFTWARE'] as const,
  bio: 'I build practical applications and data-driven solutions.',

  // SQL metaphor strings
  queries: {
    home: 'SELECT * FROM sagar;',
    profile: 'SELECT profile FROM sagar;',
  },

  // Query result content for the right panel
  queryResult: {
    name: 'Sagar Dayanand Patgar',
    title: 'Computer Science Engineer',
    details: [
      { label: 'focus', value: 'Data Analytics' },
      { label: 'exploring', value: 'AI / ML' },
      { label: 'target roles', value: 'Data Analyst / Software Engineer' },
    ] as const,
  },
} as const;

export type Profile = typeof profile;

