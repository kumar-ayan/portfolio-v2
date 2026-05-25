# Master Projects & Case Study System Blueprint: "VERIFIED ARCHITECTURES"
*Cinematic hover-reveal lists, dynamic model validation case layouts, and interactive telemetry dashboards for projects.*

This document establishes the master UX and frontend engineering specifications for the Featured Projects and Case Study detail pages, ensuring major systems are presented with high scientific authenticity and visual prestige.

---

## 1. Projects List Showcase Architecture (Home Page)

The home projects showcase is built as a vertical **Coordinate-Tracking Row List**. We reject static cards and grids in favor of a clean, text-driven layout separated by dotted lines:

```
+-------------------------------------------------------------------------------+
| [05 // VERIFIED_SYSTEMS]                                                     |
| . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .  | <-- Dotted divider
|                                                                               |
|  [CS 092]   AGENT_ARENA: DRL MULTI-AGENT ENVIRONMENT           [ PPO / PYTORCH]
|  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
|                                                                               |
|  [CS 084]   LATENT_DIFFUSION: COMPRESSED TENSOR GENERATION      [ JAX / CUDA ]
|  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
|                                                                               |
|  [CS 071]   TRITON_TOPOLOGY: QUANTIZED FP8 MODEL SERVING     [ TRITON / C++ ]
|  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
|                                                                               |
|  [FLOATING MOUSE CURSOR PREVIEW PANEL]                                        |
|  - follows cursor coordinates with spring damping                            |
|  - displays screenshot/playback loop & training log overlay                   |
+-------------------------------------------------------------------------------+
```

*   **Row Mechanics:** Each row displays a monospace case ID (e.g., `CS 092`), the system title (`PP Neue Montreal` or `Inter` in light-uppercase), and technical stack badges (e.g. `[ PPO / PYTORCH ]`).
*   **The Cursor Follower Preview:** Hovering a row translates a preview panel (`320px x 180px`) to track the mouse coordinates. It features:
    *   An AVIF screenshot of the system.
    *   A monospace HUD overlay displaying live-updating hyperparameter metrics (e.g. `BATCH: 2048 // ENTROPY: 0.012 // GPU: 8x A100`).

---

## 2. Cinematic Case Study Layout (`/project/[id]`)

When a project is clicked, a **Speculative transition sweep** replaces the viewport with a dedicated model validation log page. The page is structured like an interactive engineering document.

```
+-------------------------------------------------------------------------------+
| BREADCRUMBS: Home / Systems / CS 092                            [ Vienna/Time ]|
|-------------------------------------------------------------------------------|
|                                                                               |
|  CS 092: AGENT_ARENA                                                          |
|  "Decentralized Multi-Agent Coordination via PPO Policies"                    |
|                                                                               |
|  +--------------------------------+  +-------------------------------------+  |
|  | DIAGNOSTIC telemetries (30%)   |  | ENGINEERING DIALOG (70% Scroll)     |  |
|  |                                |  |                                     |  |
|  | - System Specs:                |  | 1. Problem Statement                |  |
|  |   8x NVIDIA H100 GPU           |  | 2. Engineering Goal                 |  |
|  | - Training Duration:           |  | 3. System Architecture (LaTeX)      |  |
|  |   48 Hours // 1.2B steps       |  | 4. Technical Challenges             |  |
|  | - Hyperparameter Matrix        |  | 5. Performance Optimization         |  |
|  +--------------------------------+  +-------------------------------------+  |
|                                                                               |
+-------------------------------------------------------------------------------+
```

### Case Study Narrative Sections
1.  **Problem Statement:** The baseline computational or systemic bottleneck.
2.  **Engineering Goal:** Define the target metrics (e.g. scale throughput, reward thresholds, latency budgets).
3.  **System Architecture:** Block diagrams or LaTeX mathematical equations showing the neural structures or policy algorithms:
    $$\theta_{t+1} = \theta_t + \alpha \nabla_\theta \log \pi_\theta(a|s) A^{\pi_\theta}(s, a)$$
4.  **Technical Challenges:** Detailing debugging, training instability, or hardware limitations.
5.  **Performance Optimization:** Concrete metrics showing execution gains (e.g. CUDA memory optimization reducing VRAM footprint by 40%).
6.  **Final Outcome & Future Improvements:** What the system achieved (with live loss curves and weights visualizations).

---

## 3. Motion & Transition System

*   **Framer Motion Spring Cursor follower:**
    Uses dampening parameters: `mass: 0.25`, `stiffness: 90`, `damping: 24` to trail the mouse pointer coordinate values.
*   **The Speculative Sweep (Page Transition):**
    Clicking a project row initiates an exit transition:
    *   The row text highlights to active green (`#4EFA9D`).
    *   A full-panel dark green screen sweeps up. Easing: `$ease-in-out-expo` (duration `500ms`).
    *   The dynamic route `/project/[id]` loads in the background. The sweep slides up, revealing the case study page with a staggered column entrance sequence.

---

## 4. Typography & Styling Rules

*   **Project Row Headings:**
    *   *Typography Style:* Sans (PP Neue Montreal), `500` weight.
    *   *Sizing:* `clamp(1.2rem, 1.5vw + 0.8rem, 2.5rem)`.
*   **Monospace Row IDs:**
    *   *Typography Style:* Monospace (PP Fraktion Mono), color `var(--color-accent)`.
    *   *Sizing:* `text-[13px]`.
*   **Case Title (Inside detail route):**
    *   *Typography Style:* Serif (Fraunces), `700` weight, line-height `0.95`.
    *   *Sizing:* `clamp(2rem, 5vw + 1rem, 5.5rem)`.

---

## 5. Responsive & Performance Strategy

*   **Responsive Collapsing:**
    On viewports `< 1024px`, the hover follow cursor preview is disabled. Rows display static screenshots inline directly underneath each project card. The detailed case page split grids collapse to 1-column scroll timelines.
*   **Linear Interpolation (Lerp) coordinate updates:**
    The follow-coordinates calculation runs inside a requestAnimationFrame loop, writing updates directly to CSS style variables (`--x`, `--y`) to bypass React re-renders.
*   **Static Site Generation (SSG):**
    Case study pages `/project/[id]` are pre-compiled using Next.js static paths (`generateStaticParams`) during build steps, ensuring instant loading speeds (FCP < 0.5s).
*   **Containment:**
    Rows utilize CSS containment `contain: strict` to isolate browser paint scopes during mouse pointer movements.
