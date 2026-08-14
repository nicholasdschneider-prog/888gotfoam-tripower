# Legacy website inventory

Captured August 14, 2026. Raw HTML, robots files, and sitemaps are stored under `docs/migration/archive/`. The live sites were treated as read-only and no forms were submitted.

## Tri-Power Recycling

| Legacy URL | Evidence | Phase 1 disposition |
|---|---|---|
| `/` and `/index.cfm` | Home copy, materials notice, commercial service, equipment, location | Migrated into the new home-page foundation; retain `/index.cfm` redirect |
| `/recycling-services.cfm` | Service overview | Pending service-page milestone; redirect to `/services` |
| `/services/cardboard-recycling-disposal.cfm` | Cardboard details | Pending service-page milestone; redirect to `/services/cardboard` |
| `/services/paper-recycling.cfm` | Paper and fiber details | Pending service-page milestone; redirect to `/services/paper` |
| `/services/plastic-recycling.cfm` | Legacy plastics copy conflicts with the current sitewide “EPS only” plastics notice | Pending Brent confirmation; do not publish the old claim as current fact |
| `/services/styrofoam-recycling.cfm` | EPS foam details | Pending service-page milestone; redirect to `/services/eps-foam` |
| `/recycle-styrofoam.cfm` | Home 4 Foam shipping program | Preserve as a distinct future page and redirect target |
| `/commercial-recycling.cfm` | Pickup, audit, equipment, and commercial program copy | Pending commercial-page milestone |
| `/recycling-equipment-for-sale.cfm` | Baler and compactor options | Pending equipment-page milestone |
| `/about-tri-power-recycling.cfm` | Company and family story | Pending about-page milestone |
| `/location.cfm` | 1240 Anderson Street, Elkhart, IN 46514; 574-848-1900 | Migrated into the home-page contact section; hours remain unconfirmed |
| `/contact-us.cfm` | Contact form and office contact | Replaced by preview-safe inquiry form; production recipients remain unconfirmed |
| `/terms-conditions-privacy-policy.cfm` | Terms and privacy copy | Pending legal-content review and migration |

### Tri-Power conflicts requiring confirmation

- The live banner says plastics are not currently accepted except EPS foam, while older page metadata and body copy still advertise plastics broadly.
- Public drop-off hours, Saturday availability, accepted residential materials, service area, and inquiry recipients require confirmation.

## She Pallets

| Legacy URL | Evidence | Phase 1 disposition |
|---|---|---|
| `/` | Brand overview, sister-company relationship, services, address and contacts | Migrated into the new home-page foundation |
| `/services` | New, recycled, heat-treated, and custom service categories | Merged into home-page service cards; dedicated page pending |
| `/new-pallets` | Benefits and customization copy | Pending product-page milestone |
| `/heat-treated-pallets` | ISPM 15 and heat-treatment claims | Pending business/certification confirmation before migration |
| `/custom-pallets` | Custom sizing and logistics copy | Merged into home-page custom capability; detailed page pending |
| `/recycled-pallets` | Recycled pallets and scrap-pallet pickup/drop-off claim | Pending confirmation before detailed migration |
| `/about-us` | Founded in 2022; woman- and family-owned; Indiana, Illinois, and Michigan service statement; product-code guide | Pending about-page milestone; regional statement requires confirmation |
| `/preview-pallets` | Six frequently requested CAD previews | Preserve as a dedicated catalog entry point |
| `/pallet-list` | 52 unique sizes and 52 unique Onshape models captured in the browser snapshot | High-risk row-by-row catalog migration pending; no item may be omitted |
| `/contact-location` | 1240 Anderson Street; office and named phone contacts; two public email addresses | Migrated into home-page contact section; quote recipient requires confirmation |

## Captured pallet sizes

`18x36`, `32x32`, `30x30`, `32x40`, `30x90`, `34x43`, `34x65`, `40x40`, `36x36`, `40x45`, `36x42`, `42x36`, `42x42`, `44x42`, `43x43`, `44x44`, `44x34`, `44x68`, `45x45`, `48x40`, `46x37`, `48x45`, `47x40`, `48x48`, `50x42`, `51x44`, `50x44`, `55x44`, `51x42`, `57x48`, `57x57`, `60x70`, `60x42`, `61x61`, `60x48`, `62x62`, `64x44`, `72x40`, `68x88`, `72x45`, `72x34`, `72x48`, `88x72`, `96x48`, `90x51`, `96x60`, `96x45`, `102x46`, `102x48`, `144x45`, `110x48`, `120x48`.

The matching Onshape destinations are preserved in the archived `pallet-list.html` and the Playwright accessibility snapshot. A structured size-to-link catalog should be produced during the pallet-list milestone and checked against all 52 pairs.
