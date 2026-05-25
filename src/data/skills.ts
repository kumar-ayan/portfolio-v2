export interface SkillCategory {
  id: string;
  label: string;
  prefix: string;
  skills: Skill[];
}

export interface Skill {
  name: string;
  level: 'expert' | 'advanced' | 'proficient';
  description: string;
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'reinforcement-learning',
    label: 'Reinforcement Learning',
    prefix: '01',
    skills: [
      { name: 'PPO / SAC / DDPG', level: 'expert', description: 'Policy gradient methods for continuous and discrete action spaces' },
      { name: 'Custom Gym Environments', level: 'expert', description: 'Gymnasium/PettingZoo environment design and reward engineering' },
      { name: 'Multi-Agent RL', level: 'advanced', description: 'CTDE, emergent communication, MAPPO implementations' },
      { name: 'Sim-to-Real Transfer', level: 'advanced', description: 'Domain randomization, progressive networks, zero-shot transfer' },
      { name: 'Reward Shaping', level: 'expert', description: 'Intrinsic motivation, curiosity-driven exploration, curriculum learning' },
    ],
  },
  {
    id: 'deep-learning',
    label: 'Deep Learning',
    prefix: '02',
    skills: [
      { name: 'Transformers / Attention', level: 'expert', description: 'Self-attention, cross-attention, multi-head architectures' },
      { name: 'Diffusion Models', level: 'advanced', description: 'DDPM, score-based generative modeling, conditional generation' },
      { name: 'CNN / ResNet / EfficientNet', level: 'expert', description: 'Convolutional architectures for vision tasks' },
      { name: 'Custom Loss Functions', level: 'expert', description: 'Contrastive, triplet, focal, and domain-specific loss design' },
      { name: 'Gradient Optimization', level: 'advanced', description: 'AdamW, LAMB, gradient clipping, learning rate scheduling' },
    ],
  },
  {
    id: 'frameworks',
    label: 'AI Frameworks',
    prefix: '03',
    skills: [
      { name: 'PyTorch', level: 'expert', description: 'Primary framework for research and production ML' },
      { name: 'JAX / Flax', level: 'advanced', description: 'Functional transformations, JIT compilation, vmap' },
      { name: 'HuggingFace Ecosystem', level: 'advanced', description: 'Transformers, Datasets, Accelerate, PEFT' },
      { name: 'TensorBoard / W&B', level: 'expert', description: 'Experiment tracking, hyperparameter sweeps, model registry' },
      { name: 'ONNX Runtime', level: 'proficient', description: 'Model export, optimization, cross-platform inference' },
    ],
  },
  {
    id: 'infrastructure',
    label: 'Systems & Infrastructure',
    prefix: '04',
    skills: [
      { name: 'CUDA / cuDNN', level: 'advanced', description: 'Custom kernel development, memory optimization' },
      { name: 'Triton Inference Server', level: 'advanced', description: 'Model serving, batching, multi-model deployment' },
      { name: 'Docker / Kubernetes', level: 'advanced', description: 'Containerized ML pipelines, orchestration, auto-scaling' },
      { name: 'AWS / GCP', level: 'proficient', description: 'SageMaker, EC2, S3, Vertex AI, Cloud TPU' },
      { name: 'MLOps / CI-CD', level: 'advanced', description: 'DVC, MLflow, automated training pipelines' },
    ],
  },
  {
    id: 'engineering',
    label: 'Software Engineering',
    prefix: '05',
    skills: [
      { name: 'Python', level: 'expert', description: 'Primary language for ML research and production systems' },
      { name: 'C++ / Rust', level: 'proficient', description: 'Performance-critical systems, CUDA kernels, robotics' },
      { name: 'TypeScript / React', level: 'advanced', description: 'Full-stack web, interactive visualizations, dashboards' },
      { name: 'Git / Bash / Linux', level: 'expert', description: 'Version control, scripting, server administration' },
      { name: 'System Design', level: 'advanced', description: 'Distributed systems, message queues, data pipelines' },
    ],
  },
];

