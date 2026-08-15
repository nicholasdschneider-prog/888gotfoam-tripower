import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const sites = {
  'apps/tri-power': ['/', '/services', '/services/cardboard', '/services/paper', '/services/plastics', '/services/eps-foam', '/home-4-foam', '/commercial-recycling', '/recycling-equipment', '/about', '/location', '/contact', '/privacy'],
  'apps/she-pallets': ['/', '/services', '/new-pallets', '/heat-treated-pallets', '/custom-pallets', '/recycled-pallets', '/about-us', '/preview-pallets', '/pallet-list', '/contact-location'],
}
const errors = []

for (const [app, routes] of Object.entries(sites)) {
  const source = readFileSync(resolve(app, 'src/App.tsx'), 'utf8')
  const server = readFileSync(resolve(app, 'site-server.mjs'), 'utf8')
  const sitemap = readFileSync(resolve(app, 'public/sitemap.xml'), 'utf8')
  for (const route of routes) {
    if (route !== '/' && !source.includes(`'${route}'`) && !source.includes(`"${route}"`)) errors.push(`${app}: route missing from UI ${route}`)
    if (!server.includes(`'${route}'`)) errors.push(`${app}: route missing from server ${route}`)
    if (route !== '/' && !sitemap.includes(`${route}</loc>`)) errors.push(`${app}: route missing from sitemap ${route}`)
  }
  for (const match of source.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const target = match[1]
    if (target.startsWith('/images/') && !existsSync(resolve(app, 'public', target.slice(1)))) errors.push(`${app}: missing asset ${target}`)
  }
  for (const file of ['robots.txt', 'sitemap.xml', 'og.png']) if (!existsSync(resolve(app, 'public', file))) errors.push(`${app}: missing public/${file}`)
  if (app.endsWith('she-pallets')) for (const font of ['fonts/dm-sans-latin.woff2', 'fonts/manrope-latin.woff2']) if (!existsSync(resolve(app, 'public', font))) errors.push(`${app}: missing public/${font}`)
}

const palletSource = readFileSync(resolve('apps/she-pallets/src/pallets.ts'), 'utf8')
const archivedPallets = readFileSync(resolve('docs/migration/archive/she-pallets/pallet-list.html'), 'utf8')
const sourceSizes = [...palletSource.matchAll(/'([0-9]{2,3}x[0-9]{2,3})'/g)].map((match) => match[1]).slice(0, 52)
const sourceUrls = [...palletSource.matchAll(/'(https:\/\/cad\.onshape\.com[^']+)'/g)].map((match) => match[1].replaceAll('&amp;', '&'))
const archiveUrls = [...archivedPallets.matchAll(/href="(https:\/\/cad\.onshape\.com[^"]+)"/g)].map((match) => match[1].replaceAll('&amp;', '&'))
if (sourceSizes.length !== 52 || new Set(sourceSizes).size !== 52) errors.push(`She Pallets: expected 52 unique pallet sizes; found ${sourceSizes.length}/${new Set(sourceSizes).size}`)
if (sourceUrls.length !== 52 || new Set(sourceUrls).size !== 52) errors.push(`She Pallets: expected 52 unique CAD links; found ${sourceUrls.length}/${new Set(sourceUrls).size}`)
if (JSON.stringify(sourceUrls) !== JSON.stringify(archiveUrls)) errors.push('She Pallets: source CAD link order/content differs from archived pallet list')

const triServer = readFileSync(resolve('apps/tri-power/site-server.mjs'), 'utf8')
for (const legacy of ['/index.cfm', '/recycling-services.cfm', '/services/cardboard-recycling-disposal.cfm', '/services/paper-recycling.cfm', '/services/plastic-recycling.cfm', '/services/styrofoam-recycling.cfm', '/recycle-styrofoam.cfm', '/commercial-recycling.cfm', '/recycling-equipment-for-sale.cfm', '/about-tri-power-recycling.cfm', '/location.cfm', '/contact-us.cfm', '/terms-conditions-privacy-policy.cfm']) {
  if (!triServer.includes(`'${legacy}'`)) errors.push(`Tri-Power: missing legacy redirect ${legacy}`)
}

if (errors.length) { console.error(errors.join('\n')); process.exit(1) }
console.log('Checked 23 canonical routes, 13 legacy redirects, public SEO files, local assets, and all 52 archived pallet CAD links.')
