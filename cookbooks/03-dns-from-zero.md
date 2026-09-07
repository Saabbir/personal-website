# DNS from zero

DNS is the internet's phone book. People type names. Computers need numbers (IP addresses). DNS stores the mapping.

You do not run DNS on your laptop. You edit a table at the company that sold you `example.com` (the **registrar**).

## Registrar, nameservers, records

Three layers, often confused:

| Layer | Job |
|-------|-----|
| **Registrar** | You paid them. They know you own `example.com`. |
| **Nameservers** | Computers that answer "what is `example.com`?" Often `ns1.registrar.net`. Leave them on the registrar unless you moved DNS to Cloudflare. |
| **Records** | Rows in that table: A, CNAME, MX, TXT, … |

For a first site: **do not click "Change nameservers."** Only add records.

## Hostnames this cookbook uses

- `example.com` — **apex** (also called root). No prefix.
- `www.example.com` — the `www` **subdomain**.
- `v1.example.com` — another subdomain, used later for an old version of the site.

In many UIs the host field for apex is `@`. The UI then shows `@.example.com`. That is normal.

## Record types you will actually use

### A record

**A** means "this name is this IPv4 address."

GitHub Pages publishes four IPv4 addresses. For the apex you add **four** A records, all with host `@`, each a different IP:

- `185.199.108.153`
- `185.199.109.153`
- `185.199.110.153`
- `185.199.111.153`

Several A records on the same host are **round-robin**, not a mistake. Some registrars warn "conflicting A record." For GitHub Pages you click **add anyway**. You want all four.

Optional: GitHub also publishes **AAAA** (IPv6) values. Skip AAAA until the A records work.

### CNAME record

**CNAME** means "this name is an alias of that other name." The browser will look up the other name's A records.

For GitHub Pages, subdomains should CNAME to **`yourname.github.io`** — not to `example.com`, and not to `yourname.github.io/repo`.

| Host | Type | Value |
|------|------|--------|
| `www` | CNAME | `yourname.github.io` |
| `v1` | CNAME | `yourname.github.io` |

No `https://`. No trailing slash. GitHub then uses the **Host** header (`www.example.com` vs `v1.example.com`) plus each repo's **custom domain** setting to pick the right site.

### Records you can ignore on day one

| Type | Used for |
|------|----------|
| MX | Email |
| TXT | Verification, email auth, some challenges |
| NS | Delegating a subdomain to other nameservers |
| URL redirect at the registrar | A cheap HTTP redirect; GitHub already redirects `www` ↔ apex if both DNS records exist |

Do not add `*.example.com`.

## The official GitHub Pages recipe

Do this **after** the domain is typed into GitHub **Settings → Pages → Custom domain** and saved.

**Apex `example.com`**

| Type | Host | Value |
|------|------|--------|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |

**www**

| Type | Host | Value |
|------|------|--------|
| CNAME | `www` | `yourname.github.io` |

If the registrar already has parking A records (random AWS or "coming soon" IPs) on `@`, **delete them**. Mixing parking and GitHub IPs makes the site flip-flop.

## TTL and why your house disagrees with `dig`

**TTL** is how long a resolver may cache the answer. `30 min` in the UI is typical.

`dig @8.8.8.8 example.com` asks **Google**.  
Your Mac often asks **the router** (`192.168.0.1`), which asked the ISP, which may still remember yesterday's parking IPs.

So:

```bash
dig @8.8.8.8 example.com +noall +answer -t A    # source of truth
dscacheutil -q host -a name example.com         # what *this Mac* believes (macOS)
```

If they differ, the registrar is fine. Flush or bypass local DNS:

```bash
sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder
```

On macOS, set Wi-Fi DNS to `8.8.8.8` and `1.1.1.1` if the router will not forget. Rebooting the router also clears *its* cache.

Chrome has its own cache: `chrome://net-internals/#dns` → Clear host cache, or use a private window.

## HTTPS

HTTP is the site. HTTPS is the same site with a certificate.

GitHub Pages will not let you **Enforce HTTPS** until it can see your DNS pointing at GitHub and can finish a certificate. That can lag DNS by minutes or hours.

Until then, `http://example.com` might work and `https://example.com` might hang. Wait, then tick Enforce HTTPS in the same Pages settings screen.

## A complete first-time DNS session

1. GitHub repo → **Settings → Pages** → Custom domain `example.com` → Save.
2. Registrar → **DNS records** (not nameserver change).
3. Delete leftover apex A records.
4. Add the four GitHub A records on `@`.
5. Add CNAME `www` → `yourname.github.io`.
6. Wait. Check with `dig @8.8.8.8`.
7. Open `http://example.com` in a private window.
8. When it loads from GitHub, enable **Enforce HTTPS**.
9. Confirm `https://www.example.com` redirects to the apex (GitHub does this if both records exist).

## How this connects to deploy

DNS does **not** run on every commit. You set it once (plus once per new subdomain like `v2`).

Commits only rebuild files on Pages. DNS still says "this name is GitHub." If DNS is wrong, a perfect deploy is invisible.

Next: [GitHub Pages cookbook](04-github-pages-cookbook.md).
