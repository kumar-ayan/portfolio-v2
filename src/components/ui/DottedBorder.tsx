'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { EASE_OUT_EXPO } from '@/lib/motion';

interface DottedBorderProps {
  className?: string;
  direction?: 'horizontal' | 'vertical';
  delay?: number;
}

export function DottedBorder({
  className = '',
  direction = 'horizontal',
  delay = 0,
}: DottedBorderProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        [direction === 'horizontal' ? 'height' : 'width']: '2px',
        backgroundImage:
          'radial-gradient(circle, hsla(55, 13%, 84%, 0.09) 1px, transparent 1.5px)',
        backgroundSize: '10px 10px',
        transformOrigin: direction === 'horizontal' ? 'left center' : 'center top',
      }}
      initial={{
        [direction === 'horizontal' ? 'scaleX' : 'scaleY']: 0,
      }}
      animate={
        isInView
          ? { [direction === 'horizontal' ? 'scaleX' : 'scaleY']: 1 }
          : {}
      }
      transition={{
        delay,
        duration: 0.9,
        ease: EASE_OUT_EXPO,
      }}
    />
  );
}

