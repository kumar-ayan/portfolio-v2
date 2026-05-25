'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function CustomCursor() {
  const isMobile = useMediaQuery('(max-width: 1024px)');
  const reducedMotion = useReducedMotion();
  const [isHovering, setIsHovering] = useState(false);
  const [cursorLabel, setCursorLabel] = useState('');

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springConfig = { stiffness: 110, damping: 24, mass: 0.18 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  useEffect(() => {
    if (isMobile || reducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button, [data-cursor], [role="button"]');
      if (interactive) {
        setIsHovering(true);
        const label = interactive.getAttribute('data-cursor') || 'VIEW';
        setCursorLabel(label);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button, [data-cursor], [role="button"]');
      if (interactive) {
        setIsHovering(false);
        setCursorLabel('');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    // Hide default cursor
    document.documentElement.style.cursor = 'none';
    document.body.style.cursor = 'none';

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.documentElement.style.cursor = '';
      document.body.style.cursor = '';
    };
  }, [isMobile, reducedMotion, cursorX, cursorY]);

  if (isMobile || reducedMotion) return null;

  return (
    <>
      {/* Cursor dot */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{
          x,
          y,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="flex items-center justify-center"
          animate={{
            width: isHovering ? 64 : 7,
            height: isHovering ? 64 : 7,
            borderRadius: isHovering ? 32 : 4,
          }}
          transition={{ type: 'spring', stiffness: 90, damping: 22 }}
          style={{
            border: isHovering ? '1px solid hsla(56, 92%, 62%, 0.72)' : 'none',
            backgroundColor: isHovering ? 'transparent' : 'hsla(56, 92%, 62%, 0.8)',
          }}
        >
          {isHovering && cursorLabel && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-mono-label text-accent"
              style={{ fontSize: '9px', letterSpacing: '0.15em' }}
            >
              [{cursorLabel}]
            </motion.span>
          )}
        </motion.div>
      </motion.div>
    </>
  );
}

