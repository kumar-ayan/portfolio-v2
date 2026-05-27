'use client';

import { useState, useCallback } from 'react';
import { SmoothScrollProvider } from '@/context/SmoothScroll';
import { BackgroundSystem } from '@/components/background/BackgroundSystem';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { Preloader } from '@/components/ui/Preloader';
import { AllProjects } from '@/components/sections/AllProjects';

export default function ProjectsPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  const handlePreloaderComplete = useCallback(() => {
    setIsLoaded(true);
  }, []);

  return (
    <SmoothScrollProvider>
      {!isLoaded && <Preloader onComplete={handlePreloaderComplete} />}
      <CustomCursor />
      <BackgroundSystem />
      
      <main id="main-content">
        <AllProjects />
      </main>
    </SmoothScrollProvider>
  );
}
