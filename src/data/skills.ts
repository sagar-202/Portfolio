/**
 * SAGAR.DB — Skills Data
 *
 * Single source of truth for all 18 skill records.
 * Realistic usage descriptions and honest proficiency indicators.
 * Project relationships map directly to projects in projects.ts.
 */

export type SkillFilterCategory =
  | 'ALL'
  | 'DATA ANALYTICS'
  | 'AI / ML'
  | 'PROGRAMMING'
  | 'FRONTEND'
  | 'BACKEND'
  | 'TOOLS';

export type ProficiencyLevel = 'WORKING' | 'FOUNDATIONAL' | 'FAMILIAR' | 'STRONG';

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
    filterCategory: 'PROGRAMMING',
    level: 'WORKING',
    description:
      'Primary language for data analysis, backend development and AI projects.',
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
    level: 'WORKING',
    description:
      'Used for querying, data manipulation and backend database workflows.',
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
    level: 'WORKING',
    description:
      'Primary data manipulation library for processing tabular and time-series datasets.',
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
      'Fundamental package for numerical computing and multi-dimensional array operations.',
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
      'Comprehensive plotting library for creating static data visualizations and figures.',
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
      'Statistical data visualization library built on Matplotlib for informative graphics.',
    usage: ['Statistical Plots', 'Correlation Maps', 'Data Distribution'],
    relatedProjects: ['UPI Transaction Analysis'],
  },
  {
    id: 'scikit-learn',
    name: 'Scikit-learn',
    category: 'Machine Learning',
    filterCategory: 'AI / ML',
    level: 'FOUNDATIONAL',
    description:
      'Machine learning library for predictive modeling, feature engineering and evaluation.',
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
      'Real-time computer vision library for image processing and video stream analysis.',
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
      'Cross-platform framework for building applied computer vision and ML pipelines.',
    usage: ['Human Pose Estimation', 'Landmark Tracking', 'Repetition Counting'],
    relatedProjects: ['AI Fitness Trainer'],
  },
  {
    id: 'flask',
    name: 'Flask',
    category: 'Backend',
    filterCategory: 'BACKEND',
    level: 'WORKING',
    description:
      'Lightweight Python web framework for building microservices and web APIs.',
    usage: ['Web API Development', 'Lightweight Backends', 'Prototype Servers'],
    relatedProjects: ['AI Fitness Trainer', 'House Rental Management System'],
  },
  {
    id: 'fastapi',
    name: 'FastAPI',
    category: 'Backend / AI',
    filterCategory: 'BACKEND',
    level: 'WORKING',
    description:
      'High-performance modern Python web framework for building asynchronous REST APIs.',
    usage: ['Async REST APIs', 'AI Service Integration', 'API Endpoints'],
    relatedProjects: [
      'QuerySense AI',
      'AI Job Search & Resume Analyzer',
      'VibeBank Assistant',
    ],
  },
  {
    id: 'react',
    name: 'React',
    category: 'Frontend',
    filterCategory: 'FRONTEND',
    level: 'WORKING',
    description:
      'Component-based JavaScript library for building interactive user interfaces.',
    usage: ['Single Page Applications', 'State Management', 'Component Architecture'],
    relatedProjects: ['QuerySense AI', 'AI Job Search & Resume Analyzer'],
  },
  {
    id: 'html',
    name: 'HTML',
    category: 'Frontend',
    filterCategory: 'FRONTEND',
    level: 'WORKING',
    description:
      'Standard markup language for building web page structure and semantic elements.',
    usage: ['Web Structure', 'Document Architecture', 'Forms'],
    relatedProjects: ['House Rental Management System'],
  },
  {
    id: 'css',
    name: 'CSS',
    category: 'Frontend',
    filterCategory: 'FRONTEND',
    level: 'WORKING',
    description:
      'Style sheet language used for web application presentation, styling and layouts.',
    usage: ['Responsive Layouts', 'Custom Styling', 'UI Components'],
    relatedProjects: ['House Rental Management System'],
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'Frontend',
    filterCategory: 'FRONTEND',
    level: 'WORKING',
    description:
      'Programming language enabling dynamic client-side interactions and web logic.',
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
      'Distributed version control system for tracking source code changes.',
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
      'Cloud repository hosting platform for version control and collaboration.',
    usage: ['Repository Hosting', 'Project Tracking', 'Version History'],
    relatedProjects: [],
  },
  {
    id: 'jupyter',
    name: 'Jupyter',
    category: 'Data / Development',
    filterCategory: 'TOOLS',
    level: 'WORKING',
    description:
      'Interactive notebook environment for exploratory data analysis and prototyping.',
    usage: ['Data Analysis', 'Python Prototyping', 'Interactive Notebooks'],
    relatedProjects: ['UPI Transaction Analysis'],
  },
];
