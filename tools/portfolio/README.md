# Portfolio publishing tools

The live site is committed in `docs/` and is served by GitHub Pages from `main:/docs`. Visitors need no build tools or external APIs.

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

`docs/sitemap.xml` lists the fourteen canonical pages. Submit that URL through the owner's Google Search Console account if desired. GitHub project Pages cannot set the host-level `/robots.txt`; the included project-local file documents the sitemap but does not control crawler access for the whole `github.io` host.
