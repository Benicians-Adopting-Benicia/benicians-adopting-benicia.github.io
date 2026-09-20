# Benicians Adopting Benicia

Website for Benicians Adopting Benicia, a community beautification and civic
society in Benicia, California.

## Tech stack

- **[Astro 5](https://astro.build)** — static site generation (`output: 'static'`)
- **TypeScript** — `tsconfig.json` extends `astro/tsconfigs/strict`
- **Content collections** — page copy lives in Markdown under `content/`, loaded
  via Astro's `glob` content loader and validated with a shared Zod schema
- **Plain CSS** — no Tailwind or CSS framework; a small global stylesheet plus
  inline styles in markup
- **[GLightbox](https://biati-digital.github.io/glightbox/)** — lightbox for the
  homepage photo gallery, loaded from a CDN

## Project structure

```
content/          Markdown source for each page's copy + frontmatter
src/
  pages/          Route handlers — one .astro file per URL, fetches its
                   content entry and renders the page's markup
  layouts/         Default.astro — shared header/footer/<head> shell
  components/      Header.astro, Footer.astro — site chrome
  content/         config.ts — content collection schema
public/            Static assets (CSS, images) served as-is
```

## Development

```
npm install
npm run dev       # local dev server
npm run build     # production build to dist/
npm run preview   # preview the production build
```

## Editing content

Each page's copy and frontmatter live in `content/*.md` (`home.md`, `about.md`,
`events.md`, `get-involved.md`, `newsletter.md`). Edit the relevant file and the
corresponding page in `src/pages/` will pick up the changes — frontmatter fields
are specific to each page, see `src/content.config.ts` for the schema.

Site-wide values (phone number, social and donate links, footer blurb, SEO
description) live in `src/config.ts`.

Every piece of client-editable copy has exactly one home — nothing is duplicated
between files. The five pillars are defined once in `content/about.md` and
render in both long form (About) and short form (homepage cards).

## Deployment

The site builds to static HTML (`astro build`) and deploys to GitHub Pages via
`.github/workflows/deploy.yml` on every push to `main`. The live site is
<https://beniciansadoptingbenicia.com>.

Pull requests get a Cloudflare Pages preview build, and are checked by
`.github/workflows/pr-checks.yml` (protected paths, committed file sizes, and a
full `npm run build`).

## Client-authored changes

Content changes are requested by the client as GitHub issues and implemented by
Claude, which opens a pull request and posts a preview link back on the issue.
Nothing reaches the live site until the client replies `publish`.

- `docs/AI-WORKFLOW.md` — how the pipeline works, and its one-time setup
- `docs/CLIENT-GUIDE.md` — the non-technical guide written for the client
- `CLAUDE.md` — the repo conventions that automation follows
