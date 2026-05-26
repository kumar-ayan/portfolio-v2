'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EASE_CINEMA = [0.22, 1, 0.36, 1] as const;

const FOCUS_AREAS = [
  {
    id: 'rl',
    index: '01',
    title: 'Reinforcement Learning',
    subtitle: 'Policy Optimization & Multi-Agent Systems',
    description:
      'Designing agents that learn optimal strategies through environmental interaction. Specializing in PPO, SAC, and custom policy gradient methods for continuous control tasks. Building multi-agent systems with emergent communication and cooperative strategies.',
    metrics: [
      { label: 'Environments', value: '12+' },
      { label: 'Agents Trained', value: '200+' },
      { label: 'Steps / Hour', value: '2.4M' },
    ],
  },
  {
    id: 'gen',
    index: '02',
    title: 'Generative Architectures',
    subtitle: 'Attention Mechanisms & Latent Spaces',
    description:
      'Building and fine-tuning transformer architectures, diffusion models, and generative systems. Working with attention mechanisms, latent space manipulation, and conditional generation for both research and production applications.',
    metrics: [
      { label: 'Models Built', value: '15+' },
      { label: 'Max Parameters', value: '7B' },
      { label: 'Peak Accuracy', value: '98.1%' },
    ],
  },
  {
    id: 'sys',
    index: '03',
    title: 'AI Systems & Deployment',
    subtitle: 'CUDA Optimization & Quantized Inference',
    description:
      'Building production AI infrastructure: custom CUDA kernels, Triton inference servers, FP8/INT4 quantization pipelines. Optimizing model serving for low-latency, high-throughput deployment on GPU clusters.',
    metrics: [
      { label: 'Latency', value: '<5ms' },
      { label: 'Throughput Gain', value: '4.2×' },
      { label: 'GPU Utilization', value: '94%' },
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
      const scrolled = -rect.top;
      const progress = Math.max(
        0,
        Math.min(1, scrolled / (section.offsetHeight - window.innerHeight))
      );
      setActiveIndex(
        Math.min(Math.floor(progress * FOCUS_AREAS.length), FOCUS_AREAS.length - 1)
      );
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isInView]);

  const active = FOCUS_AREAS[activeIndex];

  return (
    <section
      id="expertise"
      ref={sectionRef}
      className="relative bg-pattern"
      style={{ minHeight: '300vh', backgroundColor: '#f0f0f0' }}
      aria-label="Expertise"
    >
      <div className="sticky top-0 h-screen flex flex-col overflow-hidden" style={{ backgroundColor: '#f0f0f0' }}>
        {/* Top label */}
        <div className="container-main pt-24 pb-8">
          <div className="flex items-center gap-4"><div className="text-eyebrow">Expertise</div><div style={{ height: '1px', flex: 1, maxWidth: '80px', backgroundColor: '#f1e500' }} /></div>
        </div>

        {/* Main grid */}
        <div className="container-main flex-1 grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 lg:gap-24 items-center pb-16">
          {/* Left — tabbed navigation */}
          <div className="space-y-0">
            {FOCUS_AREAS.map((area, i) => (
              <button
                key={area.id}
                onClick={() => setActiveIndex(i)}
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  padding: '1.5rem 0',
                  background: 'none',
                  border: 'none',
                  borderBottom: '1px solid var(--border-subtle)',
                  cursor: 'pointer',
                  transition: 'opacity 0.3s ease',
                  opacity: i === activeIndex ? 1 : 0.35,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: '1rem',
                  }}
                >
                  <span className="text-eyebrow" style={{ minWidth: '2rem' }}>
                    {area.index}
                  </span>
                  <span
                    style={{
                      fontFamily: 'Georgia, serif',
                      fontSize: 'clamp(1.2rem, 2vw, 1.6rem)',
                      fontWeight: 500,
                      letterSpacing: '-0.01em',
                      color:
                        i === activeIndex
                          ? '#000000'
                          : '#666666',
                      transition: 'color 0.3s ease',
                    }}
                  >
                    {area.title}
                  </span>
                </div>
              </button>
            ))}

            {/* Progress dots */}
            <div className="flex gap-2 pt-6">
              {FOCUS_AREAS.map((_, i) => (
                <div
                  key={i}
                  style={{
                    height: '2px',
                    flex: 1,
                    backgroundColor:
                      i === activeIndex
                        ? 'var(--color-accent)'
                        : 'var(--border-subtle)',
                    transition: 'background-color 0.4s ease',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Right — detail panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.55, ease: EASE_CINEMA }}
            >
              <div className="text-eyebrow mb-4" style={{ color: 'var(--color-accent)' }}>
                {active.subtitle}
              </div>

              <h3
                className="text-heading mb-6"
                style={{ color: 'var(--text-primary)' }}
              >
                {active.title}
              </h3>

              <p className="text-body mb-10" style={{ maxWidth: '480px' }}>
                {active.description}
              </p>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-6">
                {active.metrics.map((m) => (
                  <div key={m.label}>
                    <div
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)',
                        fontWeight: 400,
                        color: 'var(--text-primary)',
                        lineHeight: 1,
                        marginBottom: '0.375rem',
                      }}
                    >
                      {m.value}
                    </div>
                    <div className="text-eyebrow" style={{ fontSize: '0.625rem' }}>
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
