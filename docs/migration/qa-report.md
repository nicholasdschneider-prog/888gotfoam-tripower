# Phase 1 QA report

## September 2 Tri-Power rebuild update

The Tri-Power-only refresh was reconciled against BANG's private handoff package. Authentic business photography replaced generic presentation assets, customer paths and contact questions were clarified, and 11 additional template-era URLs from the server package were added to the permanent redirect set. The private website/database/mailbox source package remains outside Git.

Current Tri-Power checks passed: TypeScript, lint, production build, the repository link/route checker, and Git whitespace validation. The checker now covers all 24 known Tri-Power legacy redirects. The existing Got Foam build and the unchanged She Pallets app are covered again by the full-repository checks before preview publication.

Validated August 15, 2026 against production builds served by each app's Railway-style Node server.

## Route matrix

Every route was opened at 1440×1000 and 390×844. Automated browser checks required exactly one `h1`, a `main` landmark, the route-specific title, zero horizontal overflow, and no console errors.

### Tri-Power Recycling (13)

`/`, `/services`, `/services/cardboard`, `/services/paper`, `/services/plastics`, `/services/eps-foam`, `/home-4-foam`, `/commercial-recycling`, `/recycling-equipment`, `/about`, `/location`, `/contact`, `/privacy`

All 13 archived `.cfm` paths were separately verified as HTTP 308 redirects to the focused replacement route.

### She Pallets (10)

`/`, `/services`, `/new-pallets`, `/heat-treated-pallets`, `/custom-pallets`, `/recycled-pallets`, `/about-us`, `/preview-pallets`, `/pallet-list`, `/contact-location`

The pallet catalog contains 52 unique sizes and 52 unique Onshape URLs. The build-time link check compares the URL list exactly against archived legacy HTML. A separate live HEAD check received a normal HTTP 302 response from every Onshape destination.

## Forms

Both forms were exercised in preview mode through the browser and directly through the server endpoint.

- Missing required server fields: HTTP 400 with a useful error.
- Valid preview submission: `{ "ok": false, "preview": true }` and a clear not-connected message.
- Entered name and message remain in the form after the preview response.
- No browser console error and no real lead delivery.
- Payload keys are whitelisted and lengths are limited server-side; a hidden honeypot provides baseline spam protection.

## SEO and serving

- All 23 canonical routes returned HTTP 200 with a unique server-rendered title, description, and canonical URL.
- Both `/robots.txt` and `/sitemap.xml` returned the expected content type.
- Local Business JSON-LD contains only the verified name, address, phone, and canonical website URL.
- Unknown routes return HTTP 404; trailing slashes normalize with HTTP 308.
- `/health` returned HTTP 200 and the correct site name.

## Lighthouse

Mobile Lighthouse runs on the two home pages:

| Site | Performance | Accessibility | Best practices | SEO |
|---|---:|---:|---:|---:|
| Tri-Power | 84 | 100 | 100 | 100 |
| She Pallets | 78 | 100 | 100 | 100 |

She Pallets staging photos were resized/recompressed, its logo was right-sized, the headline fonts were self-hosted, below-fold images were lazy-loaded, and a smaller mobile hero source was added. The remaining modeled LCP is the mobile hero photograph. Converting the approved production photography to AVIF/WebP with generated responsive variants is the documented performance follow-up; it should occur after Brent/Cindy provide or approve the production image set rather than repeatedly recompressing unapproved staging assets.

Lighthouse produced complete JSON reports but its Windows Chrome cleanup step emitted a temporary-directory `EPERM` warning after each report was written. The scores above come from the completed reports.

## Commands passed

```text
npm run build
npm run build:sites
npm run typecheck
npm run lint
npm run lint:sites
npm run link-check
npm audit --omit=dev
git diff --check
```

Representative desktop/mobile screenshots for every unique page template were captured under the ignored local `output/playwright/` evidence directory. A curated final set is committed in `docs/migration/screenshots/` for pull-request review. No DNS, live hosting, production domain, or legacy form was changed.
