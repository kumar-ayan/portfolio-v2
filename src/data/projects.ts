export interface Project {
  id: string;
  caseNumber: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  technologies: string[];
  category: 'fullstack' | 'ai-ml' | 'cli-tools' | 'mobile' | 'open-source';
  image: string;
  link?: string;
  github?: string;
  featured: boolean;
  year: string;
  metrics?: { label: string; value: string }[];
}

export const projects: Project[] = [
  {
    id: 'smart-local-knowledge-assistant',
    caseNumber: 'CS 001',
    title: 'Smart Local Knowledge Assistant',
    subtitle: 'RAG-Powered AI with Verified Government Documents',
    description: 'RAG-based AI assistant grounding responses in verified Indian government documents via local Vectra vector DB — eliminates hallucinations with source-cited citation cards.',
    longDescription: 'Built a RAG-based AI assistant that grounds every response in verified Indian government documents using a local Vectra vector database, completely eliminating hallucinations with source-cited citation cards. Implemented an on-the-fly ingestion pipeline where .pdf/.txt uploads are chunked, embedded, and indexed in real time with regional filtering by State and District. Integrated Gemini Pro/Flash with dynamic model routing and fallback handling, achieving sub-2s response time.',
    technologies: ['TypeScript', 'Next.js', 'Gemini API', 'Vectra', 'pdf-parse'],
    category: 'ai-ml',
    image: '/projects/smart-assistant.avif',
    link: 'https://smart-assistant-taupe.vercel.app',
    featured: true,
    year: '2025',
    metrics: [
      { label: 'Response Time', value: '<2s' },
      { label: 'Doc Formats', value: 'PDF + TXT' },
      { label: 'LLM Providers', value: '2' },
    ],
  },
  {
    id: 'llmvc',
    caseNumber: 'CS 002',
    title: 'LLMVC — LLM Prompt Version Control CLI',
    subtitle: 'Git-Style Prompt Versioning Across LLM Providers',
    description: 'Local-first CLI providing git-style prompt versioning (save, diff, rollback) via SQLite across 5+ LLM providers including OpenRouter, Ollama, and Gemini.',
    longDescription: 'A local-first CLI tool that brings git-style prompt versioning to LLM workflows — save, diff, and rollback prompts across 5+ LLM providers (OpenRouter, Ollama, Gemini) via SQLite. Features a word-level diff engine and an AI-powered prompt scoring system (clarity, specificity, context) using LLM-as-judge evaluation with Qwen3 via Ollama. Debugged critical multi-provider issues including wrong API auth headers, incorrect endpoint routing, and Gemini socket hang-up errors, restoring full provider support.',
    technologies: ['TypeScript', 'Node.js', 'SQLite', 'Ollama', 'OpenRouter'],
    category: 'cli-tools',
    image: '/projects/llmvc.avif',
    github: 'https://github.com/kumar-ayan/LLMVC',
    featured: true,
    year: '2025',
    metrics: [
      { label: 'LLM Providers', value: '5+' },
      { label: 'Storage', value: 'SQLite' },
      { label: 'Diff Engine', value: 'Word-level' },
    ],
  },
  {
    id: 'anonymous-location-social',
    caseNumber: 'CS 003',
    title: 'Anonymous Location-Based Social Platform',
    subtitle: 'Privacy-First Geotagged Social App',
    description: 'Privacy-focused platform for anonymous geotagged posts with manual location selection, real-time data handling, anonymous auth, and gamification mechanics.',
    longDescription: 'Architected a privacy-focused platform for anonymous geotagged posts featuring manual location selection with no exact user tracking. Designed real-time data handling and anonymous auth systems using Firebase and Supabase. Built gamification mechanics including achievement badges, exploration rewards, and engagement-based progression to drive user retention. Planned scalable backend architecture with privacy-preserving analytics and premium monetization features including enhanced customization and unlimited media uploads.',
    technologies: ['React Native', 'Firebase', 'Supabase', 'Mapbox API'],
    category: 'mobile',
    image: '/projects/anon-social.avif',
    featured: true,
    year: '2025',
    metrics: [
      { label: 'Auth', value: 'Anonymous' },
      { label: 'Location', value: 'Manual' },
      { label: 'Gamification', value: 'Badges + XP' },
    ],
  },
  {
    id: 'ai-life-decision-simulator',
    caseNumber: 'CS 004',
    title: 'AI Life Decision Simulator',
    subtitle: 'Branching Future Scenario Engine Powered by AI',
    description: 'AI-powered simulation platform that predicts and visualizes possible future outcomes based on user decisions — explore "what-if" life scenarios interactively.',
    longDescription: 'An AI-powered simulation platform that predicts and visualizes possible future outcomes based on user decisions. The system generates branching life scenarios by analyzing factors like career growth, finances, risk, and personal development, helping users explore "what-if" situations interactively through AI-driven simulations. Built with decision tree logic layered over LLM reasoning to produce coherent, personalized narrative branches across short and long-term time horizons.',
    technologies: ['Next.js', 'React', 'Node.js', 'LLMs', 'Decision Trees'],
    category: 'ai-ml',
    image: '/projects/ai-life-sim.avif',
    featured: true,
    year: '2025',
    metrics: [
      { label: 'Scenario Depth', value: 'Branching' },
      { label: 'Factors', value: '4+' },
      { label: 'AI-Driven', value: 'Yes' },
    ],
  },
  {
    id: 'snakegame-torch',
    caseNumber: 'CS 005',
    title: 'Snake Game RL Agent',
    subtitle: 'Deep Reinforcement Learning with PyTorch',
    description: 'An AI agent trained to play the classic Snake game using Deep Q-Learning (DQN) implemented in PyTorch and Pygame.',
    longDescription: 'Built a reinforcement learning environment for the classic Snake game using Pygame. Developed an AI agent powered by a Deep Q-Network (DQN) implemented with PyTorch that learns optimal gameplay strategies through trial and error, reward maximization, and experience replay. The agent progressively improves its score by balancing exploration and exploitation to navigate the grid and collect food without colliding with obstacles or itself.',
    technologies: ['Python', 'PyTorch', 'Pygame', 'Reinforcement Learning'],
    category: 'ai-ml',
    image: '/projects/snake-game.avif',
    github: 'https://github.com/kumar-ayan/snakegame-torch',
    featured: false,
    year: '2024',
    metrics: [
      { label: 'Algorithm', value: 'DQN' },
      { label: 'Framework', value: 'PyTorch' },
      { label: 'Environment', value: 'Pygame' },
    ],
  },
];
