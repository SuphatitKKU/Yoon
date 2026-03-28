# Design System: Mystical Opulence

## 1. Overview & Creative North Star
**Creative North Star: The Celestial Manuscript**

This design system moves away from the sterile, flat "SaaS" aesthetic toward a digital experience that feels like a high-tech, legendary scroll. We are blending ancient artistry with modern precision. The layout must feel organic yet authoritative, utilizing **intentional asymmetry** and **layered parchment** to break the rigid digital grid. By overlapping decorative motifs—like a dragon’s tail sweeping behind a data card or a cinnabar seal marking a primary action—we create a sense of depth and "living" history.

## 2. Colors & Visual Soul
The palette is rooted in the "Imperial" tradition: deep cinnabar reds, lustrous golds, and ink-washes against a warm parchment base.

### The Palette
- **Primary (`#8f0402`) & Primary Container (`#b22417`):** Use these for "Cinnabar" accents. These are high-impact colors; use them for primary CTAs and critical status indicators.
- **Secondary (`#735c00`) & Secondary Container (`#fed65b`):** This is our "Liquid Gold." It should be used for ornamentation, iconography, and shimmering highlights.
- **Surface (`#fff9ed`):** This is our "Ancient Parchment." It is the foundation of the entire system.

### The "No-Line" Rule
Traditional dividers are forbidden. To separate content:
1.  **Background Shifts:** Move from `surface` to `surface-container-low` (`#fcf3d8`) to define section boundaries.
2.  **Tonal Transitions:** Use a soft gradient transition between `surface-container` tiers to suggest a fold in the "scroll."
3.  **Graphic Breaks:** Use a decorative "Cloud" or "Dragon" motif asset to act as a visual break between vertical content blocks.

### Signature Textures & Glassmorphism
To achieve "Mystical Opulence," apply a `backdrop-blur` (12px+) to floating panels using a semi-transparent `surface-container-highest` (`#ebe2c8` at 80% opacity). This creates a "silk-on-parchment" effect. For main CTAs, use a linear gradient from `primary` to `primary-container` at a 45-degree angle to simulate the sheen of lacquered wood.

## 3. Typography: The Calligraphic Hierarchy
We utilize **Noto Serif** as our primary voice, emphasizing its classical proportions.

*   **Display (Lg/Md):** These are the "Scribe’s Masterwork." Use `display-lg` (3.5rem) with `font-weight: 700`. For Hero sections, the first character of the headline should be a **Decorative Initial Cap**—a custom SVG asset containing a gold-leaf dragon or floral motif.
*   **Headlines & Titles:** Set in `primary` (`#8f0402`) to command attention. Use `headline-sm` for section headers, ensuring they are always accompanied by a small `secondary` (Gold) accent line or "Qi" flourish.
*   **Body:** `body-lg` (1rem) on `surface` backgrounds. Increase line height to `1.6` to allow the "parchment" to breathe.
*   **Labels:** Use **Work Sans** in `on-surface-variant` (`#5a403e`). This modern sans-serif provides the "High-Tech" contrast to the serif "Legendary" elements, used for metadata and technical specs.

## 4. Elevation, Depth & Ornamentation
Instead of standard Material Design shadows, we use **Tonal Stacking** and **Ornate Borders**.

*   **The Layering Principle:** A "floating" card should be `surface-container-lowest` (#ffffff) placed on a `surface-container` (#f7eed2) background. The contrast is the shadow.
*   **Ambient Shadows:** If a shadow is required for a floating "Bagua" menu, use a custom shadow: `0px 20px 40px rgba(31, 28, 11, 0.08)`. The tint must be derived from `on-surface` to feel like ink soaking into paper.
*   **The Ornate Container:** For high-priority panels (e.g., "The Imperial Vault"), apply a **Ghost Border** using `outline-variant` at 20% opacity, but only on the corners. Add SVG "Corner Brackets" in `secondary` (Gold) to frame the content.
*   **Micro-animations (Qi Flow):** 
    *   **The Shimmer:** CTAs should have a slow, 3-second diagonal "gold leaf" shimmer animation.
    *   **Lantern Hover:** Tooltips should fade in with a slight upward drift (2-4px), mimicking a floating lantern.
    *   **The Pulse:** Critical "Error" states (`error`) should pulse like a heartbeat, veiled in a soft red glow.

## 5. Components

### Buttons & Interactors
*   **Primary Button:** Rectangular (0px radius). Background is a gradient of `primary` to `primary-container`. Text is `on-primary` (White). The button is flanked by two small gold "Mandarin" dots.
*   **Secondary Button:** Ghost style. No background. Border is `secondary` (Gold) at 40% opacity. On hover, the background fills with a 5% `secondary` tint.
*   **Chips:** Use `surface-container-high` as the base. Forbid rounded corners; use 0px or a "clipped-corner" CSS mask to imply architectural precision.

### Navigation & Lists
*   **Lists:** Forbid divider lines. Separate items using `spacing-4` (1.4rem). Every third item should have a very faint "Watermark" dragon motif in the background (using `surface-dim`).
*   **Input Fields:** Bottom-border only. When focused, the border transforms into a `primary` red line with a small "spark" (firework) animation at the cursor point.

### Unique Components
*   **The Bagua Switcher:** A circular navigation component using the eight trigrams as icons, rotating slowly on the Z-axis when the user switches dashboard views.
*   **The Scroll Progress Bar:** A horizontal line at the top of the screen that looks like a red silk thread being unspooled as the user scrolls.

## 6. Do’s and Don’ts

### Do:
*   **Use Asymmetry:** Place a decorative firework motif in the bottom-right of a section if the header is in the top-left.
*   **Embrace Space:** Use `spacing-16` (5.5rem) and `spacing-20` (7rem) to create editorial "breathing room."
*   **Mix Weights:** Use `display-lg` (Bold) right next to `label-md` (Regular) for high-contrast storytelling.

### Don’t:
*   **Don't use Rounded Corners:** Every element in this system has a `0px` radius. Softness comes from colors and textures, not geometry.
*   **Don't use "Pure" Greys:** All neutrals must be warm-tinted (towards the `#fff9ed` parchment) or ink-tinted (towards the `#1f1c0b` ink-black).
*   **Don't Overcrowd:** Mystical Opulence requires luxury. If a screen feels busy, increase the spacing and remove secondary borders.