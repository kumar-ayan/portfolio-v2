# Master Hero System Blueprint: "LATENT APERTURE"
*Cinematic layout architecture, motion sequencing schedules, and interaction specifications for the portfolio hero.*

This document establishes the master design and engineering blueprint for the Hero Section, ensuring it delivers a high-impact, premium technical entrance sequence.

---

## 1. Hero Layout Architecture

The hero layout utilizes an asymmetric split grid that focuses attention on the central thesis statement while keeping system metrics and navigation elements framed at the boundaries.

```
+-------------------------------------------------------------------------------+
| LOGO: [OP_01]                BREADCRUMBS: Home / Main            [ Vienna/Time ]|
+-------------------------------------------------------------------------------+
|                                                                               |
|  (0.05 Opacity Blueprint Grid Layout Background)                              |
|                                                                               |
|  [H1 Line 1: Character Split Mask]                                            |
|  "Training Deterministic Agents"                                              |
|                                                                               |
|  [H1 Line 2: Character Split Mask]                                            |
|  "In Non-Deterministic Worlds"                                                |
|                                                                               |
|  +--------------------------+                                                 |
|  | [INITIALIZE SESSION] CTA |                                                 |
|  +--------------------------+                                                 |
|                                                                               |
|  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .  |
|  [TICKER HUD] -> CUDA active // Temp: 42C // Epoch: 821 // star telemetry     |
+-------------------------------------------------------------------------------+
```

---

## 2. Typography Composition & Scale

*   **Main Display Header:**
    *   *Typography Style:* Serif (Fraunces), `700` weight, sentence case.
    *   *Sizing:* `clamp(2.5rem, 6vw + 1rem, 7.5rem)`
    *   *Line Height:* `0.9` (Tightly stacked lines to create a unified block outline).
    *   *Letter Spacing:* `-0.04em` (Kerned tightly to resemble high-end editorial layouts).
*   **System Sub-labels:**
    *   *Typography Style:* Monospace (PP Fraktion Mono), uppercase.
    *   *Sizing:* `text-[11px]`, tracking `0.2em`.

---

## 3. Cinematic Motion Sequence (Timeline)

The entrance choreography begins at the preloader and staggers elements sequentially:

```
Time (ms)  0.0s              0.6s            1.2s             1.8s
Timeline   [-- CUDA Init --] [-- Split --]   [-- Head --]     [-- UI HUD --]
           * SVG Dotted bar  * Loader panel  * H1 lines       * Clock starts
           * Steps(7) loop   * slides up     * reveal upward  * Scroll cue ticks
```

*   **Step 1: The Loader Loop (0.0s - 1.2s)**
    CUDA boot logs scroll on the preloader screen (`#f1e500` background) while the SVG dotted progress bar fills.
*   **Step 2: Viewport reveal (1.2s - 1.8s)**
    The loader panel translates up out of the viewport. Easing: `$ease-in-out-expo` (`cubic-bezier(0.85, 0, 0.15, 1)`).
*   **Step 3: Heading Entrance (1.8s - 2.6s)**
    The two lines of the main display header translate up from parent masks (which have `overflow: hidden`) with a line stagger of `150ms`. Easing: `$ease-out-expo` (`cubic-bezier(0.16, 1, 0.3, 1)`).
*   **Step 4: HUD & Ticker Reveal (2.6s+)**
    The top navigation HUD, the UTC timezone clock, and the bottom horizontal scrolling ticker fade in (`opacity: 1`, duration `400ms`).

---

## 4. Background Visual System (Silicon Blueprint)

To avoid distracting particle overlays or heavy WebGL meshes, we use a flat, responsive **Silicon Blueprint Grid**:

*   **Blueprint Grid:** A static `80px x 80px` layout grid drawn using SVG dotted patterns at `0.04` opacity against the dark canvas background.
*   **Interactive Spotlamp:** A CSS radial-gradient follows the mouse coordinates behind the grid layers (`layer 0`), creating a faint, moving phosphor glow (`rgba(79, 250, 157, 0.08)`) that highlights grid intersections.

---

## 5. CTA Interaction System (Initialize Connection)

The call-to-action button is styled as an interface switch.

*   **Default State:** Outlined in a thin dotted grid line, monospace uppercase text: `[ INITIALIZE SESSION ]`.
*   **Magnetic Attraction:** The cursor is captured when it enters a `35px` radius of the button coordinates, pulling the button container towards the mouse by a factor of `0.35`.
*   **Hover State:** Background fills with solid mint green (`#4EFA9D`), text transitions to obsidian black (`#080809`), and the button executes a micro-scale of `1.03` over `150ms`.

---

## 6. Scroll Cue System

*   **Visual Indicator:** A vertical dotted SVG scroll-progress tracker sits in the bottom right corner.
*   **Interaction:** Scrolling down causes the dots to fill with solid green lines in sync with scroll progress.
*   **Translation Layering:** As the user scrolls, the hero section elements translate upward at different velocities (Parallax factors: H1 text at `0.1`, background blueprint grid at `0.05`, and HUD nav stays fixed at `0.0`).

---

## 7. Responsive Hero Behavior

*   **Desktop (> 1024px):** Fully active custom cursor tracking, magnetic CTA attraction, and blueprint grid follow spots.
*   **Tablet (768px - 1024px):** Custom cursor disabled; grid spotlamp remains fixed in the center. Text sizes scale dynamically using fluid clamps.
*   **Mobile (< 768px):** Header fonts drop scale; CTA button displays inline. All animations revert from character-split staggers to basic line opacity reveals to protect mobile processors.

---

## 8. Hero Performance Strategy

*   **Transform-Only Animations:** The entrance animations alter only `transform: translate3d()` and `opacity` properties. We never animate height, margin, or layout coordinates.
*   **Containment:** The hero container has CSS containment `contain: strict` set during transition phases, preventing layout calculations from expanding beyond its boundaries.
