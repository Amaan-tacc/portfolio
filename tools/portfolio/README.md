# Portfolio publishing tools

The current site is committed in `docs/`. Production runs on Hostinger at https://amaanity.com/; GitHub Pages serves a mirror from `main:/docs`. Visitors need no build tools or external APIs. All canonical URLs identify the custom domain.

After editing `docs/app.js`, `docs/content.js` or other page templates, regenerate the complete HTML and sitemap:

```sh
npm ci --prefix tools/portfolio
npm run build --prefix tools/portfolio
npm run check --prefix tools/portfolio
```

The build renders the same application templates into complete HTML using LinkeDOM. The browser then attaches its interactive experience. All ten project pages have stable paths under `/portfolio/projects/`, with canonical tags, social metadata and structured data. Legacy `/portfolio/project/?id=...` links still work.

`optimize_images.py` requires Python and Pillow. Run it only when adding or changing artwork, before rebuilding HTML. It keeps original files and generates responsive WebP variants, preserving alpha transparency. `docs/image-assets.js` records their dimensions and sources. The enlarged viewer continues to use original images.

Self-hosted font files and their licences live in `docs/assets/fonts/`; `docs/fonts.css` declares them with `font-display: swap`. Original Google Fonts are retained as licensed local WOFF2 subsets. No analytics or third-party scripts are loaded.

The only linked resume is `docs/assets/resumes/Amaans-Resume.pdf`, copied byte-for-byte from the supplied Project Coordinator CV. Its download filename is `Amaan's Resume.pdf`.

`docs/sitemap.xml` lists twenty canonical pages: four core pages, a services hub, five service pages and ten project pages. The root-domain package exposes https://amaanity.com/sitemap.xml and robots.txt. The legacy query-based project route and 404 are excluded and marked noindex. GitHub project Pages cannot set its host-level robots.txt.
