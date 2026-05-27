'use client';

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { useReportWebVitals } from 'next/web-vitals';
import { SmoothScrollProvider } from '@/context/SmoothScroll';
import { BackgroundSystem } from '@/components/background/BackgroundSystem';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { Preloader } from '@/components/ui/Preloader';
import { Navigation } from '@/components/layout/Navigation';
import { Hero } from '@/components/sections/Hero';
import { SectionSkeleton } from '@/components/ui/SectionSkeleton';

// ========================================
// Dynamically imported sections
// Each gets a shimmer skeleton as its loading fallback
// so the page height is stable while JS hydrates.
// ========================================

const About = dynamic(
  () => import('@/components/sections/About').then((m) => ({ default: m.About })),
  { ssr: false, loading: () => <SectionSkeleton /> }
);
const Expertise = dynamic(
  () => import('@/components/sections/Expertise').then((m) => ({ default: m.Expertise })),
  { ssr: false, loading: () => <SectionSkeleton /> }
);
const Skills = dynamic(
  () => import('@/components/sections/Skills').then((m) => ({ default: m.Skills })),
  { ssr: false, loading: () => <SectionSkeleton height="clamp(20rem, 40vh, 32rem)" /> }
);
const Projects = dynamic(
  () => import('@/components/sections/Projects').then((m) => ({ default: m.Projects })),
  { ssr: false, loading: () => <SectionSkeleton height="clamp(28rem, 60vh, 48rem)" /> }
);
const Research = dynamic(
  () => import('@/components/sections/Research').then((m) => ({ default: m.Research })),
  { ssr: false, loading: () => <SectionSkeleton /> }
);
const Experience = dynamic(
  () => import('@/components/sections/Experience').then((m) => ({ default: m.Experience })),
  { ssr: false, loading: () => <SectionSkeleton /> }
);
const Contact = dynamic(
  () => import('@/components/sections/Contact').then((m) => ({ default: m.Contact })),
  { ssr: false, loading: () => <SectionSkeleton height="clamp(20rem, 36vh, 28rem)" /> }
);

// ========================================
// Web Vitals Reporter
// Logs CLS, FCP, FID, INP, LCP, TTFB to console in dev.
// Swap console.log with an analytics endpoint in production.
// ========================================

function WebVitalsReporter() {
  useReportWebVitals((metric) => {
    if (process.env.NODE_ENV === 'development') {
      const color =
        metric.rating === 'good' ? '🟢' : metric.rating === 'needs-improvement' ? '🟡' : '🔴';
      console.log(`${color} [Web Vital] ${metric.name}: ${Math.round(metric.value)}ms (${metric.rating})`);
    }

    // TODO: Send to your analytics endpoint in production, e.g.:
    // if (process.env.NODE_ENV === 'production') {
    //   fetch('/api/vitals', {
    //     method: 'POST',
    //     body: JSON.stringify(metric),
    //     headers: { 'Content-Type': 'application/json' },
    //   });
    // }
  });

  return null;
}

// ========================================
// Home Page
// ========================================

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);

  const handlePreloaderComplete = useCallback(() => {
    setIsLoaded(true);
  }, []);

  return (
    <SmoothScrollProvider>
      <WebVitalsReporter />
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
