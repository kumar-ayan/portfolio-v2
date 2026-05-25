# Master Research & Experimental Systems Blueprint: "EXPERIMENTAL MATRIX"
*Cinematic research panel architectures, real-time training loss graphs, and interactive academic citation metrics.*

This document establishes the master UX and frontend engineering specifications for the Research & Experimental Systems section, presenting the owner's active research work, paper publications, and open-source playgrounds.

---

## 1. Research Section Architecture

The section is organized as a **Three-Panel Experimental Grid** separated by 1px dotted SVG layout lines. We reject static grids and paper citation lists, building instead a live diagnostic environment.

```
+-------------------------------------------------------------------------------+
| [06 // RESEARCH_PLAYGROUND]                                                   |
| . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .  | <-- Dotted divider
|                                                                               |
|  +--------------------------+  +------------------------+  +---------------+  |
|  | PANEL 1: TRAINING LOSS   |  | PANEL 2: PUBLICATIONS  |  | PANEL 3: GIT  |  |
|  |                          |  |                        |  |               |  |
|  | [LIVE PYTORCH CANVAS]    |  | CS 102: RL Simulation  |  | [LOG FEED]    |  |
|  | Steps: 4,921             |  | citation: 120          |  | commit: 4e2a  |  |
|  | Loss: 0.0024             |  | ArXiv PDF link         |  | push: main    |  |
|  | (plots curves live)      |  |                        |  |               |  |
|  +--------------------------+  +------------------------+  +---------------+  |
|                                                                               |
+-------------------------------------------------------------------------------+
```

---

## 2. Research Narrative Structure & Content Strategy

The section details the developer's contributions to AI research across three vectors:

1.  **Applied Exploration (Panel 1):** Presenting real-time model metrics. Features an active training loop simulator to prove visual modeling capabilities.
2.  **Academic Publications (Panel 2):** Monospace rows documenting academic papers published or preprinted (ArXiv URLs, citation counts, and key methodologies).
3.  **Active Open Source (Panel 3):** Git commit feeds capturing code commits, repository stars, and framework additions.

---

## 3. The Live Loss Canvas (Panel 1)

*   **HTML5 Canvas 2D Plotter:**
    The canvas simulates an active training run, plotting epoch losses in real-time.
*   **Mathematical Curve Generation:**
    Calculated via a logarithmic-decay formula with random noise to simulate actual training physics:
    $$\text{Loss}(t) = a \cdot e^{-b \cdot t} + c + \text{noise}(t)$$
*   **Interactions:** Hovering the canvas highlights coordinate values ($x$: step, $y$: loss value) inside a small tracking indicator.

---

## 4. Typography & Labeling System

*   **Panel Header Anchors:**
    *   *Typography Style:* Monospace (PP Fraktion Mono), uppercase.
    *   *Sizing:* `text-[12px]`, tracking `0.18em`.
*   **Publication Titles:**
    *   *Typography Style:* Serif (Fraunces), `500` weight, line-height `1.1`.
    *   *Sizing:* `clamp(1rem, 0.75vw + 0.8rem, 1.6rem)`.
*   **Telemetry Logs:**
    *   *Typography Style:* Monospace, color `var(--color-accent)`.
    *   *Sizing:* `text-[11px]`.

---

## 5. Motion & Reveal System

The panels enter the screen dynamically using a stagger timeline:

```
Scroll Threshold (Viewport bottom)
[ 80% Threshold ]   -->  Horizontal grid dividers draw open (600ms)
[ 70% Threshold ]   -->  Panel 1: Loss Canvas fades & begins plotting (800ms)
[ 60% Threshold ]   -->  Panel 2: Publication list rows stagger in (50ms delay)
[ 50% Threshold ]   -->  Panel 3: Git console log lines print sequentially (100ms interval)
```

*   **Log Feed Animation:** Git commit lines translate up and fade in sequentially, mimicking a server command terminal feed.
*   **Scale Hover:** Hovering a panel translates the boundary card up `4px` and scales it (`1.01`) over `200ms` using `$ease-out-expo`.

---

## 6. Responsive & Performance Strategy

*   **Mobile Collapsing:** On viewports `< 1024px`, the 3-panel row collapses to a vertical grid. The live loss canvas transitions to static, pre-rendered loss curves (SVG format) to save processor battery, and Git console feeds are simplified.
*   **Draw Path Optimization:** The Canvas plotter retains only the last 100 coordinates, preventing memory heap overflow.
*   **Viewport Observation:** The canvas update loop runs only when visible on screen (`IntersectionObserver`), preserving GPU cycles.
