'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { fadeUp, staggerContainer } from '@/lib/motion';
import { experiences } from '@/data/experience';

export function Experience() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.8], ['0%', '100%']);

  return (
    <section
      id="experience"
      ref={ref}
      className="section-spacing relative"
      aria-label="Experience section"
    >
      <div className="container-main">
        <SectionLabel prefix="07" label="DEVELOPMENT_LOG" />

        <div className="relative">
          {/* Timeline vertical line */}
          <div
            className="absolute left-0 md:left-[100px] top-0 bottom-0 w-[1px]"
            style={{ backgroundColor: 'hsla(225, 7%, 22%, 0.24)' }}
          >
            <motion.div
              className="absolute top-0 left-0 w-full origin-top"
              style={{
                height: lineHeight,
                backgroundColor: 'hsla(56, 92%, 62%, 0.8)',
              }}
            />
          </div>

          <motion.div
            className="space-y-0"
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {experiences.map((exp) => (
              <ExperienceEntry key={exp.id} experience={exp} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ExperienceEntry({
  experience,
}: {
  experience: (typeof experiences)[0];
}) {
  return (
    <motion.div
      variants={fadeUp}
      className="relative pl-8 md:pl-[140px] py-10 md:py-14"
    >
      {/* Date column (desktop) */}
      <div className="hidden md:block absolute left-0 top-8 w-[85px] text-right">
        <span
          className="text-mono-label"
          style={{ color: 'hsl(55, 13%, 40%)', fontSize: '10px' }}
        >
          {experience.period.split(' — ')[0]}
        </span>
      </div>

      {/* Timeline dot */}
      <motion.div
        className="absolute left-[-4px] md:left-[96px] top-10 md:top-10 w-[9px] h-[9px] rounded-full border-2"
        style={{
          borderColor: experience.isCurrent
            ? 'hsl(56, 92%, 62%)'
            : 'hsl(225, 7%, 20%)',
          backgroundColor: experience.isCurrent
            ? 'hsl(56, 92%, 62%)'
            : 'hsl(240, 9%, 3%)',
        }}
        animate={{ opacity: experience.isCurrent ? 1 : 0.62 }}
        transition={{ duration: 0.5 }}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
      />

      <div>
        <div
          className="text-mono-label mb-2"
          style={{ color: 'hsl(56, 92%, 62%)', fontSize: '11px' }}
        >
          {experience.version} {'//'} {experience.role.toUpperCase().replace(/\s+/g, '_')}
        </div>

        <div className="md:hidden text-mono-label mb-2" style={{ color: 'hsl(55, 13%, 40%)', fontSize: '10px' }}>
          {experience.period}
        </div>

        <h3
          className="font-serif text-xl md:text-2xl font-medium mb-1"
          style={{ color: 'hsl(55, 13%, 82%)' }}
        >
          {experience.role}
        </h3>
        <p className="text-sm mb-5" style={{ color: 'hsl(56, 92%, 62%)' }}>
          {experience.company} — {experience.period}
        </p>

        <p
          className="text-body mb-6 max-w-2xl"
          style={{ color: 'hsl(55, 13%, 60%)' }}
        >
          {experience.description}
        </p>

        <ul className="space-y-2 mb-4">
          {experience.highlights.map((highlight, i) => (
            <li
              key={i}
              className="text-sm flex items-start gap-3"
              style={{ color: 'hsl(55, 13%, 60%)' }}
            >
              <span style={{ color: 'hsl(56, 92%, 62%)' }}>→</span>
              {highlight}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2">
          {experience.technologies.map((tech) => (
            <span
              key={tech}
              className="text-mono-label"
              style={{
                fontSize: '9px',
                color: 'hsl(55, 13%, 50%)',
              }}
            >
              {tech.toUpperCase()}
            </span>
          ))}
        </div>
      </div>

      <div className="divider-dotted w-full mt-8 md:mt-12" />
    </motion.div>
  );
}

