# Code Audit · v0.7.6 Module Crest + Local Neon

## Hover regression

The contact labels were still produced by `contact-button::after`. The v0.7.4 woven header introduced `overflow: hidden`, so the tooltip crossed the header seam and was clipped. Only a fragment remained visible below the bar.

The correction changes the header boundary to `overflow: visible`, centers each pointer tooltip below its icon, raises it above the content seam and disables hover-only labels on touch/mobile layouts.

## Neon cost

The restored light is attached only to the hovered or keyboard-focused 42–46 px control. It uses a short-lived `box-shadow` and color change. It does not use `filter`, `backdrop-filter`, an infinite animation or a viewport-sized compositor layer. This is materially different from the effects removed in v0.7.5.

## Why the project repeatedly became heavy

The main cause is cumulative CSS history. `styles.css` contains several generations of the interface and `theme-red.css` contains sequential v0.7.1–v0.7.5 theme passes. Parsing that CSS is not itself the main runtime cost, but the layered cascade makes it easy for a later visual pass to revive an older blur, animation, mask or clipping rule.

The runtime-heavy patterns were large fixed layers, animated filters, live backdrop blur over moving images, masks and oversized shadow surfaces. Static WebP artwork and a localized hover shadow are much cheaper.

## Hosting boundary

GitHub Pages delivers static files. It can affect first-load latency and caching, but it does not execute the page after download. Scroll and hover smoothness are determined by the browser, decoded assets, DOM, CSS paint/compositing work, GPU/driver behavior and device limits.

## Icon

The old square monogram was replaced by a circular module-family mark: technical outer ring, dotted orbit, broad open `R`, antique-gold primary structure and an oxblood diagonal leg. The vector is canonical and fills the favicon canvas more aggressively at small sizes.
