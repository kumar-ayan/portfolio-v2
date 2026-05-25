# Master Frontend Initialization & Optimization Strategy: "SYSTEM INITIALIZATION"
*A production-grade React/Next.js setup specification, asset pipeline config, and runtime optimization blueprint.*

This document serves as the master guide for initializing the portfolio codebase, defining configurations, linting standards, rendering systems, and responsive scaling mechanisms.

---

## 1. Project Scaffolding & Setup Commands

To build a clean, static-optimized layout, initialize the codebase with the following dependencies:

```powershell
# 1. Scaffold Next.js App Router workspace
npx -y create-next-app@latest digital-portfolio --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm

# 2. Navigate to project root
cd digital-portfolio

# 3. Install Production Animation & Smooth Scroll Engines
npm install gsap @gsap/react framer-motion @studio-freight/lenis lucide-react clsx tailwind-merge

# 4. Install Development Linters & Formatting Plugins
npm install -D prettier eslint-config-prettier prettier-plugin-tailwindcss
```

---

## 2. Next.js App Router Architecture

We structure our routing and component tree around a **Server-First, Client-Bounded** philosophy.

```
                  +-----------------------------------+
                  |         ROOT LAYOUT.TSX           |
                  |         (Server Rendered)         |
                  +-----------------------------------+
                                    |
            +-----------------------+-----------------------+
            |                                               |
+-----------------------+                       +-----------------------+
|  SEO Metadata Layer   |                       |  Client Providers HUD |
|  - Title tags (SSG)   |                       |  - Lenis scroll wrap  |
|  - spec rules script  |                       |  - App State Store    |
+-----------------------+                       +-----------------------+
                                                            |
                                                            V
                                                +-----------------------+
                                                |   Timeline Page.tsx   |
                                                |   (Static Scaffold)   |
                                                +-----------------------+
```

*   **Server Components (Default):** Static sections (Hero headers, About text, Experience lists) are server-rendered to keep First Contentful Paint (FCP) under 0.8s.
*   **Client Components (Opt-In):** Interactive components (CUDA Loader, custom spring cursor, canvas training plots, SSH terminal forms) are bounded with `"use client"` scopes to keep hydration blocking times under 100ms.
*   **Speculative Prefetching:** Configures Next.js Speculation Rules inside `src/app/layout.tsx` to prefetch `/project/*` routes as the user hovers over project link items.

---

## 3. Font System & Variable Loading Strategy

To ensure zero cumulative layout shifts (CLS) caused by web font swaps, fonts are loaded locally using Next.js font optimization:

```typescript
// src/app/layout.tsx
import localFont from 'next/font/local';

const NeueMontreal = localFont({
  src: '../assets/fonts/PPNeueMontreal-Book.woff2',
  variable: '--font-sans',
  display: 'swap',
});

const Fraunces = localFont({
  src: '../assets/fonts/Fraunces-Variable.woff2',
  variable: '--font-serif',
  display: 'swap',
});

const FraktionMono = localFont({
  src: '../assets/fonts/PPFraktionMono-Regular.woff2',
  variable: '--font-mono',
  display: 'swap',
});
```

---

## 4. TailwindCSS Design Token Integration

We customize `tailwind.config.ts` to map our HSL tokens, monospace grids, and exponential timings directly to Utility classes.

```typescript
// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsla(var(--bg-canvas), <alpha-value>)",
        surface: "hsla(var(--bg-surface), <alpha-value>)",
        copy: "hsla(var(--color-copy), <alpha-value>)",
        accent: "hsla(var(--color-accent), <alpha-value>)",
        muted: "hsla(var(--border-muted), <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        serif: ["var(--font-serif)", "serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "in-out-expo": "cubic-bezier(0.85, 0, 0.15, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
```

---

## 5. Global Styles & Reset Layering

We structure the stylesheet using Tailwind layers to avoid stylesheet size bloat.

```css
/* src/app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-background text-copy font-sans antialiased selection:bg-accent selection:text-black;
    overflow-x: hidden;
  }
}

@layer utilities {
  .border-dotted-tech {
    background-image: radial-gradient(circle, hsla(var(--bg-muted), 0.15) 1px, transparent 1.5px);
    background-size: 8px 8px;
  }
  .crt-scanlines {
    background: 
      linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.12) 50%),
      radial-gradient(circle, transparent 60%, rgba(0,0,0,0.2) 120%);
    background-size: 100% 4px, 100% 100%;
  }
}
```

---

## 6. Motion & Scroll Engine Setup

Animations and custom scrolls are synchronized to prevent visual layout lag:

*   **Lenis Instance:** Initialized in a React layout hook, updating coordinates and velocities.
*   **GSAP Tick Alignment:** Lenis is set to update GSAP ScrollTrigger ticks on scroll events:
    ```javascript
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
    ```

---

## 7. Performance & GPU Acceleration Setup

To maintain locked **120 FPS** rendering speeds:

1.  **Transforms & Opacities only:** Animations are restricted to CSS `transform` and `opacity` parameters, avoiding layouts passes.
2.  **Strict Container Scope (`contain`):**
    Visual blocks hosting canvas drawings or scroll-pins utilize:
    ```css
    contain: strict;
    ```
    This tells browser rendering engines to bypass global layout recalculations.
3.  **Specular preloading:** Targets route details documents inside standard speculate rules scripts.

---

## 8. Accessibility Foundations

*   **contrast Validation:** Ensures text colors maintain AAA ratios against dark backgrounds.
*   **keyboard HUD navigation:** Triggers a navigation palette on pressing `Ctrl+0`.
*   **Reduced Motion handling:** We configure media queries that disable spring indicators and stagger animations if the user's OS has `prefers-reduced-motion` flags set.

---

## 9. Development Workflow Standards

*   **Formatting Rules (`.prettierrc`):**
    ```json
    {
      "semi": true,
      "singleQuote": true,
      "tabWidth": 2,
      "plugins": ["prettier-plugin-tailwindcss"]
    }
    ```
*   **ESLint Configuration:** Verifies type safety and isolates side effects inside hooks, blocking compilation if lint violations are found.
