/**
 * SAGAR.DB — Contact Data
 *
 * Single source of truth for all contact information.
 * Only verified real contact info is stored.
 */

export interface ContactCardData {
  id: 'email' | 'linkedin' | 'github' | 'phone';
  type: 'EMAIL' | 'LINKEDIN' | 'GITHUB' | 'PHONE';
  label: string;
  value: string;
  href: string;
  actionLabel: string;
  query: string;
  resultHeading: string;
  resultDetails: Array<{ label: string; value: string }>;
  isExternal?: boolean;
}

export const contactData = {
  headerQuery: 'SELECT * FROM contact;',
  successMessage: '/ 001 row',
  recordLabel: 'RECORD / 001 — CONTACT',
  heading: "Let's connect.",
  subtitle: 'Open to opportunities, conversations and interesting problems.',
  email: 'sagarpatgar@gmail.com',
  phone: '+91 6360662439',
  linkedin: 'linkedin.com/in/sagar-patgar',
  github: 'github.com/sagar-202',

  defaultQueryResult: {
    query: 'SELECT * FROM contact;',
    name: 'CONTACT',
    details: [
      { label: 'email', value: 'sagarpatgar@gmail.com' },
      { label: 'linkedin', value: 'linkedin.com/in/sagar-patgar' },
      { label: 'github', value: 'github.com/sagar-202' },
      { label: 'availability', value: 'open to opportunities' },
    ],
  },
};

export const contactCards: ContactCardData[] = [
  {
    id: 'email',
    type: 'EMAIL',
    label: 'EMAIL',
    value: 'sagarpatgar@gmail.com',
    href: 'mailto:sagarpatgar@gmail.com',
    actionLabel: '[ EMAIL ME ]',
    query: 'SELECT email FROM contact;',
    resultHeading: 'EMAIL',
    resultDetails: [
      { label: 'address', value: 'sagarpatgar@gmail.com' },
      { label: 'action', value: 'Compose direct email' },
      { label: 'status', value: 'Active / preferred' },
    ],
  },
  {
    id: 'linkedin',
    type: 'LINKEDIN',
    label: 'LINKEDIN',
    value: 'linkedin.com/in/sagar-patgar',
    href: 'https://linkedin.com/in/sagar-patgar',
    actionLabel: '[ OPEN LINKEDIN ]',
    query: 'SELECT linkedin FROM contact;',
    resultHeading: 'LINKEDIN',
    resultDetails: [
      { label: 'profile', value: 'linkedin.com/in/sagar-patgar' },
      { label: 'network', value: 'Professional network' },
      { label: 'status', value: 'Open to connect' },
    ],
    isExternal: true,
  },
  {
    id: 'github',
    type: 'GITHUB',
    label: 'GITHUB',
    value: 'github.com/sagar-202',
    href: 'https://github.com/sagar-202',
    actionLabel: '[ OPEN GITHUB ]',
    query: 'SELECT github FROM contact;',
    resultHeading: 'GITHUB',
    resultDetails: [
      { label: 'profile', value: 'github.com/sagar-202' },
      { label: 'code', value: 'Open source & repositories' },
      { label: 'status', value: 'Active' },
    ],
    isExternal: true,
  },
  {
    id: 'phone',
    type: 'PHONE',
    label: 'PHONE',
    value: '+91 6360662439',
    href: 'tel:+916360662439',
    actionLabel: '[ CALL ]',
    query: 'SELECT phone FROM contact;',
    resultHeading: 'PHONE',
    resultDetails: [
      { label: 'number', value: '+91 6360662439' },
      { label: 'type', value: 'Mobile / Direct' },
      { label: 'status', value: 'Available' },
    ],
  },
];
