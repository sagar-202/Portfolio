/**
 * SAGAR.DB — Projects Data
 *
 * Single source of truth for all project records.
 * Realistic projects with no fake metrics or invented GitHub links.
 */

export type FilterCategory = 'ALL' | 'DATA' | 'AI / ML' | 'SOFTWARE' | 'TOOLS';

export interface Project {
  id: string;
  name: string;
  category: string;
  filterCategory: 'DATA' | 'AI / ML' | 'SOFTWARE' | 'TOOLS';
  description: string;
  shortDescription: string;
  technologies: string[];
  githubUrl?: string;
  createdAt: string; // ISO date for sorting
}

export const projectsData: Project[] = [
  {
    id: 'upi-analysis',
    name: 'UPI TRANSACTION ANALYSIS',
    category: 'Data Analytics',
    filterCategory: 'DATA',
    description:
      'Analyzed UPI transaction data using Python, Pandas, NumPy and visualization techniques to identify transaction patterns, trends and useful insights.',
    shortDescription:
      'Analyzed UPI transaction data using Python, Pandas, NumPy and visualization techniques to identify transaction patterns and trends.',
    technologies: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'SQL'],
    createdAt: '2024-04-15',
  },
  {
    id: 'ai-fitness-trainer',
    name: 'AI FITNESS TRAINER',
    category: 'AI / Computer Vision',
    filterCategory: 'AI / ML',
    description:
      'Computer-vision based fitness application that uses webcam pose estimation to detect exercises and count repetitions.',
    shortDescription:
      'Computer-vision based fitness application that uses webcam pose estimation to detect exercises and count repetitions.',
    technologies: ['Python', 'OpenCV', 'MediaPipe', 'Flask', 'Computer Vision'],
    createdAt: '2024-03-20',
  },
  {
    id: 'rental-management',
    name: 'HOUSE RENTAL MANAGEMENT SYSTEM',
    category: 'Software Development',
    filterCategory: 'SOFTWARE',
    description:
      'Web-based application for managing rental properties, listings and related information with a structured database-backed workflow.',
    shortDescription:
      'Web-based application for managing rental properties, listings and related information with a structured database workflow.',
    technologies: ['Python', 'Flask', 'HTML', 'CSS', 'JavaScript', 'MySQL'],
    createdAt: '2023-12-10',
  },
  {
    id: 'querysense-ai',
    name: 'QUERYSENSE AI',
    category: 'Developer Tool / AI',
    filterCategory: 'TOOLS',
    description:
      'An AI-assisted SQL learning and optimization tool designed to help users understand SQL queries, identify issues and improve query quality.',
    shortDescription:
      'AI-assisted SQL learning and optimization tool designed to help users understand and improve query quality.',
    technologies: ['Python', 'SQL', 'AI', 'FastAPI', 'React'],
    createdAt: '2024-05-10',
  },
  {
    id: 'ai-job-search',
    name: 'AI JOB SEARCH & RESUME ANALYZER',
    category: 'AI / Career Tool',
    filterCategory: 'AI / ML',
    description:
      'Application that analyzes resumes against job descriptions and helps users identify relevant opportunities and generate application material.',
    shortDescription:
      'Application that analyzes resumes against job descriptions to identify opportunities and generate application material.',
    technologies: ['Python', 'FastAPI', 'React', 'Gemini API', 'Job APIs'],
    createdAt: '2024-06-01',
  },
  {
    id: 'vibebank-assistant',
    name: 'VIBEBANK ASSISTANT',
    category: 'AI / Application',
    filterCategory: 'AI / ML',
    description:
      'Context-aware banking assistant prototype designed to provide conversational assistance around banking-related information.',
    shortDescription:
      'Context-aware banking assistant prototype designed to provide conversational assistance around banking information.',
    technologies: ['Python', 'FastAPI', 'LLM', 'REST API'],
    createdAt: '2024-02-05',
  },
];
