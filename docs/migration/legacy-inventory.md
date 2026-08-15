# Legacy website inventory and disposition ledger

Captured August 14, 2026 and rechecked August 15, 2026. Raw HTML, robots files, sitemaps, and screenshots are stored under `docs/migration/`. The live sites were treated as read-only and no forms were submitted.

Disposition terms:

- **Migrated:** substantive public content now has a focused replacement route.
- **Redirected:** the legacy URL returns a permanent redirect to the listed replacement.
- **Confirmation flag:** the route is complete, but identified business facts must be approved before production launch.

## Tri-Power Recycling

| Legacy URL | Replacement | Disposition and evidence |
|---|---|---|
| `/` | `/` | Migrated: overview, current plastics notice, material paths, commercial service, equipment, location, phone, and inquiry path. |
| `/index.cfm` | `/` | Redirected permanently to the migrated home page. |
| `/recycling-services.cfm` | `/services` | Migrated and permanently redirected: current material overview and links to focused streams. |
| `/services/cardboard-recycling-disposal.cfm` | `/services/cardboard` | Migrated and permanently redirected: loose/baled cardboard, pickup/loading models, collection equipment, and audit context. Fee/payment and current-acceptance details carry a confirmation flag. |
| `/services/paper-recycling.cfm` | `/services/paper` | Migrated and permanently redirected: archived office paper, books/publications, cores/fiber, and commercial-quantity context. Exact current list carries a confirmation flag. |
| `/services/plastic-recycling.cfm` | `/services/plastics` | Migrated and permanently redirected to a focused status page. Conflicting older “plastics 1–7” claims are explicitly retired; the newer public “EPS only” notice is used. Current plastics policy carries a confirmation flag. |
| `/services/styrofoam-recycling.cfm` | `/services/eps-foam` | Migrated and permanently redirected: EPS identification, sorting, densification, packaging-peanut exclusion, and commercial-stream context. Exact accepted forms carry a confirmation flag. |
| `/recycle-styrofoam.cfm` | `/home-4-foam` | Migrated and permanently redirected: distinct mail-in program, material confirmation, shipping-instruction, and commercial-volume guidance. Program activity/fees carry a confirmation flag. |
| `/commercial-recycling.cfm` | `/commercial-recycling` | Migrated and permanently redirected: audit, collection planning, pickup, and equipment support. Service area, minimums, pricing, and schedules carry confirmation flags. |
| `/recycling-equipment-for-sale.cfm` | `/recycling-equipment` | Migrated and permanently redirected: vertical/horizontal balers, compactors, and purchase/lease arrangements. Inventory and terms carry confirmation flags. |
| `/about-tri-power-recycling.cfm` | `/about` | Migrated and permanently redirected: family-business and material-recovery story. Unverified national-scale superlatives remain only in the archive. |
| `/location.cfm` | `/location` | Migrated and permanently redirected: 1240 Anderson Street, Elkhart, IN 46514 and 574-848-1900. Hours/Saturday availability carry confirmation flags and are not guessed. |
| `/contact-us.cfm` | `/contact` | Migrated and permanently redirected: server-validated preview-safe inquiry flow and office phone. Production recipients carry a confirmation flag. |
| `/terms-conditions-privacy-policy.cfm` | `/privacy` | Migrated and permanently redirected: policy topics and the May 3, 2022 legacy date are preserved; production processors, retention, analytics, and legal approval carry confirmation flags. |

### Tri-Power confirmation flags

- Public drop-off hours and Saturday availability.
- Exact residential and commercial accepted-material lists.
- Current plastics policy beyond the public “EPS only” notice.
- Service area, pickup minimums, fees, commodity payments, equipment availability, and Home 4 Foam status/terms.
- Correct recipients for general, sales, hauling, equipment, and service inquiries.
- Final legal/privacy language after hosting, lead delivery, analytics, and retention are approved.

## She Pallets

| Legacy URL | Replacement | Disposition and evidence |
|---|---|---|
| `/` | `/` | Migrated in place: company relationship/story, four service paths, address, office phone, quote path, and brand imagery. |
| `/services` | `/services` | Migrated in place: dedicated overview linking new, recycled, heat-treated, and custom pallet routes. |
| `/new-pallets` | `/new-pallets` | Migrated in place: quality/durability, hygiene, customization, and long-term-value topics. |
| `/heat-treated-pallets` | `/heat-treated-pallets` | Migrated in place: ISPM 15 context, pest control, shipment compliance, and heat-process context. Specific certification/marking claims carry a confirmation flag. |
| `/custom-pallets` | `/custom-pallets` | Migrated in place: storage fit, load protection, handling, unusual sizes, crates, lumber mix, and treatment needs. |
| `/recycled-pallets` | `/recycled-pallets` | Migrated in place: reuse, cost-conscious supply, adaptable stock, and scrap recovery. Pickup/drop-off/payment availability carries a confirmation flag. |
| `/about-us` | `/about-us` | Migrated in place: founded in 2022, woman- and family-owned, sister-company relationship, and full product-code guide. Indiana/Illinois/Michigan service area carries a confirmation flag. |
| `/preview-pallets` | `/preview-pallets` | Migrated in place: six frequently requested sizes point to their original Onshape destinations and the complete list. |
| `/pallet-list` | `/pallet-list` | Migrated in place: all 52 unique sizes, option text, and 52 original Onshape destinations are represented as explicit size/link pairs. Automated comparison checks exact link order/content against the archived HTML. |
| `/contact-location` | `/contact-location` | Migrated in place: address, office phone, public sales email, and server-validated preview-safe quote form. Named contacts and production routing carry confirmation flags. |

### She Pallets confirmation flags

- Production quote recipients and whether named public contacts remain current.
- Current service area and delivery claims.
- Heat-treatment certification, marks, and exact export claims.
- Current scrap-pallet pickup, drop-off, payment, and availability terms.
- Approval to use migrated website imagery or replacement source photography.

## Pallet catalog completeness

The replacement data source contains these 52 unique sizes in legacy order, each paired with the corresponding archived Onshape URL:

`18x36`, `32x32`, `30x30`, `32x40`, `30x90`, `34x43`, `34x65`, `40x40`, `36x36`, `40x45`, `36x42`, `42x36`, `42x42`, `44x42`, `43x43`, `44x44`, `44x34`, `44x68`, `45x45`, `48x40`, `46x37`, `48x45`, `47x40`, `48x48`, `50x42`, `51x44`, `50x44`, `55x44`, `51x42`, `57x48`, `57x57`, `60x70`, `60x42`, `61x61`, `60x48`, `62x62`, `64x44`, `72x40`, `68x88`, `72x45`, `72x34`, `72x48`, `88x72`, `96x48`, `90x51`, `96x60`, `96x45`, `102x46`, `102x48`, `144x45`, `110x48`, `120x48`.

`npm run link-check` fails if the size count/uniqueness changes, if the CAD count/uniqueness changes, or if the 52 source CAD URLs differ from the archived list.
