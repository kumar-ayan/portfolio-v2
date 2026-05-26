'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useMediaQuery } from '@/hooks/useMediaQuery';

// Digitalists: light background with subtle dot pattern
export function BackgroundSystem() {
  const reducedMotion = useReducedMotion();
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
      {/* Light base canvas */}
      <div className="absolute inset-0" style={{ backgroundColor: 'var(--bg-canvas)' }} />
      {/* Mouse spotlight — very subtle warm tint */}
      {!isMobile && !reducedMotion && <MouseSpotlight />}
    </div>
  );
}

function MouseSpotlight() {
  const ref = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const raf = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => { mouse.current = { x: e.clientX, y: e.clientY }; };
    const tick = () => {
      current.current.x += (mouse.current.x - current.current.x) * 0.06;
      current.current.y += (mouse.current.y - current.current.y) * 0.06;
      if (ref.current) {
        ref.current.style.background = `radial-gradient(400px circle at ${current.current.x}px ${current.current.y}px, rgba(241,229,0,0.06) 0%, transparent 70%)`;
      }
      raf.current = requestAnimationFrame(tick);
    };
    window.addEventListener('mousemove', onMove);
    raf.current = requestAnimationFrame(tick);
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf.current); };
  }, []);

  return <div ref={ref} className="absolute inset-0" />;
}
