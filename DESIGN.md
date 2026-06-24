---
name: Vinilovers Noir
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#d0c5af'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#99907c'
  outline-variant: '#4d4635'
  surface-tint: '#e9c349'
  primary: '#f2ca50'
  on-primary: '#3c2f00'
  primary-container: '#d4af37'
  on-primary-container: '#554300'
  inverse-primary: '#735c00'
  secondary: '#ffb3ad'
  on-secondary: '#680009'
  secondary-container: '#b60319'
  on-secondary-container: '#ffc2bd'
  tertiary: '#bfcdff'
  on-tertiary: '#082b72'
  tertiary-container: '#97b0ff'
  on-tertiary-container: '#254188'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffe088'
  primary-fixed-dim: '#e9c349'
  on-primary-fixed: '#241a00'
  on-primary-fixed-variant: '#574500'
  secondary-fixed: '#ffdad6'
  secondary-fixed-dim: '#ffb3ad'
  on-secondary-fixed: '#410003'
  on-secondary-fixed-variant: '#930011'
  tertiary-fixed: '#dbe1ff'
  tertiary-fixed-dim: '#b4c5ff'
  on-tertiary-fixed: '#00174b'
  on-tertiary-fixed-variant: '#27438a'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  display-hero:
    fontFamily: Montserrat
    fontSize: 72px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: 0.05em
  display-hero-mobile:
    fontFamily: Montserrat
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-section:
    fontFamily: Montserrat
    fontSize: 30px
    fontWeight: '700'
    lineHeight: '1.4'
    letterSpacing: 0.02em
  body-main:
    fontFamily: Open Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Montserrat
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.2em
  nav-link:
    fontFamily: Open Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.1em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  container-max: 1280px
  gutter: 1.5rem
  section-padding: 4rem
  card-gap: 1.5rem
  touch-target: 3rem
---

## Brand & Style

Vinilovers Noir is a premium, high-fidelity design system that evokes the tactile and nostalgic warmth of analog audio. It targets a sophisticated audience of music enthusiasts and collectors who value craftsmanship over convenience.

The visual style is a fusion of **Minimalism** and **High-Contrast Boldness**. It utilizes a deep "Dark Mode" foundation to allow high-quality product photography and gold accents to pop with cinematic intensity. The aesthetic is clean, urban, and energetic. While rooted in precision, the style incorporates subtle softness to mirror the physical feel of vinyl sleeves and high-end audio equipment. It should feel like a high-end boutique storefront at midnight—mysterious, expensive, and deeply immersive.

## Colors

The palette is anchored in a monochromatic dark spectrum, punctuated by two specific high-energy accents.

*   **Primary (Gold Leaf):** Used for branding, calls to action, and interactive highlights. It represents the "warmth" of analog sound.
*   **Secondary (Record Red):** Used sparingly for urgency (Sale, New, Alerts) and decorative elements like the marquee separators.
*   **Neutral (Midnight):** A layered set of grays starting from a pure dark background (`#131313`).
*   **Overlays:** Use a vertical gradient (`rgba(19, 19, 19, 0.9)` to transparent) on image cards to ensure text legibility while maintaining the dark aesthetic.

## Typography

The typography system relies on the contrast between the geometric, bold **Montserrat** for impact and the highly legible **Open Sans** for utility.

*   **Headlines:** Must always be uppercase with increased letter spacing to emphasize the premium "brand" feel. 
*   **Hero Text:** Utilizes a subtle `text-shadow` (2px 2px 4px) to maintain legibility against complex background photography.
*   **Labels:** Small, wide-spaced caps are used for "New" badges, breadcrumbs, and micro-copy to maintain an organized, catalog-like appearance.

## Layout & Spacing

The system follows a **Fixed Grid** philosophy for desktop, centering content within a 1280px container. 

*   **Rhythm:** Vertical spacing is generous (64px to 80px between sections) to create an editorial, airy feel.
*   **Responsive Behavior:** On mobile, side margins collapse to 16px. Hero layouts shift from side-by-side to stacked. Product grids transition from 4 columns to 2 columns, then 1 column on small devices.
*   **Functional Elements:** Navigation is fixed with a 90% opacity blur (`backdrop-filter: blur(12px)`) to keep the user oriented without obscuring the content.

## Elevation & Depth

Vinilovers Noir avoids traditional heavy shadows in favor of **Tonal Layers** and **Low-Contrast Outlines**.

*   **Surface Hierarchy:** The base background is `#131313`. Product cards and containers use a slightly elevated `#212020`.
*   **Borders:** Subtle `1px` borders using `#3a3939` (Surface Bright) define edges without adding visual weight.
*   **Interactive Depth:** Hovering over cards or images triggers a subtle `scale(1.05)` zoom, providing a tactile feel of "stepping closer" to the music.
*   **Glassmorphism:** Navigation bars use high-transparency blurs to signify they are floating above the main content plane.

## Shapes

The design system utilizes a **Soft (4px)** corner radius for primary UI elements. This introduces a subtle premium refinement, moving away from harsh industrial edges toward a more polished, contemporary aesthetic.

*   **Containers:** Buttons, input fields, and product card wrappers should use the standard 4px radius. 
*   **Imagery:** Product thumbnails and hero images feature the soft 4px rounding to integrate seamlessly with the container layout.
*   **Decorative Elements:** Icons and small functional pips may use higher rounding (pills) for distinct visual categorization.

## Components

*   **Buttons:** Primary buttons are soft-edged blocks of Gold Leaf with black text. On hover, they shift to a darker gold shade. Secondary buttons use a simple border-bottom or a ghost-style outline with the same 4px radius.
*   **Cards:** Product cards are composed of a square, soft-cornered image well (`surface-dim`) and a bottom metadata section. Labels (e.g., "New", "Sale") are small, rectangular tags with matching 4px corner radii.
*   **Marquee:** A signature component used for genre or category discovery. It features auto-scrolling uppercase text separated by a centered secondary-colored dot.
*   **Navigation:** Links should use a `border-b-2` active state that matches the primary gold color.
*   **Input Fields:** Use a solid dark background with a 1px `surface-bright` border and 4px rounded corners. The focus state should highlight the border in Primary Gold.