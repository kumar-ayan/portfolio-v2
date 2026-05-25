# Master Implementation Roadmap & Build Plan: "THE COMPILATION PATH"
*A production-grade technical roadmap, project setup sequence, and engineering checklist.*

This document establishes the official build order, dependency mappings, testing parameters, and deployment pipelines for constructing the digital portfolio.

---

## 1. Project Initialization & Frontend Setup

The codebase is built on **Next.js 14 App Router** with TypeScript.

### Step-by-Step Shell Setup Commands
1.  **Initialize Next.js App:**
    ```powershell
    npx -y create-next-app@latest digital-portfolio --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
    ```
2.  **Install Production Animation & Layout Libraries:**
    ```powershell
    npm install gsap @gsap/react framer-motion @studio-freight/lenis lucide-react clsx tailwind-merge
    ```
3.  **Install Development Linters:**
    ```powershell
    npm install -D prettier eslint-config-prettier prettier-plugin-tailwindcss
    ```

---

## 2. The 14-Phase Production Pipeline

We use a bottom-up build strategy, ensuring the layout core is stable before implementing complex scroll animations.

```
PHASED TIMELINE CHART:
[Core Setup] --> [Design System] --> [Layout Grid] --> [Motion Engine]
                                                           |
                                                           V
[Contact SSH] <-- [Playground] <-- [Cases hover] <-- [Stacked Expertise]
      |
      V
[Optimizations] --> [Accessibility] --> [QA Audit] --> [Vercel Deploy]
```

---

### Phase 1: Core Setup & Folder Initialization
*   **Objective:** Scaffold folders and define linter rules.
*   **Deliverables:** Directory skeleton matching `component_strategy.md`, configured `.eslintrc.json`, `tsconfig.json`, and `.prettierrc`.
*   **Engineering Considerations:** Configure Path aliases (`@/*` pointing to `src/*`) to maintain clean imports.

---

### Phase 2: Design System Integration
*   **Objective:** Map HSL tokens to Tailwind variables.
*   **Deliverables:** Completed `tailwind.config.ts` and baseline `src/app/globals.css`.
*   **UI Consistency Check:** Verify custom dotted lines and CRT overlays render correctly on black canvases.

---

### Phase 3: Layout HUD & Navigation
*   **Objective:** Define the outer viewport frame and clock triggers.
*   **Deliverables:** Sticky top Navbar, breadcrumbs context, and UTC timer.
*   **Dependencies:** Context APIs for scroll and window state monitoring.

---

### Phase 4: Motion Engine & Smooth Scroll (Lenis)
*   **Objective:** Initialize Lenis scroll damping globally.
*   **Deliverables:** `SmoothScroll.tsx` context wrapper, Custom spring cursor HUD.
*   **Performance Checkpoint:** Verify cursor coordinates update at locked FPS using requestAnimationFrame loops.

---

### Phase 5: Hero Section (The Boot Sequence)
*   **Objective:** Build entrance triggers and line-mask reveals.
*   **Deliverables:** preloader timeline, character line reveals, dynamic scroll indicators.
*   **Motion Consideration:** preloader exit must transition seamlessly to Hero text fades.

---

### Phase 6: Stacked scroll-pinned Columns (Expertise)
*   **Objective:** Bind scroll offsets to column layers.
*   **Deliverables:** GSAP-driven scroll pinning layout.
*   **Performance Checkpoint:** Verify WebM loop playbacks do not cause frame drops during scrolls.

---

### Phase 7: Hover List reveals (Projects)
*   **Objective:** Implement floating preview cursor followers.
*   **Deliverables:** Case list rows, spring-dampened coordinate follower panels.
*   **Interaction Check:** Mouse pointer exit must clear preview caches instantly.

---

### Phase 8: Research Playground (Loss Canvas)
*   **Objective:** Plot live learning metrics.
*   **Deliverables:** HTML5 Canvas step plotter hook, ArXiv citation components.
*   **Performance Checkpoint:** Limit canvas redraw coordinates to visible viewport zones (`IntersectionObserver`).

---

### Phase 9: Experience Timeline
*   **Objective:** Chronological job logs layout.
*   **Deliverables:** Responsive node layout, SVG paths that draw down during scrolling.
*   **UI Check:** Timeline paths must align perfectly with text nodes.

---

### Phase 10: Interactive SSH Form (Contact)
*   **Objective:** Interactive command connection prompts.
*   **Deliverables:** Terminal form container, state validation loops, send scripts.
*   **Accessibility Check:** Screen readers must read hidden inputs cleanly.

---

### Phase 11: Mobile Optimization & Breakpoints
*   **Objective:** Scale layout splits to single rows.
*   **Deliverables:** Responsive typography scales, disabled spring states on viewports `< 768px`.
*   **Performance Check:** Bypassing GSAP triggers on mobile.

---

### Phase 12: Performance Audit & Dynamic Imports
*   **Objective:** Compress assets and bundle outputs.
*   **Deliverables:** Dynamic `next/dynamic` wraps on modals, optimized AVIF formats.
*   **Performance Checkpoint:** Lighthouse Score > 90 across all categories.

---

### Phase 13: Final QA & Testing
*   **Objective:** Verify cross-browser support and keyboard accessibility shortcuts.
*   **Deliverables:** QA logs on Chrome/Safari/Firefox/Mobile.
*   **UI Check:** No layout shifts (CLS = 0.0).

---

### Phase 14: Vercel Deployment & SEO
*   **Objective:** Push to production server.
*   **Deliverables:** Live Vercel URL, configured meta tags, robots.txt, XML sitemap.
*   **Checklist:** Verify environment variables for contact mail script are set.

---

## 3. Testing & Validation Checklist

1.  **Motion Damping Validation:**
    *   Verify scroll damping is disabled on mobile viewports.
    *   Verify cursor-follow has no visual layout lag behind the mouse pointer.
2.  **Keyboard Layout Walkthrough:**
    *   Verify pressing `Ctrl+0` launches keyboard navigation panel.
    *   Verify pressing `/` opens the CLI command palette.
3.  **Audit Metrics Targets:**
    *   FCP < 0.8s.
    *   LCP < 1.2s.
    *   WCAG contrast ratio > 7:1 for body copy.
