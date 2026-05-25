# Master Background & Atmospheric Visual System Blueprint: "LATENT FIELD"
*Interactive silicon blueprint grids, spring-dampened mouse spotlight tracking, and hardware-accelerated canvas backdrops.*

This document establishes the master UX and frontend graphics engineering specifications for the background system, ensuring it provides depth, immersion, and technical atmosphere.

---

## 1. Background System Architecture & Z-Index Layering

To prevent visual clutter, background assets are organized into five distinct canvas layers situated behind the main content layouts:

```
Z-INDEX LAYER SYSTEM:
[Layer 10] --> Main Scroll Content (text columns, buttons, cards)
[Layer  4] --> Dotted SVG Grid Borders & Horizontal Dividers
[Layer  3] --> Interactive Mouse Spotlamp Layer (CSS radial-gradient)
[Layer  2] --> Dotted Blueprint Grid Layer (0.04 opacity SVG pattern)
[Layer  1] --> HSL Gradient Ambient Atmospheric Canvas (blur(60px))
[Layer  0] --> Solid Canvas Black Base (hsl(240, 9%, 3%))
```

---

## 2. Dotted Blueprint Grid Layer

*   **Grid Dimensions:** Configured as a repeating `80px x 80px` layout grid drawn using SVG patterns.
*   **Drawing Code (CSS):**
    ```css
    .bg-grid-blueprint {
      background-image: radial-gradient(circle, hsla(var(--bg-muted), 0.15) 1px, transparent 1.5px);
      background-size: 80px 80px;
      opacity: 0.8;
    }
    ```
*   **Narrative Purpose:** Simulates architectural drawing paper or engineering blueprints, referencing the technical nature of AI systems development.

---

## 3. Interactive Mouse Spotlamp (Lighting Simulation)

The mouse pointer acts as an interface lighting catalyst.

*   **The Spotlight Gradient:**
    A subtle CSS radial-gradient follows the mouse coordinates. It shines a soft phosphor mint glow (`rgba(79, 250, 157, 0.06)`) that dissolves into transparent over a `400px` radius:
    ```css
    .bg-spotlight {
      background: radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(78, 250, 157, 0.06) 0%, transparent 80%);
    }
    ```
*   **Spring Inertia Tracking:**
    The spotlamp center coordinates (`--mouse-x`, `--mouse-y`) track the mouse with a spring delay (`stiffness: 70`, `damping: 20`), causing the light to float behind the cursor.

---

## 4. Atmospheric Gradient Philosophy

We avoid standard colorful linear gradients that look cheap. We use HSL ambient maps:

*   **The Ambient Map:** A soft, circular gradient positioned in the upper right and bottom left viewports.
*   **Colors:** Deep slate blue (`hsla(210, 30%, 15%, 0.15)`) fading into the canvas black.
*   **Damping Filter:** Softened using high-blur filters:
    ```css
    filter: blur(120px);
    ```
*   **Parallax Scroll:** GSAP ScrollTrigger moves the gradients slowly (`speed: 0.1`) opposite to the scroll direction, creating a three-dimensional depth effect during page scrolling.

---

## 5. Section Atmosphere Variations

*   **Hero Section:** Pure Canvas Black base with the blueprint grid and the active mouse spotlight. High-energy, minimal.
*   **Expertise Section:** Deep slate blue atmospheric gradients fade in behind the GSAP pinned panel. Creates focal depth.
*   **Research Section:** The live loss curve canvas sits on top of a carbon gray backdrop, simulating a laboratory workstation.
*   **Contact Section:** A subtle phosphor green glow increases at the bottom of the viewport, signaling completion.

---

## 6. Responsive & Performance Strategy

*   **Mobile Simplification:**
    On viewports `< 768px`, the mouse spotlamp and dynamic blur gradients are disabled. Background layers merge into a single solid background color (`#080809`), bypassing CPU calculations to protect mobile processor batteries.
*   **Layout Containment:**
    The background layers container utilizes:
    ```css
    contain: strict;
    transform: translate3d(0, 0, 0);
    ```
    This promotes the atmospheric canvases to their own GPU layers, ensuring mouse movements do not trigger layout reflows in the text and UI layers.
*   **RequestAnimationFrame Coordinate Binding:**
    Mouse coordinates are bound directly to CSS custom properties inside a `requestAnimationFrame` loop, preventing React render loop blocking.
