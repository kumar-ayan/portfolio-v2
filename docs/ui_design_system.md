# Master UI Design System: "NEURAL CORE SPEC"
*A production-grade design token system, component styling framework, and visual engineering guide for the Silicon Brutalism UI.*

This document establishes the official visual rules, layout rhythms, color coordinates, typography parameters, and depth systems for the entire project. It serves as the master engineering guide for coding the Tailwind configuration and UI components.

---

## 1. Design Token System & Tailwind Configuration

To avoid generic Tailwind layout aesthetics, we override default tokens with custom HSL variables representing our technical brutalist design.

```
                  +-----------------------------------+
                  |         TAILWIND CONFIG           |
                  +-----------------------------------+
                                    |
            +-----------------------+-----------------------+
            |                                               |
+-----------------------+                       +-----------------------+
|  THEME COLORS (HSL)   |                       |  TYPOGRAPHY (VAR)     |
|  - Canvas: #080809    |                       |  - Serif: Fraunces    |
|  - Grid: #131515      |                       |  - Mono: PP Fraktion  |
|  - Accent: #4EFA9D    |                       |  - Sans: Neue Montreal|
+-----------------------+                       +-----------------------+
```

### HSL Color Tokens
Colors are configured as HSL raw channel values in CSS to allow inline alpha opacity overrides (`hsla()` configurations):

```css
:root {
  /* canvas backgrounds */
  --bg-canvas: 240 9% 3%;     /* #080809 - Slate Obsidian */
  --bg-surface: 240 6% 6%;    /* #0f0f10 - Titanium Charcoal */
  --bg-muted: 180 5% 8%;      /* #131515 - Carbon Metal */

  /* foreground elements */
  --color-copy: 140 16% 86%;  /* #D4E1D8 - CRT White */
  --color-accent: 148 94% 64%;/* #4EFA9D - Phosphor Mint */
  --color-warn: 25 100% 50%;  /* #FF6A00 - Plasma Orange */
  
  /* borders and grids */
  --border-muted: 180 5% 12%; /* #1d2020 - Grid Line Gray */
}
```

---

## 2. Typography Scale & Layout Hierarchy

Typography is the core structural element. Headers are styled as bold editorial statements; coordinates and system labels are rendered in small, technical mono fonts.

### Typography Scale Table
| Style Category | Font Stack | Size (Responsive Calc) | Line Height | Tracking | Case |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display H1 (Hero)** | Serif (Fraunces) | `clamp(2.5rem, 6vw + 1rem, 7.5rem)` | `0.9` | `-0.04em` | Sentence |
| **Section H2 (Headers)**| Serif (Fraunces) | `clamp(1.8rem, 4vw + 0.5rem, 4rem)` | `1.0` | `-0.02em` | Sentence |
| **Subsection H3** | Sans (Montreal) | `clamp(1.25rem, 1vw + 1rem, 2.25rem)`| `1.2` | `-0.01em` | Sentence |
| **Body Copy** | Sans (Montreal) | `clamp(0.95rem, 0.2vw + 0.8rem, 1.2rem)`| `1.6` | `0` | Normal |
| **Telemetry HUD** | Mono (Fraktion) | `clamp(0.75rem, 0.4vw + 0.5rem, 0.95rem)`| `1.2` | `0.15em` | UPPER |

---

## 3. Spacing & Grid System

Spacing follows a strict **8px base grid** to maintain mathematical alignment across elements.

### Spacing Scale
*   `$space-xs`: `8px` (`0.5rem`) - Inner tag pad, element margins.
*   `$space-sm`: `16px` (`1rem`) - Card padding, small line heights.
*   `$space-md`: `24px` (`1.5rem`) - Section padding, layout blocks.
*   `$space-lg`: `48px` (`3rem`) - Sub-layout margins, HUD divisions.
*   `$space-xl`: `80px` (`5rem`) - Desktop section gaps, Hero margins.
*   `$space-xxl`: `128px` (`8rem`) - Viewport padding, large empty spaces.

### Layout Container Widths
*   **Desktop Max Width:** `1440px` (Max content container boundaries).
*   **Asymmetric Split Grid:** A standard **70% / 30%** layout split on desktop to create structural tension:
    ```css
    .layout-split {
      display: grid;
      grid-template-columns: 7fr 3fr;
      gap: 48px;
    }
    ```

---

## 4. Component Styling Rules

Every UI component is designed as a **Blueprint Module** with sharp, zero-radius borders (`rounded-none`).

---

### 1. Buttons (CTAs)
*   **Visual Style:** Sharp `0px` corners, outlined in a thin `1px` grid border, monospace text.
*   **Hover Behavior:** Text flips to background black, background fills with solid Phosphor Mint (`var(--color-accent)`), and the button scales dynamically (`1.02` scale over 150ms).
*   **Spacing:** `padding: 12px 24px`.
*   **Glow Usage:** A minor drop shadow is active only during hover.

---

### 2. Cards (Containers)
*   **Visual Style:** Sharp corners, border `1px solid hsla(var(--border-muted), 0.5)`. Zero card background fills; the canvas background remains visible underneath.
*   **Hover Behavior:** Border increases opacity to `1.0` in mint color.
*   **Spacing:** `padding: 32px`.
*   **Glow Usage:** None (maintains flat brutalist look).

---

### 3. Navigation HUD
*   **Visual Style:** Fixed top HUD bar (`height: 60px`), separated from content by a horizontal dotted line. Displays location breadcrumbs and a UTC terminal timer.
*   **Hover Behavior:** Nav links hover-highlight in mint with an active monospace character prefix (e.g. `[01] PROJECTS`).
*   **Spacing:** `padding: 0 24px`.

---

### 4. Input Fields (Console)
*   **Visual Style:** Minimal text inputs. No surrounding borders; instead, a solid `1px` bottom underline.
*   **Hover Behavior:** Underline changes to mint. When active (focus), a monospace character cursor (`_`) flashes next to the text (`800ms` blink loop).
*   **Spacing:** `padding: 12px 0`.

---

### 5. Tags / Pills (Skills)
*   **Visual Style:** Sharp monospace tags, background `hsla(var(--color-accent), 0.06)`, border `1px solid hsla(var(--color-accent), 0.2)`.
*   **Hover Behavior:** Background opacity increases to `0.15` with a subtle green text shadow (`glow`).
*   **Spacing:** `padding: 4px 8px`.

---

### 6. Dividers (Dotted Grids)
*   **Visual Style:** Dotted SVG separator paths instead of solid lines.
*   **Code Implementation:**
    ```css
    .divider-dotted {
      height: 2px;
      background-image: radial-gradient(circle, hsla(var(--color-copy), 0.15) 1px, transparent 1.5px);
      background-size: 8px 8px;
    }
    ```

---

## 5. Depth, Layering, & Lighting Systems

We prevent cheap web gradients, using a structured **Z-Index Layering HUD** to define layout depth.

```
Z-INDEX LAYER MODEL:
[Layer 9999]  --> HUD Cursor Follower
[Layer 999]   --> Modals & CLI Terminal Overlay (Ctrl+K)
[Layer 100]   --> Sticky Top Navigation HUD
[Layer 10]    --> Floating Project Preview Panels
[Layer 1]     --> Main Scroll Content & Cards
[Layer 0]     --> Canvas Background & Scanline Overlay
```

### Glassmorphism Rules
*   Modals use high-blur, low-opacity backdrops:
    ```css
    .glass-overlay {
      backdrop-filter: blur(12px);
      background-color: hsla(var(--bg-canvas), 0.7);
      border: 1px solid hsla(var(--border-muted), 0.5);
    }
    ```
*   **Lighting Simulation:** A subtle CSS radial-gradient follows the mouse cursor in the background (`layer 0`), creating a faint phosphor glow behind cards as the mouse moves across the canvas.

---

## 6. Responsive UI Logic

On smaller viewports, the asymmetric grids collapse to maintain legibility.

*   **Desktop (> 1024px):** Asymmetric split layouts (70/30), fixed scroll-pin matrices, floating coordinate cursor followers.
*   **Tablet (768px - 1024px):** Splits collapse to single-column blocks. Spacing decreases to a `$space-md` base. Custom cursors are disabled.
*   **Mobile (< 768px):** Spacing scales down to `$space-sm` limits. Typographic headers drop scale using `clamp()` fluid settings. Cursor-followers and WebGL canvases are bypassed entirely to preserve battery performance.

---

## 7. Accessibility Strategy

A technical brutalist website must remain fully inclusive:

*   **Keyboard Navigation HUD:** Pressing `Ctrl+0` launches an overlay containing quick navigation bookmarks for screen readers and keyboard users.
*   **Color Contrast:** All body copy copy uses off-white `#D4E1D8` on obsidian `#080809` background, exceeding the WCAG AAA contrast ratio target of **7:1**.
*   **SSH Console Fallback:** Interactive terminal forms include hidden, semantically correct HTML form inputs for screen readers to complete easily.
