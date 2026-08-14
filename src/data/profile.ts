/**
 * SAGAR.DB — Profile Data
 *
 * Single source of truth for all page content.
 * Realistic experience, verified certifications, and education metrics.
 */

export interface DetailLine {
  label: string;
  value: string;
}

export type CardId = 'education' | 'focus' | 'targetRoles';

export interface ProfileCard {
  id: CardId;
  label: string;
  summary: string;
  query: string;
  resultHeading: string;
  resultDetails: DetailLine[];
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  period: string;
  highlights: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  year: string;
  verifyUrl?: string;
}

export const profile = {
  name: 'Sagar Dayanand Patgar',
  title: 'Computer Science Engineer',
  tags: ['DATA', 'AI', 'SOFTWARE'] as const,
  bio: 'Computer Science Engineer focused on Data Analytics and AI/ML. I build practical data-driven applications using Python, SQL and modern development tools.',

  queries: {
    home: 'SELECT * FROM sagar;',
    profile: 'SELECT profile FROM sagar;',
  },

  queryResult: {
    name: 'Sagar Dayanand Patgar',
    title: 'Computer Science Engineer',
    details: [
      { label: 'degree', value: 'B.E. Computer Science Engineering (CGPA: 8.77)' },
      { label: 'focus', value: 'Data Analytics' },
      { label: 'exploring', value: 'AI / ML' },
      { label: 'target roles', value: 'Data Analyst / Python Developer / Software Engineer' },
    ] as const,
  },
} as const;

export const meProfile = {
  heading: 'Sagar, in context.',
  subtitle: 'Computer Science Engineer',
  accentLine: 'DATA ANALYTICS • AI / ML',
  bio: 'Computer Science Engineer focused on Data Analytics and AI/ML. I build practical data-driven applications using Python, SQL and modern development tools.',
  query: 'SELECT profile FROM sagar;',
  successMessage: '/ 001 row',
  recordLabel: 'RECORD / 001 — PROFILE',
} as const;

export const profileSnapshot = {
  education: 'B.E. Computer Science Engineering',
  cgpa: '8.77 CGPA',
  institution: 'SDM Institute of Technology (VTU)',
  primaryFocus: 'Data Analytics',
  secondaryFocus: 'AI / ML',
  projectsCount: '6+ Projects',
  coreStack: 'Python • SQL • Pandas • FastAPI',
  targetRoles: 'Data Analyst • Python Developer • Software Engineer',
} as const;

export const experiences: Experience[] = [
  {
    id: 'kodnest-internship',
    title: 'AI / Machine Learning Intern',
    company: 'KodNest',
    period: 'Internship',
    highlights: [
      'Worked with Python, SQL and structured data analysis workflows.',
      'Applied data preprocessing, exploratory analysis and visualization techniques.',
      'Built practical applications using AI-assisted development workflows.',
    ],
  },
];

export const certifications: Certification[] = [
  {
    id: 'oci-ai-2025',
    name: 'Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate',
    issuer: 'Oracle',
    year: '2025',
  },
  {
    id: 'oracle-genai-pro',
    name: 'Oracle Generative AI Professional',
    issuer: 'Oracle',
    year: '2025',
  },
];

export const profileCards: ProfileCard[] = [
  {
    id: 'education',
    label: 'EDUCATION',
    summary: 'B.E. COMPUTER SCIENCE ENGINEERING',
    query: 'SELECT * FROM education;',
    resultHeading: 'B.E. COMPUTER SCIENCE ENGINEERING',
    resultDetails: [
      { label: 'cgpa', value: '8.77 CGPA' },
      { label: 'institution', value: 'SDM Institute of Technology' },
      { label: 'university', value: 'Visvesvaraya Technological University' },
      { label: 'degree', value: 'Undergraduate Engineering' },
    ],
  },
  {
    id: 'focus',
    label: 'PRIMARY FOCUS',
    summary: 'DATA ANALYTICS • AI / ML',
    query: "SELECT * FROM skills WHERE focus = 'primary';",
    resultHeading: 'DATA ANALYTICS • AI / ML',
    resultDetails: [
      { label: 'primary', value: 'Data Analytics' },
      { label: 'secondary', value: 'AI / ML' },
      { label: 'core stack', value: 'Python • SQL • Pandas • FastAPI' },
    ],
  },
  {
    id: 'targetRoles',
    label: 'TARGET ROLES',
    summary: 'DATA ANALYST • PYTHON DEVELOPER',
    query: 'SELECT * FROM career WHERE target = true;',
    resultHeading: 'DATA ANALYST • PYTHON DEVELOPER • SOFTWARE ENGINEER',
    resultDetails: [
      { label: 'roles', value: 'Data Analyst • Python Developer • Software Engineer' },
      { label: 'domains', value: 'Data Analytics • AI/ML • Web Applications' },
    ],
  },
];

export type Profile = typeof profile;
