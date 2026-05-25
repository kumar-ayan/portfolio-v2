'use client';

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import Lenis from 'lenis';
import { LENIS_CONFIG } from '@/lib/motion';

interface SmoothScrollContextValue {
  lenis: Lenis | null;
}

const SmoothScrollContext = createContext<SmoothScrollContextValue>({ lenis: null });

export function useLenis() {
  return useContext(SmoothScrollContext).lenis;
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const lenisInstance = new Lenis({
      duration: LENIS_CONFIG.duration,
      easing: LENIS_CONFIG.easing,
      orientation: LENIS_CONFIG.orientation,
      smoothWheel: LENIS_CONFIG.smoothWheel,
      wheelMultiplier: LENIS_CONFIG.wheelMultiplier,
      touchMultiplier: LENIS_CONFIG.touchMultiplier,
    });

    let isMounted = true;
    queueMicrotask(() => {
      if (isMounted) setLenis(lenisInstance);
    });

    function raf(time: number) {
      lenisInstance.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    }

    rafRef.current = requestAnimationFrame(raf);

    return () => {
      isMounted = false;
      cancelAnimationFrame(rafRef.current);
      lenisInstance.destroy();
    };
  }, []);

  return (
    <SmoothScrollContext.Provider value={{ lenis }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}

