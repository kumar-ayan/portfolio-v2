# Master Motion System & Interaction Philosophy: "NEURAL KINETICS"
*A definitive motion engineering specification and creative frontend animation blueprint for the Silicon Brutalism UI.*

This document establishes the official motion specifications, timing schedules, easing functions, and interaction behaviors for the portfolio. The goal is to build a cinematic digital experience that mimics premium AI research platforms and luxury product releases.

---

## 1. Motion Philosophy

Our motion philosophy is **Viscous Kinetics (Weighted Momentum)**. 
Every element in the interface is modeled as a physical object traveling through a high-friction liquid. There are no sudden snaps, zero cheap elastic bounces, and zero linear movements. Animations do not exist for decoration; they exist to show system state changes, model training progressions, and structure the narrative flow.

---

## 2. Animation Principles

1.  **Engineered Physics:** All motion relies on spring dynamics or high-order cubic-bezier easing to mimic natural weight, momentum, and friction.
2.  **Narrative Staggering:** Elements reveal sequentially (from mono captions down to structural buttons) to guide the visitor's eye path.
3.  **Low-Latency Feedback:** Hover events must register instantly (under 100ms) but settle smoothly (over 400ms) using dampening filters to prevent visual stutter.
4.  **Performance Integrity:** We protect the scroll frame rate at all costs. Animations that trigger CPU paint loops are prohibited.

---

## 3. Timing System

The timeline uses three core duration values to maintain pacing consistency across all components:

*   **System Micro-Response (150ms - 250ms):** Used for hover triggers, active input flashes, and badge glows. Feels instant but smooth.
*   **Segment Transition (400ms - 600ms):** Used for page sweeps, card expansions, and dialog fades.
*   **Cinematic Reveal (800ms - 1200ms):** Used for preloader exits, hero typography line reveals, and scroll-pinned category switches.

---

## 4. Easing Philosophy

We use HSL and CSS ease presets that represent exponential curves, avoiding standard linear or spring presets that overshoot boundaries:

*   **The Cinematic Ease-Out (`$ease-out-expo`):** `cubic-bezier(0.16, 1, 0.3, 1)`
    *   *Curve:* Instant acceleration, long tail deceleration.
    *   *Usage:* Text reveals, modal popups, and project detail panels.
*   **The Power-User Ease-In-Out (`$ease-in-out-expo`):** `cubic-bezier(0.85, 0, 0.15, 1)`
    *   *Curve:* Extended slow start, hyper-speed middle, extended slow finish.
    *   *Usage:* preloader sweeps, page transitions, and terminal console slide-downs.
*   **The Spring Inertia (`$spring-dampened`):**
    *   *Parameters:* `mass: 0.25`, `stiffness: 90`, `damping: 24` (Framer Motion syntax).
    *   *Curve:* Weighted follow-through with zero overshoot.
    *   *Usage:* Mouse cursor HUD, floating image previews, and magnetic buttons.

---

## 5. Scroll Behavior System

Smooth scroll physics are driven globally by **Lenis** to align layout updates with GPU redraw cycles:

```javascript
const scrollSettings = {
  duration: 1.4, // Long, controlled decay
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
  orientation: 'vertical',
  smoothWheel: true,
  wheelMultiplier: 0.95, // Softens mouse wheel ticks
  touchMultiplier: 1.5, // Matches touch screen acceleration
};
```
*   **Storytelling Flow:** Scrolling acts as a timeline playhead. Page elements fade and translate upward in sync with scroll progress using GSAP ScrollTrigger.

---

## 6. Transition System (Barba.js-inspired)

Page switches use a custom dynamic canvas sweep, making the website feel like a single continuous application.

```
Exit Page (300ms)               DOM Swap                        Enter Page (400ms)
[Active Canvas] --Scale(0.98)--> [Slate transition screen sweeps] --> [New Canvas enters]
               --Fade(0.0)-->                                      --> --Scale(1.0) / Fade(1.0)-->
```

*   **Transition Easing:** Driven strictly by `$ease-in-out-expo` on CSS transforms, preventing layout thrashing.

---

## 7. Hover Interaction Language

Hover states behave as **Diagnostic Disclosures**, revealing technical data layers.

*   **Menu & Links:** Hovering text shifts the color to `var(--color-accent)` (Mint Green) and translates a monospace checkmark tag inline.
*   **UI Badges:** Hovering skill badges expands a subtle phosphor drop-shadow:
    ```css
    box-shadow: 0 0 16px rgba(79, 250, 157, 0.15);
    ```
*   **Projects Showcase:** Hovering rows triggers a floating preview image of the system. The preview scales from `0.9` to `1.0` on entry and translates with spring inertia, following the mouse cursor.

---

## 8. Cursor Interaction System

The default browser cursor is replaced by a custom **Diagnostic HUD Cursor**.

*   **Default State:** A minimal box outline (`10px x 10px`) in mint color.
*   **Expansion State:** When hovering links or project items, the cursor box expands to `80px x 80px` and displays contextual details in small uppercase monospace (e.g. `[VIEW]`, `[SSH]`).
*   **Magnetic Attraction:** Interactive icons attract the cursor when it enters a `30px` radius, pulling the cursor center towards the button coordinates:
    $$\text{Pos}_{\text{element}} = \text{Pos}_{\text{default}} + (\text{Pos}_{\text{mouse}} - \text{Pos}_{\text{default}}) \times 0.35$$

---

## 9. Loading Experience (The Boot Sequence)

*   **The Interface:** A solid primary-accent screen displaying initialization checks (CUDA validation, GPU device status, active model weights loading).
*   **The Motion:**
    *   A grid of characters executes a steps-based loop (`steps(7)`) simulating screen refresh rates.
    *   An SVG dotted progress bar fills from `0%` to `100%` linearly.
*   **The Exit:** The preloader splits or slides vertically out of the viewport over 600ms using `$ease-in-out-expo`.

---

## 10. Section Reveal Logic

Elements enter the viewport using scroll-triggered thresholds (typically when `top` reaches `80%` of screen height):

*   **Sequence:**
    1.  Monospace metadata tag fades in instantly.
    2.  Horizontal dotted SVG grid line draws from `width: 0%` to `100%`. Easing: `$ease-out-expo`.
    3.  Header text translates up through the line masks.
    4.  Body content and buttons fade and slide up (`y: 20px` to `0px`).

---

## 11. Hero Motion Architecture

The hero sequence establishes the technical atmosphere.
*   **Choreography:**
    *   Preloader exit finishes.
    *   Main thesis header splits into three lines; each line reveals sequentially over 1000ms using `$ease-out-expo`.
    *   Dynamic timezone clock and local UTC telemetry turn on in the HUD header.
    *   Subtle parallax is applied to hero layout panels (`speed: 0.15` relative to scroll).

---

## 12. Project Showcase Motion

Case studies reveal like technical schematics.
*   **Image Transitions:** Project detail covers use a clip-path zoom transition:
    ```css
    clip-path: inset(0% 0% 0% 0% round 0px);
    transform: scale(1.05);
    ```
*   **Text Sequencing:** Hyperparameters, model logs, and architectural layers stagger in using a typewriter character reveal.

---

## 13. Background Motion Systems

We prevent heavy background video models.
*   **Lightweight Canvases:** Canvases render real-time mathematical animations (such as live loss curve decents or agent grid-world trajectories) using raw 2D Canvas loops.
*   **No heavy WebGL overlays:** Keeps CPU utilization down and ensures consistent rendering speeds.

---

## 14. Micro-Interaction Rules

*   **Typewriter blinking cursor:** Dialog inputs show a flashing terminal cursor blinking every 800ms (`opacity: 1` to `0`).
*   **Terminal response feeds:** Successful inputs slide up and append to log history with a slight snap.

---

## 15. Performance Motion Strategy

To guarantee a locked **120 FPS** on high-refresh-rate displays:

1.  **Transforms & Opacities Only:** We prohibit animations modifying width, height, margin, or layout coordinates.
2.  **CSS Containment:** Complex canvas and pinned stacked layouts use `contain: strict` to isolate layout calculation scopes.
3.  **Active Will-Change Management:** `will-change` properties are attached dynamically on user interactions and removed upon animation endings.
4.  **Mobile Motion Adaptation:** Mobile screens (viewport `< 768px`) fall back to native scrolling, static/inline previews, and simple opacity fades, bypassing spring calculations and characters splits to preserve mobile processor battery.
