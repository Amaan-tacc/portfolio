# Current Amaanity portfolio

The current, complete static portfolio is in **docs/**. The original React project at the repository root is preserved.

GitHub Pages configuration: deploy from branch **main**, folder **/docs**.
Live address: https://amaan-tacc.github.io/portfolio/

The committed site runs without dependency installation, a backend or a database. After editing templates or project data, regenerate the static HTML with the commands in [the publishing tools guide](tools/portfolio/README.md).

- `docs/app.js`: page templates and interactions
- `docs/content.js`: project text, images and galleries
- `docs/style.css`: branding, responsive layout and motion
- `docs/assets/`: mockups, logos, portrait and original resume PDFs

To preview the GitHub Pages paths locally, make a temporary parent directory containing a `portfolio` directory with the contents of `docs`, then serve that parent using `python -m http.server 8000` and visit `/portfolio/`.

The website follows the device colour scheme until a visitor manually chooses a theme. Mockups are labelled conceptual on the case studies.

Do not publish the `.openai` hosting folder or credentials. No credentials are included here.

The only resume linked from the website is **Amaan's Resume**, the Project Coordinator version. See [QA and optimization](QA_AND_OPTIMIZATION.md) for the latest verification.
