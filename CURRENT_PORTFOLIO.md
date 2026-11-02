# Current Amaanity portfolio

The current, complete static portfolio is in **docs/**. The original React project at the repository root is preserved.

GitHub Pages configuration: deploy from branch **main**, folder **/docs**.
Public address after Pages is enabled: https://amaan-tacc.github.io/portfolio/

No build command, dependency installation, server or database is required.

- `docs/app.js`: page templates and interactions
- `docs/content.js`: project text, images and galleries
- `docs/style.css`: branding, responsive layout and motion
- `docs/assets/`: mockups, logos, portrait and existing resume PDFs

To preview the GitHub Pages paths locally, make a temporary parent directory containing a `portfolio` directory with the contents of `docs`, then serve that parent using `python -m http.server 8000` and visit `/portfolio/`.

The website follows the device colour scheme until a visitor manually chooses a theme. Mockups are labelled conceptual on the case studies.

Do not publish the `.openai` hosting folder or credentials. No credentials are included here.
