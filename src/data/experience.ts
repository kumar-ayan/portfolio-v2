export interface Experience {
  id: string;
  version: string;
  role: string;
  company: string;
  period: string;
  description: string;
  highlights: string[];
  technologies: string[];
  isCurrent: boolean;
}

export const experiences: Experience[] = [
  {
    id: 'gssoc-contributor',
    version: 'v2.0.0',
    role: 'Open Source Contributor',
    company: 'GSSoC 2026 — Rocket.Chat, Python Ecosystem, Software Mansion',
    period: 'May 2026 — Present',
    description: 'Contributing to multiple high-impact open source repositories as part of GirlScript Summer of Code 2026 across different technology domains.',
    highlights: [
      'Contributing bug fixes, feature additions, and documentation improvements across multiple repositories on GitHub.',
    ],
    technologies: ['TypeScript', 'Python', 'React', 'Node.js', 'Git'],
    isCurrent: true,
  },
  {
    id: 'shadowfox-intern',
    version: 'v1.0.0',
    role: 'AI/ML Intern',
    company: 'ShadowFox',
    period: 'Dec 2025 — Jan 2026',
    description: 'Built end-to-end machine learning pipelines and contributed to production ML deployments in an Agile environment.',
    highlights: [
      'Built end-to-end ML pipelines using TensorFlow with hyperparameter tuning; preprocessed 100K+ records using Pandas/NumPy for downstream model training.',
      'Collaborated on A/B testing setup and real-time monitoring dashboards for production ML deployments in Agile environment.',
    ],
    technologies: ['TensorFlow', 'Python', 'Pandas', 'NumPy', 'scikit-learn'],
    isCurrent: false,
  },
];
