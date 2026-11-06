# 04 · Deployment plan

**Vercel is for development and testing only. Production runs on our own server** (DigitalOcean,
Hostinger VPS or similar; final choice pending). The app is built to run identically on both.

## 1. Environments

| Environment | Source | Host | URL | Purpose |
|---|---|---|---|---|
| Local | any branch | developer machine | `localhost:3000` | Development |
| Test (Vercel) | `main` branch | Vercel | e.g. `bxtechnologies.vercel.app` (password-protected, `noindex`) | Testing and review by bX directors |
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
| **DigitalOcean Droplet** (2 GB RAM+, Frankfurt or Amsterdam) | Recommended | Simple, predictable price, good docs |
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
- **Backups**: VPS snapshots weekly; nothing stateful lives on the server (content is in git; CVs arrive by email).

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

- `main` → Vercel deploys the password-protected test site automatically (Vercel Git integration).
  `dev` is never deployed.
- `main` → GitHub Actions builds and pushes the Docker image to `ghcr.io`, tags `vX.Y.Z`, then deploys to the
  VPS over SSH (`docker pull` + `docker compose up -d`), runs a smoke test, and uploads Sentry source maps.
  Production deploys need a manual approval step (GitHub Environments).

## 4. Configuration and secrets

Never in git. Template in `.env.example`. Stored in Vercel (preview/staging), GitHub Actions secrets
(CI and deploy) and an `.env` file on the VPS readable only by the deploy user.

| Variable | Use |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs, sitemap, OG |
| `RESEND_API_KEY` | Form delivery |
| `MAIL_TO_ENQUIRIES`, `MAIL_TO_CAREERS`, `MAIL_FROM` | Form routing |
| `TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` | Spam protection |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Analytics |
| `SENTRY_DSN`, `SENTRY_AUTH_TOKEN` | Error monitoring |
| `SITE_NOINDEX` | `true` on preview, staging and rehearsal (on by default on Vercel) |
| `BASIC_AUTH_USER`, `BASIC_AUTH_PASSWORD` | Password for staging and previews (`proxy.ts`); never on the VPS |
| `NEXT_PUBLIC_CV_MAX_MB` | `4` on Vercel (request cap 4.5 MB); unset (10) on the VPS |
| `VPS_HOST`, `VPS_USER`, `VPS_SSH_KEY` (CI only) | Production deploy |

Mail domain: SPF, DKIM and DMARC records for the sending domain before forms go live.

## 4a. Vercel setup for staging and previews (T50)

What the code already does (no Vercel-only features; the same build runs on the VPS):

- `vercel.json`: functions in **`fra1`** (Frankfurt); **only `main` deploys** (owner's rule, 2026-11-06:
  `dev` is never deployed, for testing or staging).
- `proxy.ts`: **password protection** (HTTP basic auth) when `BASIC_AUTH_USER` and `BASIC_AUTH_PASSWORD`
  are set. Free, unlike Vercel's own password protection. `/api/health` stays open for uptime checks.
- `lib/site.ts`: **noindex on every Vercel deployment by default**, plus an `X-Robots-Tag: noindex` header
  on all responses and `Disallow: /` in robots.txt. The site URL falls back to the deployment's own
  address, so canonicals and share images point at the right host.

### One-time setup in the Vercel dashboard (owner)

1. **Plan.** Vercel's free Hobby plan is for non-commercial use only. A company's staging site needs
   **Pro** (per member, per month). One seat is enough; reviewers only need the staging password.
2. **Add New → Project → Import** the GitHub repository. Framework preset: Next.js (detected).
   Leave build and install commands at their defaults (`npm install`, `next build`). Node.js 24.x.
3. **Settings → Environments → Production → Branch Tracking: `main`** (the default). On Vercel,
   "Production" is our **test deployment**: password-protected and `noindex`, never the live site.
   `dev` deployments are switched off in `vercel.json`.
4. **Settings → Deployment Protection → Vercel Authentication: off for Production** (staging uses our
   own password instead, so directors do not need Vercel accounts). Leaving it on for Preview is fine.
5. **Settings → Environment Variables**, for **Production and Preview** unless noted:

| Variable | Value |
|---|---|
| `SITE_NOINDEX` | `true` |
| `BASIC_AUTH_USER` / `BASIC_AUTH_PASSWORD` | a shared reviewer login (password 16+ characters, from a password manager) |
| `NEXT_PUBLIC_SITE_URL` | Production only: the staging URL, e.g. `https://bx-staging.vercel.app` (Preview: leave unset) |
| `NEXT_PUBLIC_CV_MAX_MB` | `4` |
| `ENABLE_DEV_ROUTES` | `true` (design review page `/dev/foundations`) |
| `RESEND_API_KEY` | a Resend key (see below) |
| `MAIL_FROM` | until the domain is verified: `bX Staging <onboarding@resend.dev>` |
| `MAIL_TO_ENQUIRIES`, `MAIL_TO_CAREERS` | until the domain is verified: the Resend account's own email address |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY` | Cloudflare's test keys (`1x00000000000000000000AA` / `1x0000000000000000000000000000000AA`) until a real widget exists; then the real keys, with the staging hostname added to the widget |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | leave empty (staging traffic must not count) |
| `FORMS_DRY_RUN` | **never set** |

6. **Deploy:** push to `main` (or Deployments → … → Redeploy) so the variables apply, then check:
   the staging URL asks for the password; `/robots.txt` says `Disallow: /`; response headers include
   `X-Robots-Tag: noindex`; the contact form sends to the Resend account inbox.

### Known staging differences (not bugs)

- **CV uploads are limited to 4 MB on Vercel** (platform request cap of 4.5 MB). The VPS keeps 10 MB.
- **Form rate limiting is per serverless instance** on Vercel, so it is looser than on the VPS.
- Resend's `onboarding@resend.dev` sender only delivers to the Resend account owner's address. Verify
  `bxtechnologies.net` in Resend (SPF, DKIM) to send to `info@` and `jobs@`.

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
- [ ] Vector bX mark (favicon set and OG images are generated from the raster mark in T42)
- [ ] Real social profile URLs (footer currently points to generic facebook.com / x.com)
- [ ] Privacy and Cookies pages list the actual processors (hosting provider, Resend, Plausible, Cloudflare, Sentry)

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
