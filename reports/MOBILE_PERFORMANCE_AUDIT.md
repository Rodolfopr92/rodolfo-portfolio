# Mobile Performance Audit — v0.7.0

## Root cause

The portrait was not the main problem. `portrait.webp` is only **31.9 KB**. The heavier behavior came from the page architecture:

1. JavaScript rendered the desktop carousel, tablet cards and mobile cards at the same time, even though only one layout was visible.
2. The desktop carousel created clone cards, so mobile still received many hidden project-image elements.
3. Five 2560 × 960 banners were decoded on the phone. Compressed files were small, but decoded image memory is much larger.
4. The site loaded two external font families and many font weights.
5. Mobile used fixed SVG turbulence grain, repeated backdrop blur, reveal blur and ambient animation.
6. The full-width fixed diagnosis bar occupied paint and layout space continuously.

A single `index.html` file is not inherently slow. The issue was how much hidden work that index caused.

## Changes

- Render only the active desktop, tablet or mobile dynamic layout.
- Do not build the desktop clone carousel on mobile.
- Added five 960 × 360 mobile WebP banners.
- Removed Google Fonts requests and use the native system font stack.
- Removed the fixed turbulence-grain element.
- Disabled reveal observers, filter blur and ambient movement on mobile.
- Removed the portrait from the sticky header and the opening mobile page.
- Made the mobile opening surface project-first.
- Converted the full-width diagnosis bar into a 58 px floating action button.
- Added `content-visibility` to below-the-fold mobile sections.

## Asset notes

The full-resolution project banners remain available for desktop. Mobile receives the smaller variants through dedicated markup. The portrait remains in desktop/tablet content but is lazy-loaded and no longer participates in the mobile opening view.

## Browser comparison

A Chromium mobile comparison at 360 × 800 showed:

| Metric | v0.6.9 | v0.7.0 | Change |
|---|---:|---:|---:|
| DOM nodes | 691 | 396 | -42.7% |
| Image elements | 24 | 9 | -62.5% |
| Images loaded at opening view | 23 | 2 | -91.3% |
| Sticky-header height | 112 px | 86 px | -23.2% |
| Horizontal overflow | none | none | preserved |

The portrait was removed from the sticky header and is no longer eagerly loaded on mobile. The opening view now loads the Castor mobile banner plus the favicon/UI resources, while lower project cards remain lazy.
