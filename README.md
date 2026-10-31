# Portfolio site

A responsive React + TypeScript + Vite portfolio for Raushan Kumar, with project information, skills, coding achievements, education, contact links, and résumé download.

## Run locally

- `npm install`
- Copy `.env.example` to `.env` and add an SMTP username plus an app password.
- `npm run dev`

## Verify and build

- `npm run typecheck`
- `npm run build`
- `npm run preview`

## Contact form email setup

The contact form sends messages through the `/api/contact` endpoint using SMTP. It does not depend on a visitor having a mail application installed when SMTP is configured. If the endpoint is unavailable or not configured, the form opens a pre-filled email as a safe fallback.

For Gmail:

1. Enable 2-Step Verification on the Gmail account that will send portfolio messages.
2. Create a Google **App password** for the portfolio.
3. Copy `.env.example` to `.env`.
4. Set `SMTP_USER` to the sending Gmail address and `SMTP_PASS` to the generated app password.
5. Restart the dev server after changing `.env`.

The recipient is configured as `raushankumarlnct007@gmail.com` in `server/contact-handler.ts`. Never commit `.env` or an SMTP password.

## Deploy to Vercel

The site is configured for Vercel with a serverless `/api/contact` function. Deploy with:

```bash
npx vercel
npx vercel --prod
```

Live site: https://raushan-kumar-lnct-portfolio.vercel.app

Add `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, and `SMTP_PASS` to the Vercel project environment variables for the contact form to send messages directly. The frontend remains deployable without those secrets, but the API will return a configuration error until they are added.

## Content and assets

- Profile, project descriptions/links, skills, achievement numbers, education, and social links are in `src/App.tsx`.
- Your résumé is served from `public/resume.pdf`.
- The project images in `public/images/project-*.svg` are concept artwork, not screenshots of the finished projects. Replace them with accurate screenshots when available.
- Update page metadata in `index.html` if your public URL or positioning changes.
- Verify every profile fact, achievement, link, and asset before publishing.

## Design / motion

The UI combines the uploaded editorial portfolio references with an original charcoal, coral, and pink direction. Motion includes staged entrances, scroll reveals, a moving text strip, floating and orbiting hero artwork, project hover tilt and image sweep, and animated achievement cards. Animations respect `prefers-reduced-motion`.

The PDF AI Chatbot repository link is included as provided; at the time of setup, GitHub showed that repository as empty. Publish its project files before relying on that repository as code-review evidence.
