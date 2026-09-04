# Railway deployment and operations

Tri-Power and She Pallets are independently buildable from the repository root. Keep preview and production as separate Railway services/environments. Deploy only from an approved branch or merge.

## Tri-Power Recycling

- Build: `npm ci && npm run build --workspace @tripower/tri-power`
- Start: `SITE_NAME="Tri-Power Recycling" npm run start --workspace @tripower/tri-power`
- Health check: `/health`
- Sitemap: `/sitemap.xml`
- Robots: `/robots.txt`

## She Pallets

- Build: `npm ci && npm run build --workspace @tripower/she-pallets`
- Start: `SITE_NAME="She Pallets" npm run start --workspace @tripower/she-pallets`
- Health check: `/health`
- Sitemap: `/sitemap.xml`
- Robots: `/robots.txt`

## Inquiry environment variables

- `LEAD_WEBHOOK_URL`: approved server-side lead-delivery endpoint.
- `LEAD_WEBHOOK_TOKEN`: optional bearer token for that endpoint.
- `PORT`: supplied by Railway.
- `SITE_NAME`: identifies the source site in the webhook payload.

Until recipients and delivery are approved, the endpoint returns `{ "ok": false, "preview": true }`. The UI reports that delivery is not connected, does not reset the form, and never claims a lead was sent.

Production payloads are length-limited and whitelisted server-side. The hidden honeypot field provides baseline automated-spam protection. Secrets are read only by the server and are not included in client bundles.

## Service verification

For each preview service:

1. Confirm `/health` returns the correct site name.
2. Open every sitemap URL and confirm route-specific title, description, and canonical output.
3. Confirm an invalid inquiry returns HTTP 400 with a useful message.
4. Confirm preview mode retains entered data and reports that routing is not connected.
5. Confirm Tri-Power `.cfm` URLs return HTTP 308 to their focused replacement routes.
6. Confirm there are no failed image, script, stylesheet, font, or API requests during normal browsing.

## Production gates

Do not attach custom production domains or change DNS until Brent approves both sites and the confirmation flags in `docs/migration/legacy-inventory.md` are resolved. Before cutover, export DNS, preserve MX records, verify SSL/apex/`www`, test real lead delivery, and retain the archived legacy sites and rollback instructions.
