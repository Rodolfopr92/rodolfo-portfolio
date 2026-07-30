# Validation

## Static checks

- JavaScript syntax passed.
- HTML references and duplicate IDs passed.
- CSS brace balance passed.
- All project banners meet the minimum dimensions.
- GitHub Pages workflow contains separate build and deploy jobs.
- Desktop navigation, mobile drawer, desktop Experience card, and duplicated responsive contact rows are absent.

## Browser QA

Validated in Chromium at:

- Desktop: 1833 × 900
- Tablet: 900 × 1000
- Android portrait: 360 × 800
- Android portrait: 412 × 915
- Android landscape: 915 × 412

At every viewport:

- no horizontal overflow;
- header utilities remain inside the viewport;
- no console or page errors;
- language switching works;
- carousel or responsive tabs work;
- project modal or responsive panel switching works.

Desktop header icons are horizontally aligned. Android header targets are at least 38 px.
