# Redesign playbook: v1, v2, v3

Keep **one public hostname for "whatever is current"** and put each retired design on its own subdomain.

| URL | Meaning |
|-----|---------|
| `https://example.com` | Always the latest site |
| `https://v1.example.com` | First public generation (frozen) |
| `https://v2.example.com` | Second generation, after you replace the apex |
| `https://v3.example.com` | …and so on |

Use **version numbers**, not framework names, in the hostname. `nuxt.example.com` ages badly when you have two Nuxt eras.

## Why not one repo with extra branches?

GitHub Pages: **one custom domain per repository**.

`main` can be Astro today and Next.js tomorrow. The old site cannot stay on `example.com` *and* move to `v1.example.com` from a second branch of the same Pages site.

Pattern that works:

- **Live repo** (`personal-website`) — `main` is production for the apex
- **Archive repo** (`personal-website-v1`) — frozen copy, Pages custom domain `v1.example.com`

## Ground rules

- Production branch name is always `main` (not `v2-astro`, not `next-rewrite`)
- Apex DNS (`@` A records, `www` CNAME) **never** changes when you redesign
- Each archive gets **one new CNAME** (`v2` → `yourname.github.io`) and **one new repo**
- Tag the live repo before you replace `main` so git history is obvious (`v2.0.0-astro`)

## What you already have after the first split

Assume:

- `personal-website` + Actions → `example.com` (current stack)
- `personal-website-v1` + Actions → `v1.example.com` (previous stack)
- Optional stub repo `yourname.github.io` redirects bookmarks to `example.com`

Do not keep leftover production branches (`master`, `gh-pages`, old framework names) on the live repo. Tag them, then delete the branch.

---

## Procedure: first archive (you already did this once)

Use this as the template. The next redesign is the same with the numbers incremented.

1. Create empty GitHub repo `personal-website-v1`.
2. Push the old production branch into it as `main`.
3. Point every canonical / Open Graph / sitemap URL at `https://v1.example.com`.
4. Add a Pages + Actions workflow that builds **that** stack.
5. Pages custom domain: `v1.example.com`.
6. Registrar: CNAME host `v1` → `yourname.github.io`.
7. Optional: banner on the archive, "Current site: example.com".
8. Only then replace or rename the live repo so `example.com` is the new stack.

---

## Procedure: next redesign (v2, then v3, …)

You are on `example.com` with stack N (today: whatever is in `personal-website` `main`). You want stack N+1 on the apex and today's site frozen as `vN.example.com`.

### 1. Freeze today's live site

```bash
cd personal-website
git checkout main
git pull
git tag v2.0.0-astro          # pick a tag that names the stack you are freezing
git push origin v2.0.0-astro
```

On GitHub: **New repository** `personal-website-v2` (empty, public).

```bash
git push git@github.com:YOU/personal-website-v2.git main:main
```

(Use your SSH host alias if you have one.)

### 2. Make the archive honest

In `personal-website-v2` (clone it separately; do not mix working trees):

- Site URL / canonicals / sitemap / robots → `https://v2.example.com`
- GitHub edit links → this archive repo + `main`
- Optional archive banner → current site `https://example.com`
- Pages workflow still builds **this** frozen stack (do not "upgrade" it to the new framework)

### 3. DNS and Pages for the archive

1. `personal-website-v2` → Settings → Pages → custom domain `v2.example.com` → save.
2. Registrar → CNAME host `v2` → `yourname.github.io`.
3. Wait for `dig @8.8.8.8 v2.example.com`.
4. Enforce HTTPS when GitHub offers it.

Do **not** touch the apex A records. `example.com` stays on the live repo.

### 4. Replace `main` in the live repo

In `personal-website`:

- New framework lives on `main` (or merge a long-running branch into `main` when it is ready)
- `site` / metadata / canonicals stay `https://example.com`
- Same Actions workflow if the output folder is still `dist/`; otherwise change `path:`
- Giscus `data-repo` stays the live repo name if you **renamed** rather than copied

Push `main`. Watch Actions. When green, `example.com` is the new design. `v2.example.com` is yesterday's site.

### 5. Cleanup

- Delete leftover feature branches on the live repo
- Do not delete archive repos
- README on the live repo: table of versions and URLs

---

## If the new stack needs a server

GitHub Pages cannot run a Node server. Next.js **static export** (`output: 'export'`) can stay on Pages.

If you need SSR, move **only the live repo** to Vercel or Cloudflare Pages. Point the **same** apex DNS at that host (their docs replace GitHub's A/CNAME values). Leave `v1` / `v2` archives on GitHub Pages. Mixed hosting is fine.

---

## Checklist you can copy

```text
[ ] Tag live main (vN.0.0-stackname)
[ ] Create personal-website-vN from that main
[ ] Canonicals on archive = https://vN.example.com
[ ] Pages custom domain vN.example.com (GitHub first)
[ ] CNAME vN → yourname.github.io
[ ] HTTPS on archive
[ ] Replace live main with new stack
[ ] Live canonicals still https://example.com
[ ] Apex DNS unchanged
[ ] Actions green on live repo
[ ] Private window: example.com new, vN.example.com old
```

## What not to do

- Do not put the old site in a `/v2` folder on the new site unless you want path-based archives instead of subdomains
- Do not wildcard `*.example.com`
- Do not force-push `main` to "look clean"; archives and tags exist so you never need that
- Do not reuse the archive repo for the next experiment — each frozen era is read-only except for security fixes

When you are ready for the next era, start at step 1 with the next integer.
