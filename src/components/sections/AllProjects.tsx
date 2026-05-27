'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { projects, type Project } from '@/data/projects';
import Link from 'next/link';

const EASE_CINEMA = [0.22, 1, 0.36, 1] as const;

const PROJECT_IMAGES: Record<string, string> = {
  'smart-local-knowledge-assistant': '/projects/smart-assistant.avif',
  'llmvc': '/projects/llmvc.avif',
  'anonymous-location-social': '/projects/anon-social.avif',
  'ai-life-decision-simulator': '/projects/ai-life-sim.avif',
};

// Fallback logic if image doesn't exist
const getImage = (project: Project) => {
  return PROJECT_IMAGES[project.id] || project.image || '/api/images/proj-1';
};

export function AllProjects() {
  return (
    <section className="relative min-h-screen pt-32 pb-24 bg-pattern" style={{ backgroundColor: '#f0f0f0' }}>
      <div className="container-main">
        {/* Header */}
        <div className="mb-20">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-eyebrow mb-8 hover:opacity-70 transition-opacity"
            style={{ textDecoration: 'none', color: 'var(--text-secondary)' }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_CINEMA }}
            className="text-heading"
            style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}
          >
            All Projects
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE_CINEMA }}
            className="mt-6 text-body max-w-2xl"
          >
            A comprehensive dive into selected works, experiments, and applications I've built across various domains including AI/ML, Full Stack, and Mobile.
          </motion.p>
        </div>

        {/* Project List */}
        <div className="flex flex-col gap-32">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: EASE_CINEMA }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start"
    >
      {/* Visual / Image */}
      <div className="lg:col-span-7 relative group overflow-hidden" style={{ borderRadius: '4px', backgroundColor: '#e0e0e0', aspectRatio: '16/10' }}>
        <img
          src={getImage(project)}
          alt={project.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          className="transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Content */}
      <div className="lg:col-span-5 flex flex-col justify-center py-4">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-eyebrow" style={{ color: 'var(--text-secondary)' }}>{project.year}</span>
          <span className="w-1 h-1 rounded-full bg-black/20" />
          <span className="text-eyebrow" style={{ color: 'var(--text-secondary)' }}>{project.category.replace('-', ' ').toUpperCase()}</span>
        </div>

        <h2 className="mb-2" style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 3vw, 2.5rem)', lineHeight: 1.1, fontWeight: 500, letterSpacing: '-0.02em' }}>
          {project.title}
        </h2>
        <h3 className="mb-6 text-body font-medium" style={{ color: 'var(--text-secondary)' }}>
          {project.subtitle}
        </h3>

        <p className="mb-8 text-body opacity-80" style={{ lineHeight: 1.6 }}>
          {project.longDescription}
        </p>

        {project.metrics && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8 py-6 border-y" style={{ borderColor: 'rgba(0,0,0,0.1)' }}>
            {project.metrics.map((m, i) => (
              <div key={i}>
                <div className="text-eyebrow mb-1" style={{ color: 'var(--text-secondary)', fontSize: '0.65rem' }}>{m.label}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem', fontWeight: 500 }}>{m.value}</div>
              </div>
            ))}
          </div>
        )}

        <div className="mb-8">
          <div className="text-eyebrow mb-3" style={{ color: 'var(--text-secondary)' }}>Technologies</div>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  padding: '0.35rem 0.75rem',
                  backgroundColor: 'rgba(0,0,0,0.04)',
                  borderRadius: '2px',
                  border: '1px solid rgba(0,0,0,0.08)'
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Links */}
        <div className="flex flex-wrap items-center gap-4 mt-auto">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center"
              style={{
                backgroundColor: 'var(--color-accent)',
                color: '#000',
                padding: '0.75rem 1.5rem',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.75rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                textDecoration: 'none',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              Live Demo
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2"
              style={{
                backgroundColor: 'transparent',
                color: 'var(--text-primary)',
                padding: '0.75rem 1.5rem',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.75rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                textDecoration: 'none',
                border: '1px solid rgba(0,0,0,0.1)',
                transition: 'border-color 0.2s, background-color 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--text-primary)';
                e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(0,0,0,0.1)';
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
              GitHub
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
