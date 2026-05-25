'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export function BackgroundSystem() {
  const reducedMotion = useReducedMotion();
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
      {/* Layer 0: Solid canvas base */}
      <div className="absolute inset-0" style={{ backgroundColor: 'hsl(240, 9%, 3%)' }} />
      
      {/* Layer 1: Atmospheric gradients */}
      {!isMobile && <AmbientGradients reducedMotion={reducedMotion} />}
      
      {/* Layer 2: Dotted blueprint grid */}
      <DottedGrid />
      
      {/* Layer 3: Mouse spotlight */}
      {!isMobile && !reducedMotion && <MouseSpotlamp />}
    </div>
  );
}

// ========================================
// Atmospheric Gradients
// ========================================

function AmbientGradients({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <div className="absolute inset-0">
      {/* Upper right gradient */}
      <motion.div
        className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] rounded-full"
        style={{
          background: 'radial-gradient(circle, hsla(222, 22%, 18%, 0.12), transparent 68%)',
          filter: 'blur(150px)',
        }}
        animate={reducedMotion ? {} : {
          x: [0, 18, -12, 0],
          y: [0, -12, 18, 0],
        }}
        transition={{
          duration: 64,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      {/* Lower left gradient */}
      <motion.div
        className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, hsla(56, 92%, 62%, 0.026), transparent 72%)',
          filter: 'blur(150px)',
        }}
        animate={reducedMotion ? {} : {
          x: [0, -14, 10, 0],
          y: [0, 12, -14, 0],
        }}
        transition={{
          duration: 72,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  );
}

// ========================================
// Dotted Blueprint Grid
// ========================================

function DottedGrid() {
  return (
    <div
      className="absolute inset-0"
      style={{
        backgroundImage:
          'radial-gradient(circle, hsla(55, 13%, 84%, 0.06) 1px, transparent 1.5px)',
        backgroundSize: '96px 96px',
        opacity: 0.45,
        maskImage: 'radial-gradient(ellipse at 50% 24%, black 8%, transparent 62%)',
        WebkitMaskImage: 'radial-gradient(ellipse at 50% 24%, black 8%, transparent 62%)',
      }}
    />
  );
}

// ========================================
// Mouse Spotlight Effect
// ========================================

function MouseSpotlamp() {
  const spotRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      // Lerp for smooth following
      currentPos.current.x += (mousePos.current.x - currentPos.current.x) * 0.08;
      currentPos.current.y += (mousePos.current.y - currentPos.current.y) * 0.08;

      if (spotRef.current) {
        spotRef.current.style.background = `radial-gradient(640px circle at ${currentPos.current.x}px ${currentPos.current.y}px, rgba(242, 225, 92, 0.025), transparent 64%)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return <div ref={spotRef} className="absolute inset-0" />;
}

