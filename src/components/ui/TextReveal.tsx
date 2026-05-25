'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { EASE_OUT_EXPO } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  splitBy?: 'char' | 'word';
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
  once?: boolean;
}

export function TextReveal({
  text,
  className = '',
  delay = 0,
  staggerDelay,
  splitBy = 'word',
  tag: Tag = 'div',
  once = true,
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: '-10% 0px -10% 0px' });

  const defaultStagger = splitBy === 'char' ? 0.018 : 0.05;
  const stagger = staggerDelay ?? defaultStagger;

  const units = splitBy === 'char'
    ? text.split('')
    : text.split(' ');

  return (
    <Tag ref={ref as React.Ref<HTMLHeadingElement & HTMLParagraphElement & HTMLDivElement>} className={cn('flex flex-wrap', className)}>
      {units.map((unit, i) => (
        <span key={i} className="overflow-hidden inline-block">
          <motion.span
            className="inline-block"
            initial={{ y: '105%' }}
            animate={isInView ? { y: '0%' } : { y: '105%' }}
            transition={{
              delay: delay + i * stagger,
              duration: 0.9,
              ease: EASE_OUT_EXPO,
            }}
          >
            {unit}
            {splitBy === 'word' && i < units.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

