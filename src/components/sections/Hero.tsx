'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TextReveal } from '@/components/ui/TextReveal';
import { MagneticElement } from '@/components/ui/MagneticElement';
import { EASE_OUT_EXPO } from '@/lib/motion';
import { useLenis } from '@/context/SmoothScroll';

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const lenis = useLenis();
  const [showContent, setShowContent] = useState(false);

  // Delay hero content reveal to sync with preloader exit
  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const scrollToProjects = () => {
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
      className="relative min-h-[100svh] flex flex-col justify-center py-28 md:py-32"
      aria-label="Hero introduction"
    >
      <div className="container-main relative z-10">
        {/* Overline mono tag */}
        <motion.div
          className="text-mono-label mb-8"
          style={{ color: 'hsl(56, 92%, 62%)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={showContent ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.4, ease: EASE_OUT_EXPO }}
        >
          AI/ML ENGINEER — REINFORCEMENT LEARNING SYSTEMS
        </motion.div>

        {/* Main display heading — two lines with character reveal */}
        <div className="mb-10 md:mb-12 max-w-[1180px]">
          {showContent && (
            <>
              <TextReveal
                text="Training Deterministic"
                className="text-display"
                tag="h1"
                delay={0.5}
                splitBy="word"
                staggerDelay={0.045}
              />
              <TextReveal
                text="Agents In Non-"
                className="text-display"
                tag="div"
                delay={0.65}
                splitBy="word"
                staggerDelay={0.045}
              />
              <TextReveal
                text="Deterministic Worlds"
                className="text-display"
                tag="div"
                delay={0.8}
                splitBy="word"
                staggerDelay={0.045}
              />
            </>
          )}
        </div>

        {/* Subtitle */}
        <motion.p
          className="text-body max-w-xl mb-10"
          style={{ color: 'hsl(55, 13%, 68%)' }}
          initial={{ opacity: 0, y: 15 }}
          animate={showContent ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.8, ease: EASE_OUT_EXPO }}
        >
          Building intelligent systems at the intersection of reinforcement learning,
          autonomous agents, and production-grade AI infrastructure. Turning mathematical 
          abstractions into deployed intelligence.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-wrap gap-3"
          initial={{ opacity: 0, y: 15 }}
          animate={showContent ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.38, duration: 0.65, ease: EASE_OUT_EXPO }}
        >
          <MagneticElement strength={0.18}>
            <button
              onClick={scrollToProjects}
              className="group relative px-6 py-3 font-mono text-[11px] uppercase tracking-[0.15em] transition-colors duration-300 border"
              style={{
                borderColor: 'hsl(56, 92%, 62%)',
                color: 'hsl(56, 92%, 62%)',
              }}
              data-cursor="VIEW"
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.backgroundColor = 'hsl(56, 92%, 62%)';
                el.style.color = 'hsl(240, 9%, 3%)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.backgroundColor = 'transparent';
                el.style.color = 'hsl(56, 92%, 62%)';
              }}
            >
              [ INITIALIZE SESSION ]
            </button>
          </MagneticElement>

          <MagneticElement strength={0.18}>
            <button
              onClick={scrollToContact}
              className="px-6 py-3 font-mono text-[11px] uppercase tracking-[0.15em] transition-colors duration-300 border"
              style={{
                borderColor: 'hsla(55, 13%, 86%, 0.2)',
                color: 'hsl(55, 13%, 70%)',
              }}
              data-cursor="SSH"
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'hsl(55, 13%, 86%)';
                e.currentTarget.style.color = 'hsl(55, 13%, 86%)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'hsla(55, 13%, 86%, 0.2)';
                e.currentTarget.style.color = 'hsl(55, 13%, 70%)';
              }}
            >
              [ ESTABLISH CONNECTION ]
            </button>
          </MagneticElement>
        </motion.div>
      </div>

      {/* Scroll indicator — bottom right */}
      <motion.div
        className="absolute bottom-8 right-6 md:bottom-12 md:right-12 hidden sm:flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={showContent ? { opacity: 1 } : {}}
        transition={{ delay: 1.7, duration: 0.7 }}
      >
        <span
          className="text-mono-label"
          style={{ color: 'hsl(55, 13%, 40%)', fontSize: '9px', writingMode: 'vertical-rl' }}
        >
          SCROLL TO EXPLORE
        </span>
        <motion.div
          className="w-[1px] h-8"
          style={{ backgroundColor: 'hsl(55, 13%, 40%)' }}
          animate={{ scaleY: [0.2, 1, 0.2] }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>
    </section>
  );
}


