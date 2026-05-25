# Master AI/ML & Reinforcement Learning Focus System Blueprint: "LATENT AGENTS"
*Cinematic scroll-pin layouts, Policy Gradient math specifications, and low-latency agent simulator previews.*

This document establishes the master design and engineering blueprint for the AI/ML Focus & Reinforcement Learning Systems sections, combining research-grade mathematical logic with high-fidelity visual storytelling.

---

## 1. AI/ML Section Architecture (GSAP Scroll-Pin)

The layout is built as a **Pinned Double-Viewport Container** that locks the user's screen. The left viewport pins an interactive diagnostic screen, while the right viewport scrolls through technical research domains.

```
+-------------------------------------------------------------------------------+
| [04 // FOCUS_AREAS]                                                           |
| . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .  | <-- Dotted divider
|                                                                               |
|  +--------------------------------+  +-------------------------------------+  |
|  | LEFT PANEL: PINNED TELEMETRY   |  | RIGHT PANEL: SCROLLING RESEARCH     |  |
|  |                                |  |                                     |  |
|  | [ACTIVE ENV SIMULATOR PLAYBACK]|  | > 01. REINFORCEMENT LEARNING        |  |
|  | WebM Video Loop (Atari/Physics)|  |   Policy optimization, reward       |  |
|  |                                |  |   design, Bellman constraints       |  |
|  | [POLICY EQUATION MATRIX]       |  |                                     |  |
|  | LaTeX render: L_PPO(\theta)    |  | > 02. GENERATIVE ARCHITECTURES      |  |
|  |                                |  |   Latent diffusion, attention       |  |
|  | [REAL-TIME VALUE PLOT]         |  |   maps, fine-tuning structures      |  |
|  +--------------------------------+  +-------------------------------------+  |
|                                                                               |
+-------------------------------------------------------------------------------+
```

---

## 2. Content Structure & Technical Narrative

The scrolling content on the right partitions into three core research vectors:

### Vector 1: Reinforcement Learning (Agent Policy Design)
*   **Narrative Focus:** Designing models that maximize rewards in complex, dynamic physics simulations.
*   **Equations Represented (LaTeX):** Policy objective optimizations:
    $$\mathcal{L}^{CLIP}(\theta) = \hat{\mathbb{E}}_t \left[ \min\left(r_t(\theta)\hat{A}_t, \text{clip}(r_t(\theta), 1-\epsilon, 1+\epsilon)\hat{A}_t\right) \right]$$
*   **Left Panel Visual:** A compressed WebM simulation video of an agent training in a Mujoco robotics environment (e.g. robotic arm reaching task) or a custom grid-world simulator.

### Vector 2: Generative Architectures (Deep Learning)
*   **Narrative Focus:** Harnessing attention mechanisms for structural generative modeling, fine-tuning parameters, and mapping latent spaces.
*   **Equations Represented (LaTeX):** Scaled Dot-Product Attention:
    $$\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V$$
*   **Left Panel Visual:** A dynamic visual representing a 2D attention weights projection map.

### Vector 3: AI Systems & Quantized Deployment (Scale)
*   **Narrative Focus:** CUDA kernel optimization, Triton inference topologies, and model quantization (FP8, INT4) for sub-millisecond serving latencies.
*   **Left Panel Visual:** Hardware diagnostic telemetry plotting CPU/GPU memory bandwidth constraints.

---

## 3. Motion & Intersection Control (GSAP)

*   **GSAP Pinning Engine:**
    The parent container `#aiml-focus-section` is locked:
    ```javascript
    ScrollTrigger.create({
      trigger: "#aiml-focus-section",
      start: "top top",
      end: "+=300%", // Scroll depth representing the 3 sections
      pin: true,
      scrub: 1.2,
      onUpdate: (self) => {
        const activeSection = Math.min(Math.floor(self.progress * 3), 2);
        updateActiveIndex(activeSection); // Updates state, triggering left panel mask wipes
      }
    });
    ```
*   **Left Panel Mask transitions:**
    When the active index changes, the old visualization fades and slides down (`y: 30px`, `opacity: 0`) while the new visual fades and scales up from background layers (`scale: 0.95` to `1.0`, `opacity: 1`) using `$ease-out-expo` (duration `450ms`).

---

## 4. Typography & Labeling System

*   **LaTeX Math Blocks:**
    *   *Typography Style:* Serif (Computer Modern / Math font), clean centered padding.
    *   *Sizing:* `text-[16px]` to `text-[18px]` on desktop.
*   **Technical Details captions:**
    *   *Typography Style:* Monospace (PP Fraktion Mono), color `var(--color-accent)`.
    *   *Sizing:* `text-[11px]`, tracking `0.1em`.
*   **Research descriptions:**
    *   *Typography Style:* Sans (PP Neue Montreal), line-height `1.5`.
    *   *Sizing:* `text-[16px]`.

---

## 5. Interactive Simulation Playbacks (Telemetry Overlay)

*   **Simulation Log Feed:** Next to the WebM simulation playbacks, a vertical text console prints mock training states in real-time:
    ```
    [AGENT_STATUS] Step: 492,021 // Reward: +12.4
    [NETWORK_LOG] Policy Entropy: 0.0124 // Value Loss: 0.0084
    ```
    This adds scientific authenticity to the visual.
*   **Policy Vector Grid:** Hovering over the simulation visual overlays a 2D vector coordinate grid tracking the mouse pointer, simulating interactive environment checks.

---

## 6. Responsive & Performance Strategy

*   **Mobile Collapsing:** On screens `< 1024px`, the GSAP pinning layout is deactivated. Sections stack vertically. WebM simulation playbacks collapse to inline elements placed directly underneath their corresponding text headers.
*   **Simulation Playback Optimization:** WebM files are heavily compressed (under 1.5MB), muted, set to loop, and play only when they intersect with the active screen viewport (`IntersectionObserver`).
*   **GPU Promotion:** The sliding panels use `transform: translate3d()` to trigger GPU composition, keeping layout repaint cycles near 0%.
