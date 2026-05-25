'use client';

import { useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { EASE_OUT_EXPO, fadeUp, staggerContainer } from '@/lib/motion';
import { projects, type Project } from '@/data/projects';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export function Projects() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });
  const isMobile = useMediaQuery('(max-width: 1024px)');

  return (
    <section
      id="projects"
      ref={ref}
      className="section-spacing relative"
      aria-label="Projects section"
    >
      <div className="container-main">
        <SectionLabel prefix="05" label="VERIFIED_SYSTEMS" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {projects.map((project, i) => (
            <ProjectRow
              key={project.id}
              project={project}
              index={i}
              isMobile={isMobile}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ProjectRow({
  project,
  index,
  isMobile,
}: {
  project: Project;
  index: number;
  isMobile: boolean;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 90, damping: 24, mass: 0.25 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile || !rowRef.current) return;
    const rect = rowRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - 160);
    mouseY.set(e.clientY - rect.top - 90);
  };

  return (
    <motion.div
      ref={rowRef}
      variants={fadeUp}
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      data-cursor="VIEW"
    >
      <div className="divider-dotted w-full" />

      <div className="py-8 md:py-11 grid grid-cols-1 md:grid-cols-[90px_1fr_auto] gap-5 md:gap-10 md:items-start">
        <span
          className="text-mono-label shrink-0"
          style={{ color: 'hsl(56, 92%, 62%)', fontSize: '10px' }}
        >
          [{project.caseNumber}]
        </span>

        <div>
          <h3
            className="text-subsection transition-colors duration-300"
            style={{
              color: isHovered ? 'hsl(56, 92%, 62%)' : 'hsl(55, 13%, 84%)',
            }}
          >
            {project.title}
          </h3>
          <p className="text-body mt-4 max-w-2xl" style={{ color: 'hsl(55, 13%, 56%)' }}>
            {project.description}
          </p>
        </div>

        <div className="flex flex-wrap md:flex-col gap-2 md:items-end shrink-0">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="text-mono-label"
              style={{
                fontSize: '9px',
                color: 'hsl(55, 13%, 52%)',
              }}
            >
              {tech.toUpperCase()}
            </span>
          ))}
          <span
            className="text-mono-label hidden md:block pt-3"
            style={{ color: 'hsl(55, 13%, 36%)', fontSize: '10px' }}
          >
            {project.year}
          </span>
        </div>
      </div>

      {/* Floating preview panel (desktop only) */}
      {!isMobile && isHovered && (
        <motion.div
          className="absolute z-10 pointer-events-none"
          style={{
            x,
            y,
            width: 340,
            height: 190,
          }}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.28, ease: EASE_OUT_EXPO }}
        >
          <div
            className="w-full h-full flex flex-col justify-end p-5 border"
            style={{
              backgroundColor: 'hsla(240, 6%, 6%, 0.96)',
              borderColor: 'hsla(55, 13%, 84%, 0.12)',
              boxShadow: '0 24px 70px rgba(0,0,0,0.38)',
            }}
          >
            <div className="space-y-1">
              <div
                className="text-mono-label"
                style={{ color: 'hsl(56, 92%, 62%)', fontSize: '8px' }}
              >
                [{project.caseNumber} {'//'} PREVIEW]
              </div>
              <p
                className="text-xs line-clamp-2"
                style={{ color: 'hsl(55, 13%, 70%)' }}
              >
                {project.description}
              </p>
              {project.metrics && (
                <div className="flex gap-3 pt-1">
                  {project.metrics.slice(0, 2).map((m) => (
                    <div key={m.label} className="text-mono-label" style={{ fontSize: '7px', color: 'hsl(55, 13%, 50%)' }}>
                      {m.label}: <span style={{ color: 'hsl(56, 92%, 62%)' }}>{m.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {index === projects.length - 1 && <div className="divider-dotted w-full" />}
    </motion.div>
  );
}

