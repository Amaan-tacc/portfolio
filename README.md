# Amaanity portfolio

Live website: https://amaan-tacc.github.io/portfolio/

The current complete site is in **[docs/](docs/)**. GitHub Pages publishes **main → /docs** automatically after a push. It is a static site and needs no API key, backend or build service to run.

See [current portfolio guide](CURRENT_PORTFOLIO.md), [editing/build instructions](tools/portfolio/README.md), and [QA and optimization report](QA_AND_OPTIMIZATION.md).

The earlier React app is preserved below for reference. Its setup instructions apply only to that older app.

---

<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/13mYJihPwDzb4VM1VOsG5oMxHO7QICNOj

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
