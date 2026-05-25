# Master Skills & Expertise System Blueprint: "NEURAL ECOSYSTEM"
*Futuristic interface architecture, blueprint panel systems, and interactive tech capability maps for the skills section.*

This document establishes the master UI/UX and frontend engineering specifications for the Skills & Technical Expertise section, ensuring it presents the engineer's capabilities as an integrated, high-fidelity system.

---

## 1. Skills Section Architecture

The section is designed as a **Technical Blueprint Matrix** divided by 1px dotted SVG lines. We reject simple lists, visual badges, or progress bars, opting instead for a unified, mechanical interface panel.

```
+-------------------------------------------------------------------------------+
| [03 // SYSTEMS_ECOSYSTEM]                                                     |
| . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .  | <-- Dotted divider
|                                                                               |
|  +--------------------------------+  +-------------------------------------+  |
|  | CATEGORY NAV PANELS (Left 30%) |  | DETAILS DISPLAY WORKSPACE (Right 70%)|  |
|  |                                |  |                                     |  |
|  | > 01. Reinforcement Learning   |  | [ACTIVE CATEGORY HUD]               |  |
|  |   02. Deep Learning            |  | Model Architectures:                |  |
|  |   03. Systems & Infrastructure |  | -> PPO, SAC, custom simulators      |  |
|  |   04. Software Engineering     |  |                                     |  |
|  |                                |  | [LIVE ACTIVATION CANVAS]            |  |
|  |                                |  | (Visualizes real-time node weights) |  |
|  +--------------------------------+  +-------------------------------------+  |
|                                                                               |
+-------------------------------------------------------------------------------+
```

---

## 2. Capability Categorization Strategy

We group skills into structured engineering categories to demonstrate depth:

1.  **Reinforcement Learning:** PPO, SAC, DDPG, custom Gym/Gymnasium simulators, reward function engineering, simulation-to-real transfer.
2.  **Deep Learning:** Transformers, Diffusion models, CNNs, RNNs, custom loss function design, gradient optimization.
3.  **AI Frameworks:** PyTorch, JAX, HuggingFace Transformers, TensorBoard, Weights & Biases.
4.  **Systems & Infrastructure:** CUDA, Triton Inference Server, ONNX Runtime, Docker, Kubernetes, AWS.
5.  **Software Engineering:** Python (Expert), C++, Rust, Go, Git, Bash.
6.  **Full-Stack & Frontend:** Next.js, React, TypeScript, TailwindCSS, Framer Motion, GSAP, WebSockets.

---

## 3. The Details Display Workspace (Interactive UI)

*   **Interactive Split Grid:**
    *   *Left Column (Active Navigation):* Clicking or hovering a category switches the active index.
    *   *Right Column (Workspace):* Displays the active category’s technical skills as a set of flat blueprint blocks, accompanied by a **Dynamic Node Canvas**.
*   **The Live Node Canvas:**
    *   An HTML5 `<canvas>` that renders a simulated neural network layer (nodes and weight paths).
    *   *Interaction:* When a category is clicked, the canvas triggers a "forward pass" animation—nodes light up in Phosphor Mint and draw connection lines sequentially across the panel, symbolizing mathematical computing.

---

## 4. Typography & Labeling System

*   **Category Anchors:**
    *   *Typography Style:* Monospace (PP Fraktion Mono), uppercase.
    *   *Sizing:* `text-[13px]`, tracking `0.15em`.
*   **Skill Detail Labels:**
    *   *Typography Style:* Sans (PP Neue Montreal), `500` weight.
    *   *Sizing:* `clamp(1rem, 0.5vw + 0.8rem, 1.35rem)`.
*   **Active Metric Captions:**
    *   *Typography Style:* Monospace, color `var(--color-accent)` (Mint Green).
    *   *Sizing:* `text-[11px]`.

---

## 5. Motion & Reveal System

The section reveals using a structured stagger timeline:

```
Scroll Threshold (Viewport bottom)
[ 80% Threshold ]   -->  Horizontal SVG dotted grid line draws open (600ms)
[ 70% Threshold ]   -->  Category nav panel lists slide in sequentially (60ms stagger)
[ 60% Threshold ]   -->  First active workspace details panel fades to 1.0 (400ms)
[ 50% Threshold ]   -->  Live Node Canvas fires first activation loop (800ms)
```

*   **Category Transition easing:** Switching categories fades out the current details block (`opacity: 0`, `y: -10px`) over `150ms` and fades/slides in the new details block (`opacity: 1`, `y: 0`) over `300ms` using `$ease-out-expo`.
*   **Glow pulse:** On clicking a category, the button text fires a subtle phosphor text shadow glow pulse (`duration: 250ms`).

---

## 6. Responsive & Performance Strategy

*   **Responsive Collapsing:** On viewports `< 1024px`, the split layout collapses to a vertical stack. The interactive canvas is hidden; instead, skill badges are displayed in clean, flat responsive grids. Spacing decreases to a `$space-md` base.
*   **Rerender Minimization:** The node canvas uses cached coordinates for node coordinates, updating only opacity parameters in the rAF render loop to prevent browser paint lag.
*   **GPU Containment:** The canvas container uses `contain: strict` to isolate browser recalculations to its boundaries during activation passes.
