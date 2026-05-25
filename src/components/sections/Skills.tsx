'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { EASE_OUT_EXPO, fadeUp, staggerContainer } from '@/lib/motion';
import { skillCategories } from '@/data/skills';

export function Skills() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });
  const [activeCategory, setActiveCategory] = useState(skillCategories[0].id);

  const activeSkills = skillCategories.find((c) => c.id === activeCategory);

  return (
    <section
      id="skills"
      ref={ref}
      className="section-spacing relative"
      aria-label="Skills section"
    >
      <div className="container-main">
        <SectionLabel prefix="04" label="SYSTEMS_ECOSYSTEM" />

        <div className="grid grid-cols-1 lg:grid-cols-[3fr_7fr] gap-12 lg:gap-24">
          {/* Left: Category navigation */}
          <motion.div
            className="space-y-2 lg:pt-1"
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {skillCategories.map((category) => (
              <motion.button
                key={category.id}
                variants={fadeUp}
                onClick={() => setActiveCategory(category.id)}
                className="w-full text-left px-0 py-3 transition-colors duration-300 group"
                style={{
                  opacity: activeCategory === category.id ? 1 : 0.55,
                }}
                data-cursor="SELECT"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="text-mono-label transition-all duration-200"
                    style={{
                      color:
                        activeCategory === category.id
                          ? 'hsl(56, 92%, 62%)'
                          : 'hsl(55, 13%, 40%)',
                      fontSize: '10px',
                    }}
                  >
                    [{category.prefix}]
                  </span>
                  <span
                    className="font-mono text-xs uppercase tracking-[0.15em] transition-all duration-200"
                    style={{
                      color:
                        activeCategory === category.id
                          ? 'hsl(55, 13%, 86%)'
                          : 'hsl(55, 13%, 50%)',
                    }}
                  >
                    {category.label}
                  </span>
                </div>
              </motion.button>
            ))}
          </motion.div>

          {/* Right: Skills workspace */}
          <div className="min-h-[360px]">
            <AnimatePresence mode="wait">
              {activeSkills && (
                <motion.div
                  key={activeSkills.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
                >
                  {/* Category header */}
                  <div className="mb-10">
                    <div
                      className="text-mono-label mb-2"
                      style={{ color: 'hsl(56, 92%, 62%)', fontSize: '10px' }}
                    >
                      [{activeSkills.prefix} {'//'} {activeSkills.label.toUpperCase().replace(/\s+/g, '_')}]
                    </div>
                    <div className="divider-dotted w-full opacity-70" />
                  </div>

                  {/* Skills list */}
                  <div className="space-y-0">
                    {activeSkills.skills.map((skill, i) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: i * 0.06,
                          duration: 0.4,
                          ease: EASE_OUT_EXPO,
                        }}
                        className="group py-5 border-b"
                        style={{ borderColor: 'hsla(225, 7%, 22%, 0.28)' }}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <span
                                className="font-sans text-sm font-medium"
                                style={{ color: 'hsl(55, 13%, 86%)' }}
                              >
                                {skill.name}
                              </span>
                              <span
                                className="text-mono-label"
                                style={{
                                  fontSize: '8px',
                                  color: 'hsl(56, 92%, 62%)',
                                  opacity: 0.72,
                                }}
                              >
                                {skill.level.toUpperCase()}
                              </span>
                            </div>
                            <p
                              className="text-xs"
                              style={{ color: 'hsl(55, 13%, 52%)', lineHeight: 1.65 }}
                            >
                              {skill.description}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

