/**
 * SAGAR.DB — Projects Data
 *
 * Single source of truth for all project records.
 * Realistic projects with no fake metrics or invented links.
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
  isFeatured?: boolean;
  problem?: string;
  approach?: string;
  keyFeatures?: string[];
  githubUrl?: string;
  demoUrl?: string;
  createdAt: string; // ISO date for sorting
}

export const projectsData: Project[] = [
  {
    id: 'upi-analysis',
    name: 'UPI TRANSACTION ANALYSIS',
    category: 'Data Analytics',
    filterCategory: 'DATA',
    isFeatured: true,
    description:
      'Analyzed UPI transaction datasets using Python, Pandas, NumPy and data visualization libraries to extract transaction trends, peak volume patterns, and analytical insights.',
    shortDescription:
      'Analyzed UPI transaction data using Python, Pandas, NumPy and visualization techniques to identify patterns and trends.',
    problem:
      'Raw financial transaction records often lack structured visual breakdowns, making it difficult to detect volume spikes, spending habits, or anomaly indicators.',
    approach:
      'Engineered data cleaning pipelines in Pandas, performed exploratory data analysis (EDA), and built intuitive visualization dashboards using Seaborn and Matplotlib.',
    keyFeatures: [
      'Exploratory data analysis of transaction volumes & category splits',
      'Time-series distribution plots for peak usage hours',
      'Statistical summaries of high-value vs low-value transactions',
      'SQL-inspired aggregation queries for dataset filtering',
    ],
    technologies: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'SQL'],
    createdAt: '2024-04-15',
  },
  {
    id: 'ai-job-search',
    name: 'AI JOB SEARCH & RESUME ANALYZER',
    category: 'AI / Career Tool',
    filterCategory: 'AI / ML',
    isFeatured: true,
    description:
      'AI-assisted application that compares resume content against targeted job descriptions using LLMs to highlight skill gaps and assist with application customization.',
    shortDescription:
      'Application that analyzes resumes against job descriptions to identify opportunities and generate application material.',
    problem:
      'Job seekers spend significant time manually tailoring resumes for individual job descriptions without clear feedback on skill match percentages.',
    approach:
      'Built a FastAPI backend integrating Google Gemini API to parse resume text, extract key technical keywords, and match qualifications against job postings.',
    keyFeatures: [
      'Automated resume vs job description keyword alignment',
      'Skill gap detection and keyword frequency analysis',
      'LLM-assisted suggestion generator for bullet point refinement',
      'React single-page user interface for document processing',
    ],
    technologies: ['Python', 'FastAPI', 'React', 'Gemini API', 'Job APIs'],
    createdAt: '2024-06-01',
  },
  {
    id: 'querysense-ai',
    name: 'QUERYSENSE AI',
    category: 'Developer Tool / AI',
    filterCategory: 'TOOLS',
    isFeatured: true,
    description:
      'Interactive SQL learning and optimization assistant designed to help developers analyze SQL queries, explain execution steps, and catch syntax or indexing issues.',
    shortDescription:
      'AI-assisted SQL learning and optimization tool designed to help users understand and improve query quality.',
    problem:
      'Engineers and students frequently encounter slow or syntactically ambiguous SQL queries without immediate diagnostic explanation.',
    approach:
      'Created a dual-engine interface combining regex-based SQL syntax parsing with AI prompt orchestration to explain joins, indexing opportunities, and clause order.',
    keyFeatures: [
      'Instant query syntax breakdown & execution step explanation',
      'Optimization tips for JOINs, WHERE clauses, and indexes',
      'Interactive SQL practice terminal with sample schema',
      'FastAPI + React asynchronous architecture',
    ],
    technologies: ['Python', 'SQL', 'AI', 'FastAPI', 'React'],
    createdAt: '2024-05-10',
  },
  {
    id: 'ai-fitness-trainer',
    name: 'AI FITNESS TRAINER',
    category: 'AI / Computer Vision',
    filterCategory: 'AI / ML',
    isFeatured: false,
    description:
      'Computer-vision application using webcam pose estimation to detect body landmarks, assess movement angles, and count exercise repetitions in real time.',
    shortDescription:
      'Computer-vision based fitness application that uses webcam pose estimation to detect exercises and count repetitions.',
    problem:
      'Home workout enthusiasts often struggle with proper exercise form and manual repetition counting during workout sessions.',
    approach:
      'Integrated MediaPipe Pose detection with OpenCV frame processing to calculate joint angles dynamically and determine repetition completion states.',
    keyFeatures: [
      'Real-time webcam body joint pose landmark tracking',
      'Dynamic angle calculation for elbows, knees, and hips',
      'Automated repetition counter with form thresholding',
      'Flask backend web interface wrapper',
    ],
    technologies: ['Python', 'OpenCV', 'MediaPipe', 'Flask', 'Computer Vision'],
    createdAt: '2024-03-20',
  },
  {
    id: 'rental-management',
    name: 'HOUSE RENTAL MANAGEMENT SYSTEM',
    category: 'Software Development',
    filterCategory: 'SOFTWARE',
    isFeatured: false,
    description:
      'Full-stack web application for managing rental property listings, tenant information, and maintenance status through a relational MySQL database.',
    shortDescription:
      'Web-based application for managing rental properties, listings and related information with a structured database workflow.',
    problem:
      'Property owners need a clean structured interface to manage tenant leases, payment statuses, and vacant property records.',
    approach:
      'Designed a relational MySQL schema with normalization rules and built a Flask MVC backend with HTML/CSS/JS frontend views.',
    keyFeatures: [
      'Property & tenant CRUD management workflows',
      'Relational database schema with MySQL foreign keys',
      'Filterable rental listing view for prospective tenants',
      'Clean tabular management dashboards',
    ],
    technologies: ['Python', 'Flask', 'HTML', 'CSS', 'JavaScript', 'MySQL'],
    createdAt: '2023-12-10',
  },
  {
    id: 'vibebank-assistant',
    name: 'VIBEBANK ASSISTANT',
    category: 'AI / Application',
    filterCategory: 'AI / ML',
    isFeatured: false,
    description:
      'Context-aware conversational banking assistant prototype designed to answer banking queries, explain account options, and guide users.',
    shortDescription:
      'Context-aware banking assistant prototype designed to provide conversational assistance around banking information.',
    problem:
      'Navigating dense banking product documentation can be frustrating for customers seeking quick answers on fees or services.',
    approach:
      'Developed a RESTful FastAPI backend utilizing conversational LLM prompts with strict domain constraint guardrails for safe assistance.',
    keyFeatures: [
      'Domain-bounded conversational banking assistant',
      'FastAPI async endpoint execution',
      'Context-aware query handling & fallback responses',
      'REST API design for mobile/web client integration',
    ],
    technologies: ['Python', 'FastAPI', 'LLM', 'REST API'],
    createdAt: '2024-02-05',
  },
];
