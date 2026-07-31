# Rodolfo Portfolio · v0.7.8 Signature Mark

Oxblood-and-antique-gold portfolio with the accepted CASTOR-family R mark installed as the site identity.

## What changed

- Replaced every browser, PWA, and device icon with the accepted flat oxblood R and faint dark-antique-gold halo.
- Preserved a genuinely transparent canvas in SVG, PNG, Apple Touch, and ICO outputs.
- Added the mark to the header identity, the desktop consulting dossier, the tablet identity band, the mobile profile card, and the footer signature.
- Reused one cached SVG across the page rather than loading separate decorative images.
- Added no new animation, backdrop blur, filter loop, or full-screen compositor layer.
- Preserved the v0.7.5 performance controls, v0.7.6 header hover repair, and v0.7.7 unified dossier.

## Preview locally

```bash
python3 -m http.server 8080 --bind 0.0.0.0
```

Open `http://localhost:8080`.

## Update the live repository

```bash
bash scripts/update_existing_repo.sh \
  "$HOME/Cloud Money/rodolfo-portfolio-live"
```
