'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLenis } from '@/context/SmoothScroll';

const EASE_CINEMA = [0.22, 1, 0.36, 1] as const;

// Digitalists: hero is DARK section with full-bleed image, light body below
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const lenis = useLenis();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 150);
    return () => clearTimeout(t);
  }, []);

  const scrollToWork = () => {
    const el = document.getElementById('projects');
    if (el) lenis?.scrollTo(el, { offset: -80 });
  };
  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) lenis?.scrollTo(el, { offset: -80 });
  };

  return (
    <section
      id="hero"
      ref={ref}
      className="relative overflow-hidden bg-pattern-light"
      style={{ minHeight: '100svh', backgroundColor: '#212121' }}
      aria-label="Hero"
    >
      {/* Full-bleed background image */}
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <img
          src="/api/images/hero-bg"
          alt=""
          role="presentation"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
        />
        {/* Dark overlays */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to right, rgba(20,20,20,0.95) 0%, rgba(20,20,20,0.65) 55%, rgba(20,20,20,0.25) 100%)' }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(20,20,20,1) 0%, rgba(20,20,20,0.25) 50%, transparent 80%)' }}
        />
      </div>

      {/* Content */}
      <div
        className="relative container-main flex flex-col"
        style={{
          zIndex: 1,
          minHeight: '100svh',
          paddingTop: 'calc(var(--nav-height) + clamp(3rem, 8vh, 6rem))',
          paddingBottom: 'clamp(5rem, 12vh, 8rem)',
          justifyContent: 'flex-end',
        }}
      >
        {/* Eyebrow */}
        {show && (
          <motion.div
            className="text-eyebrow mb-8"
            style={{ color: 'rgba(241,229,0,0.7)' }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_CINEMA }}
          >
            AI · ML Engineer — Reinforcement Learning
          </motion.div>
        )}

        {/* Single-word H1 — Digitalists pattern */}
        {show && (
          <motion.h1
            style={{ color: '#f0f0f0' }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.1, ease: EASE_CINEMA }}
          >
            <div className="text-display" style={{ color: '#f1e500', lineHeight: 0.85 }}>
              Building
            </div>
          </motion.h1>
        )}

        {/* Word-by-word scrolling sentence — Digitalists hero body text */}
        {show && (
          <motion.div
            className="text-hero-body"
            style={{ color: '#f0f0f0', maxWidth: '800px', marginTop: '1.5rem', marginBottom: '2rem' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: EASE_CINEMA }}
          >
            <WordReveal
              words={['intelligent', 'systems', 'that', 'learn,', 'adapt,', 'and', 'decide.']}
            />
          </motion.div>
        )}

        {/* CTAs */}
        {show && (
          <motion.div
            className="flex flex-wrap gap-4 mt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease: EASE_CINEMA }}
          >
            <button onClick={scrollToWork} className="btn-primary">
              View Work
            </button>
            <button onClick={scrollToContact} className="btn-ghost-dark">
              Get in touch
            </button>
          </motion.div>
        )}

        {/* Stats strip */}
        {show && (
          <motion.div
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
            style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.75 }}
          >
            {[
              { value: '6+', label: 'Projects Deployed' },
              { value: '2.4M', label: 'Env Steps / Hour' },
              { value: '4', label: 'Research Papers' },
              { value: '4×', label: 'Inference Speedup' },
            ].map((stat) => (
              <div key={stat.label}>
                <div
                  style={{
                    fontFamily: 'Georgia, serif',
                    fontSize: 'clamp(2rem, 4vw, 3rem)',
                    fontWeight: 500,
                    color: '#f1e500',
                    lineHeight: 1,
                    marginBottom: '0.375rem',
                  }}
                >
                  {stat.value}
                </div>
                <div className="text-eyebrow" style={{ color: 'rgba(240,240,240,0.4)' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Scroll indicator */}
      {show && (
        <motion.div
          className="absolute right-8 bottom-10 hidden md:flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <span className="text-eyebrow" style={{ writingMode: 'vertical-rl', fontSize: '0.6rem', color: 'rgba(240,240,240,0.35)' }}>
            Scroll
          </span>
          <motion.div
            style={{ width: '1px', height: '40px', backgroundColor: 'rgba(241,229,0,0.4)', transformOrigin: 'top' }}
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      )}
    </section>
  );
}

// Word-by-word reveal animation
function WordReveal({ words }: { words: string[] }) {
  return (
    <span style={{ display: 'inline' }}>
      {words.map((word, i) => (
        <motion.span
          key={word + i}
          style={{ display: 'inline-block', marginRight: '0.35em' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}
