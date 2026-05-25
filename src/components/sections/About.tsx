'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { TextReveal } from '@/components/ui/TextReveal';
import { EASE_OUT_EXPO, fadeUp, staggerContainer } from '@/lib/motion';

export function About() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section
      id="about"
      ref={ref}
      className="section-spacing relative"
      aria-label="About section"
    >
      <div className="container-main">
        <SectionLabel prefix="02" label="MINDSET" />

        <div className="grid grid-cols-1 lg:grid-cols-[3fr_7fr] gap-12 lg:gap-24">
          {/* Left column: Mono caption */}
          <motion.div
            className="text-mono-label lg:pt-3"
            style={{ color: 'hsl(55, 13%, 40%)' }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.4, ease: EASE_OUT_EXPO }}
          >
            OP_02 // AGENT_MINDSET
          </motion.div>

          {/* Right column: Narrative */}
          <div>
            {/* The Thesis */}
            <div className="mb-16">
              <TextReveal
                text="I build systems that learn, adapt, and make decisions in environments designed to break them."
                className="text-section-heading mb-10 max-w-4xl"
                tag="h2"
                delay={0.4}
                splitBy="word"
              />
            </div>

            {/* The Craft */}
            <motion.div
              className="space-y-8 mb-16"
              variants={staggerContainer}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
            >
              <motion.p
                variants={fadeUp}
                className="text-body max-w-[720px]"
                style={{ color: 'hsl(55, 13%, 66%)' }}
              >
                My engineering philosophy is rooted in the belief that intelligence emerges from 
                the intersection of mathematical rigor and iterative experimentation. Every model 
                I train, every environment I design, and every system I deploy is built with the 
                understanding that real-world complexity demands more than theoretical elegance.
              </motion.p>

              <motion.p
                variants={fadeUp}
                className="text-body max-w-[720px]"
                style={{ color: 'hsl(55, 13%, 66%)' }}
              >
                From custom reward functions that capture the nuance of human intent, to 
                distributed training pipelines that process millions of environment steps per hour — 
                I operate at the boundary between research prototypes and production-grade systems. 
                The gap between a promising paper and a deployed agent is where I do my best work.
              </motion.p>
            </motion.div>

            {/* The Horizon — Pull quote */}
            <motion.blockquote
              className="relative pl-6 py-1 max-w-2xl"
              style={{
                borderLeft: '1px solid hsla(56, 92%, 62%, 0.55)',
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.8, duration: 0.6, ease: EASE_OUT_EXPO }}
            >
              <p
                className="text-body italic"
                style={{ color: 'hsl(55, 13%, 78%)' }}
              >
                &quot;The future belongs to systems that can reason under uncertainty, learn from 
                sparse feedback, and adapt without human intervention. I&apos;m building that future, 
                one policy gradient at a time.&quot;
              </p>
            </motion.blockquote>

          </div>
        </div>
      </div>
    </section>
  );
}

