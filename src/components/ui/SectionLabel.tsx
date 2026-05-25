'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { EASE_OUT_EXPO } from '@/lib/motion';
import { DottedBorder } from './DottedBorder';

interface SectionLabelProps {
  prefix: string;
  label: string;
  className?: string;
}

export function SectionLabel({ prefix, label, className = '' }: SectionLabelProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <div ref={ref} className={className}>
      <motion.div
        className="text-mono-label mb-8"
        style={{ color: 'hsl(55, 13%, 58%)' }}
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
      >
        [{prefix} {'//'} {label}]
      </motion.div>
      <DottedBorder className="w-full mb-16 md:mb-24" delay={0.1} />
    </div>
  );
}

