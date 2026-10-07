# AGENTS.md

## Repository purpose

This repository is the Tri-Power business website ecosystem. It may contain:

- the existing 888 Got Foam prototype;
- the replacement Tri-Power Recycling website;
- the replacement She Pallets website; and
- small shared UI/design utilities used by those sites.

**BulkBid is a separate product in `nicholasdschneider-prog/bulkbid`. Never move, copy, or implement the production BulkBid application in this repository.**

## Current assignment

Read `docs/phase-1-modernized-migration.md` before making implementation decisions. The current assignment is a Phase 1 **modernized migration** of:

- `tri-powerrecycling.com`
- `shepallets.com`

Preserve the useful business content and legacy URL value while delivering clearly better, mobile-first, accessible, fast, Railway-ready sites. This is not a full rebrand or a Phase 2 feature build.

## Live-site safety

- Do not change DNS, nameservers, registrar settings, MX records, or live hosting.
- Do not deploy either production custom domain.
- Do not submit or modify forms on the legacy sites in a way that creates real leads.
- Treat the current sites as read-only research sources.
- Archive the legacy pages, metadata, assets, forms, outbound links, and screenshots before migration.

## Content truth

- Do not invent operating hours, accepted materials, prices, certifications, service areas, environmental claims, contacts, or capabilities.
- When public sources conflict, record the conflict in the migration ledger and request business confirmation.
- Light grammar and structure cleanup is allowed when meaning is unchanged.
- Do not omit a legacy page or content item without recording its disposition: migrated, merged, redirected, intentionally retired, or pending confirmation.
- Preserve every valid She Pallets size/specification and CAD/Onshape link.

## Existing Got Foam app

- Preserve a working build of the existing Got Foam prototype.
- Do not delete it while restructuring.
- If it is moved into a multi-app structure, prove its build still passes and document the new commands.

## Engineering expectations

- Prefer TypeScript and a static-first architecture suitable for marketing sites and SEO.
- Keep Tri-Power and She Pallets independently buildable and independently deployable to Railway.
- Avoid a database in Phase 1 unless a verified requirement demands one.
- Put secrets only in Railway/environment variables. Never commit API keys, SMTP credentials, customer data, or private configuration.
- Forms need server-side validation, spam protection, clear success/failure states, and documented production environment variables.
- Build semantic, keyboard-accessible, responsive interfaces with visible focus states and reduced-motion support.
- Add and run lint, type-check, build, and link-check commands.
- Preserve valuable legacy paths or add permanent redirects, including old `.cfm` routes.

## First implementation milestone

1. Audit the existing repository and preserve the Got Foam build.
2. Crawl and archive both live sites.
3. Create `docs/migration/legacy-inventory.md` with one row per discovered URL and its migration disposition.
4. Establish a clean multi-site structure without importing BulkBid.
5. Scaffold the Tri-Power and She Pallets applications.
6. Implement the responsive global shell and home page for each brand using migrated content.
7. Add preview-safe form wiring and document required production environment variables.
8. Run all quality checks.
9. Update the draft pull request with screenshots, crawl findings, unresolved business questions, commands run, results, and the next recommended milestone.

## Code review rules

- Flag any change that mixes BulkBid into this repository.
- Flag any unverified business claim presented as fact.
- Flag any removal of legacy content or URL behavior that lacks a migration-ledger entry or redirect plan.
- Flag secrets, private data, live DNS changes, or production-domain deployment.
- Flag any restructuring that breaks the existing Got Foam build.
