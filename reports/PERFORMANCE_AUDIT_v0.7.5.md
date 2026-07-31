# Performance Audit · v0.7.5 Fast Weave

## Answer to the regression question

The old v0.7.0 architectural bug did not return. The responsive renderer still builds dynamic content only for the active layout, mobile still receives 960 × 360 assets, and desktop carousel clones are not created on mobile.

The page became heavy for a different reason: the later visual polish reintroduced continuous GPU and paint work.

## Main regressions found

- 12 animated fixed spheres on desktop, 8 on mobile.
- Two pseudo-elements per sphere, including orbit rings and connector traces.
- Animated `filter: brightness()` on every sphere.
- Full-viewport masking and a giant orbit ring with spread shadows.
- A continuously animated 36 px blurred layer larger than the viewport.
- Sticky-header backdrop blur on desktop.
- Backdrop blur inside cards that move during carousel transitions.
- Full 2560 × 960 project images used as routine previews.

## Fix strategy

The visual language was kept, but ornamental computation was converted into static composition:

- Static digital nodes replace animated DOM.
- Opaque ink wash replaces live glass blur.
- Header weave stays, live background sampling goes.
- Meaningful carousel motion stays, decorative loops stop.
- 1600 × 600 preview assets serve ordinary cards; the modal keeps full-resolution assets.
- Mobile retains all v0.7.0 fast-path rules.

## Why this should feel different

The browser no longer needs to continuously animate dozens of glowing layers while scrolling a sticky textured header. It also decodes far fewer pixels for the project previews. The result should reduce idle GPU activity, scroll repaint pressure and memory pressure without flattening the oxblood/gold identity.
