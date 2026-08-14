/**
 * SAGAR.DB — Skills Data
 *
 * Single source of truth for all 18 skill records.
 * Realistic usage descriptions and honest proficiency indicators.
 * Project relationships map directly to projects in projects.ts.
 */

export type SkillFilterCategory =
  | 'ALL'
  | 'DATA'
  | 'AI / ML'
  | 'PROGRAMMING'
  | 'FRONTEND'
  | 'BACKEND'
  | 'TOOLS';

export type ProficiencyLevel = 'FOUNDATIONAL' | 'WORKING' | 'FAMILIAR';

export interface Skill {
  id: string;
  name: string;
  category: string;
  filterCategory: 'DATA' | 'AI / ML' | 'PROGRAMMING' | 'FRONTEND' | 'BACKEND' | 'TOOLS';
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
      'General-purpose programming language used across my data analysis, backend and AI projects.',
    usage: ['Data analysis', 'Backend development', 'AI/ML projects'],
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
    filterCategory: 'DATA',
    level: 'WORKING',
    description:
      'Structured query language for database querying, data manipulation and backend schema design.',
    usage: ['Database querying', 'Data manipulation', 'Schema design'],
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
    filterCategory: 'DATA',
    level: 'WORKING',
    description:
      'Primary data manipulation and analysis library for processing tabular and time-series datasets.',
    usage: ['Data cleaning', 'Tabular data analysis', 'Dataset transformation'],
    relatedProjects: ['UPI Transaction Analysis'],
  },
  {
    id: 'numpy',
    name: 'NumPy',
    category: 'Data Analytics',
    filterCategory: 'DATA',
    level: 'WORKING',
    description:
      'Fundamental package for numerical computing, array operations and mathematical analysis in Python.',
    usage: ['Numerical computation', 'Array operations', 'Statistical calculation'],
    relatedProjects: ['UPI Transaction Analysis'],
  },
  {
    id: 'matplotlib',
    name: 'Matplotlib',
    category: 'Data Visualization',
    filterCategory: 'DATA',
    level: 'WORKING',
    description:
      'Comprehensive library for creating static, animated, and interactive visualizations in Python.',
    usage: ['Data plotting', 'Trend visualization', 'Exploratory data analysis'],
    relatedProjects: ['UPI Transaction Analysis'],
  },
  {
    id: 'seaborn',
    name: 'Seaborn',
    category: 'Data Visualization',
    filterCategory: 'DATA',
    level: 'WORKING',
    description:
      'Statistical data visualization library built on top of Matplotlib for attractive graphics.',
    usage: ['Statistical plots', 'Correlation heatmaps', 'Data distribution charts'],
    relatedProjects: ['UPI Transaction Analysis'],
  },
  {
    id: 'scikit-learn',
    name: 'Scikit-learn',
    category: 'Machine Learning',
    filterCategory: 'AI / ML',
    level: 'FOUNDATIONAL',
    description:
      'Machine learning library for predictive data analysis, model building and feature engineering.',
    usage: ['Model prototyping', 'Data preprocessing', 'Predictive modeling'],
    relatedProjects: [],
  },
  {
    id: 'opencv',
    name: 'OpenCV',
    category: 'Computer Vision',
    filterCategory: 'AI / ML',
    level: 'WORKING',
    description:
      'Real-time computer vision library for image processing and webcam video stream analysis.',
    usage: ['Video frame processing', 'Real-time computer vision', 'Image manipulation'],
    relatedProjects: ['AI Fitness Trainer'],
  },
  {
    id: 'mediapipe',
    name: 'MediaPipe',
    category: 'Computer Vision',
    filterCategory: 'AI / ML',
    level: 'WORKING',
    description:
      'Cross-platform framework for building multimodal applied ML pipelines, used for pose estimation.',
    usage: ['Human pose estimation', 'Landmark tracking', 'Motion repetition counting'],
    relatedProjects: ['AI Fitness Trainer'],
  },
  {
    id: 'flask',
    name: 'Flask',
    category: 'Backend',
    filterCategory: 'BACKEND',
    level: 'WORKING',
    description:
      'Lightweight Python WSGI web application framework for building web services and microservices.',
    usage: ['Web API development', 'Lightweight backend services', 'Prototype servers'],
    relatedProjects: ['AI Fitness Trainer', 'House Rental Management System'],
  },
  {
    id: 'fastapi',
    name: 'FastAPI',
    category: 'Backend / AI',
    filterCategory: 'BACKEND',
    level: 'WORKING',
    description:
      'High-performance modern web framework for building REST APIs with Python based on type hints.',
    usage: ['Async REST API development', 'AI service integration', 'Backend API endpoints'],
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
      'Component-based JavaScript library for building modern, interactive web application interfaces.',
    usage: ['Single-page application UI', 'State management', 'Component-driven frontend'],
    relatedProjects: ['QuerySense AI', 'AI Job Search & Resume Analyzer'],
  },
  {
    id: 'html',
    name: 'HTML',
    category: 'Frontend',
    filterCategory: 'FRONTEND',
    level: 'WORKING',
    description:
      'Standard markup language for creating semantic document structure in web applications.',
    usage: ['Semantic web structure', 'Document architecture', 'Form design'],
    relatedProjects: ['House Rental Management System'],
  },
  {
    id: 'css',
    name: 'CSS',
    category: 'Frontend',
    filterCategory: 'FRONTEND',
    level: 'WORKING',
    description:
      'Style sheet language used for describing the presentation, styling and responsive layout.',
    usage: ['Responsive web layout', 'Custom design systems', 'UI styling'],
    relatedProjects: ['House Rental Management System'],
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'Frontend',
    filterCategory: 'FRONTEND',
    level: 'WORKING',
    description:
      'High-level programming language enabling interactive client-side web application behavior.',
    usage: ['Client-side logic', 'DOM manipulation', 'Event handling'],
    relatedProjects: ['House Rental Management System'],
  },
  {
    id: 'git',
    name: 'Git',
    category: 'Development Tools',
    filterCategory: 'TOOLS',
    level: 'WORKING',
    description:
      'Distributed version control system for tracking source code changes during development.',
    usage: ['Source code version control', 'Branch management', 'Development workflows'],
    relatedProjects: [],
  },
  {
    id: 'github',
    name: 'GitHub',
    category: 'Development Tools',
    filterCategory: 'TOOLS',
    level: 'WORKING',
    description:
      'Cloud platform for code hosting, repository management and collaborative development.',
    usage: ['Repository hosting', 'Code management', 'Project tracking'],
    relatedProjects: [],
  },
  {
    id: 'jupyter',
    name: 'Jupyter',
    category: 'Data / Development',
    filterCategory: 'TOOLS',
    level: 'WORKING',
    description:
      'Interactive computing environment for data analysis, rapid prototyping and documentation.',
    usage: ['Exploratory data analysis', 'Python script testing', 'Interactive notebook workflows'],
    relatedProjects: ['UPI Transaction Analysis'],
  },
];
