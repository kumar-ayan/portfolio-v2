'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useLenis } from '@/context/SmoothScroll';
import { EASE_OUT_EXPO, EASE_IN_OUT_EXPO, fadeUp, staggerContainer } from '@/lib/motion';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { id: 'about', label: 'About', prefix: '01' },
  { id: 'expertise', label: 'Expertise', prefix: '02' },
  { id: 'skills', label: 'Systems', prefix: '03' },
  { id: 'projects', label: 'Projects', prefix: '04' },
  { id: 'research', label: 'Research', prefix: '05' },
  { id: 'experience', label: 'Experience', prefix: '06' },
  { id: 'contact', label: 'Contact', prefix: '07' },
];

export function Navigation() {
  const { scrollY, direction } = useScrollProgress();
  const activeSection = useActiveSection();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const lenis = useLenis();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isVisible = scrollY < 100 || direction === 'up';

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      lenis?.stop();
    } else {
      document.body.style.overflow = '';
      lenis?.start();
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen, lenis]);

  const scrollToSection = useCallback(
    (id: string) => {
      const element = document.getElementById(id);
      if (element) {
        lenis?.scrollTo(element, { offset: -80 });
        setMobileMenuOpen(false);
      }
    },
    [lenis]
  );

  const isScrolled = scrollY > 100;

  return (
    <>
      {/* Main Navigation HUD */}
      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-[100] transition-colors duration-300',
          isScrolled && 'glass-overlay'
        )}
        animate={{
          y: isVisible ? 0 : -100,
        }}
        transition={{
          duration: 0.3,
          ease: EASE_OUT_EXPO,
        }}
      >
        {/* Nav content */}
        <nav className="container-main flex items-center justify-between h-[60px]" role="navigation" aria-label="Main navigation">
          {/* Left: Identity */}
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.6, duration: 0.4, ease: EASE_OUT_EXPO }}
          >
            <span className="text-mono-label text-accent glow-phosphor">[OP_01]</span>
            <span className="text-mono-label" style={{ color: 'hsl(55, 13%, 86%)' }}>AYAN</span>
          </motion.div>

          {/* Center: Navigation links (desktop) */}
          {!isMobile && (
            <motion.div
              className="flex items-center gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.8, duration: 0.4 }}
            >
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.id}
                  {...link}
                  isActive={activeSection === link.id}
                  onClick={() => scrollToSection(link.id)}
                />
              ))}
            </motion.div>
          )}

          {/* Right: System clock + mobile menu toggle */}
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.6, duration: 0.4, ease: EASE_OUT_EXPO }}
          >
            {!isMobile && <SystemClock />}
            {isMobile && (
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="flex items-center gap-2 text-mono-label"
                style={{ color: 'hsl(55, 13%, 86%)' }}
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileMenuOpen}
              >
                <span>{mobileMenuOpen ? 'CLOSE' : 'MENU'}</span>
                <span className="text-accent">{mobileMenuOpen ? '[X]' : '[ ]'}</span>
              </button>
            )}
          </motion.div>
        </nav>

        {/* Dotted separator line */}
        <div className="divider-dotted w-full" />
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileMenu
            links={NAV_LINKS}
            activeSection={activeSection}
            onNavigate={scrollToSection}
          />
        )}
      </AnimatePresence>
    </>
  );
}

// ========================================
// Nav Link Component
// ========================================

function NavLink({
  label,
  prefix,
  isActive,
  onClick,
}: {
  label: string;
  prefix: string;
  isActive: boolean;
  onClick: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex items-center gap-1.5 text-mono-label transition-colors duration-200 group"
      style={{
        color: isActive ? 'hsl(56, 92%, 62%)' : 'hsl(55, 13%, 60%)',
      }}
      data-cursor="NAV"
      aria-current={isActive ? 'page' : undefined}
    >
      {/* Prefix tag - appears on hover */}
      <motion.span
        className="text-accent"
        initial={{ opacity: 0, x: -4 }}
        animate={{
          opacity: isHovered || isActive ? 1 : 0,
          x: isHovered || isActive ? 0 : -4,
        }}
        transition={{ duration: 0.15, ease: EASE_OUT_EXPO }}
        style={{ fontSize: '9px' }}
      >
        [{prefix}]
      </motion.span>

      <span className={cn(
        'transition-all duration-200',
        (isActive || isHovered) && 'glow-phosphor'
      )}>
        {label}
      </span>
    </button>
  );
}

// ========================================
// System Clock
// ========================================

function SystemClock() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const utc = now.toUTCString().slice(17, 25);
      setTime(utc);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="text-mono-label" style={{ color: 'hsl(55, 13%, 60%)', fontSize: '10px' }}>
      UTC {time}
    </span>
  );
}

// ========================================
// Mobile Menu
// ========================================

function MobileMenu({
  links,
  activeSection,
  onNavigate,
}: {
  links: typeof NAV_LINKS;
  activeSection: string;
  onNavigate: (id: string) => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-[99] flex flex-col items-start justify-center px-8"
      style={{ backgroundColor: 'hsl(240, 9%, 3%)', opacity: 0.98 }}
      initial={{ y: '-100%' }}
      animate={{ y: 0 }}
      exit={{ y: '-100%' }}
      transition={{ duration: 0.5, ease: EASE_IN_OUT_EXPO }}
    >
      <motion.div
        className="flex flex-col gap-6"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {links.map((link) => (
          <motion.button
            key={link.id}
            variants={fadeUp}
            onClick={() => onNavigate(link.id)}
            className="text-left"
            data-cursor="NAV"
          >
            <span className="text-mono-label text-accent" style={{ fontSize: '10px' }}>
              [{link.prefix}]
            </span>
            <div
              className={cn(
                'text-section-heading transition-colors duration-200',
                activeSection === link.id ? 'text-accent glow-phosphor' : ''
              )}
              style={{
                color: activeSection === link.id ? 'hsl(56, 92%, 62%)' : 'hsl(55, 13%, 86%)',
                fontFamily: 'var(--font-serif)',
              }}
            >
              {link.label}
            </div>
          </motion.button>
        ))}
      </motion.div>

      {/* Bottom info */}
      <div className="absolute bottom-8 left-8 right-8 flex justify-between">
        <span className="text-mono-label" style={{ color: 'hsl(55, 13%, 60%)' }}>AYAN TIWARI</span>
        <SystemClock />
      </div>
    </motion.div>
  );
}

