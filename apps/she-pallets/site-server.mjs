import { createReadStream, existsSync, readFileSync } from 'node:fs'
import { extname, join, normalize, relative, resolve } from 'node:path'
import { createServer } from 'node:http'

const root = resolve(process.argv[2] || 'dist')
const port = Number(process.env.PORT || 4173)
const siteName = process.env.SITE_NAME || 'She Pallets'
const types = { '.css': 'text/css', '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml', '.txt': 'text/plain', '.xml': 'application/xml', '.webp': 'image/webp', '.woff2': 'font/woff2' }

const pages = {
  '/': ['She Pallets | Built for the way you move', 'New, recycled, heat-treated, and custom pallet solutions from Elkhart, Indiana.'],
  '/services': ['Pallet Services | She Pallets', 'Explore new, recycled, heat-treated, and custom pallet options from She Pallets.'],
  '/new-pallets': ['New Pallets | She Pallets', 'New wood pallet options with repeatable construction and custom sizing.'],
  '/heat-treated-pallets': ['Heat-Treated Pallets | She Pallets', 'Discuss heat-treated wood pallet requirements for international shipping.'],
  '/custom-pallets': ['Custom Pallets | She Pallets', 'Custom wood pallets sized and configured for specialized products and handling.'],
  '/recycled-pallets': ['Recycled Pallets | She Pallets', 'Recycled and remanufactured pallet options from She Pallets.'],
  '/about-us': ['About She Pallets | Elkhart, Indiana', 'Meet the woman- and family-owned pallet company founded in Elkhart in 2022.'],
  '/preview-pallets': ['Preview Pallet Designs | She Pallets', 'Open CAD previews for frequently requested She Pallets sizes.'],
  '/pallet-list': ['Pallet Size & CAD List | She Pallets', 'Browse 52 documented pallet sizes and their original Onshape CAD previews.'],
  '/contact-location': ['Contact & Location | She Pallets', 'Contact She Pallets in Elkhart, Indiana, or request a pallet quote.'],
}

function sendJson(res, status, body) {
  res.writeHead(status, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' })
  res.end(JSON.stringify(body))
}

async function readJson(req) {
  let body = ''
  for await (const chunk of req) {
    body += chunk
    if (body.length > 32_000) throw new Error('Request too large')
  }
  return JSON.parse(body || '{}')
}

function clean(value, max) { return typeof value === 'string' ? value.trim().slice(0, max) : '' }

function pageHtml(pathname) {
  const [title, description] = pages[pathname] || ['Page not found | She Pallets', 'The requested She Pallets page could not be found.']
  return readFileSync(join(root, 'index.html'), 'utf8')
    .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/?>(?=)/, `<meta name="description" content="${description}"/>`)
    .replace(/<meta property="og:title" content="[^"]*"\s*\/?>(?=)/, `<meta property="og:title" content="${title}"/>`)
    .replace(/<meta property="og:description" content="[^"]*"\s*\/?>(?=)/, `<meta property="og:description" content="${description}"/>`)
    .replace(/<link rel="canonical" href="[^"]*"\s*\/?>(?=)/, `<link rel="canonical" href="https://www.shepallets.com${pathname === '/' ? '' : pathname}"/>`)
}

createServer(async (req, res) => {
  const url = new URL(req.url || '/', 'http://localhost')
  const pathname = url.pathname.length > 1 ? url.pathname.replace(/\/$/, '') : '/'
  if (req.method === 'GET' && pathname === '/health') return sendJson(res, 200, { ok: true, site: siteName })
  if ((req.method === 'GET' || req.method === 'HEAD') && url.pathname.length > 1 && url.pathname.endsWith('/')) {
    res.writeHead(308, { location: `${pathname}${url.search}`, 'cache-control': 'public, max-age=3600' }); return res.end()
  }

  if (req.method === 'POST' && pathname === '/api/inquiry') {
    try {
      const raw = await readJson(req)
      if (raw.website) return sendJson(res, 200, { ok: true })
      const input = { name: clean(raw.name, 120), company: clean(raw.company, 160), email: clean(raw.email, 254), phone: clean(raw.phone, 40), palletSize: clean(raw.palletSize, 80), quantity: clean(raw.quantity, 80), palletType: clean(raw.palletType, 80), message: clean(raw.message, 5000) }
      if (!input.name || !input.email || !input.message || !/^\S+@\S+\.\S+$/.test(input.email)) return sendJson(res, 400, { error: 'Please provide a name, valid email, and message.' })
      if (!process.env.LEAD_WEBHOOK_URL) return sendJson(res, 200, { ok: false, preview: true, error: 'Preview mode: inquiry delivery will be connected after recipients are confirmed.' })
      const headers = { 'content-type': 'application/json' }
      if (process.env.LEAD_WEBHOOK_TOKEN) headers.authorization = `Bearer ${process.env.LEAD_WEBHOOK_TOKEN}`
      const response = await fetch(process.env.LEAD_WEBHOOK_URL, { method: 'POST', headers, body: JSON.stringify({ site: siteName, ...input, receivedAt: new Date().toISOString() }) })
      if (!response.ok) throw new Error('Lead delivery failed')
      return sendJson(res, 200, { ok: true })
    } catch { return sendJson(res, 400, { error: 'We could not send that inquiry. Please call the office instead.' }) }
  }

  if (req.method !== 'GET' && req.method !== 'HEAD') return sendJson(res, 405, { error: 'Method not allowed' })
  const candidate = normalize(join(root, pathname))
  const safe = !relative(root, candidate).startsWith('..')
  if (safe && existsSync(candidate) && extname(candidate)) {
    res.writeHead(200, { 'content-type': types[extname(candidate)] || 'application/octet-stream' })
    if (req.method === 'HEAD') return res.end()
    return createReadStream(candidate).pipe(res)
  }
  const status = pages[pathname] ? 200 : 404
  res.writeHead(status, { 'content-type': 'text/html; charset=utf-8' })
  if (req.method === 'HEAD') return res.end()
  res.end(pageHtml(pathname))
}).listen(port, '0.0.0.0', () => console.log(`${siteName} listening on ${port}`))
