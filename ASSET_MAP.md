# Asset Map

| Asset family | Dimensions | Runtime role |
|---|---:|---|
| `project-*.webp` | 2560 × 960 | Full project artwork, loaded when the modal opens |
| `project-*-preview.webp` | 1600 × 600 | Desktop and tablet cards/carousel |
| `project-*-mobile.webp` | 960 × 360 | Mobile featured project and project list |
| `portrait.webp` | 720 × 720 | Existing approved portrait |
| `rodolfo-module-mark.svg` | Vector | Canonical accepted signature mark used in page identity anchors |
| `favicon.svg` | Vector | Browser SVG favicon, byte-equivalent to the canonical mark |
| `favicon-16.png`, `favicon-32.png`, `favicon-48.png`, `favicon-64.png`, `favicon.ico` | Multiple | Browser fallbacks |
| `icon-192.png`, `icon-512.png`, `icon-1024.png`, `apple-touch-icon.png` | Multiple | PWA and device icons |

The identity placements reuse the same SVG URL, so the browser decodes and caches one vector asset rather than separate decorative copies.
