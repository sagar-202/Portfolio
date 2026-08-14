/**
 * SAGAR.DB — Profile Data
 *
 * Single source of truth for all page content.
 * No invented experience, companies, achievements, or projects.
 */

// ─── Shared detail-line type ──────────────────────────────────────────────────

export interface DetailLine {
  label: string;
  value: string;
}

// ─── Profile card definition ──────────────────────────────────────────────────

export type CardId = 'education' | 'focus' | 'targetRoles';

export interface ProfileCard {
  id: CardId;
  /** Short label shown on the card face */
  label: string;
  /** One-line summary shown under the label */
  summary: string;
  /** SQL query shown in the result panel when this card is selected */
  query: string;
  /** Bold heading in the result panel */
  resultHeading: string;
  /** Arrow-lines in the result panel */
  resultDetails: DetailLine[];
}

// ─── Home page data ───────────────────────────────────────────────────────────

export const profile = {
  name: 'Sagar Dayanand Patgar',
  title: 'Computer Science Engineer',
  tags: ['DATA', 'AI', 'SOFTWARE'] as const,
  bio: 'I build practical applications and data-driven solutions.',

  queries: {
    home: 'SELECT * FROM sagar;',
    profile: 'SELECT profile FROM sagar;',
  },

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

// ─── ME / Profile page data ───────────────────────────────────────────────────

export const meProfile = {
  heading: 'Sagar, in context.',
  subtitle: 'Computer Science Engineer',
  accentLine: 'DATA ANALYTICS • AI / ML',
  bio: 'I build practical applications and data-driven solutions using Python, SQL and modern development tools.',
  query: 'SELECT profile FROM sagar;',
  successMessage: '/ 001 row',
  recordLabel: 'RECORD / 001 — PROFILE',
} as const;

// ─── Profile cards ────────────────────────────────────────────────────────────

export const profileCards: ProfileCard[] = [
  {
    id: 'education',
    label: 'EDUCATION',
    summary: 'B.E. COMPUTER SCIENCE ENGINEERING',
    query: 'SELECT * FROM education;',
    resultHeading: 'B.E. COMPUTER SCIENCE ENGINEERING',
    resultDetails: [
      { label: 'institution', value: 'SDM Institute of Technology' },
      { label: 'university', value: 'Visvesvaraya Technological University' },
      { label: 'status', value: 'undergraduate engineering' },
    ],
  },
  {
    id: 'focus',
    label: 'CURRENT FOCUS',
    summary: 'DATA ANALYTICS • AI / ML',
    query: "SELECT * FROM skills WHERE focus = 'current';",
    resultHeading: 'DATA ANALYTICS • AI / ML',
    resultDetails: [
      { label: 'primary', value: 'Data Analytics' },
      { label: 'exploring', value: 'AI / ML' },
      { label: 'tools', value: 'Python • SQL • modern development' },
    ],
  },
  {
    id: 'targetRoles',
    label: 'TARGET ROLES',
    summary: 'DATA ANALYST • SOFTWARE ENGINEER',
    query: 'SELECT * FROM career WHERE target = true;',
    resultHeading: 'DATA ANALYST • SOFTWARE ENGINEER',
    resultDetails: [
      { label: 'preferred', value: 'Data Analytics • AI/ML • Software' },
    ],
  },
];

export type Profile = typeof profile;
