# Million Dollar Funnel™ site (milliondollarfunnels.us)

Next.js 14 app router, exported as a **static site** (`output: "export"`) and hosted on **Hostinger** (Apache/LiteSpeed, PHP). Vercel is no longer used: `vercel.json` disables Vercel git deployments.

## How the static site works
- `npx next build` writes the whole site to `out/` (plain HTML/CSS/JS plus `public/`).
- `public/.htaccess` handles HTTPS + apex host, clean URLs (`/services` → `services.html`), old-site 301s, the 404 page, caching and 3D asset MIME types. Redirects/headers in `next.config.mjs` do NOT work with static export; put them in `.htaccess`.
- Leads: forms POST to `/api/lead.php` (`public/api/lead.php`). It saves every lead to `leads/leads.csv` one level above `public_html`, forwards it to a webhook and emails it. Private settings live in `lead-config.php` one level above `public_html` (never in the repo):
  `<?php return ['notify_email' => '...', 'webhook_url' => '...'];`
- No server code: no API routes, no middleware, and images are unoptimized (`images.unoptimized`).

## Deploying — always publish
- After every change: commit on the working branch, push to `main` and merge `main` into `claude/website-threejs-b6wwhv` (keeps the source branches current; Vercel will not build).
- Then publish the build: run `npx next build`, and push the contents of `out/` (including `.htaccess`) as the only content of the `hostinger` branch. Hostinger pulls that branch into `public_html` (hPanel → Website → Advanced → Git).
- Do this every time without asking, then confirm the change on https://milliondollarfunnels.us.

## Commits
- Author: `DEVSYNX <devsynxoffical@users.noreply.github.com>`.
- Do not add `Co-Authored-By: Claude` or Claude session lines to commit messages.
