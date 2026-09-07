# From save to live website

You save a file on your laptop. A few minutes later, anyone can open `https://example.com` and see it. This page is the map of that journey. Every later cookbook zooms in on one box.

## The five boxes

```text
Your laptop  →  GitHub  →  GitHub Actions  →  GitHub Pages  →  DNS  →  a visitor's browser
   (edit)        (git)        (build)           (host files)    (name)
```

| Box | What it is in plain language |
|-----|------------------------------|
| Laptop | Where you write the site. `npm start` is only for you. |
| GitHub | A remote copy of the project, plus history of every commit. |
| GitHub Actions | A rented computer that runs when you push. It builds the site. |
| GitHub Pages | A public folder on the internet that serves those built files. |
| DNS | The phone book that turns `example.com` into GitHub's computers. |

If any one box is wrong, the site looks "broken" even when the other four are fine. A blank tab after a redirect is often DNS. A failed green check is often Actions. A 404 is often Pages or the wrong branch.

## What a commit actually does

A **commit** is a snapshot: "these files, this message, this moment."

A **push** copies new commits from your laptop to GitHub.

Nothing public updates until something on GitHub **reacts** to that push. For a Pages site that something is a **workflow** (GitHub Actions).

Typical static-site push:

1. You commit on `main` and push.
2. Actions checks out the repo, installs Node, runs `npm ci` then `npm run build`.
3. The `dist/` (or `.output/public`) folder is uploaded as a Pages artifact.
4. GitHub Pages replaces the previously published files.
5. Visitors who already use the correct DNS start seeing the new HTML after a short CDN cache (often under 10 minutes).

You do not FTP files. You do not log into a server. You push git.

## Where the custom domain fits

`https://yourname.github.io` works without buying anything. A custom domain is optional.

If you want `example.com`:

1. You buy the name from a **registrar**.
2. You attach `example.com` in the repo **Settings → Pages**.
3. You add **DNS records** at the registrar so the name points at GitHub Pages.
4. GitHub issues an HTTPS certificate. Then you tick **Enforce HTTPS**.

Order matters: attach the domain in GitHub **before** you publish DNS. That stops someone else from claiming the name on Pages.

## Two sites need two GitHub Pages sites

GitHub Pages allows **one custom domain per repository**.

- `example.com` → repo A (always the latest redesign)
- `v1.example.com` → repo B (frozen previous site)

Branches in a single repo cannot be two public hostnames. That is why a redesign playbook creates an **archive repo**, not an extra branch.

## What "propagation" means

DNS records have a **TTL** (time to live), often 5–30 minutes. Resolvers (your router, your ISP, Google `8.8.8.8`) remember the old answer until that time runs out.

So you can have:

- Registrar UI: correct GitHub IPs
- `dig @8.8.8.8 example.com`: correct
- Your browser: still the old parking page

That is not GitHub failing. Your house DNS is stale. Flush the Mac cache, or temporarily set Wi-Fi DNS to `8.8.8.8` / `1.1.1.1`, or wait.

## A 30-second health check

After a change, test the boxes in order:

```bash
# 1. Did the workflow finish?
#    GitHub → repo → Actions → latest run is green

# 2. Does Pages have the domain?
#    Settings → Pages → Custom domain + HTTPS

# 3. Does public DNS match GitHub?
dig @8.8.8.8 example.com +noall +answer -t A
dig @8.8.8.8 www.example.com +noall +answer
```

Apex `example.com` should list GitHub Pages A records (`185.199.108.153` through `185.199.111.153`). `www` should CNAME to `yourname.github.io`.

Then open a **private window**. Regular Chrome remembers old DNS aggressively.

## What this series covers next

- [Do you need DevOps?](02-do-you-need-devops.md) — how much to learn, what to ignore
- [DNS from zero](03-dns-from-zero.md) — A, CNAME, apex, cache
- [GitHub Pages cookbook](04-github-pages-cookbook.md) — domains, HTTPS, redirects
- [GitHub Actions](05-github-actions-static-site.md) — the workflow file
- [v2 / v3 redesign](06-redesign-v2-v3.md) — keep old sites on `v1`, `v2` subdomains
- [Command-line field guide](07-command-line-field-guide.md) — the exact `git` / `gh` / `dig` / `curl` commands
