# Master Experience & Professional Journey System Blueprint: "DEVELOPMENT LOG"
*Cinematic timeline layouts, version-release career logging, and scroll-linked path animations for the experience section.*

This document establishes the master UX and frontend engineering specifications for the Experience & Professional Journey section, presenting career milestones as a continuous engineering evolution.

---

## 1. Experience Section Architecture

The career timeline is designed as an **Active Development Log** styled after software version changelogs. We reject boring templates and simple list layouts, opting for an integrated system where roles are documented as "system version releases."

```
+-------------------------------------------------------------------------------+
| [07 // DEVELOPMENT_LOG]                                                       |
| . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .  | <-- Dotted divider
|                                                                               |
|   TIMESTAMP          LOG EVENT & RELEASE SUMMARY                              |
|   (Left Column)      (Right Column)                                           |
|                                                                               |
|   [2024 - 2026]      v2.1.0 // LEAD AI SYSTEMS ENGINEER @ STARTUP_CORE        |
|   o                  - Scaling distributed training pipelines.               |
|   |                  - Implemented FP8 quantization loops.                   |
|   |                                                                           |
|   |                  v2.0.0 // AI RESEARCH ASSOCIATE @ LAB_ONE                |
|   o                  - Conducted policy gradient optimization research.      |
|   |                  - Maintained Gymnasium simulation environments.         |
|   |                                                                           |
|   v                  v1.0.0 // INITIAL_SETUP // SYSTEMS ENGINEER INTERN       |
|                      - Configured Kubernetes clusters, Docker setups.        |
+-------------------------------------------------------------------------------+
```

*   **Row Splits:** Left column displays monospaced date nodes (e.g. `[2024 - 2026]`); right column holds the version header (e.g., `v2.1.0 // LEAD AI SYSTEMS ENGINEER`) and structured deliverables list.
*   **The Scroll-Linked Path:** A vertical timeline line connects nodes. As the user scrolls, the line draws down from node to node, changing color from grid gray to Phosphor Mint as it crosses active items.

---

## 2. Journey Storytelling Structure

Career events are framed as software iterations, illustrating systemic progression:

*   **v1.0.0 (Initialization):** Foundations of software engineering, backend systems, and container configurations (Internships/Workshops).
*   **v2.0.0 (Policy Exploration):** Diving deep into deep learning, reinforcement learning models, and simulation runtimes (Research/Undergrad).
*   **v2.1.0 (Production Scale):** Scaling agent pipelines, quantizing parameters, and building low-latency inference endpoints (Commercial Experience).
*   **v3.0.0 (Future Vector):** Statement of future engineering ambitions and research directions.

---

## 3. Typography & Styling Rules

*   **Version Release Titles:**
    *   *Typography Style:* Monospace (PP Fraktion Mono), color `var(--color-accent)`.
    *   *Sizing:* `text-[13px]`, tracking `0.1em`.
*   **Company Name & Role:**
    *   *Typography Style:* Serif (Fraunces), `500` weight, line-height `1.15`.
    *   *Sizing:* `clamp(1.1rem, 1.25vw + 0.8rem, 2.2rem)`.
*   **Deliverable Bullet Points:**
    *   *Typography Style:* Sans (PP Neue Montreal), color `#D4E1D8`, line-height `1.5`.
    *   *Sizing:* `text-[15px]`.

---

## 4. Motion & Reveal System

The timeline draws in sync with the viewport scroll progression:

```
Scroll Playhead (Viewport bottom)
[ 80% Threshold ]   -->  Active timeline vertical line begins drawing down (Lenis scrub)
[ 70% Threshold ]   -->  Timestamp node highlights & pulses (mint shadow, 300ms)
[ 60% Threshold ]   -->  Changelog version details slide up & fade to 1.0 (500ms)
[ 50% Threshold ]   -->  Deliverable bullet list staggers in row-by-row (40ms interval)
```

*   **SVG Path Scrubbing:** Driven by GSAP ScrollTrigger, mapping the timeline `stroke-dashoffset` directly to scroll coordinates.
*   **Hover Metric Reveals:** Hovering over a deliverables block reveals a diagnostic HUD overlay displaying details on tools used in that role (e.g. `TOOLS: PyTorch, Docker, CUDA`).

---

## 5. Responsive & Performance Strategy

*   **Responsive Collapsing:** On viewports `< 768px`, the left timestamp column collapses. Dates display directly inline above the version header. The timeline drawing line is simplified, and card margins shrink to `$space-md` limits.
*   **Path Scrubbing Optimization:** The scroll path uses a simple linear SVG line element to prevent heavy layout repaints on scroll ticks.
*   **GPU Promotion:** Job nodes are wrapped in CSS `contain: content` containers, ensuring scroll-linked animations do not invalidate parent coordinates.
