'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { experiences } from '@/data/experience';

const EASE_CINEMA = [0.22, 1, 0.36, 1] as const;

export function Experience() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section
      id="experience"
      ref={ref}
      className="section-spacing relative bg-pattern"
      style={{ backgroundColor: '#f0f0f0' }}
      aria-label="Experience"
    >
      <div className="container-main">
        <div className="flex items-center gap-4 mb-12">
          <div className="text-eyebrow">Experience</div>
          <div style={{ height: '1px', flex: 1, maxWidth: '80px', backgroundColor: 'var(--color-accent)' }} />
        </div>
        <motion.h2
          className="text-heading mb-16"
          style={{ color: 'var(--text-primary)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE_CINEMA }}
        >
          Career Timeline
        </motion.h2>

        <div className="space-y-0">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.09, ease: EASE_CINEMA }}
              style={{
                borderTop: '1px solid rgba(0,0,0,0.1)',
                padding: '2.5rem 0',
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '0',
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 md:gap-12">
                {/* Left — period */}
                <div>
                  <div className="text-eyebrow mb-2" style={{ color: 'var(--text-muted)' }}>{exp.period}</div>
                  {exp.isCurrent && (
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.25rem 0.75rem', backgroundColor: 'var(--color-accent)', fontSize: '0.625rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                      Current
                    </div>
                  )}
                </div>

                {/* Right — content */}
                <div>
                  <h3
                    style={{
                      fontFamily: 'Georgia, serif',
                      fontSize: 'clamp(1.3rem, 2vw, 1.8rem)',
                      fontWeight: 500,
                      color: 'var(--text-primary)',
                      letterSpacing: '-0.015em',
                      marginBottom: '0.25rem',
                    }}
                  >
                    {exp.role}
                  </h3>
                  <div style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', marginBottom: '1rem', fontWeight: 500 }}>
                    {exp.company}
                  </div>
                  <p className="text-body mb-5" style={{ maxWidth: '560px' }}>
                    {exp.description}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {exp.highlights.map((h, hi) => (
                      <li key={hi} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                        <span style={{ color: 'var(--color-accent)', flexShrink: 0, fontSize: '1rem', lineHeight: 1.4, fontWeight: 700 }}>→</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {exp.technologies.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        style={{
                          padding: '0.25rem 0.625rem',
                          border: '1px solid rgba(0,0,0,0.12)',
                          fontSize: '0.625rem',
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          color: 'var(--text-muted)',
                          backgroundColor: 'rgba(255,255,255,0.7)',
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
