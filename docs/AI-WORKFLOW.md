# How client site changes work

The client files a GitHub issue describing what they want. Claude makes the
change on a branch, opens a pull request, and Cloudflare Pages builds a preview.
The preview link is posted back on their issue. When they reply **publish**, the
pull request is merged and GitHub Pages deploys the live site.

```
issue (site-change label)
   └─> site-change.yml    Claude edits a branch, opens a PR "Closes #N"
         └─> pr-checks.yml        protected paths + file sizes + npm run build
         └─> Cloudflare Pages     builds a preview
               └─> preview-link.yml    posts the preview URL on the issue
                     └─> client replies "publish"
                           └─> publish.yml    merges the PR
                                 └─> deploy.yml    GitHub Pages goes live
```

The client never opens a pull request, reads a diff, or sees a file path.

## One-time setup

### 1. Anthropic API key

Create a key in the [Anthropic Console](https://console.anthropic.com/) — use a
dedicated workspace for this project and **set a monthly spend limit on it**.
That cap is the real protection against a runaway loop.

Add it to the repo: *Settings → Secrets and variables → Actions → New repository
secret*, named `ANTHROPIC_API_KEY`.

Use an API key rather than a `claude setup-token` OAuth token from a personal
Claude subscription: the API key can be budget-capped, doesn't tie the client's
automation to your personal rate limits, and doesn't silently expire.

### 2. Cloudflare Pages (previews)

Production stays on GitHub Pages. Cloudflare only builds previews.

1. Cloudflare dashboard → *Workers & Pages* → *Create* → *Pages* → *Connect to Git*
2. Pick this repository.
3. Build command `npm run build`, output directory `dist`.
4. Add an environment variable **`NODE_VERSION` = `22`**. Cloudflare's default
   Node is older than the `>=22.12.0` this project requires, and the build fails
   without it.
5. **Do not attach the custom domain.** The live site is GitHub Pages.

Cloudflare will also build `main` and serve it at a `*.pages.dev` address. It's
harmless — nothing points at it — or you can restrict builds to preview branches
in the project's branch-control settings.

### 3. The intake label

Create a label named exactly `site-change`. The issue forms apply it, and it's
what starts the pipeline. GitHub will not create it for you — an issue form that
references a missing label just fails to apply it, and nothing happens.

Also create `allow-infra`. Putting it on a pull request lets that PR change
protected paths — that's how you make CI or config changes yourself.

### 4. Client's GitHub account

Invite them as a collaborator with **Write** access. Write is required: both
workflows check the commenter's permission level and ignore anyone below it.
This repository is public, so without that check any stranger's issue would spend
your API credits.

Don't give them Admin.

### 5. Branch protection on `main`

*Settings → Branches → Add branch ruleset* for `main`:

- Require a pull request before merging
- Require status checks to pass: **`Protected paths`** and **`Build`**
- Block force pushes

Without required checks, `publish` will merge a pull request whose build is
broken. The publish workflow only merges when GitHub reports the PR as `clean`,
and that state depends on these checks being marked required.

### 6. Try it

Open an issue from any template as yourself and walk the whole loop before the
client ever sees it.

## Running costs

A typical wording change is a few cents; something involved might reach a dollar
or two. At this site's rate of change, budget a few dollars a month. `--max-turns
40` in `site-change.yml` bounds any single request; the workspace spend limit
bounds the month.

## Turning it off

- **Pause it:** *Actions* tab → `Site change request` → *Disable workflow*.
  Issues still get filed, nothing acts on them.
- **Stop it completely:** delete the `ANTHROPIC_API_KEY` secret.
- **Stop just the auto-merge:** disable `Publish`. Previews still get built and
  posted; you merge by hand.

Neither affects the live site — `deploy.yml` is independent.

## When something goes wrong

**Nothing happens after the client files an issue.** Check the issue actually
carries the `site-change` label, and that the client's collaborator invite was
accepted — a pending invite gives them no permissions. The `Check request` job
logs exactly why it declined.

**"publish" does nothing.** The comment has to be essentially just that word.
"Can you publish this?" is treated as a revision request and goes to Claude
instead. The `Publish` workflow logs which branch it took.

**Preview link never appears.** Confirm the Cloudflare build succeeded, and that
the pull request body contains `Closes #<issue number>` — that link is how the
preview finds its way back to the issue.

**Merged but the site didn't update.** `deploy.yml` is dispatched explicitly
after the merge, because a merge made with `GITHUB_TOKEN` doesn't raise a `push`
event. Check the *Actions* tab for a `Deploy to GitHub Pages` run and re-run it
by hand if needed.
