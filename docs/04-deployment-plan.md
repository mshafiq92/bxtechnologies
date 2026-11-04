# 04 · Deployment plan

**Vercel is for development and testing only. Production runs on our own server** (DigitalOcean,
Hostinger VPS or similar; final choice pending). The app is built to run identically on both.

## 1. Environments

| Environment | Source | Host | URL | Purpose |
|---|---|---|---|---|
| Local | any branch | developer machine | `localhost:3000` | Development |
| Preview | every PR | Vercel | auto preview URL | Review each change against the designs |
| Staging | `dev` branch | Vercel | e.g. `bx-staging.vercel.app` (password-protected, `noindex`) | UAT by bX directors |
| Production | `main` branch (tagged release) | **VPS** | `bxtechnologies.net` + `www` redirect | Live site |

Branching: `feature/<task-id>-<name>` → PR into `dev` → milestone PR `dev` → `main`. Protect `main` and
`dev` (required CI checks, no force push).

Before launch we also run a **production rehearsal** of the Docker image on the chosen VPS under a
temporary subdomain (e.g. `new.bxtechnologies.net`, `noindex`), so the real production setup is tested,
not only Vercel.

## 2. Production hosting options

The site needs a **Node.js server** in production (Server Actions for forms, image optimisation, dynamic
OG images). That rules out plain shared/static hosting.

| Option | Fit | Notes |
|---|---|---|
| **DigitalOcean Droplet** (2 GB RAM+, Frankfurt or Amsterdam) | Recommended | Simple, predictable price, Spaces (S3) for CV uploads in the same account, good docs |
| **Hostinger VPS** (KVM plan, EU location) | Good | Cheaper; full root access; same Docker setup |
| DigitalOcean App Platform | Possible | Managed (no server admin), deploys the same Dockerfile; costs more than a Droplet |
| Hostinger shared / "web hosting" plans | **Not suitable** | No reliable long-running Node.js process for Next.js server features |

Whichever is chosen, the setup is the same:

```text
Cloudflare (DNS, TLS, cache, WAF)
        │
   VPS (Ubuntu LTS)
   ├─ Caddy (reverse proxy, automatic HTTPS, gzip/brotli)
   └─ Docker: bx-web (Next.js standalone, port 3000, restart=always)
```

- **Image**: multi-stage `Dockerfile` using `output: "standalone"`, non-root user, health check on `/api/health`.
- **Registry**: GitHub Container Registry (`ghcr.io`).
- **Server hardening**: SSH keys only, firewall (80/443/22), automatic security updates, fail2ban, non-root deploy user.
- **Backups**: VPS snapshots weekly; nothing stateful lives on the server (uploads go to object storage, content is in git).

## 3. CI/CD pipeline (GitHub Actions)

On every pull request:

1. `npm ci` (cached)
2. Lint (ESLint, Stylelint, Prettier check)
3. Typecheck
4. Unit tests (Vitest)
5. `next build`
6. Playwright E2E + axe + visual snapshots
7. Lighthouse CI with budgets
8. Content guards (blocked names, printed counts, dashes)
9. **Docker build** (proves the production image still builds)

On merge:

- PR / `dev` → Vercel deploys preview / staging automatically (Vercel Git integration).
- `main` → GitHub Actions builds and pushes the Docker image to `ghcr.io`, tags `vX.Y.Z`, then deploys to the
  VPS over SSH (`docker pull` + `docker compose up -d`), runs a smoke test, and uploads Sentry source maps.
  Production deploys need a manual approval step (GitHub Environments).

## 4. Configuration and secrets

Never in git. Template in `.env.example`. Stored in Vercel (preview/staging), GitHub Actions secrets
(CI and deploy) and an `.env` file on the VPS readable only by the deploy user.

| Variable | Use |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs, sitemap, OG |
| `MAIL_PROVIDER`, `RESEND_API_KEY` or `SMTP_HOST/PORT/USER/PASS` | Form delivery |
| `MAIL_TO_ENQUIRIES`, `MAIL_TO_CAREERS`, `MAIL_FROM` | Form routing |
| `S3_ENDPOINT`, `S3_BUCKET`, `S3_ACCESS_KEY`, `S3_SECRET_KEY`, `S3_REGION` | CV uploads (DO Spaces / R2) |
| `TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` | Spam protection |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Analytics |
| `SENTRY_DSN`, `SENTRY_AUTH_TOKEN` | Error monitoring |
| `SITE_NOINDEX` | `true` on preview, staging and rehearsal |
| `VPS_HOST`, `VPS_USER`, `VPS_SSH_KEY` (CI only) | Production deploy |

Mail domain: SPF, DKIM and DMARC records for the sending domain before forms go live.

## 5. Cut-over from the current site (bxtechnologies.net)

1. **Inventory the current site**: crawl https://bxtechnologies.net/ and its sitemap, export the URL list, titles and descriptions, and top pages from Search Console if available.
2. Build the **301 redirect map** in `next.config` (old URL → new route; unmatched → nearest parent, never a blanket redirect to `/`).
3. Move DNS to Cloudflare (if not already) and lower TTL to 300s 48 hours before launch.
4. Launch window (low traffic, weekday morning PKT/CET): point the apex and `www` to the VPS via Cloudflare, verify TLS, `www` → apex.
5. Verify immediately: every route, forms deliver, the whole redirect map (scripted), `robots.txt` allows indexing, sitemap reachable.
6. Submit the new sitemap to Google Search Console and Bing Webmaster Tools.
7. Keep the old site available (not public) for 2 weeks as a rollback path.

## 6. Rollback

- **Previous image**: every release is a tagged image in `ghcr.io`; redeploying the previous tag takes about a minute (`docker compose` with the old tag).
- **DNS**: point back to the old host during the 2-week overlap.
- **Code**: revert PR on `main`.

## 7. Launch checklist

**Content**
- [ ] Metrics: placeholders accepted for launch by decision, or replaced with real figures
- [ ] Clients & partners strip: current logos shown by decision (permissions are the business's responsibility)
- [ ] Real photos for About/Careers heroes, or confirm text-only heroes
- [ ] Team names and roles, article author
- [ ] Remaining service detail content, or rows link to contact
- [ ] Vector bX mark, favicon set, OG image
- [ ] Real social profile URLs (footer currently points to generic facebook.com / x.com)
- [ ] Privacy and Cookies pages list the actual processors (hosting provider, mail, Plausible, Cloudflare, Sentry, object storage)

**Technical**
- [ ] Production rehearsal on the VPS passed
- [ ] Lighthouse ≥ 95 / 100 / 100 / 100 on key pages (mobile), measured on the VPS
- [ ] Axe: zero violations; keyboard and screen-reader pass done
- [ ] All forms tested end to end on production (enquiry, application with CV, subscribe)
- [ ] Redirect map verified; no 404s from old URLs
- [ ] `noindex` off in production, on everywhere else
- [ ] Sitemap, robots, canonical, structured data validated
- [ ] Sentry and analytics receiving data
- [ ] Uptime monitor (UptimeRobot / Better Stack) on home and `/api/health`
- [ ] Server hardening and snapshot backups in place

## 8. After launch

- Week 1: watch Search Console coverage, 404s, Sentry, form deliverability daily.
- Monthly: dependency updates (Dependabot), OS updates on the VPS, Lighthouse trend, content review.
- Later: a CMS/admin console can replace the files behind `lib/content` without changing the pages.
