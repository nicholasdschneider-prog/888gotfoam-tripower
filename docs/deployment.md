# Preview deployment configuration

Each new site is independently buildable from the repository root.

## Tri-Power

- Build: `npm ci && npm run build --workspace @tripower/tri-power`
- Start: `SITE_NAME="Tri-Power Recycling" npm run start --workspace @tripower/tri-power`
- Health check: `/health`

## She Pallets

- Build: `npm ci && npm run build --workspace @tripower/she-pallets`
- Start: `SITE_NAME="She Pallets" npm run start --workspace @tripower/she-pallets`
- Health check: `/health`

## Inquiry environment variables

- `LEAD_WEBHOOK_URL`: confirmed server-side lead-delivery endpoint.
- `LEAD_WEBHOOK_TOKEN`: optional bearer token for the delivery endpoint.
- `PORT`: supplied by Railway.

Until a lead endpoint and recipients are approved, the forms deliberately return a preview-mode message and never claim a lead was delivered. Do not configure production domains, DNS, or live form routing before Brent approves the sites and business facts.
