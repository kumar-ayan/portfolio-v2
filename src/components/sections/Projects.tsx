'use client';

import { useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { projects, type Project } from '@/data/projects';

const EASE_CINEMA = [0.22, 1, 0.36, 1] as const;

const PROJECT_IMAGES: Record<string, string> = {
  'autonomous-navigation': '/api/images/proj-1',
  'neural-architecture-search': '/api/images/proj-2',
  'sim-to-real-transfer': '/api/images/proj-3',
  'multi-agent-coordination': '/api/images/proj-1',
  'quantized-inference': '/api/images/proj-2',
  'adaptive-interface': '/api/images/proj-3',
};

// Pixel arrow — Digitalists reference list arrow
function PixelArrow() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="53" height="14" fill="none" viewBox="0 0 106 14">
      <path d="M0 0h2v2H0zM0 4h2v2H0zM0 8h2v2H0zM0 12h2v2H0z M4 0h2v2H4zM4 4h2v2H4zM4 8h2v2H4zM4 12h2v2H4z M28 0h2v2h-2zM28 4h2v2h-2zM28 8h2v2h-2zM28 12h2v2h-2z M32 0h2v2h-2zM32 4h2v2h-2zM32 8h2v2h-2zM32 12h2v2h-2z M45 0h2v2h-2zM45 4h2v2h-2zM45 8h2v2h-2zM45 12h2v2h-2z M49 0h2v2h-2zM49 4h2v2h-2zM49 8h2v2h-2zM49 12h2v2h-2z M53 0h2v2h-2zM53 4h2v2h-2zM53 8h2v2h-2zM53 12h2v2h-2z M57 0h2v2h-2zM57 4h2v2h-2zM57 8h2v2h-2zM57 12h2v2h-2z M85 0h2v2h-2zM85 4h2v2h-2zM85 8h2v2h-2zM85 12h2v2h-2z M104 0h2v2h-2zM104 4h2v2h-2zM104 8h2v2h-2zM104 12h2v2h-2z" fill="currentColor" />
    </svg>
  );
}

export function Projects() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-8%' });

  return (
    <section
      id="projects"
      ref={ref}
      className="relative section-spacing bg-pattern"
      style={{ backgroundColor: '#f0f0f0' }}
      aria-label="Projects"
    >
      <div className="container-main">
        {/* Header */}
        <div className="flex items-end justify-between mb-12 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE_CINEMA }}
          >
            <div className="text-eyebrow mb-4">Work</div>
            <h2 className="text-heading" style={{ color: 'var(--text-primary)' }}>
              Selected Projects
            </h2>
          </motion.div>
          <motion.span
            className="text-eyebrow"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {projects.length} total
          </motion.span>
        </div>

        {/* Project rows — Digitalists reference list */}
        <div>
          {projects.map((project, i) => (
            <ProjectRow
              key={project.id}
              project={project}
              index={i}
              isInView={isInView}
              imageSrc={PROJECT_IMAGES[project.id] || '/api/images/proj-1'}
            />
          ))}
        </div>

        {/* View All Projects Link */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4, ease: EASE_CINEMA }}
          className="mt-16 flex justify-center"
        >
          <a
            href="/projects"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              backgroundColor: 'var(--text-primary)',
              color: 'var(--bg-main)',
              padding: '0.875rem 2rem',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.8125rem',
              fontWeight: 600,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'opacity 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            View All Projects
            <PixelArrow />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectRow({
  project,
  index,
  isInView,
  imageSrc,
}: {
  project: Project;
  index: number;
  isInView: boolean;
  imageSrc: string;
}) {
  const [hovered, setHovered] = (require('react') as typeof import('react')).useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 130, damping: 22, mass: 0.3 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY - 120);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.07, ease: EASE_CINEMA }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      style={{
        borderTop: '1px solid rgba(0,0,0,0.1)',
        padding: '1.75rem 0',
        position: 'relative',
        cursor: 'default',
      }}
    >
      <div className="grid grid-cols-[60px_1fr_auto] md:grid-cols-[60px_1fr_120px_auto] gap-4 md:gap-8 items-center">
        {/* Index */}
        <span className="text-eyebrow">{String(index + 1).padStart(2, '0')}</span>

        {/* Title */}
        <div>
          <h3
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(1.1rem, 2vw, 1.6rem)',
              fontWeight: 500,
              letterSpacing: '-0.015em',
              color: hovered ? '#000' : 'var(--text-primary)',
              transition: 'color 0.25s ease',
              lineHeight: 1.2,
              marginBottom: '0.25rem',
            }}
          >
            {project.title}
          </h3>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
            {project.subtitle}
          </p>
        </div>

        {/* Year — desktop */}
        <span className="text-label hidden md:block">{project.year}</span>

        {/* Arrow */}
        <div style={{ color: hovered ? 'var(--text-primary)' : 'var(--text-muted)', transition: 'color 0.25s ease' }}>
          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'inherit', textDecoration: 'none', display: 'flex' }}
              aria-label={`View ${project.title}`}
            >
              <PixelArrow />
            </a>
          ) : (
            <PixelArrow />
          )}
        </div>
      </div>

      {/* Hover image — follows cursor, Digitalists reference style */}
      <motion.div
        className="fixed pointer-events-none z-[500]"
        style={{
          x,
          y,
          width: 320,
          height: 200,
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.35s ease',
        }}
      >
        <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
          <img
            src={imageSrc}
            alt={project.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
