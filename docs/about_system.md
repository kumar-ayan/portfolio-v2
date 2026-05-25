# Master About System Blueprint: "NEURAL ORIGINS"
*Cinematic layout architecture, technical narrative structure, and scroll-reveal specifications for the portfolio About section.*

This document establishes the master UX and frontend engineering specifications for the About Section, ensuring it communicates high-agency engineering values and intellectual depth.

---

## 1. Section Layout Architecture

The About section utilizes an asymmetric 2-column grid layout, leaving generous white space to create a relaxed, editorial pacing.

```
+-------------------------------------------------------------------------------+
| [02 // MINDSET]                                                               |
| . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .  | <-- Dotted divider
|                                                                               |
|  (30% Left Column)                 (70% Right Column)                         |
|  [MONOSPACE CAPTION]               [NARRATIVE THESIS - Serif display]         |
|  OP_02 // AGENT_MINDSET            "I build architectures that adapt."        |
|                                                                               |
|                                    [PARAGRAPHS - Sans body]                   |
|                                    "Training agents requires balancing math   |
|                                    and systems speed..."                      |
|                                                                               |
|                                    [HOVER ACCENTS KEYWORDS]                   |
|                                    (Hovering math highlights reveal code)     |
+-------------------------------------------------------------------------------+
```

---

## 2. Narrative Structure & Content Strategy

We reject generic resume introductions (e.g. "I am a passionate coder"). The narrative is divided into three logical phases:

1.  **The Thesis (The What):** A single, striking sentence in high-contrast serif font explaining the owner's core engineering conviction (e.g. *"I train systems to navigate complexity through deterministic computation"*).
2.  **The Craft (The How):** Explains the owner's balance between theoretical modeling and production constraints. Highlights optimization, scale, and system speed.
3.  **The Horizon (The Why):** Focuses on interest in autonomous systems, reinforcement learning loops, and agent frameworks.

---

## 3. Typography Composition & Scale

*   **Narrative Thesis Heading:**
    *   *Typography Style:* Serif (Fraunces), `600` weight.
    *   *Sizing:* `clamp(1.5rem, 3vw + 0.5rem, 3.25rem)`
    *   *Line Height:* `1.15` (Creates an editorial, high-prestige feel).
*   **Body Copy:**
    *   *Typography Style:* Sans (PP Neue Montreal), `400` weight.
    *   *Sizing:* `clamp(0.95rem, 0.25vw + 0.8rem, 1.25rem)`
    *   *Line Height:* `1.6` (Generous line heights for maximum readability).
*   **Monospace Captions:**
    *   *Typography Style:* Monospace (PP Fraktion Mono), uppercase.
    *   *Sizing:* `text-[11px]`, tracking `0.2em`.

---

## 4. Motion & Reveal System

The entrance sequence is synchronized with scroll progress to ensure smooth visual delivery:

```
Scroll Playhead (Viewport bottom)
[ 80% Threshold ]   -->  SVG dotted divider line draws across (600ms)
[ 70% Threshold ]   -->  Monospace caption tag fades & types in (400ms)
[ 60% Threshold ]   -->  Thesis heading words translate up & fade (800ms)
[ 50% Threshold ]   -->  Body paragraphs fade in row-by-row (600ms)
```

*   **Line Reveals:** Dotted separator lines translate from `scaleX: 0` to `1` from the left edge. Easing: `$ease-out-expo`.
*   **Word-by-Word Reveals:** Thesis heading words are split and reveal as a stagger feed.
    *   *Stagger:* `0.03s` per word, duration `800ms`. Easing: `$ease-out-expo`.
*   **Paragraph Fades:** Body paragraphs slide up slightly (`y: 10px` to `0px`) and fade from `0` to `1` dynamically.

---

## 5. Visual Identity Integration

*   **Lab Accents:** Small monospaced boundary coordinates (e.g. `[LATENT_COORDINATES: 42.92]` or `[GPU_INIT_OK]`) frame the corners of the section.
*   **Subtle Blueprint Grids:** The 1px dotted grid pattern is rendered at `0.03` opacity in the background, creating a continuous blueprint texture.
*   **No Clutter:** Banned: generic illustrations, tech icons, or avatars. The text copy *is* the main visual asset.

---

## 6. Interaction System (Interactive Reading)

*   **Equation Highlights:** Mathematical terms in the text (e.g., $\nabla_\theta J(\theta)$ or $Q(s, a)$) hover-highlight in Phosphor Mint.
*   **Telemetry Reveals:** Hovering over specialized keywords (like "PPO" or "CUDA") reveals a small micro-tooltip containing brief technical definitions or parameter arrays.

---

## 7. Responsive & Performance Strategy

*   **Responsive Collapsing:** On viewports `< 1024px`, the split grid collapses into a single-column layout. Spacing shrinks from `120px` to `60px` vertical margins.
*   **Mobile Motion:** Character and word split triggers are disabled on mobile. Elements fade in using a single, lightweight parent transition.
*   **GPU Optimizations:** Text containers utilize `contain: content` during transition phases, preventing page-wide layout updates.
