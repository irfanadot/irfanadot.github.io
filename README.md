# Irfan Akram Portfolio

I work across software architecture, backend systems, APIs, AI automation, LLM
integration, and mobile development. This site highlights selected production
work, technical leadership experience, and the kind of systems I like to build:
practical, maintainable, and reliable.

Live site: https://irfanadot.github.io

## Stack

Next.js (static export) with TypeScript and Tailwind CSS. All copy, case
studies, and experience data live in a single typed source of truth at
`src/data/portfolio.ts` — the components under `src/components/` and
`src/app/page.tsx` render from it. Playwright drives end-to-end and
accessibility checks in `tests/`.

## Development

```bash
npm install
npm run dev        # local dev server
npm run build       # static export to ./out
npm run lint         # eslint
npm run typecheck    # tsc --noEmit
npm run test:e2e     # playwright suite (requires a production build first)
```

## Deployment

Pushes to `main` trigger `.github/workflows/pages.yml`, which builds the
static export and publishes it to GitHub Pages.
