'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const EASE_CINEMA = [0.22, 1, 0.36, 1] as const;

export function About() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section
      id="about"
      ref={ref}
      className="relative section-spacing bg-pattern"
      style={{ backgroundColor: '#fff' }}
      aria-label="About"
    >
      <div className="container-main">
        <div className="flex items-center gap-4 mb-12">
          <motion.div
            className="text-eyebrow"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            About
          </motion.div>
          {/* Yellow dot accent — Digitalists */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE_CINEMA }}
            style={{
              height: '1px',
              flex: 1,
              maxWidth: '80px',
              backgroundColor: 'var(--color-accent)',
              transformOrigin: 'left',
            }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-16 lg:gap-24 items-start">
          {/* Left */}
          <div>
            <motion.h2
              className="text-heading mb-10"
              style={{ color: 'var(--text-primary)' }}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.1, ease: EASE_CINEMA }}
            >
              I build systems that learn, adapt, and decide in environments designed to break them.
            </motion.h2>

            {/* Counter — Digitalists style */}
            <motion.div
              className="flex gap-12 mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4, ease: EASE_CINEMA }}
            >
              {[
                { num: '6+', label: 'Projects' },
                { num: '4', label: 'Papers' },
                { num: '4×', label: 'Speedup' },
              ].map((item) => (
                <div key={item.label}>
                  <div
                    style={{
                      fontFamily: 'Georgia, serif',
                      fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                      fontWeight: 500,
                      lineHeight: 1,
                      color: 'var(--text-primary)',
                      marginBottom: '0.25rem',
                    }}
                  >
                    {item.num}
                  </div>
                  <div className="text-eyebrow">{item.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — body text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE_CINEMA }}
          >
            {/* Pull quote */}
            <blockquote
              style={{
                borderLeft: '3px solid var(--color-accent)',
                paddingLeft: '1.5rem',
                marginBottom: '2rem',
              }}
            >
              <p
                style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: 'clamp(1.1rem, 1.6vw, 1.3rem)',
                  fontStyle: 'italic',
                  lineHeight: 1.5,
                  color: 'var(--text-primary)',
                }}
              >
                "Intelligence emerges from the intersection of mathematical rigor and iterative experimentation."
              </p>
            </blockquote>

            <p className="text-body mb-5">
              My engineering philosophy is rooted in the belief that real-world complexity demands
              more than theoretical elegance. Every model I train, every environment I design, and
              every system I deploy pushes against the limits of what's predictable.
            </p>
            <p className="text-body mb-8">
              From custom reward functions that capture the nuance of human intent, to distributed
              training pipelines that process millions of environment steps per hour — I operate at
              the boundary between research prototypes and production-grade systems.
            </p>

            <div className="grid grid-cols-2 gap-6">
              {[
                { label: 'Specialization', value: 'Reinforcement Learning' },
                { label: 'Focus', value: 'Autonomous Systems' },
                { label: 'Approach', value: 'Research → Production' },
                { label: 'Status', value: 'Open to opportunities' },
              ].map((item) => (
                <div key={item.label}>
                  <div className="text-eyebrow mb-1">{item.label}</div>
                  <div style={{ fontSize: '0.9375rem', fontWeight: 500, color: 'var(--text-primary)' }}>
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
