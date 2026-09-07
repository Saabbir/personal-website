# Do you need DevOps?

Short answer: **no, not as a job title.** You need a small, specific subset of "how the internet finds a folder of HTML files."

## What people mean by DevOps

In companies, DevOps is pipelines, Kubernetes, staging clusters, on-call, secrets rotation. That is a career.

For a static personal site you need four skills:

1. **Git** — commit, push, branches named `main`
2. **CI as a recipe** — a YAML file that says "install, build, upload"
3. **DNS as a phone book** — a few records at your registrar
4. **Reading a failure** — Actions log, `dig`, private browser window

If you can follow a cookbook and paste values without inventing new infrastructure, you have enough.

## What you can skip

You do not need:

- Docker, Terraform, or a VPS
- Linux sysadmin
- "Deploying to production" as a ceremony with approvals (unless you add them)
- Email DNS (`MX`, `SPF`) unless you also host mail on this domain
- IPv6 (`AAAA`) on day one (optional; GitHub publishes AAAA values if you want them)

You also do not need to understand every GitHub Actions marketplace action. Treat `actions/checkout`, `actions/setup-node`, and `actions/deploy-pages` as named steps in a recipe.

## Words that scare people, translated

| Term | What it means here |
|------|-------------------|
| CI/CD | "When I push, a script builds and publishes." |
| Artifact | The zip of HTML/CSS/JS the workflow produced. |
| Environment | A GitHub label (often `github-pages`) that can restrict **which branch** may publish. |
| Nameservers | The computers that store *your* DNS records. Usually your registrar's. |
| Apex / root | `example.com` with no `www`. |
| Propagation | Waiting for DNS caches to forget the old IP. |
| Certificate / HTTPS | GitHub requests a TLS cert for your domain after DNS is correct. |

## A realistic learning order

1. Run the site locally (`npm start`). Confirm you can edit a page.
2. Push to `main`. Watch **Actions**. Open the `*.github.io` URL.
3. Buy a domain. Add GitHub's A and CNAME records. Wait. Enable HTTPS.
4. Only then think about a second hostname (`v1.example.com`) and a second repo.

Do not start with "multi-environment promotion" or "blue/green." A personal site is one production URL.

## When it *does* become DevOps

Move to a real host (Vercel, Cloudflare Pages, a VPS) if you need:

- Server-side rendering (a Next.js app that cannot `output: 'export'`)
- Secrets at request time
- Preview URLs per pull request as a product requirement
- More than GitHub Pages' "one custom domain per repo" model *inside a single project*

Until then, GitHub Pages plus a registrar is enough, and it is not a DevOps team.

## Safety rules that actually matter

These are the only "ops" rules worth memorizing:

- **Never** create a wildcard DNS record (`*.example.com`) for GitHub Pages. Unused names can be claimed by others.
- Set the custom domain in GitHub Pages **before** pointing DNS at GitHub.
- Do not leave old parking A records next to GitHub A records on `@`. The internet will pick at random.
- Do not delete `main`. Archive old stacks in **another repo**, not by rewriting history on the live site.

Next: [DNS from zero](03-dns-from-zero.md).
