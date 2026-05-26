'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function CustomCursor() {
  const isMobile = useMediaQuery('(max-width: 1024px)');
  const reducedMotion = useReducedMotion();
  const [isHovering, setIsHovering] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springCfg = { stiffness: 150, damping: 20, mass: 0.12 };
  const x = useSpring(cursorX, springCfg);
  const y = useSpring(cursorY, springCfg);

  useEffect(() => {
    if (isMobile || reducedMotion) return;

    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest('a, button, [role="button"], input, textarea, select');
      setIsHovering(!!el);
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    document.documentElement.style.cursor = 'none';
    document.body.style.cursor = 'none';

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.documentElement.style.cursor = '';
      document.body.style.cursor = '';
    };
  }, [isMobile, reducedMotion, cursorX, cursorY]);

  if (isMobile || reducedMotion) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none"
      style={{ x, y, translateX: '-50%', translateY: '-50%' }}
    >
      <motion.div
        animate={{
          width: isHovering ? 42 : 9,
          height: isHovering ? 42 : 9,
          borderRadius: '50%',
          // On dark sections: yellow cursor; on light: black
          backgroundColor: isHovering ? 'transparent' : '#f1e500',
          border: isHovering ? '1.5px solid #000' : '1.5px solid transparent',
        }}
        transition={{ type: 'spring', stiffness: 120, damping: 18 }}
      />
    </motion.div>
  );
}
