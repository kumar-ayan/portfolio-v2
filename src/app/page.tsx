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

const About = dynamic(() =>
  import('@/components/sections/About').then((m) => ({ default: m.About })),
  { ssr: false }
);
const Expertise = dynamic(() =>
  import('@/components/sections/Expertise').then((m) => ({ default: m.Expertise })),
  { ssr: false }
);
const Skills = dynamic(() =>
  import('@/components/sections/Skills').then((m) => ({ default: m.Skills })),
  { ssr: false }
);
const Projects = dynamic(() =>
  import('@/components/sections/Projects').then((m) => ({ default: m.Projects })),
  { ssr: false }
);
const Research = dynamic(() =>
  import('@/components/sections/Research').then((m) => ({ default: m.Research })),
  { ssr: false }
);
const Experience = dynamic(() =>
  import('@/components/sections/Experience').then((m) => ({ default: m.Experience })),
  { ssr: false }
);
const Contact = dynamic(() =>
  import('@/components/sections/Contact').then((m) => ({ default: m.Contact })),
  { ssr: false }
);

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);

  const handlePreloaderComplete = useCallback(() => {
    setIsLoaded(true);
  }, []);

  return (
    <SmoothScrollProvider>
      {!isLoaded && <Preloader onComplete={handlePreloaderComplete} />}
      <CustomCursor />
      <ScrollProgress />
      <BackgroundSystem />
      <Navigation />

      <main id="main-content">
        <Hero />
        <About />
        <Expertise />
        <Skills />
        <Projects />
        <Research />
        <Experience />
        <Contact />
      </main>
    </SmoothScrollProvider>
  );
}
