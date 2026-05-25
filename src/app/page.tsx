'use client';

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { SmoothScrollProvider } from '@/context/SmoothScroll';
import { BackgroundSystem } from '@/components/background/BackgroundSystem';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { Preloader } from '@/components/ui/Preloader';
import { Navigation } from '@/components/layout/Navigation';
import { Hero } from '@/components/sections/Hero';

// Dynamic imports for below-fold sections
const About = dynamic(() => import('@/components/sections/About').then(m => ({ default: m.About })), {
  ssr: false,
});
const Expertise = dynamic(() => import('@/components/sections/Expertise').then(m => ({ default: m.Expertise })), {
  ssr: false,
});
const Skills = dynamic(() => import('@/components/sections/Skills').then(m => ({ default: m.Skills })), {
  ssr: false,
});
const Projects = dynamic(() => import('@/components/sections/Projects').then(m => ({ default: m.Projects })), {
  ssr: false,
});
const Research = dynamic(() => import('@/components/sections/Research').then(m => ({ default: m.Research })), {
  ssr: false,
});
const Experience = dynamic(() => import('@/components/sections/Experience').then(m => ({ default: m.Experience })), {
  ssr: false,
});
const Contact = dynamic(() => import('@/components/sections/Contact').then(m => ({ default: m.Contact })), {
  ssr: false,
});

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);

  const handlePreloaderComplete = useCallback(() => {
    setIsLoaded(true);
  }, []);

  return (
    <SmoothScrollProvider>
      {/* Preloader — CUDA Boot Sequence */}
      {!isLoaded && <Preloader onComplete={handlePreloaderComplete} />}

      {/* Custom cursor (desktop only) */}
      <CustomCursor />

      {/* Scroll progress indicator */}
      <ScrollProgress />

      {/* Background atmosphere system */}
      <BackgroundSystem />

      {/* Navigation HUD */}
      <Navigation />

      {/* Main content */}
      <main id="main-content">
        {/* THE HOOK — Hero Section */}
        <Hero />

        {/* THE CORE — About Section */}
        <About />

        {/* THE DEEP DIVE — Expertise (Pinned) */}
        <Expertise />

        {/* THE TOOLKIT — Skills Matrix */}
        <Skills />

        {/* THE EVIDENCE — Projects */}
        <Projects />

        {/* THE PLAYGROUND — Research */}
        <Research />

        {/* THE RECORD — Experience Timeline */}
        <Experience />

        {/* THE CONSOLE — Contact SSH */}
        <Contact />
      </main>
    </SmoothScrollProvider>
  );
}

