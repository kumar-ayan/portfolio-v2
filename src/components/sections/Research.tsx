'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { fadeUp, staggerContainer } from '@/lib/motion';
import { research, type ResearchPaper } from '@/data/research';

export function Research() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section
      id="research"
      ref={ref}
      className="section-spacing relative"
      aria-label="Research section"
    >
      <div className="container-main">
        <SectionLabel prefix="06" label="RESEARCH_PLAYGROUND" />

        <div className="grid grid-cols-1 lg:grid-cols-[4fr_6fr] gap-12 lg:gap-24">
          {/* Left: Live loss canvas */}
          <LossCanvas />

          {/* Right: Publications */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <div className="text-mono-label mb-8" style={{ color: 'hsl(56, 92%, 62%)', fontSize: '10px' }}>
              [PUBLICATIONS // ACTIVE_RESEARCH]
            </div>

            {research.map((paper) => (
              <PaperRow key={paper.id} paper={paper} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Live Training Loss Canvas
function LossCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false });
  const rafRef = useRef<number>(0);
  const stepRef = useRef(0);
  const dataRef = useRef<{ step: number; loss: number }[]>([]);

  useEffect(() => {
    if (!isInView || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;
    const maxPoints = 100;

    const animate = () => {
      stepRef.current += 2;
      const t = stepRef.current;

      const loss = 2.5 * Math.exp(-0.008 * t) + 0.1 + (Math.random() - 0.5) * 0.15;
      dataRef.current.push({ step: t, loss: Math.max(0.05, loss) });

      if (dataRef.current.length > maxPoints) {
        dataRef.current.shift();
      }

      ctx.fillStyle = 'hsl(240, 6%, 5%)';
      ctx.fillRect(0, 0, width, height);

      // Grid
      ctx.strokeStyle = 'hsla(225, 7%, 24%, 0.18)';
      ctx.lineWidth = 0.5;
      for (let i = 0; i < 5; i++) {
        const gy = (height / 5) * i;
        ctx.beginPath();
        ctx.moveTo(0, gy);
        ctx.lineTo(width, gy);
        ctx.stroke();
      }

      // Loss curve
      if (dataRef.current.length > 1) {
        ctx.beginPath();
        ctx.strokeStyle = 'hsla(56, 92%, 62%, 0.78)';
        ctx.lineWidth = 1.5;
        dataRef.current.forEach((point, i) => {
          const px = (i / maxPoints) * width;
          const py = height - (point.loss / 3) * height;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        });
        ctx.stroke();

        // Glow
        ctx.strokeStyle = 'hsla(56, 92%, 62%, 0.1)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        dataRef.current.forEach((point, i) => {
          const px = (i / maxPoints) * width;
          const py = height - (point.loss / 3) * height;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        });
        ctx.stroke();
      }

      const lastPoint = dataRef.current[dataRef.current.length - 1];
      if (lastPoint) {
        const cx = width - 10;
        const cy = height - (lastPoint.loss / 3) * height;
        ctx.beginPath();
        ctx.arc(cx, cy, 3, 0, Math.PI * 2);
        ctx.fillStyle = 'hsla(56, 92%, 62%, 0.86)';
        ctx.fill();
      }

      ctx.font = '10px monospace';
      ctx.fillStyle = 'hsla(55, 13%, 60%, 0.8)';
      ctx.fillText(`STEP: ${t}`, 8, 16);
      ctx.fillText(`LOSS: ${lastPoint?.loss.toFixed(4) || '—'}`, 8, 28);
      ctx.fillStyle = 'hsla(56, 92%, 62%, 0.45)';
      ctx.fillText('TRAINING_ACTIVE', width - 110, 16);

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isInView]);

  return (
    <div ref={containerRef}>
      <div className="text-mono-label mb-4" style={{ color: 'hsl(56, 92%, 62%)', fontSize: '10px' }}>
        [PANEL_01 // LIVE_TRAINING_LOSS]
      </div>
      <div
        className="border relative overflow-hidden"
        style={{
          borderColor: 'hsla(225, 7%, 24%, 0.3)',
          aspectRatio: '16/10',
        }}
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ display: 'block' }}
        />
      </div>
    </div>
  );
}

// Paper Row
function PaperRow({ paper }: { paper: ResearchPaper }) {
  return (
    <motion.div
      variants={fadeUp}
      className="py-7 border-b group"
      style={{ borderColor: 'hsla(225, 7%, 22%, 0.28)' }}
    >
      <div className="flex items-start gap-4">
        {/* Status dot */}
        <div className="pt-2 shrink-0">
          <motion.div
            className="w-2 h-2 rounded-full"
            style={{
              backgroundColor:
                paper.status === 'published'
                  ? '#34D399'
                  : paper.status === 'in-progress'
                    ? '#FBBF24'
                    : '#60A5FA',
            }}
            animate={{ opacity: paper.status === 'in-progress' ? 0.78 : 0.68 }}
          />
        </div>

        <div className="flex-1">
          <div className="flex items-start justify-between gap-4">
            <h4
              className="font-serif text-base font-medium leading-tight"
              style={{ color: 'hsl(55, 13%, 82%)' }}
            >
              {paper.title}
            </h4>
            {paper.link && (
              <a
                href={paper.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-mono-label shrink-0 transition-colors duration-200"
                style={{ color: 'hsl(55, 13%, 50%)', fontSize: '10px' }}
                data-cursor="OPEN"
                onMouseEnter={(e) => (e.currentTarget.style.color = 'hsl(56, 92%, 62%)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'hsl(55, 13%, 50%)')}
              >
                [ARXIV →]
              </a>
            )}
          </div>

          <p
            className="text-xs mt-2 line-clamp-2"
            style={{ color: 'hsl(55, 13%, 54%)', lineHeight: 1.65 }}
          >
            {paper.abstract}
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-3">
            {paper.venue && (
              <span className="text-mono-label" style={{ color: 'hsl(56, 92%, 62%)', fontSize: '9px' }}>
                {paper.venue}
              </span>
            )}
            <span className="text-mono-label" style={{ color: 'hsl(55, 13%, 40%)', fontSize: '9px' }}>
              {paper.year}
            </span>
            {paper.citations !== undefined && (
              <span className="text-mono-label" style={{ color: 'hsl(55, 13%, 40%)', fontSize: '9px' }}>
                {paper.citations} citations
              </span>
            )}
            <span
              className="text-mono-label"
              style={{
                color:
                  paper.status === 'published'
                    ? '#34D399'
                    : paper.status === 'in-progress'
                      ? '#FBBF24'
                      : '#60A5FA',
                fontSize: '9px',
              }}
            >
              [{paper.status.toUpperCase()}]
            </span>
          </div>

          <div className="flex flex-wrap gap-2 mt-3">
            {paper.tags.map((tag) => (
              <span
                key={tag}
                className="text-mono-label"
                style={{
                  fontSize: '8px',
                  color: 'hsl(55, 13%, 50%)',
                }}
              >
                {tag.toUpperCase()}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}


