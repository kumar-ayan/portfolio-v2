'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useLenis } from '@/context/SmoothScroll';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { id: 'about',      label: 'About' },
  { id: 'expertise',  label: 'Expertise' },
  { id: 'projects',   label: 'Work' },
  { id: 'research',   label: 'Research' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact',    label: 'Contact' },
];

// Digitalists pixel arrow SVG
function PixelArrow({ size = 12 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size * 8} height={size} fill="none" viewBox="0 0 106 14">
      <path d="M0 0h2v2H0zM0 4h2v2H0zM0 8h2v2H0zM0 12h2v2H0z M4 0h2v2H4zM4 4h2v2H4zM4 8h2v2H4zM4 12h2v2H4z M28 0h2v2h-2zM28 4h2v2h-2zM28 8h2v2h-2zM28 12h2v2h-2z M32 0h2v2h-2zM32 4h2v2h-2zM32 8h2v2h-2zM32 12h2v2h-2z M45 0h2v2h-2zM45 4h2v2h-2zM45 8h2v2h-2zM45 12h2v2h-2z M49 0h2v2h-2zM49 4h2v2h-2zM49 8h2v2h-2zM49 12h2v2h-2z M53 0h2v2h-2zM53 4h2v2h-2zM53 8h2v2h-2zM53 12h2v2h-2z M57 0h2v2h-2zM57 4h2v2h-2zM57 8h2v2h-2zM57 12h2v2h-2z M85 0h2v2h-2zM85 4h2v2h-2zM85 8h2v2h-2zM85 12h2v2h-2z M104 0h2v2h-2zM104 4h2v2h-2zM104 8h2v2h-2zM104 12h2v2h-2z" fill="currentColor" />
    </svg>
  );
}

export function Navigation() {
  const { scrollY, direction } = useScrollProgress();
  const activeSection = useActiveSection();
  const isMobile = useMediaQuery('(max-width: 1024px)');
  const lenis = useLenis();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isScrolled = scrollY > 80;
  const isHidden = scrollY > 120 && direction === 'down' && !mobileMenuOpen;

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      lenis?.stop();
    } else {
      document.body.style.overflow = '';
      lenis?.start();
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen, lenis]);

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      lenis?.scrollTo(element, { offset: -80 });
      setMobileMenuOpen(false);
    }
  }, [lenis]);

  return (
    <>
      <motion.header
        className={cn('fixed top-0 left-0 right-0 z-[100]')}
        style={{
          height: 'var(--nav-height)',
          backgroundColor: isScrolled ? 'rgba(240,240,240,0.92)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(12px)' : 'none',
          borderBottom: isScrolled ? '1px solid rgba(0,0,0,0.08)' : '1px solid transparent',
          transition: 'background-color 0.35s ease, border-color 0.35s ease',
        }}
        animate={{ y: isHidden ? -80 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <nav
          className="container-main h-full flex items-center justify-between"
          role="navigation"
          aria-label="Main navigation"
        >
          {/* Left: Breadcrumb + typewriter — Digitalists pattern */}
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2, duration: 0.5 }}
          >
            {/* Home icon */}
            <button
              onClick={() => lenis?.scrollTo(0)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, lineHeight: 0 }}
              aria-label="Go to top"
            >
              <svg width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M5.77869 0.187092C5.61013 0.0739313 5.38987 0.0739312 5.22131 0.187092L0.221311 3.54374C0.0829851 3.6366 0 3.79226 0 3.95886V11.5C0 11.7761 0.223858 12 0.5 12H3.16674C3.44288 12 3.66674 11.7761 3.66674 11.5V7.88477C3.66674 7.60862 3.8906 7.38477 4.16674 7.38477H6.83341C7.10955 7.38477 7.33341 7.60862 7.33341 7.88477V11.5C7.33341 11.7761 7.55726 12 7.83341 12H10.5C10.7761 12 11 11.7761 11 11.5V3.95886C11 3.79226 10.917 3.6366 10.7787 3.54373L5.77869 0.187092Z" fill="#000"/>
              </svg>
            </button>
            {/* Typewriter text */}
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.75rem',
                color: 'var(--text-secondary)',
                display: isMobile ? 'none' : 'block',
              }}
            >
              Hello World. Welcome.
            </span>
          </motion.div>

          {/* Desktop nav */}
          {!isMobile && (
            <motion.nav
              className="flex items-center gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.3, duration: 0.5 }}
            >
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.8125rem',
                    fontWeight: activeSection === link.id ? 600 : 400,
                    color: activeSection === link.id ? 'var(--text-primary)' : 'var(--text-secondary)',
                    padding: '0.25rem 0',
                    transition: 'color 0.2s ease',
                    borderBottom: activeSection === link.id ? '1px solid currentColor' : '1px solid transparent',
                  }}
                  aria-current={activeSection === link.id ? 'page' : undefined}
                >
                  {link.label}
                </button>
              ))}
            </motion.nav>
          )}

          {/* Right: CTA + burger */}
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2, duration: 0.5 }}
          >
            {!isMobile && (
              <button
                onClick={() => scrollToSection('contact')}
                style={{
                  background: 'var(--color-accent)',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0.5rem 1.25rem',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: '#000',
                  transition: 'opacity 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
              >
                Hire me
              </button>
            )}

            {isMobile && (
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  padding: '0.5rem', display: 'flex', flexDirection: 'column', gap: '5px',
                }}
              >
                <motion.span
                  style={{ display: 'block', width: '22px', height: '1.5px', backgroundColor: '#000' }}
                  animate={mobileMenuOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.25 }}
                />
                <motion.span
                  style={{ display: 'block', width: '22px', height: '1.5px', backgroundColor: '#000' }}
                  animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  style={{ display: 'block', width: '22px', height: '1.5px', backgroundColor: '#000' }}
                  animate={mobileMenuOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.25 }}
                />
              </button>
            )}
          </motion.div>
        </nav>
      </motion.header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[99] flex flex-col justify-center bg-pattern"
            style={{ backgroundColor: '#f1e500' }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="container-main">
              <div className="flex flex-col gap-2">
                {NAV_LINKS.map((link, i) => (
                  <motion.button
                    key={link.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    onClick={() => scrollToSection(link.id)}
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      textAlign: 'left', padding: '1rem 0',
                      fontFamily: 'Georgia, serif',
                      fontSize: 'clamp(2.5rem, 10vw, 4.5rem)',
                      fontWeight: 500,
                      letterSpacing: '-0.03em',
                      color: '#000',
                      lineHeight: 1.0,
                      borderBottom: '1px solid rgba(0,0,0,0.1)',
                      width: '100%',
                    }}
                  >
                    {link.label}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
