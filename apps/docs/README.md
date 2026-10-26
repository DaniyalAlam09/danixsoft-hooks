# @danixsoft/hooks docs (react-hooks.danixsoft.com)

The documentation site for the `@danixsoft/hooks` library in `packages/hooks`. Next.js 16,
built as a static export. Every dynamic route has `generateStaticParams` and the route handlers
(`/r/[file]`, `/og/[slug]`, `/md/[slug]`, `llms.txt`, `llms-full.txt`) are force-static.

## Commands

Run from the repo root (npm workspaces) or from `apps/docs`:

```bash
npm install                          # at the repo root
npm run dev --workspace=docs         # http://localhost:3000
npm run lint --workspace=docs
npm run check:registry --workspace=docs
npm run build --workspace=docs       # typedoc, builds packages/hooks, next build, then write-cf-routing
npx -y serve apps/docs/out           # preview the static build (npm run start does not work with an export)
```

## Hosting and deploy

Moved off Vercel on 25 Oct 2026.

- **Live:** https://react-hooks.danixsoft.com
- **Host:** Cloudflare Workers static assets (free plan), Worker `react-hooks-danixsoft`.
  `react-hooks.danixsoft.com` is a Worker custom domain, so Cloudflare manages its proxied DNS
  record. No Worker code runs.
- **Build:** `npm run build --workspace=docs` → `apps/docs/out/`. No env vars are needed (the site
  URL is fixed in the code). After `next build`, `scripts/write-cf-routing.mjs` writes
  `out/_redirects` (`/use-<hook>.md` → `/md/use-<hook>` as 200 rewrites, one per hook, which
  replace the old `rewrites()`) and appends to `out/_headers` the content types, noindex and
  canonical links, and CORS that the route handlers used to send. Static rules are in
  `public/_headers`.
- **Deploy** (from the laptop, never from inside the repo: wrangler detects Next.js and rewrites
  the project for OpenNext):

  ```bash
  D=/tmp/claude-1000/-home-daniyal-Grayphite-Projects-Danixsoft-Products/d595a722-ccc5-457f-90cc-cee32207a859/scratchpad/cfdeploy/react-hooks
  rm -rf "$D/out" && cp -r apps/docs/out "$D/out"
  cd "$D"
  set -a; . "/home/daniyal/Grayphite Projects/Danixsoft Products/danixsoft-db/.env.local"; set +a
  export CLOUDFLARE_API_TOKEN=$CLOUDEFLARE_API_TOKEN CLOUDFLARE_ACCOUNT_ID=$CLOUDEFLARE_ACCOUNT_ID
  npx -y wrangler@4 deploy
  ```

  The deploy folder holds only `out/` and this `wrangler.jsonc` (no secrets). If the scratchpad
  is gone, recreate it:

  ```jsonc
  {"name":"react-hooks-danixsoft","compatibility_date":"2026-10-01","assets":{"directory":"./out","not_found_handling":"404-page","html_handling":"auto-trailing-slash"}}
  ```

  Deploys are atomic. Roll back with `npx -y wrangler@4 rollback` from the deploy folder. Pushing
  `main` runs CI only (`.github/workflows/ci.yml`: library checks and a docs build); nothing
  deploys automatically. `release.yml` (npm publishing) is skipped until the repo variable `RELEASE_ENABLED` is `true`.
- **Scheduled jobs:** none.
- **Limits (free plan):** 20,000 files per deploy. Static-asset requests are free and don't count
  against the Workers limit (100k Worker requests a day applies only to Worker code).
- **SEO/GEO:** `llms.txt` / `llms-full.txt`, AI-crawler rules in `robots.ts`, an About page and
  answer guides, IndexNow key in `public/`. Run `npm run indexnow --workspace=docs` after each
  deploy. Owner steps: `setup-guides/seo-geo-checklist.md`.
