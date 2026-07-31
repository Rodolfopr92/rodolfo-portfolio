# Portfolio performance note · v0.7.6

## Finding

The mobile-fast architecture remains intact. The recurring regressions came from cumulative visual layers and CSS history, not from GitHub Pages.

## Runtime cost hierarchy

- Static WebP artwork: primarily network and decoded-memory cost.
- Localized hover box-shadow: short-lived, one small element, low cost.
- Full-viewport `backdrop-filter`, masked fixed layers, large blurred pseudo-elements and animated filters: repeated repaint/compositing cost and the principal source of perceived lag.
- Multiple historical CSS blocks: low direct parsing cost, but high regression risk because later overrides can revive older effects or create clipping conflicts.

## v0.7.6 correction

- No full-screen blur or decorative animation was restored.
- The neon response is attached only to the active social button and is not animated continuously.
- Header labels now escape the topbar boundary correctly on pointer devices and are disabled on touch layouts.
- The page icon is a lightweight SVG with raster fallbacks.
