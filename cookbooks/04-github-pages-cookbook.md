# GitHub Pages cookbook

GitHub Pages hosts **static files**: HTML, CSS, JS, images. It does not run a Node server for visitors. If the framework can export a folder of HTML, Pages can serve it.

## User site vs project site

| Kind | Repo name | Default URL |
|------|-----------|-------------|
| User / org site | `yourname.github.io` | `https://yourname.github.io/` |
| Project site | any other name, e.g. `personal-website` | `https://yourname.github.io/personal-website/` |

A **custom domain** (`example.com`) can be attached to either. After that, visitors never need the `github.io` URL.

If you **rename** `yourname.github.io` to `personal-website`, you lose the special user-site URL unless you create a **new** empty `yourname.github.io` repo. A tiny redirect site there is a good idea so old bookmarks still work.

## Publishing sources (pick one)

**GitHub Actions (recommended for Astro, Nuxt generate, Next `output: 'export'`)**

- Settings → Pages → Source = **GitHub Actions**
- A workflow builds the site and uses `actions/upload-pages-artifact` + `actions/deploy-pages`

**Branch (legacy)**

- A `gh-pages` (or `main`) branch contains already-built HTML
- Easy to fight with Jekyll; easy to overwrite a `CNAME` file

Do not leave **both** an old `peaceiris/actions-gh-pages` workflow *and* the official Pages Actions workflow on the same branches. They will publish different artifacts to different places.

## Custom domain checklist

1. Repo **Settings → Pages → Custom domain**: `example.com` (or `v1.example.com` for an archive).
2. Save. GitHub starts waiting for DNS.
3. Add registrar records ([DNS from zero](03-dns-from-zero.md)).
4. When the DNS check is green, enable **Enforce HTTPS**.

Notes:

- Actions-based Pages **ignore** a `CNAME` file in the repo. The UI setting is the source of truth.
- One custom domain per repo. `example.com` and `v1.example.com` cannot both sit on the same Pages site (except `www`, which GitHub can redirect to the apex).
- Verify the domain under your **GitHub account** Settings → Pages when you can. That reduces takeover risk.

## Redirects you actually want

### `www` ↔ apex

If Pages custom domain is `example.com` and DNS has both apex A records and `www` CNAME to `yourname.github.io`, GitHub redirects `www.example.com` → `https://example.com`.

### Old `github.io` bookmarks

After a rename, create a **user site** repo named `yourname.github.io` with a single page:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Redirecting to example.com</title>
    <meta http-equiv="refresh" content="0; url=https://example.com/" />
    <link rel="canonical" href="https://example.com/" />
    <script>
      location.replace("https://example.com" + location.pathname + location.search + location.hash);
    </script>
  </head>
  <body>
    <p>This site moved to <a href="https://example.com/">example.com</a>.</p>
  </body>
</html>
```

If that tab **spins**, the stub loaded but `https://example.com` is still resolving to old parking IPs on *your* network. Fix DNS cache; the stub is fine.

### Project URL → custom domain

GitHub redirects `https://yourname.github.io/personal-website/` to the custom domain once the domain is attached.

## Branch protection on the `github-pages` environment

Repos that used Pages for a long time often have **Environment → github-pages → Deployment branches** limited to `master`.

After you rename the production branch to `main`, deploys fail with:

> Branch "main" is not allowed to deploy to github-pages

Fix: Settings → Environments → **github-pages** → add `main` as an allowed branch (or allow all). Then **Re-run failed jobs**.

## Repo hygiene that affects deploys

- Default branch = `main`
- Production workflow triggers on `push` to `main` only
- Do not keep `master` as a second production trigger "just in case"
- `package.json` `engines.node` should match the workflow (`20` is a safe LTS at time of writing)
- For a user site at the domain root, Astro/Nuxt `site` / `base` should be `https://example.com` with **no** subpath

## Comments, edit links, and a rename

If the repo is **renamed**, GitHub redirects old repo URLs. Numeric IDs (Giscus `data-repo-id`) stay valid. Update visible strings:

- `data-repo="you/personal-website"`
- "Edit on GitHub" links should use `main` and the new repo name

## Quick Pages debug

| Symptom | Check |
|---------|--------|
| Actions red | Open the failed job log (build vs deploy) |
| Deploy rejected | `github-pages` environment branch list |
| Custom domain "DNS check failing" | `dig @8.8.8.8`; delete parking A records |
| HTTPS greyed out | Wait for certificate; mix of old+new A records delays this |
| 404 on a project URL | `base` path in the static generator still set to `/repo-name` |

Next: [GitHub Actions for a static site](05-github-actions-static-site.md).
