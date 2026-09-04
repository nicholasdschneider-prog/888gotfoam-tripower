# Tri-Power website ecosystem

Canonical repository: `C:\Users\nicho\Projects\TriPower`

This repository contains three separate web experiences:

- The preserved `888 Got Foam` prototype at the repository root.
- The Tri-Power Recycling replacement in `apps/tri-power`.
- The She Pallets replacement in `apps/she-pallets`.

BulkBid is a separate product and is not part of this repository's active tree. Historical demo files were removed during the Tri-Power cleanup; their committed history remains recoverable in Git.

## Install and quality checks

```bash
npm ci
npm run build             # preserved Got Foam prototype
npm run build:sites       # both replacement sites
npm run typecheck
npm run lint
npm run lint:sites
npm run link-check
```

`link-check` verifies 23 canonical routes, 13 Tri-Power legacy redirects, required SEO files and assets, and all 52 She Pallets size/CAD pairs against the archived legacy HTML.

## Local development

```bash
npm run dev --workspace @tripower/tri-power
npm run dev --workspace @tripower/she-pallets
```

## Production-like local serving

```bash
npm run build --workspace @tripower/tri-power
npm run start --workspace @tripower/tri-power

npm run build --workspace @tripower/she-pallets
npm run start --workspace @tripower/she-pallets
```

Each server exposes `/health`, permanent legacy routing where applicable, route-specific metadata, sitemap/robots files, and a server-validated inquiry endpoint. Without approved `LEAD_WEBHOOK_URL`, forms remain in safe preview mode and retain the visitor's entries.

See `docs/deployment.md` for Railway commands and environment variables, and `docs/migration/legacy-inventory.md` for the page-by-page disposition ledger and unresolved business confirmations.
