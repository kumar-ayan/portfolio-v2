export interface ResearchPaper {
  id: string;
  title: string;
  abstract: string;
  status: 'published' | 'in-progress' | 'preprint';
  venue?: string;
  year: string;
  tags: string[];
  link?: string;
  citations?: number;
}

export const research: ResearchPaper[] = [
  {
    id: 'sim-to-real-manipulation',
    title: 'Zero-Shot Sim-to-Real Transfer for Dexterous Manipulation via Progressive Domain Randomization',
    abstract: 'We propose a progressive domain randomization framework that systematically increases environment complexity during training, enabling zero-shot transfer of dexterous manipulation policies from simulation to real robotic hardware.',
    status: 'published',
    venue: 'CoRL 2024',
    year: '2024',
    tags: ['Sim-to-Real', 'Domain Randomization', 'Robotics', 'PPO'],
    link: 'https://arxiv.org',
    citations: 23,
  },
  {
    id: 'curiosity-exploration',
    title: 'Curiosity-Driven Exploration with Learned Reward Shaping in Sparse-Reward Environments',
    abstract: 'We introduce a meta-learned reward shaping mechanism that combines intrinsic curiosity modules with learned dense reward functions, dramatically improving exploration efficiency in environments with sparse or deceptive rewards.',
    status: 'published',
    venue: 'NeurIPS 2024 Workshop',
    year: '2024',
    tags: ['Exploration', 'Reward Shaping', 'Meta-Learning', 'RL'],
    link: 'https://arxiv.org',
    citations: 11,
  },
  {
    id: 'multi-agent-emergence',
    title: 'Emergent Communication Protocols in Multi-Agent Reinforcement Learning Under Partial Observability',
    abstract: 'Investigation of emergent communication strategies in multi-agent RL systems operating under partial observability constraints. We demonstrate that structured message spaces lead to more efficient coordination.',
    status: 'preprint',
    year: '2025',
    tags: ['Multi-Agent RL', 'Communication', 'CTDE', 'PettingZoo'],
    link: 'https://arxiv.org',
  },
  {
    id: 'efficient-rl-transformers',
    title: 'Efficient Transformer Architectures for Real-Time Policy Inference in Resource-Constrained Environments',
    abstract: 'Exploring lightweight transformer variants optimized for real-time policy inference on edge devices. Combining attention pruning, quantization-aware training, and knowledge distillation.',
    status: 'in-progress',
    year: '2025',
    tags: ['Transformers', 'Efficiency', 'Edge AI', 'Quantization'],
  },
];

