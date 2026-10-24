# Portfolio site

A responsive React + TypeScript + Vite portfolio. The current content and project visuals are demonstration placeholders; replace them with accurate personal details before publishing.

## Run locally

- `npm install`
- `npm run dev`

## Verify and build

- `npm run typecheck`
- `npm run build`
- `npm run preview`

## Personalize before launch

1. In `src/App.tsx`, replace `YOUR NAME`, the introduction, biography, skills, contact email, social profile URLs, availability, and process copy.
2. Replace the three example project objects with real projects, verified descriptions, technologies, and repository/demo URLs. The generated artwork in `public/images/project-*.svg` is concept art, not a screenshot of shipped software.
3. Replace `public/images/hero-art.svg` or keep it as decorative artwork. Add only photos you have permission to use and provide appropriate alt text.
4. Add your résumé as `public/resume.pdf`, then update the résumé link in `src/App.tsx`. The résumé is not included yet.
5. Update title, description, Open Graph metadata, and social preview information in `index.html` after your public URL is known.
6. Review every placeholder and link before deploying.

## Design / motion

The UI combines the uploaded editorial portfolio references with an original charcoal, coral, and pink direction. Motion includes a staged entrance, scroll reveals, moving text strip, floating hero artwork, pointer glow, project hover tilt, image zoom, and interactive details. Animations respect `prefers-reduced-motion`.
