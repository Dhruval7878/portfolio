# dhruval.dev

Personal portfolio. Static Next.js export deployed to Cloudflare Workers (static assets).

## Build

```bash
npm run build
```

Output goes to `out/` — a static export (`output: "export"` in `next.config.ts`). No API routes, no middleware; redirects are handled entirely by `public/_redirects`, which is copied into `out/` on build.

## Environment

- `NEXT_PUBLIC_GA_ID` — Google Analytics 4 measurement ID (e.g. `G-XXXXXXXXXX`), read at build time and baked into the static output by `@next/third-parties`'s `GoogleAnalytics` component. Set in `.env.production` (gitignored).

## Redirects (`public/_redirects`)

| Path  | Destination |
|-------|-------------|
| `/resume` | Resume PDF on Google Drive |
| `/gh` | GitHub profile |
| `/x`  | X profile |
| `/li` | LinkedIn profile |

## Deploy (Cloudflare Workers)

```bash
npm run build
npx wrangler dev      # verify locally
npx wrangler deploy   # ship
```

Config lives in `wrangler.jsonc`: serves `./out` as static assets, `not_found_handling: "404-page"`, custom domain route for `dhruval.dev`.
