'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { research, type ResearchPaper } from '@/data/research';

const EASE_CINEMA = [0.22, 1, 0.36, 1] as const;

const STATUS_COLORS: Record<string, string> = {
  published: '#2FB65D',
  'in-progress': '#f1e500',
  preprint: '#313131',
};

// Pixel arrow
function PixelArrow() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="53" height="14" fill="none" viewBox="0 0 106 14">
      <path d="M0 0h2v2H0zM0 4h2v2H0zM0 8h2v2H0zM0 12h2v2H0z M4 0h2v2H4zM4 4h2v2H4zM4 8h2v2H4zM4 12h2v2H4z M28 0h2v2h-2zM28 4h2v2h-2zM28 8h2v2h-2zM28 12h2v2h-2z M32 0h2v2h-2zM32 4h2v2h-2zM32 8h2v2h-2zM32 12h2v2h-2z M45 0h2v2h-2zM45 4h2v2h-2zM45 8h2v2h-2zM45 12h2v2h-2z M49 0h2v2h-2zM49 4h2v2h-2zM49 8h2v2h-2zM49 12h2v2h-2z M53 0h2v2h-2zM53 4h2v2h-2zM53 8h2v2h-2zM53 12h2v2h-2z M57 0h2v2h-2zM57 4h2v2h-2zM57 8h2v2h-2zM57 12h2v2h-2z M85 0h2v2h-2zM85 4h2v2h-2zM85 8h2v2h-2zM85 12h2v2h-2z M104 0h2v2h-2zM104 4h2v2h-2zM104 8h2v2h-2zM104 12h2v2h-2z" fill="currentColor" />
    </svg>
  );
}

export function Research() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section
      id="research"
      ref={ref}
      className="section-spacing relative bg-pattern"
      style={{ backgroundColor: '#fff' }}
      aria-label="Research"
    >
      <div className="container-main">
        <div className="flex items-center gap-4 mb-12">
          <div className="text-eyebrow">Research</div>
          <div style={{ height: '1px', flex: 1, maxWidth: '80px', backgroundColor: 'var(--color-accent)' }} />
        </div>

        <motion.h2
          className="text-heading mb-14"
          style={{ color: 'var(--text-primary)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE_CINEMA }}
        >
          Publications &<br />Active Research
        </motion.h2>

        <div>
          {research.map((paper, i) => (
            <motion.div
              key={paper.id}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.09, ease: EASE_CINEMA }}
              style={{
                borderTop: '1px solid rgba(0,0,0,0.1)',
                padding: '1.75rem 0',
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                gap: '2rem',
                alignItems: 'start',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <div
                    style={{
                      width: '7px', height: '7px', borderRadius: '50%', flexShrink: 0, marginTop: '0.35rem',
                      backgroundColor: STATUS_COLORS[paper.status] || '#313131',
                    }}
                  />
                  <h4
                    style={{
                      fontFamily: 'Georgia, serif',
                      fontSize: 'clamp(1rem, 1.4vw, 1.15rem)',
                      fontWeight: 500,
                      color: 'var(--text-primary)',
                      lineHeight: 1.3,
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {paper.title}
                  </h4>
                </div>
                <p style={{ marginLeft: '1.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.65, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {paper.abstract}
                </p>
                <div style={{ marginLeft: '1.5rem', marginTop: '0.625rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                  {paper.venue && <span style={{ fontSize: '0.75rem', fontStyle: 'italic', color: 'var(--text-muted)' }}>{paper.venue}</span>}
                  <span className="text-label">{paper.year}</span>
                  {paper.citations !== undefined && <span className="text-label">{paper.citations} citations</span>}
                </div>
              </div>
              <div style={{ paddingTop: '0.2rem' }}>
                {paper.link && (
                  <a href={paper.link} target="_blank" rel="noopener noreferrer" aria-label="Read paper" style={{ color: 'var(--text-muted)', transition: 'color 0.2s', textDecoration: 'none' }} onMouseEnter={e => (e.currentTarget.style.color = '#000')} onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}>
                    <PixelArrow />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
