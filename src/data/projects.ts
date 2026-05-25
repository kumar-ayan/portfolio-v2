export interface Project {
  id: string;
  caseNumber: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  technologies: string[];
  category: 'reinforcement-learning' | 'deep-learning' | 'autonomous-systems' | 'ai-simulation' | 'intelligent-interfaces';
  image: string;
  link?: string;
  github?: string;
  featured: boolean;
  year: string;
  metrics?: { label: string; value: string }[];
}

export const projects: Project[] = [
  {
    id: 'autonomous-navigation',
    caseNumber: 'CS 001',
    title: 'Autonomous Navigation Agent',
    subtitle: 'Multi-Agent RL for Complex Environments',
    description: 'Deep reinforcement learning system for autonomous navigation in dynamic, partially observable environments using PPO and curiosity-driven exploration.',
    longDescription: 'Developed a multi-agent reinforcement learning framework for autonomous navigation in complex 3D environments. The system uses Proximal Policy Optimization with curiosity-driven exploration bonuses to navigate previously unseen terrain. Implemented custom reward shaping and curriculum learning strategies that improved sample efficiency by 3x compared to vanilla PPO.',
    technologies: ['PyTorch', 'PPO', 'Gymnasium', 'MuJoCo', 'CUDA'],
    category: 'reinforcement-learning',
    image: '/projects/autonomous-nav.avif',
    github: 'https://github.com',
    featured: true,
    year: '2025',
    metrics: [
      { label: 'Success Rate', value: '97.3%' },
      { label: 'Training Steps', value: '2.4M' },
      { label: 'Environments', value: '12' },
    ],
  },
  {
    id: 'neural-architecture-search',
    caseNumber: 'CS 002',
    title: 'Neural Architecture Search Engine',
    subtitle: 'Automated Model Design via RL',
    description: 'Reinforcement learning-based neural architecture search that discovers optimal network topologies for specific tasks, reducing manual design time by 10x.',
    longDescription: 'Built an RL-powered neural architecture search system that treats network design as a sequential decision-making problem. The controller network learns to select operations, connections, and hyperparameters, optimizing for both accuracy and computational efficiency. Achieved state-of-the-art results on CIFAR-10 with 40% fewer parameters.',
    technologies: ['PyTorch', 'JAX', 'CUDA', 'W&B', 'Docker'],
    category: 'deep-learning',
    image: '/projects/nas-engine.avif',
    github: 'https://github.com',
    featured: true,
    year: '2025',
    metrics: [
      { label: 'Accuracy', value: '98.1%' },
      { label: 'Param Reduction', value: '40%' },
      { label: 'Search Time', value: '4hrs' },
    ],
  },
  {
    id: 'sim-to-real-transfer',
    caseNumber: 'CS 003',
    title: 'Sim-to-Real Transfer Pipeline',
    subtitle: 'Domain Randomization for Robotics',
    description: 'End-to-end simulation-to-reality transfer system for robotic manipulation, using domain randomization and progressive neural networks.',
    longDescription: 'Designed and implemented a comprehensive sim-to-real transfer pipeline for robotic arm manipulation tasks. The system leverages domain randomization across visual, physical, and dynamic parameters to train policies in simulation that transfer zero-shot to real hardware. Integrated progressive neural networks for continual adaptation.',
    technologies: ['PyTorch', 'Isaac Gym', 'ROS2', 'Docker', 'C++'],
    category: 'autonomous-systems',
    image: '/projects/sim-to-real.avif',
    featured: true,
    year: '2024',
    metrics: [
      { label: 'Transfer Rate', value: '89%' },
      { label: 'Tasks', value: '8' },
      { label: 'Real-World Tests', value: '200+' },
    ],
  },
  {
    id: 'multi-agent-coordination',
    caseNumber: 'CS 004',
    title: 'Multi-Agent Coordination System',
    subtitle: 'Emergent Communication in RL',
    description: 'Multi-agent system where agents learn to coordinate and communicate in cooperative tasks without predefined protocols.',
    longDescription: 'Developed a multi-agent reinforcement learning framework where agents learn emergent communication protocols for cooperative tasks. Uses centralized training with decentralized execution (CTDE) and attention-based message passing.',
    technologies: ['PyTorch', 'PettingZoo', 'MAPPO', 'Ray', 'Python'],
    category: 'reinforcement-learning',
    image: '/projects/multi-agent.avif',
    github: 'https://github.com',
    featured: false,
    year: '2024',
    metrics: [
      { label: 'Coordination', value: '94%' },
      { label: 'Agents', value: '16' },
    ],
  },
  {
    id: 'quantized-inference',
    caseNumber: 'CS 005',
    title: 'Quantized Inference Engine',
    subtitle: 'FP8/INT4 Model Optimization',
    description: 'High-performance inference engine with custom CUDA kernels for FP8 and INT4 quantized models, achieving 4x throughput improvement.',
    longDescription: 'Built a custom inference engine optimized for quantized transformer models. Implemented FP8 and INT4 quantization with custom CUDA kernels, achieving 4x throughput improvement on A100 GPUs while maintaining 99.2% of full-precision accuracy.',
    technologies: ['CUDA', 'Triton', 'ONNX', 'C++', 'Python'],
    category: 'ai-simulation',
    image: '/projects/quantized.avif',
    featured: false,
    year: '2024',
    metrics: [
      { label: 'Speedup', value: '4.2x' },
      { label: 'Accuracy', value: '99.2%' },
    ],
  },
  {
    id: 'adaptive-interface',
    caseNumber: 'CS 006',
    title: 'Adaptive AI Interface',
    subtitle: 'Context-Aware UI Generation',
    description: 'Intelligent interface system that adapts layout and interactions in real-time based on user behavior patterns and task context.',
    longDescription: 'Created an adaptive interface system powered by reinforcement learning that dynamically adjusts UI layouts, interaction patterns, and information density based on real-time user behavior analysis. Uses contextual bandits for rapid personalization.',
    technologies: ['Next.js', 'TypeScript', 'TensorFlow.js', 'WebGL', 'Python'],
    category: 'intelligent-interfaces',
    image: '/projects/adaptive-ui.avif',
    featured: false,
    year: '2023',
    metrics: [
      { label: 'Engagement', value: '+45%' },
      { label: 'Completion', value: '+32%' },
    ],
  },
];

