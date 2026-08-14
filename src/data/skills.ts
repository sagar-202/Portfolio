/**
 * SAGAR.DB — Skills Data
 *
 * Single source of truth for all 18 skill records.
 * Categorized into Data Analytics, AI/ML, Development, and Tools.
 * Concise proficiency levels: CORE | WORKING | FOUNDATIONAL.
 */

export type SkillFilterCategory =
  | 'ALL'
  | 'DATA ANALYTICS'
  | 'AI / ML'
  | 'DEVELOPMENT'
  | 'TOOLS';

export type ProficiencyLevel = 'CORE' | 'WORKING' | 'FOUNDATIONAL';

export interface Skill {
  id: string;
  name: string;
  category: string;
  filterCategory: SkillFilterCategory;
  level: ProficiencyLevel;
  description: string;
  usage: string[];
  relatedProjects: string[];
}

export const skillsData: Skill[] = [
  {
    id: 'python',
    name: 'Python',
    category: 'Programming / Data',
    filterCategory: 'DATA ANALYTICS',
    level: 'CORE',
    description:
      'General-purpose programming language used across my data analysis, backend and AI projects.',
    usage: ['Data Analytics', 'Backend', 'AI / ML'],
    relatedProjects: [
      'UPI Transaction Analysis',
      'AI Fitness Trainer',
      'House Rental Management System',
      'QuerySense AI',
      'AI Job Search & Resume Analyzer',
      'VibeBank Assistant',
    ],
  },
  {
    id: 'sql',
    name: 'SQL',
    category: 'Data / Database',
    filterCategory: 'DATA ANALYTICS',
    level: 'CORE',
    description:
      'Structured Query Language for data manipulation, database design, and exploratory analysis.',
    usage: ['Database Querying', 'Data Manipulation', 'Schema Design'],
    relatedProjects: [
      'UPI Transaction Analysis',
      'House Rental Management System',
      'QuerySense AI',
    ],
  },
  {
    id: 'pandas',
    name: 'Pandas',
    category: 'Data Analytics',
    filterCategory: 'DATA ANALYTICS',
    level: 'CORE',
    description:
      'Data analysis and manipulation library for cleaning, processing, and aggregating tabular datasets.',
    usage: ['Data Cleaning', 'Tabular Analytics', 'Dataset Transformations'],
    relatedProjects: ['UPI Transaction Analysis'],
  },
  {
    id: 'numpy',
    name: 'NumPy',
    category: 'Data Analytics',
    filterCategory: 'DATA ANALYTICS',
    level: 'WORKING',
    description:
      'Fundamental numerical package for multi-dimensional array processing and mathematical operations.',
    usage: ['Numerical Computation', 'Array Operations', 'Statistical Computations'],
    relatedProjects: ['UPI Transaction Analysis'],
  },
  {
    id: 'matplotlib',
    name: 'Matplotlib',
    category: 'Data Visualization',
    filterCategory: 'DATA ANALYTICS',
    level: 'WORKING',
    description:
      'Plotting library used for building static charts, trend lines, and exploratory distribution graphs.',
    usage: ['Data Plotting', 'Exploratory Analysis', 'Trend Charts'],
    relatedProjects: ['UPI Transaction Analysis'],
  },
  {
    id: 'seaborn',
    name: 'Seaborn',
    category: 'Data Visualization',
    filterCategory: 'DATA ANALYTICS',
    level: 'WORKING',
    description:
      'Statistical visualization tool built on Matplotlib for high-level charts and correlation heatmaps.',
    usage: ['Statistical Plots', 'Correlation Maps', 'Data Distribution'],
    relatedProjects: ['UPI Transaction Analysis'],
  },
  {
    id: 'scikit-learn',
    name: 'Scikit-learn',
    category: 'Machine Learning',
    filterCategory: 'AI / ML',
    level: 'WORKING',
    description:
      'Machine learning library for predictive modeling, statistical preprocessing, and evaluation metrics.',
    usage: ['Model Prototyping', 'Feature Engineering', 'Predictive Analysis'],
    relatedProjects: [],
  },
  {
    id: 'opencv',
    name: 'OpenCV',
    category: 'Computer Vision',
    filterCategory: 'AI / ML',
    level: 'WORKING',
    description:
      'Computer vision library used for video frame processing, image transformations, and stream analysis.',
    usage: ['Video Frame Processing', 'Pose Estimation', 'Image Transformations'],
    relatedProjects: ['AI Fitness Trainer'],
  },
  {
    id: 'mediapipe',
    name: 'MediaPipe',
    category: 'Computer Vision',
    filterCategory: 'AI / ML',
    level: 'WORKING',
    description:
      'Applied ML framework used for body landmark detection, pose tracking, and real-time exercise counting.',
    usage: ['Human Pose Estimation', 'Landmark Tracking', 'Repetition Counting'],
    relatedProjects: ['AI Fitness Trainer'],
  },
  {
    id: 'fastapi',
    name: 'FastAPI',
    category: 'Backend / Web',
    filterCategory: 'DEVELOPMENT',
    level: 'WORKING',
    description:
      'Modern, fast Python framework used for constructing REST API endpoints and async LLM services.',
    usage: ['Async REST APIs', 'AI Service Integration', 'API Endpoints'],
    relatedProjects: [
      'QuerySense AI',
      'AI Job Search & Resume Analyzer',
      'VibeBank Assistant',
    ],
  },
  {
    id: 'flask',
    name: 'Flask',
    category: 'Backend / Web',
    filterCategory: 'DEVELOPMENT',
    level: 'WORKING',
    description:
      'Lightweight Python web framework for structuring web applications, routing, and prototype backends.',
    usage: ['Web API Development', 'Lightweight Backends', 'Prototype Servers'],
    relatedProjects: ['AI Fitness Trainer', 'House Rental Management System'],
  },
  {
    id: 'react',
    name: 'React',
    category: 'Frontend / Web',
    filterCategory: 'DEVELOPMENT',
    level: 'WORKING',
    description:
      'Component-driven JavaScript library for building responsive client interfaces and single-page applications.',
    usage: ['Single Page Applications', 'State Management', 'Component Architecture'],
    relatedProjects: ['QuerySense AI', 'AI Job Search & Resume Analyzer'],
  },
  {
    id: 'html',
    name: 'HTML',
    category: 'Frontend / Web',
    filterCategory: 'DEVELOPMENT',
    level: 'WORKING',
    description:
      'Semantic web markup for structuring accessible web document elements and application forms.',
    usage: ['Web Structure', 'Document Architecture', 'Forms'],
    relatedProjects: ['House Rental Management System'],
  },
  {
    id: 'css',
    name: 'CSS',
    category: 'Frontend / Web',
    filterCategory: 'DEVELOPMENT',
    level: 'WORKING',
    description:
      'Style sheets for layout positioning, responsive CSS grid systems, and custom theme interfaces.',
    usage: ['Responsive Layouts', 'Custom Styling', 'UI Components'],
    relatedProjects: ['House Rental Management System'],
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'Frontend / Web',
    filterCategory: 'DEVELOPMENT',
    level: 'WORKING',
    description:
      'Client-side programming language for dynamic DOM handling, event listeners, and API fetching.',
    usage: ['Client Logic', 'DOM Interaction', 'Event Handling'],
    relatedProjects: ['House Rental Management System'],
  },
  {
    id: 'git',
    name: 'Git',
    category: 'Development Tools',
    filterCategory: 'TOOLS',
    level: 'WORKING',
    description:
      'Distributed version control system for code tracking, commit histories, and branch workflows.',
    usage: ['Version Control', 'Branch Workflows', 'Code Management'],
    relatedProjects: [],
  },
  {
    id: 'github',
    name: 'GitHub',
    category: 'Development Tools',
    filterCategory: 'TOOLS',
    level: 'WORKING',
    description:
      'Cloud platform for repository management, project documentation, and open source code sharing.',
    usage: ['Repository Hosting', 'Project Tracking', 'Version History'],
    relatedProjects: [],
  },
  {
    id: 'jupyter',
    name: 'Jupyter',
    category: 'Data Tools',
    filterCategory: 'TOOLS',
    level: 'WORKING',
    description:
      'Interactive notebook environment for step-by-step data exploration, prototyping, and visualization.',
    usage: ['Data Analysis', 'Python Prototyping', 'Interactive Notebooks'],
    relatedProjects: ['UPI Transaction Analysis'],
  },
];
