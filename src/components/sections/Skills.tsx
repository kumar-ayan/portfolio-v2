'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { skillCategories } from '@/data/skills';
import { useState } from 'react';

const EASE_CINEMA = [0.22, 1, 0.36, 1] as const;

export function Skills() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });
  const [active, setActive] = useState(skillCategories[0].id);

  const activeCategory = skillCategories.find((c) => c.id === active);

  return (
    <section
      id="skills"
      ref={ref}
      className="section-spacing relative bg-pattern"
      style={{ backgroundColor: '#fff' }}
      aria-label="Skills and Technology Stack"
    >
      <div className="container-main">
        <div className="flex items-center gap-4 mb-16">
          <motion.div
            className="text-eyebrow"
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE_CINEMA }}
          >
            Stack
          </motion.div>
          <div style={{ height: '1px', flex: 1, maxWidth: '80px', backgroundColor: 'var(--color-accent)' }} />
        </div>
        <motion.h2
          className="text-heading mb-14"
          style={{ color: 'var(--text-primary)' }}
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE_CINEMA }}
        >
          Tools &amp; Technologies
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-12 lg:gap-20">
          {/* Category tabs */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE_CINEMA }}
            className="space-y-1"
          >
            {skillCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  padding: '0.875rem 1rem',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  borderLeft:
                    active === cat.id
                      ? '2px solid var(--color-accent)'
                      : '2px solid transparent',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.875rem',
                  fontWeight: active === cat.id ? 500 : 400,
                  color:
                    active === cat.id
                      ? 'var(--text-primary)'
                      : 'var(--text-secondary)',
                  transition: 'all 0.25s ease',
                  letterSpacing: '0.01em',
                }}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>

          {/* Skills grid */}
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE_CINEMA }}
            className="min-h-[300px]"
          >
            {activeCategory && (
              <div>
                <div
                  style={{
                    borderBottom: '1px solid var(--border-subtle)',
                    paddingBottom: '1rem',
                    marginBottom: '1.5rem',
                  }}
                >
                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.5rem',
                      fontWeight: 400,
                      color: 'var(--text-primary)',
                      letterSpacing: '-0.015em',
                    }}
                  >
                    {activeCategory.label}
                  </h3>
                </div>

                <div className="space-y-0">
                  {activeCategory.skills.map((skill, i) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: i * 0.05,
                        duration: 0.35,
                        ease: EASE_CINEMA,
                      }}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        gap: '1.5rem',
                        padding: '1.25rem 0',
                        borderBottom: '1px solid var(--border-subtle)',
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            fontFamily: 'var(--font-sans)',
                            fontSize: '0.9375rem',
                            fontWeight: 500,
                            color: 'var(--text-primary)',
                            marginBottom: '0.25rem',
                          }}
                        >
                          {skill.name}
                        </div>
                        <div
                          style={{
                            fontSize: '0.8125rem',
                            color: 'var(--text-secondary)',
                            lineHeight: 1.55,
                          }}
                        >
                          {skill.description}
                        </div>
                      </div>
                      <div
                        style={{
                          flexShrink: 0,
                          paddingTop: '0.125rem',
                        }}
                      >
                        <span
                          className="text-eyebrow"
                          style={{
                            color:
                              skill.level === 'expert'
                                ? 'var(--color-accent)'
                                : 'var(--text-muted)',
                            fontSize: '0.6rem',
                          }}
                        >
                          {skill.level}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
