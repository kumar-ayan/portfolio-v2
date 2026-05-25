/**
 * NEURAL KINETICS — Motion System
 * 
 * Centralized motion configuration for Framer Motion.
 * Based on the "Viscous Kinetics" philosophy:
 * - High-friction, damped motion
 * - No bounces, no snaps
 * - Physical objects in high-friction liquid
 */

// ========================================
// Easing Functions
// ========================================

export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
export const EASE_IN_OUT_EXPO = [0.85, 0, 0.15, 1] as const;

// ========================================
// Timing Durations
// ========================================

export const TIMING = {
  micro: 0.18,
  fast: 0.36,
  medium: 0.62,
  slow: 0.95,
  cinematic: 1.25,
  dramatic: 1.8,    // 1800ms — full-page transitions
} as const;

// ========================================
// Spring Configurations
// ========================================

export const SPRINGS = {
  /** Cursor HUD, floating previews, magnetic buttons */
  dampened: {
    type: 'spring' as const,
    mass: 0.25,
    stiffness: 90,
    damping: 24,
  },
  /** Cursor spring (tighter) */
  cursor: {
    type: 'spring' as const,
    stiffness: 80,
    damping: 22,
  },
  /** Magnetic element hover */
  magnetic: {
    type: 'spring' as const,
    stiffness: 150,
    damping: 15,
    mass: 0.1,
  },
  /** Polish micro-interactions */
  polish: {
    type: 'spring' as const,
    stiffness: 100,
    damping: 20,
  },
} as const;

// ========================================
// Reveal Variants (Scroll-Triggered)
// ========================================

/** Fade up from below — primary reveal */
export const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: TIMING.slow,
      ease: EASE_OUT_EXPO,
    },
  },
};

/** Simple fade in */
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: TIMING.medium,
      ease: EASE_OUT_EXPO,
    },
  },
};

/** Scale up from smaller */
export const scaleUp = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: TIMING.medium,
      ease: EASE_OUT_EXPO,
    },
  },
};

/** Slide in from left */
export const slideLeft = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: TIMING.slow,
      ease: EASE_OUT_EXPO,
    },
  },
};

/** Slide in from right */
export const slideRight = {
  hidden: { opacity: 0, x: 24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: TIMING.slow,
      ease: EASE_OUT_EXPO,
    },
  },
};

// ========================================
// Stagger Containers
// ========================================

/** Default stagger container */
export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.082,
    },
  },
};

/** Hero stagger (wider delays for cinematic entrance) */
export const heroStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.35,
    },
  },
};

/** Fast stagger for lists */
export const fastStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.08,
    },
  },
};

// ========================================
// Hover Variants
// ========================================

/** Card hover — lift and glow */
export const cardHover = {
  rest: { 
    scale: 1, 
    y: 0,
    transition: { duration: TIMING.fast, ease: EASE_OUT_EXPO },
  },
  hover: {
    scale: 1,
    y: -2,
    transition: { duration: TIMING.fast, ease: EASE_OUT_EXPO },
  },
};

/** Button hover */
export const buttonHover = {
  rest: { scale: 1 },
  hover: {
    scale: 1.01,
    transition: { duration: TIMING.micro, ease: EASE_OUT_EXPO },
  },
};

// ========================================
// Line Reveal (Dotted Dividers)
// ========================================

export const lineReveal = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      duration: 0.6,
      ease: EASE_OUT_EXPO,
    },
  },
};

// ========================================
// Text Split Reveal
// ========================================

/** Character reveal with mask */
export const charReveal = {
  hidden: { y: '105%' },
  visible: (i: number) => ({
    y: '0%',
    transition: {
      delay: i * 0.018,
      duration: 0.9,
      ease: EASE_OUT_EXPO,
    },
  }),
};

/** Word reveal with mask */
export const wordReveal = {
  hidden: { y: '105%', opacity: 0 },
  visible: (i: number) => ({
    y: '0%',
    opacity: 1,
    transition: {
      delay: i * 0.05,
      duration: TIMING.slow,
      ease: EASE_OUT_EXPO,
    },
  }),
};

// ========================================
// Viewport Detection Config
// ========================================

export const VIEWPORT_CONFIG = {
  /** Standard section reveal */
  standard: { once: true, margin: '-10% 0px -10% 0px' as const },
  /** Early trigger for background elements */
  early: { once: true, margin: '0px 0px -20% 0px' as const },
  /** Navigation scrollspy */
  scrollspy: { 
    once: false,
    margin: '-20% 0px -60% 0px' as const,
  },
} as const;

// ========================================
// Page Transitions
// ========================================

export const pageTransition = {
  exit: {
    scale: 0.98,
    opacity: 0,
    transition: { duration: 0.3, ease: EASE_IN_OUT_EXPO },
  },
  enter: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.4, ease: EASE_IN_OUT_EXPO },
  },
};

// ========================================
// Lenis Scroll Config
// ========================================

export const LENIS_CONFIG = {
  duration: 1.2,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical' as const,
  smoothWheel: true,
  wheelMultiplier: 0.85,
  touchMultiplier: 1.25,
};


