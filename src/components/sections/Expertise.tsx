'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { EASE_OUT_EXPO } from '@/lib/motion';

const FOCUS_AREAS = [
  {
    id: 'rl',
    tag: 'VECTOR_01',
    title: 'Reinforcement Learning',
    subtitle: 'Policy Optimization & Multi-Agent Systems',
    description:
      'Designing agents that learn optimal strategies through environmental interaction. Specializing in PPO, SAC, and custom policy gradient methods for continuous control tasks. Building multi-agent systems with emergent communication and cooperative strategies.',
    equation: 'L^CLIP(θ) = E[min(r_t(θ)·A_t, clip(r_t(θ), 1-ε, 1+ε)·A_t)]',
    metrics: [
      { label: 'ENVIRONMENTS', value: '12+' },
      { label: 'AGENTS TRAINED', value: '200+' },
      { label: 'STEPS/HR', value: '2.4M' },
    ],
  },
  {
    id: 'gen',
    tag: 'VECTOR_02',
    title: 'Generative Architectures',
    subtitle: 'Attention Mechanisms & Latent Spaces',
    description:
      'Building and fine-tuning transformer architectures, diffusion models, and generative systems. Working with attention mechanisms, latent space manipulation, and conditional generation for both research and production applications.',
    equation: 'Attention(Q,K,V) = softmax(QK^T / √d_k)·V',
    metrics: [
      { label: 'MODELS BUILT', value: '15+' },
      { label: 'PARAMETERS', value: '7B max' },
      { label: 'ACCURACY', value: '98.1%' },
    ],
  },
  {
    id: 'sys',
    tag: 'VECTOR_03',
    title: 'AI Systems & Deployment',
    subtitle: 'CUDA Optimization & Quantized Inference',
    description:
      'Building production AI infrastructure: custom CUDA kernels, Triton inference servers, FP8/INT4 quantization pipelines. Optimizing model serving for low-latency, high-throughput deployment on GPU clusters.',
    equation: 'Throughput = BatchSize × (1 / Latency) × GPUs',
    metrics: [
      { label: 'LATENCY', value: '<5ms' },
      { label: 'THROUGHPUT', value: '4.2x' },
      { label: 'GPU UTIL', value: '94%' },
    ],
  },
];

export function Expertise() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView || !sectionRef.current) return;

    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const scrolledInSection = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolledInSection / (sectionHeight - window.innerHeight)));
      const newIndex = Math.min(Math.floor(progress * FOCUS_AREAS.length), FOCUS_AREAS.length - 1);
      setActiveIndex(newIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isInView]);

  const activeArea = FOCUS_AREAS[activeIndex];

  return (
    <section
      id="expertise"
      ref={sectionRef}
      className="relative"
      style={{ minHeight: `320vh` }}
      aria-label="Expertise section"
    >
      <div className="sticky top-0 h-screen flex flex-col">
        <div className="container-main pt-24 md:pt-28">
          <SectionLabel prefix="03" label="FOCUS_AREAS" />
        </div>

        <div className="container-main flex-1 grid grid-cols-1 lg:grid-cols-[4fr_6fr] gap-12 lg:gap-28 items-center pb-24">
          {/* Left: Telemetry panel */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeArea.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.62, ease: EASE_OUT_EXPO }}
                className="space-y-8"
              >
                {/* Equation display */}
                <div
                  className="py-8 border-y"
                  style={{
                    borderColor: 'hsla(225, 7%, 24%, 0.35)',
                    backgroundColor: 'transparent',
                  }}
                >
                  <div className="text-mono-label mb-4" style={{ color: 'hsl(56, 92%, 62%)', fontSize: '9px' }}>
                    [{activeArea.tag} {'//'} CORE_EQUATION]
                  </div>
                  <div
                    className="font-serif text-lg md:text-2xl py-2"
                    style={{ color: 'hsl(55, 13%, 82%)', fontStyle: 'italic', lineHeight: 1.35 }}
                  >
                    {activeArea.equation}
                  </div>
                </div>

                {/* Metrics grid */}
                <div className="grid grid-cols-3 gap-6">
                  {activeArea.metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="text-left"
                    >
                      <div
                        className="font-serif text-xl md:text-3xl font-medium mb-2"
                        style={{ color: 'hsl(56, 92%, 62%)' }}
                      >
                        {metric.value}
                      </div>
                      <div
                        className="text-mono-label"
                        style={{ color: 'hsl(55, 13%, 40%)', fontSize: '8px' }}
                      >
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Progress indicators */}
                <div className="flex gap-2">
                  {FOCUS_AREAS.map((_, i) => (
                    <div
                      key={i}
                      className="h-[1px] flex-1 transition-all duration-500"
                      style={{
                        backgroundColor:
                          i === activeIndex
                            ? 'hsl(56, 92%, 62%)'
                            : 'hsla(225, 7%, 12%, 0.5)',
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: Scrolling research description */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeArea.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.62, ease: EASE_OUT_EXPO }}
              >
                <div className="text-mono-label mb-4" style={{ color: 'hsl(56, 92%, 62%)', fontSize: '10px' }}>
                  [{activeArea.tag}]
                </div>

                <h3
                  className="text-section-heading mb-5"
                  style={{ color: 'hsl(55, 13%, 84%)' }}
                >
                  {activeArea.title}
                </h3>

                <p
                  className="text-mono-label mb-8"
                  style={{ color: 'hsl(56, 92%, 62%)', fontSize: '11px' }}
                >
                  {activeArea.subtitle}
                </p>

                <p
                  className="text-body max-w-xl"
                  style={{ color: 'hsl(55, 13%, 66%)', lineHeight: 1.75 }}
                >
                  {activeArea.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

