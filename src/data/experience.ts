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
    id: 'lead-ai-engineer',
    version: 'v2.1.0',
    role: 'Lead AI Systems Engineer',
    company: 'Neural Dynamics Lab',
    period: '2024 — Present',
    description: 'Leading development of autonomous AI systems and reinforcement learning pipelines for real-world deployment.',
    highlights: [
      'Architected multi-agent RL framework processing 2M+ environment steps per hour on distributed GPU clusters',
      'Reduced model inference latency by 4x through custom CUDA kernel optimization and INT4 quantization',
      'Designed curriculum learning pipeline improving sample efficiency by 300% across 12 task domains',
      'Mentored team of 4 engineers on RL best practices and production ML system design',
    ],
    technologies: ['PyTorch', 'CUDA', 'Ray', 'Kubernetes', 'Triton'],
    isCurrent: true,
  },
  {
    id: 'ml-research-engineer',
    version: 'v2.0.0',
    role: 'ML Research Engineer',
    company: 'Autonomous Systems Institute',
    period: '2023 — 2024',
    description: 'Research and development of deep reinforcement learning methods for robotics and autonomous navigation.',
    highlights: [
      'Published 2 papers on sim-to-real transfer for robotic manipulation at top-tier venues',
      'Built end-to-end training pipeline for vision-based RL achieving 97% success rate in real-world tasks',
      'Implemented domain randomization framework reducing sim-to-real gap by 60%',
      'Contributed to open-source RL benchmarks used by 500+ researchers',
    ],
    technologies: ['PyTorch', 'Isaac Gym', 'ROS2', 'Docker', 'JAX'],
    isCurrent: false,
  },
  {
    id: 'ai-developer',
    version: 'v1.1.0',
    role: 'AI Developer',
    company: 'TechForge Solutions',
    period: '2022 — 2023',
    description: 'Developing deep learning solutions for computer vision and natural language processing applications.',
    highlights: [
      'Deployed transformer-based NLP pipeline serving 100K+ daily predictions with 99.9% uptime',
      'Optimized CNN inference pipeline reducing cost by 65% through model distillation and pruning',
      'Built automated data labeling system using active learning, reducing annotation costs by 40%',
    ],
    technologies: ['PyTorch', 'HuggingFace', 'FastAPI', 'AWS', 'Docker'],
    isCurrent: false,
  },
  {
    id: 'software-intern',
    version: 'v1.0.0',
    role: 'Software Engineering Intern',
    company: 'DataStream Labs',
    period: '2021 — 2022',
    description: 'Foundation engineering work in backend systems, data pipelines, and initial ML prototyping.',
    highlights: [
      'Built real-time data processing pipeline handling 50K events per second using Apache Kafka',
      'Developed REST APIs and microservices architecture for ML model serving platform',
      'Created monitoring dashboards and alerting systems for production ML models',
    ],
    technologies: ['Python', 'Kafka', 'PostgreSQL', 'Docker', 'Git'],
    isCurrent: false,
  },
];

