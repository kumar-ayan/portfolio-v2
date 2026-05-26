'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 20 + 8;
        if (next >= 100) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setTimeout(() => {
            setDone(true);
            setTimeout(onComplete, 600);
          }, 200);
          return 100;
        }
        return next;
      });
    }, 60);

    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [onComplete]);

  // Today's date — Digitalists style
  const now = new Date();
  const dateStr = `${now.getDate().toString().padStart(2,'0')}.${(now.getMonth()+1).toString().padStart(2,'0')}.${String(now.getFullYear()).slice(2)} ${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}`;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[10000]"
          style={{ backgroundColor: '#f1e500' }}
          exit={{
            y: '-100%',
            transition: { duration: 0.7, ease: [0.85, 0, 0.15, 1] },
          }}
        >
          {/* Top-right: location + date */}
          <div
            style={{
              position: 'absolute',
              top: 28,
              right: 28,
              fontFamily: 'monospace',
              fontSize: '0.6875rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(0,0,0,0.55)',
            }}
          >
            {dateStr}
          </div>

          {/* Center — wordmark */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
                fontWeight: 500,
                letterSpacing: '-0.035em',
                color: '#000',
                lineHeight: 1,
              }}
            >
              Ayan Kumar
            </motion.div>
          </div>

          {/* Bottom-right: percent + dot progress */}
          <div
            style={{
              position: 'absolute',
              bottom: 28,
              right: 28,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              gap: '0.5rem',
            }}
          >
            <motion.div
              style={{
                fontFamily: 'monospace',
                fontSize: '0.9rem',
                fontWeight: 600,
                letterSpacing: '0.05em',
                color: '#000',
                textTransform: 'uppercase',
              }}
            >
              {Math.floor(Math.min(progress, 100))}%
            </motion.div>

            {/* Dot progress bar — Digitalists signature */}
            <svg width="200" height="15" viewBox="0 0 200 15" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="preloader-dots-inactive" patternUnits="userSpaceOnUse" width="4" height="4">
                  <rect x="1" y="1" width="1.75" height="1.75" fill="#afa700" />
                </pattern>
                <pattern id="preloader-dots-active" patternUnits="userSpaceOnUse" width="4" height="4">
                  <rect x="1" y="1" width="1.75" height="1.75" fill="#000" />
                </pattern>
              </defs>
              <rect
                x="0"
                y="0"
                width={Math.min(progress / 100 * 200, 200)}
                height="15"
                fill="url(#preloader-dots-active)"
              />
              <rect
                x={Math.min(progress / 100 * 200, 200)}
                y="0"
                width={200 - Math.min(progress / 100 * 200, 200)}
                height="15"
                fill="url(#preloader-dots-inactive)"
              />
            </svg>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
