# Tri-Power Recycling + She Pallets
## Phase 1 Modernized Website Migration

**Prepared:** August 14, 2026  
**Project lead:** Nick Schneider  
**Business owner:** Brent Pfeiffer / Tri-Power Recycling  
**Status:** Approved for build kickoff

## Executive summary

Rebuild the two existing public business websites as clean, modern, mobile-first websites and deploy them on Nick's Railway infrastructure:

- Tri-Power Recycling: `tri-powerrecycling.com`
- She Pallets: `shepallets.com`

This is a **modernized migration**, not a pixel-for-pixel copy and not a large strategy project. Preserve useful pages, copy, specifications, contact paths, outbound links, and legacy search value while improving visual design, information hierarchy, responsive behavior, accessibility, performance, maintainability, forms, and baseline SEO.

The current sites remain live and untouched during development. No DNS change occurs until both replacements are approved by Brent. Phase 2 begins after launch and can cover deeper interviews, new features, automation, AI, portals, calculators, BulkBid cross-links, and ongoing marketing improvements.

## Objective

Deliver two production-ready replacement websites that:

1. Include every legitimate public page and useful content item from the current sites.
2. Feel clearly newer, more professional, and easier to use.
3. Work well on phones, tablets, laptops, and large screens.
4. Preserve useful legacy URLs and search value wherever practical.
5. Can be maintained without dependence on the former web developer.
6. Are independently deployable on Railway.
7. Are approved by Brent before any DNS change.

### Guiding principle

**Preserve the business truth; improve the experience.**

Do not invent capabilities, certifications, service areas, prices, operating hours, accepted materials, environmental claims, or contact routing. Light grammar and structural cleanup is encouraged when meaning is unchanged.

## Phase 1 scope

### Included

- Discover and inventory all public pages, files, forms, outbound links, metadata, and important assets on both live sites.
- Capture current URL structures and legacy `.cfm` routes before implementation.
- Preserve useful copy, services, contacts, pallet specifications, downloadable information, CAD/Onshape links, and calls to action.
- Rebuild both sites with a modern industrial design appropriate for a regional recycling/material-handling business.
- Improve navigation, headings, page flow, typography, spacing, buttons, forms, and footer content.
- Add mobile-first responsive behavior.
- Apply accessibility fundamentals: semantic structure, keyboard navigation, visible focus, labeled forms, sufficient contrast, useful alternative text, and reduced-motion support.
- Apply baseline technical SEO: unique titles/descriptions, canonical URLs, sitemap, robots file, Open Graph data, accurate organization/local-business schema, and permanent redirects.
- Optimize images and other assets.
- Add reliable inquiry/quote forms with server-side validation, spam protection, and success/error states.
- Configure Railway preview and production services.
- Prepare DNS cutover, SSL, redirects, verification, rollback, and post-launch checks.
- Document content updates and deployment.

### Not included

- Full brand strategy or company repositioning.
- Customer/vendor portals, dashboards, accounts, or databases.
- BulkBid marketplace implementation.
- AI chat, AI quoting, automated lead qualification, or complex CRM workflows.
- New pricing models, service policies, or operational promises.
- Major photography/video production.
- Large SEO/content campaigns.
- E-commerce.
- Taking the current sites offline before replacements are approved.

## Current site inventory

### She Pallets

Preserve the substantive content represented by these current routes, even if navigation or grouping is improved:

| Current page | Current route | Phase 1 treatment |
|---|---|---|
| Home | `/` | Strong overview with clear service and contact paths. |
| Services | `/services` | Preserve service categories and improve scannability. |
| New Pallets | `/new-pallets` | Preserve product/service details and imagery. |
| Heat Treated Pallets | `/heat-treated-pallets` | Preserve accurate information; add no unverified certification claim. |
| Custom Pallets | `/custom-pallets` | Emphasize custom sizing and quote workflow. |
| Recycled Pallets | `/recycled-pallets` | Preserve current recycled-pallet information. |
| About Us | `/about-us` | Preserve the family- and woman-owned story and founding information. |
| Preview Pallets | `/preview-pallets` | Preserve linked previews and CAD/Onshape destinations. |
| Pallet List | `/pallet-list` | Preserve every valid size, specification, and external model link. |
| Contact & Location | `/contact-location` | Rebuild contact, map/location information, and inquiry form. |

The Pallet List is a high-risk migration area. It requires a row-by-row completeness check rather than a visual approximation.

### Tri-Power Recycling

The current site is an older ColdFusion (`.cfm`) site and can be unreliable to crawl. Known content includes the home page, location, contact, and recycling-services information, but the migration cannot be declared complete until a full route and asset inventory exists.

The discovery pass must capture:

- Routes exposed in headers, footers, body links, sitemaps, search-indexed results, and internal links.
- Current descriptions for fiber/cardboard, plastics/foam, wood/pallets, commercial recycling, equipment, pickup/drop-off, and other categories actually present.
- Contact information, forms, notices, downloadable files, and location information.
- Existing titles, descriptions, images, and legacy URL patterns needed for redirects.

Require Brent's confirmation before launch for:

- Current public drop-off hours.
- Whether Saturday hours are active.
- Exactly which residential and commercial materials are accepted.
- Any current restriction on plastics.
- Correct recipients for general, sales, hauling, and service inquiries.

Do not resolve conflicting public information by guessing.

## Content migration rules

1. Maintain a migration ledger with one row per legacy URL and a disposition of migrated, merged, redirected, intentionally retired, or pending confirmation.
2. Flag unverified details rather than filling them from third-party directories.
3. Correct obvious grammar, spacing, punctuation, capitalization, duplication, and awkward structure without changing meaning.
4. Preserve useful specifics such as dimensions, pallet types, materials, contacts, addresses, phone numbers, and process details.
5. Ask Brent/Cindy for original logos and photography. Public-site images may be temporary staging assets, but provenance and quality require review before production.
6. Validate all external links, especially She Pallets CAD/Onshape links.
7. Remove BANG! Website Design credits and dependencies from replacement sites.
8. Archive a crawl, screenshots, copy, metadata, and downloaded public assets before cutover.

## Design direction

The sites should feel related but remain distinct brands.

Shared qualities:

- Modern industrial and Midwestern, not trendy or overly corporate.
- Straightforward, credible, practical, and easy to scan.
- Strong use of real facility, equipment, material, pallet, and team imagery.
- Large readable type, generous spacing, clear hierarchy, and obvious contact actions.
- Mobile-first navigation and tap targets.
- Consistent forms, cards, buttons, alerts, and footers.
- Avoid generic green-leaf clichés and exaggerated environmental language.

Tri-Power emphasis:

- Industrial recycling capability, operating scale, material streams, facility/equipment, commercial programs, and responsiveness.
- A visitor should quickly understand what Tri-Power accepts, what it does, where it is, and whom to contact.

She Pallets emphasis:

- Pallet expertise, custom capability, new/recycled/heat-treated options, dependable regional service, and usable specifications.
- A visitor should quickly find the right pallet type, review dimensions/designs, and request a quote.

Use existing logos and recognizable colors as the starting point. Do not force a full rebrand in Phase 1.

## Technical approach

Use `nicholasdschneider-prog/888gotfoam-tripower` as the Tri-Power ecosystem repository. **BulkBid remains in the separate private `nicholasdschneider-prog/bulkbid` repository.**

Recommended shape:

```text
/apps
  /tri-power
  /she-pallets
  /got-foam          # retain existing prototype and preserve its build
/packages
  /shared-ui         # only truly shared primitives/tokens
/docs
  /migration
```

Preferences:

- TypeScript.
- Static-first architecture suitable for strong SEO; Astro is preferred for the new sites, but retaining a simple Vite/React approach is acceptable when it clearly reduces migration risk.
- Independently buildable and independently deployable sites.
- No database unless a verified Phase 1 requirement demands one.
- Forms post to a small server endpoint or trusted service; secrets live in environment variables.
- No credentials or private data in Git or browser bundles.
- Automated lint, type-check, build, and link-check commands.
- Preserve or carefully relocate the existing Got Foam prototype without breaking its build.

### Railway

Create separate preview and production services/environments for Tri-Power and She Pallets. A single Railway project may contain all services, but each domain must map to the correct production service. Configure build/start commands, health checks, environment variables, and custom domains explicitly. Production deploys occur only from an approved branch/merge.

## Forms and lead delivery

At minimum, each site needs a general inquiry form. She Pallets should support quote-oriented inquiries.

Required behavior:

- Appropriate name, company, email, phone, message, pallet type/size/quantity fields.
- Clear privacy/consent language for the information collected.
- Server-side validation and spam protection.
- Success/failure states that do not lose entered data.
- Delivery to confirmed recipients.
- Optional shared-mailbox or lightweight lead-log copy only after approval.
- No exposed email credentials in browser code.

## SEO and URL migration

- Record every current URL before coding redirects.
- Preserve sensible current paths.
- Add permanent redirects for every changed/consolidated path, including legacy `.cfm` URLs.
- Preserve page topics rather than redirecting everything to the home page.
- Add unique titles/descriptions, canonicals, sitemap, robots, Open Graph data, favicons, and accurate schema.
- Use a logical heading hierarchy.
- Optimize image names, dimensions, compression, and alternative text.
- Verify internal links, outbound links, forms, phone links, email links, and maps.
- Capture Search Console/analytics access if available.
- After cutover, submit sitemaps and monitor crawl errors, redirects, forms, and indexing.

## Domain, hosting, and control

The replacements can be built without access to old hosting. Keep the old sites live until approval.

Before launch, verify:

- Legal registrant/owner for each domain.
- Registrar and DNS administrator access.
- Ability to manage web and verification records.
- Current DNS export and TTL values.
- Current MX/email records so the migration does not interrupt email.
- Search Console, analytics, business-listing, and form-inbox access where available.
- Old hosting access only when needed for source assets or server files.

Domains/DNS must be controlled by Brent/Tri-Power, not by the former developer or a new contractor. Nick may administer them, but the business retains ownership and recovery access.

### Cutover sequence

1. Finish and test Railway production services on temporary domains.
2. Obtain Brent's written approval.
3. Reduce DNS TTL in advance when possible.
4. Export DNS and verify email records.
5. Point web records to Railway without changing unrelated email records.
6. Verify SSL, apex/`www`, redirects, forms, analytics, and mobile rendering.
7. Monitor for at least one full business cycle before canceling old hosting.
8. Retain the legacy archive and rollback path.

## Quality assurance

Functional:

- Every intended page loads.
- Navigation, footers, buttons, phone/email links, maps, forms, and CAD links work.
- Form submissions reach confirmed recipients.
- Legacy URLs load matching content or redirect correctly.
- No broken asset requests.

Responsive/browser:

- Validate current iPhone/Safari, Android/Chrome, desktop Chrome, Safari, Firefox, and Edge.
- No horizontal scrolling, clipping, overlap, tiny tap targets, or unusable menus.
- Large lists/tables, especially the pallet inventory, work on small screens.

Accessibility:

- Semantic landmarks/headings.
- Keyboard-accessible navigation and forms.
- Visible focus treatment.
- Labels and useful errors.
- Sufficient contrast.
- Descriptive alternative text.
- Reduced-motion support.

Technical:

- Lint, type checking, build, and link checks pass.
- Images are right-sized/compressed.
- No secrets/private data in repository or client bundle.
- Strong Lighthouse results; remaining issues are documented.
- Sitemap, robots, canonicals, redirects, and metadata are verified in production.

## Definition of done

Phase 1 is complete only when:

- A documented legacy inventory exists for both sites.
- Every current page/content item has a migration disposition.
- Both sites are deployed to Railway preview environments.
- Brent approves both sites.
- Required business facts and form recipients are confirmed.
- Production services, domains, SSL, redirects, forms, and monitoring work.
- Email was not disrupted by DNS changes.
- Old sites are archived with a rollback path.
- Repository and deployment instructions are current.
- Remaining ideas are captured in a Phase 2 list rather than delaying Phase 1.

## Inputs needed from Brent or Cindy

- Domain ownership and registrar/DNS access.
- Best logo files and original photography.
- Confirmation of Tri-Power hours, accepted materials, plastics policy, service area, and contact routing.
- Confirmation of She Pallets contacts, quote recipients, service area, and certifications/heat-treatment claims.
- Approval to reuse current copy and imagery during migration.
- Search Console, analytics, business profiles, and form inboxes where available.

## Initial Codex milestone

1. Read this specification and root `AGENTS.md`.
2. Audit the existing Got Foam code and preserve its working build.
3. Crawl and archive both live sites, including routes, metadata, forms, assets, files, and outbound links.
4. Create `docs/migration/legacy-inventory.md` with a row for every URL.
5. Establish a multi-site structure without mixing in BulkBid.
6. Scaffold Tri-Power and She Pallets with shared quality tooling.
7. Implement the global shell and home page for each brand using migrated content and a modern responsive design.
8. Add preview-safe placeholder form wiring and document production environment variables.
9. Add/run lint, type-check, build, and link-check commands.
10. Update the draft PR with screenshots, crawl findings, unresolved business questions, test results, and the next milestone.

### Guardrails

- Do not change DNS or touch live hosting.
- Do not deploy a production domain.
- Do not delete the Got Foam prototype.
- Do not put BulkBid code in this repository.
- Do not invent business facts.
- Do not remove legacy content without recording its disposition.
- Do not commit secrets.
- Prefer a complete reviewable milestone over a sprawling partial rewrite.

## Phase 2 parking lot

After launch, consider better quote/intake flows, material-acceptance guidance, pallet filtering, pickup scheduling, CRM/email routing, capability sheets, case studies, BulkBid integrations, AI-assisted inquiries, and local SEO. None should delay the Phase 1 finish line.
