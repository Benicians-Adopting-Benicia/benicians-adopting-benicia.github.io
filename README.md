# Applying the new design to your Jekyll site

This folder is a drop-in port of the new editorial design into your existing
Jekyll site. The structure mirrors your repo, so you can copy files across
one-to-one.

## What's here

```
jekyll-port/
├── _layouts/
│   ├── default.html        ← REPLACES yours (drops Tailwind, links site.css)
│   └── page.html           ← REPLACES yours (restyled, no Tailwind prose)
├── _includes/
│   ├── header.html         ← REPLACES yours (new masthead + nav)
│   └── footer.html         ← REPLACES yours (new footer)
├── assets/
│   └── css/
│       └── site.css        ← NEW FILE (fonts, resets, responsive rules)
├── index.html              ← REPLACES yours (home page)
├── about.html              ← REPLACES about.md  (note: .md → .html)
├── events.html             ← REPLACES yours
├── get-involved.html       ← REPLACES get-involved.md
└── newsletter.html         ← REPLACES newsletter.md
```

## Install steps

1. **Copy the files** into your repo, matching the paths above. Each one
   overwrites the same path in your project (except `assets/css/site.css`,
   which is new).

2. **Delete the old Markdown pages** — three pages changed extension from
   `.md` to `.html`. If you leave both, Jekyll will build two pages at the
   same URL. Remove:
   - `about.md`
   - `get-involved.md`
   - `newsletter.md`

3. **Build and preview** as usual:
   ```
   bundle exec jekyll serve
   ```
   Then open the local URL it prints.

That's it. No new gems, and nothing in `_config.yml` needs to change — the
header/footer still read all your contact + social URLs from there.

## What changed, and what didn't

**Design**
- New type system: **Newsreader** (serif headings) + **Public Sans** (body),
  loaded from Google Fonts in `site.css`.
- New palette: cream `#fbf6ec` background, navy `#1e2a4f`, rust `#8c3a2b`,
  gold `#b08534`.
- **Tailwind is no longer used.** The new layout doesn't load the Tailwind CDN.
  Styling is plain inline CSS plus the small global `site.css`. If you have
  other pages that still rely on Tailwind classes, either keep them on the old
  layout or re-add the Tailwind `<script>` to `default.html`.

**Unchanged / still wired to your config**
- All phone, social, donate, and Facebook-events links read from
  `_config.yml` (`site.phone_tel`, `site.instagram_url`, etc.).
- `baseurl: "/website"` is respected — every internal link and asset uses the
  `relative_url` filter.
- The homepage gallery still auto-loads every image in
  `assets/images/gallery/` (same Liquid loop as before), and the GLightbox
  lightbox still works on the home page.
- Your images in `assets/images/` are reused as-is; nothing to re-upload.

## Markdown pages going forward

The `page.html` layout is still available for any simple Markdown page you add
later — it now renders prose in the new design (via the `.page-prose` styles in
`site.css`). The main content pages were converted to `.html` so they could use
the richer design (drop-cap mission statement, the 2×2 "What We Do" grid, the
numbered "Get Involved" ledger, etc.) that Markdown can't express.
