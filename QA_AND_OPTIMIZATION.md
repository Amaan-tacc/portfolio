Latest correction: [Theme and layout regression report — 4 November](QA_THEME_REGRESSION.md). This report documents a palette failure missed by the earlier layout checks and the additional computed-style verification.

# Portfolio QA and optimization — 2 November 2026

## Changes

- Home link added to the desktop and expanded mobile header. Work stays active on case studies.
- Every resume action is a direct download labelled `Amaan's Resume`, using the supplied Project Coordinator PDF. The multi-resume picker is removed. Existing source assets are retained.
- Every main page and all ten case studies now contain complete initial HTML. Ten dedicated project paths, unique titles/descriptions, canonical links, Open Graph/Twitter previews, Person/WebSite/CreativeWork/Breadcrumb structured data, a fourteen-page sitemap and a custom noindex 404 page are included.
- Forty source images have responsive variants with real dimensions. The smallest variants total 548,110 bytes versus 7,599,266 bytes for those originals (about 93% smaller). This is a thumbnail-size comparison, not a claim about overall page speed. All originals and all 39 gallery views remain available.
- Fonts are self-hosted as WOFF2 with swap and local preloads; the blocking external CSS import is removed. Initial page content and hero images are discoverable before JavaScript executes. Decorative images and below-fold artwork remain lazy loaded.
- Gallery selection scrolls only its thumbnail strip. Reduced-motion settings preserve explicit choices and respect device preferences. Gallery keyboard events prevent unwanted page scrolling; the mobile menu closes after a download.

## Verification

- 56 page checks: all fourteen main/project pages at 1280px and 390px, both light and dark. No horizontal overflow, broken loaded images or duplicate/missing H1s.
- Twelve additional layout checks: Home, Work, About and Contact at 320px, 768px and 1024px. No horizontal overflow.
- All 39 gallery selections across ten projects: one visible panel, correct selection and image source.
- Work filters: 10 all, 7 visual design, 6 print/packaging and 3 team-delivery projects.
- Gallery End key, modal arrow navigation, Escape, focus return and scroll unlock; contact email copy; mobile menu/download behavior.
- The browser-downloaded resume and the supplied coordinator PDF have the same SHA-256 hash.
- Static validation covers sixteen HTML documents, 946 local references, 169 image elements, unique canonical URLs/titles, valid JSON-LD, source syntax, retained main content and six initial-theme cases including unavailable storage.

Layout and functional checks use the actual browser; LinkeDOM is used only for HTML generation and static validation. No Lighthouse score or ranking guarantee is claimed. Search Console verification/submission requires the owner's account and was not performed.
