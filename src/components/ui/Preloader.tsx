'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EASE_IN_OUT_EXPO } from '@/lib/motion';

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'boot' | 'loading' | 'exit'>('boot');
  const [logs, setLogs] = useState<string[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const bootLogs = [
      '[SYSTEM] Initializing neural runtime...',
      '[CUDA] Detecting GPU devices...',
      '[CUDA] NVIDIA A100 80GB — ACTIVE',
      '[MODEL] Loading policy network weights...',
      '[STATUS] All systems operational',
    ];

    // Boot phase: type out logs
    let logIndex = 0;
    const logInterval = setInterval(() => {
      if (logIndex < bootLogs.length) {
        setLogs((prev) => [...prev, bootLogs[logIndex]]);
        logIndex++;
      } else {
        clearInterval(logInterval);
        setPhase('loading');
      }
    }, 120);

    return () => clearInterval(logInterval);
  }, []);

  useEffect(() => {
    if (phase !== 'loading') return;

    // Progress bar
    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setPhase('exit');
          setTimeout(onComplete, 600);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 80);

    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [phase, onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'exit' ? null : null}
      <motion.div
        className="fixed inset-0 z-[10000] flex flex-col justify-end"
        style={{ backgroundColor: '#f1e500' }}
        exit={{
          y: '-100%',
          transition: { duration: 0.6, ease: EASE_IN_OUT_EXPO },
        }}
        animate={phase === 'exit' ? { y: '-100%' } : { y: 0 }}
        transition={{ duration: 0.6, ease: EASE_IN_OUT_EXPO }}
      >
        {/* Terminal log area */}
        <div className="flex-1 flex flex-col justify-end p-6 md:p-8 overflow-hidden">
          <div className="max-w-2xl">
            {logs.map((log, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15 }}
                className="font-mono text-[11px] md:text-[13px] leading-relaxed"
                style={{
                  color: log.includes('[CUDA]') || log.includes('[STATUS]')
                    ? '#080809'
                    : 'rgba(8, 8, 9, 0.7)',
                  letterSpacing: '0.05em',
                }}
              >
                {log}
              </motion.div>
            ))}

            {/* Blinking cursor */}
            <motion.span
              className="inline-block w-2 h-4 mt-1"
              style={{ backgroundColor: '#080809' }}
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          </div>
        </div>

        {/* Progress bar */}
        <div className="p-6 md:p-8">
          {/* Dotted progress track */}
          <div className="relative h-[2px] w-full mb-4">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'radial-gradient(circle, rgba(8, 8, 9, 0.3) 1px, transparent 1.5px)',
                backgroundSize: '8px 8px',
              }}
            />
            <motion.div
              className="absolute inset-y-0 left-0"
              style={{ backgroundColor: '#080809' }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>

          <div className="flex justify-between font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: 'rgba(8, 8, 9, 0.6)' }}>
            <span>LATENT OPERATOR // BOOT SEQUENCE</span>
            <span>{Math.min(Math.floor(progress), 100)}%</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

