# GitHub Actions for a static site

A **workflow** is a YAML file in `.github/workflows/`. GitHub runs it on a virtual machine when you push (or when you click **Run workflow**).

This page is a cookbook for **build static HTML → GitHub Pages**. It is not a tour of every Actions feature.

## Minimal mental model

```text
on: push to main
  job build:
    checkout → setup Node → npm ci → npm run build → upload dist/
  job deploy:
    needs build → deploy-pages
```

If **build** fails, nothing goes live. If **deploy** fails, the new files were built but not published.

## Example workflow (Astro or any `dist/` output)

Save as `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

Set **Settings → Pages → Source** to **GitHub Actions**.

## Nuxt static (`nuxt generate`)

Same skeleton. Change:

- `run: npm run generate`
- `path: .output/public`

Keep **one** workflow. Remove older jobs that push to a `gh-pages` branch.

## What each permission is for

| Permission | Why |
|------------|-----|
| `contents: read` | Checkout the repo |
| `pages: write` | Publish to Pages |
| `id-token: write` | Official `deploy-pages` action |

The `github-pages` **environment** is not a second server. It is a GitHub gate. If it lists only `master`, `main` cannot deploy.

## `npm ci` vs `npm install`

`npm ci` installs from `package-lock.json` exactly. Use it in CI. If `npm ci` fails, the lockfile is out of date — fix it locally with `npm install` and commit the lockfile.

## Watching a deploy

1. Push to `main`.
2. Open the repo **Actions** tab.
3. Click the run named after your commit.
4. Wait for a green check.
5. Hard-refresh the live URL (CDN may cache HTML for a few minutes).

To republish without a new commit: **Actions → the workflow → Run workflow** (`workflow_dispatch`).

## Failures you will actually see

| Log / UI message | What to do |
|------------------|------------|
| `astro: command not found` / build script missing | Workflow ran on the wrong branch, or `npm ci` was skipped |
| Type-check failed (`astro check`) | Fix locally with `npm run build` |
| `Branch "main" is not allowed to deploy` | Environment deployment-branch policy |
| `Artifact not found` | Build job did not upload; path is not `dist` |
| Cancelled | `concurrency` cancelled an older run because a newer push arrived — usually fine |

## Local vs CI

| Local | CI |
|-------|----|
| `npm start` | Not used |
| `npm run build` | Must succeed |
| `localhost` | Public HTTPS |

If it does not build on your laptop, it will not build in Actions. Run `npm run build` before you push a risky change.

## Secrets

A public static site should not need secrets in the workflow. `GITHUB_TOKEN` is provided automatically for Pages.

If you add a token later (private npm, analytics), store it in **Settings → Secrets and variables → Actions**, never in the YAML file.

## How this meets DNS

Actions does not update DNS. After a green deploy:

- Visitors who already resolve `example.com` to GitHub see new files once Pages/CDN cache expires
- Visitors whose DNS still points at a parking page never see the deploy

Always separate "workflow green" from "my browser shows it."

Next: [Redesign playbook](06-redesign-v2-v3.md).
