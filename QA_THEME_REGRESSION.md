# Theme and layout regression correction — 4 November 2026

## Root cause

The previous optimization removed a font `@import` using a semicolon-based expression. The Google Fonts URL itself contained semicolons, leaving an invalid fragment at the start of `style.css`. The browser consequently ignored the following `:root` light palette. Dark mode had a separate valid declaration, which concealed the problem during earlier checks.

Observed in the actual browser before the correction: `--bg` was empty, body text fell back to black, and the sticky header background was `rgba(0, 0, 0, 0)`. Missing surfaces, borders and radius values made light-mode controls disappear and scrolling content appear to overlap the header. The earlier layout-bounds checks did not validate these computed styles.

## Corrections

- Removed the invalid fragment and restored the complete light palette as the stylesheet's first rule. The actual browser now reports `--bg: #fff`, body text `rgb(67, 68, 69)` and header background `rgba(255, 255, 255, 0.94)`.
- Added CSS syntax parsing and a palette guard to both HTML generation and the validation command. Invalid CSS now fails the generation step.
- Revealed sections are visible by default. Intersection observers trigger optional entrance animation rather than controlling whether essential content exists visually.
- Theme colours switch in one frame, avoiding a low-contrast intermediate fade between light and dark. Hover and interaction animations remain available afterward.
- Scaled mobile page headings to prevent the About-page “responsibility” line overflowing at 320px.
- Updated all generated HTML references to asset version 17, so existing visitors receive the corrected stylesheet and script.

## Verification

- **112 browser checks**: fourteen main/project pages × 1280, 768, 390 and 320px widths × light/dark themes. Checked complete palette values, actual body and header backgrounds, the correct visible logo, horizontal overflow, overflowing heading/paragraph text, permanently invisible sections and broken loaded images. Final pass: no failures.
- Mobile gallery selection and panels checked in both themes; QuickGrade retains three distinct screen sources. Enlarged-image modal correctly covers the page, hides the bottom navigation and closes with Escape.
- Mobile menu backgrounds and text follow the selected theme. Original images, mockups, project copy, resume download and SEO pages are retained.
- CSS parsing, source syntax and existing static validation passed for sixteen HTML documents and 946 local references.

The browser results are retained locally in `outputs/QA_Theme_Regression_Results.json` and copied into `tools/portfolio/qa-theme-results.json` in this repository.

## Resume hover follow-up

The generic navbar anchor hover colour overrode the resume button's inverted text colour, producing matching text and background colours. The button is now excluded from ordinary nav underlines and uses a dedicated hover/focus treatment: unchanged readable text, a subtle panel background, amber border and downward icon movement.

Verified with actual pointer hover: light mode uses text `rgb(67, 68, 69)` on `rgb(244, 244, 244)`; dark mode uses white text on `rgb(48, 49, 50)`. Both show an amber border and no generated underline. Keyboard focus remains visible, and the resume still downloads. Asset references are version 18.
