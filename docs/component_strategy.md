# Master Component Strategy & Frontend Architecture: "THE COMPILER CORE"
*A production-grade React component architecture, folder structure, animation abstraction layer, and frontend engineering strategy.*

This document functions as the master frontend engineering blueprint for the project, detailing how components, states, and animations are decoupled to maintain maximum performance (120 FPS targets) and clean code patterns.

---

## 1. Folder Structure & Architectural Rationale

To prevent bloated, tightly coupled layouts, we organize the codebase under a strict, modular folder structure inside the Next.js App Router workspace:

```
d:/Portfolio v2/digital-portfolio/
├── app/                             # Next.js App Router entrypoints & pages
│   ├── layout.tsx                   # Global providers wrapper (Lenis, Context, UI state)
│   ├── page.tsx                     # Timeline scroll controller page
│   ├── globals.css                  # Core CSS variables, CRT overlays, fonts
│   └── project/
│       └── [id]/
│           └── page.tsx             # Case study template (Model verification logs)
├── components/                      # UI & Section Components
│   ├── ui/                          # Design-system atomic components (rounded-none)
│   │   ├── CustomCursor.tsx         # spring cursor HUD
│   │   ├── DottedBorder.tsx         # SVG patterns
│   │   ├── CLIModal.tsx             # Command Palette (/ trigger)
│   │   └── TLDRModal.tsx            # Recruiter Dashboard (dialog)
│   ├── sections/                    # Timeline scroll sections
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Expertise.tsx            # GSAP-pinned categories
│   │   ├── Projects.tsx             # hover lists
│   │   ├── Research.tsx             # Canvas 2D loss curve plot
│   │   └── Contact.tsx              # SSH prompt console form
│   └── visuals/                     # Canvas & R3F animation canvases
│       ├── LossCanvas.tsx           # Real-time plot engine
│       └── RLVisualizer.tsx         # Agent playbacks
├── context/                         # State providers
│   ├── SmoothScroll.tsx             # Lenis instance
│   └── AppState.tsx                 # Global GUI flags (modal, CLI, active section)
├── hooks/                           # Custom React hooks
│   ├── useMousePosition.ts          # Cursor coordinate math
│   └── useInterval.ts               # Timer utilities
├── lib/                             # Utility helpers
│   ├── utils.ts                     # Class merger wrapper (clsx + tailwind-merge)
│   └── mathematical_decents.ts      # Loss calculation formulas
└── styles/                          # Global CSS resets
```

### Folder Purpose Rationale
*   `components/ui/`: Contains stateless, highly reusable UI atoms. They do not know about domain logic, ensuring perfect portability.
*   `components/sections/`: Contains the vertical sections. They are independent components, importable in any order inside `app/page.tsx`.
*   `context/`: Isulates global states (e.g. keyboard command panel state) to avoid parent re-renders.

---

## 2. Component Responsibility & Architecture Mappings

---

### 1. Navigation HUD
*   **Responsibility:** Fixed top menu showing active timezone clock and scroll progress tags.
*   **Structure:** Flex layout, separated by a bottom dotted line.
*   **Animation Handling:** Links slide text on hover; clock updates coordinates every second in monospace format.
*   **Interaction Philosophy:** Power-user HUD element, stays static at `z-index: 100`.

---

### 2. Custom Cursor Follower
*   **Responsibility:** Bounded custom box cursor displaying active targets state.
*   **Structure:** Absolute positioned div (`10px x 10px` default).
*   **Animation Handling:** Framer Motion springs (`stiffness: 80`, `damping: 22`).
*   **Interaction Philosophy:** Replaces default browser cursor. Responds instantly to pointer events.

---

### 3. Stacked Section Pin (Expertise)
*   **Responsibility:** Scroll-pinned container holding categories.
*   **Structure:** Grid 70/30 split. Left side image stack; right side text blocks.
*   **Animation Handling:** **GSAP ScrollTrigger** pins container. Slide indexes fade/clip in sync with active scroll index.
*   **Interaction Philosophy:** Pins to control scrolling speed and build narrative focus.

---

### 4. SSH Terminal Form (Contact)
*   **Responsibility:** Simulated prompt session capturing message payloads.
*   **Structure:** Monospace terminal window.
*   **Animation Handling:** Flash indicator cursor, line roll-feeds on pressing `Enter`.
*   **Interaction Philosophy:** Console-based interface loop. Falls back to semantic HTML forms if screen readers are detected.

---

## 3. Motion Abstraction & Reusable Wrappers

To avoid duplicating animation configurations, we create centralized Motion Wrappers that utilize Framer Motion configs:

```typescript
// components/ui/RevealWrapper.tsx
"use client";
import { motion } from 'framer-motion';

const revealVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
  }
};

export const RevealWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-10%" }}
    variants={revealVariants}
  >
    {children}
  </motion.div>
);
```

---

## 4. State Management Strategy

We maintain a strict separation of state scopes to prevent parent re-renders from triggering heavy canvas redraws:

```
                  +-----------------------------------+
                  |         GLOBAL STATEMAP           |
                  +-----------------------------------+
                                    |
            +-----------------------+-----------------------+
            |                                               |
+-----------------------+                       +-----------------------+
|  Zustand Global Store |                       |  Local React State    |
|  - CLI modal trigger  |                       |  - Terminal prompt key|
|  - active scroll index|                       |  - Form field inputs  |
|  - loading percent    |                       |  - Hover list items   |
+-----------------------+                       +-----------------------+
```

*   **Global HUD State (Zustand):**
    For app-wide toggles like checking if the CLI console is active, the preloader percentage, or the active section index. Zustand avoids Context rerender propagation.
*   **In-View Animation State (Local component state):**
    Used inside the SSH Form (input buffers) and custom cursor (tracking local dimensions).

---

## 5. Performance Engineering Strategy

1.  **Lazy Loading & Code Splitting:**
    *   heavy modules like three.js or canvas libraries are dynamically imported with `ssr: false` to keep initial load speeds under 1.0s.
2.  **Reducing Frame Re-renders:**
    *   The cursor follower avoids React states by writing inline CSS rules directly to style properties via Framer Motion `useMotionValue`.
3.  **GPU Layout Containment:**
    *   Scroll regions and visual lists use CSS `contain: layout paint` to prevent changes in child nodes from invalidating the layout tree of parent elements.
