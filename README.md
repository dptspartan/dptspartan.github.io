# shoaib.rashid · portfolio

Personal portfolio of Shoaib Rashid, live at https://dptspartan.github.io.

Built with React, TypeScript, Vite, Tailwind CSS and three.js. Deployed to GitHub Pages by
`.github/workflows/deploy.yml` on every push to `main`.

## Editing content

All text lives in [`src/data/profile.ts`](src/data/profile.ts). Values set to `TODO` render
as a subtle "details soon" chip until you fill them in. Dubizzle Labs work is described as
overviews only, with no internal links or code.

## Local development

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## One-time Pages setup

In the repository's Settings → Pages, set **Source** to **GitHub Actions**.
