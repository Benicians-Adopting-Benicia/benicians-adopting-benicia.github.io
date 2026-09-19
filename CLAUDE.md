# Benicians Adopting Benicia — site guide

Static [Astro](https://astro.build) site for a Benicia, CA community nonprofit.
Built to static HTML and deployed to GitHub Pages at
<https://beniciansadoptingbenicia.com>.

Most changes here arrive as a **GitHub issue written by the client, who is not
technical**. Read `docs/AI-WORKFLOW.md` for how that pipeline works.

## The one rule that matters

**Every piece of client-editable copy has exactly one home.** Never copy a
string into a second file. If two places need the same words, import it from
the one place that owns it.

| What | Lives in |
|---|---|
| Page copy, headings, CTA labels | `content/*.md` frontmatter |
| Phone, social links, donate/newsletter URLs, footer blurb, SEO description | `src/config.ts` |
| The five pillars (long + short form, both) | `content/about.md` → `pillars[]` |
| Photos | `src/assets/images/` |
| PDFs and other downloads | `public/assets/` |

`content/*.md` is validated by a Zod schema in `src/content.config.ts`. Adding a
frontmatter field means adding it to that schema first, or the build fails.

### Pillars, specifically

The five pillars render in two places off one definition in `content/about.md`:

- About page — uses `title` + `body` (long form)
- Homepage cards — uses `card_title` (falls back to `title`) + `summary` (short form)

Change a pillar in `content/about.md` and both pages follow. The card icons are
presentation, not copy, and live in `src/data/pillar-icons.ts` keyed by pillar
`num`.

## Do not touch

CI enforces this — a pull request that changes any of these fails its checks:

- `.github/**` — workflows hold the credentials that run this automation
- `astro.config.mjs`, `package.json`, `package-lock.json`, `tsconfig.json`
- `CNAME`, `public/CNAME` — changing these takes the domain offline
- `CLAUDE.md` itself

If a request genuinely needs one of these changed, do not attempt it. Say so on
the issue and leave it for a maintainer.

## Images

- Put photos in `src/assets/images/` (Astro optimizes and serves them as WebP).
  Only files in `public/` are served byte-for-byte — use it for PDFs.
- **Resize before committing.** Target ≤600KB; CI fails over 1.5MB. Gallery
  photos need no more than 1600px on the long edge.
- Gallery images are picked up automatically from
  `src/assets/images/gallery/*.png` — adding a file there is enough, no code
  change needed.
- Always write meaningful `alt` text. Decorative images take `alt=""`.

## Before you open a pull request

```
npm ci
npm run build          # must pass — this is a required check
```

Keep diffs minimal and scoped to what the issue asked for. Do not reformat,
reorder, or "tidy" files you were not asked to change.

## Talking to the client on the issue

They are not technical. When you report back:

- Plain English. Say "the donate button on the homepage now reads 'Give Today'",
  never "updated `hero_cta_donate` in `content/home.md`".
- No diffs, no file paths, no branch names, no YAML.
- Always end with the preview link and: *reply **publish** to put this live, or
  tell me what to change.*
- If the request is ambiguous, ask one clear question rather than guessing.
- If you cannot do it, say plainly what you cannot do and why.
