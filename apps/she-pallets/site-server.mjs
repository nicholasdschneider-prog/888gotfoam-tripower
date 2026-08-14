import { createReadStream, existsSync } from 'node:fs'
import { extname, join, normalize, resolve } from 'node:path'
import { createServer } from 'node:http'

const root = resolve(process.argv[2] || 'dist')
const port = Number(process.env.PORT || 4173)
const siteName = process.env.SITE_NAME || 'Website'
const types = { '.css': 'text/css', '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml', '.webp': 'image/webp' }

function sendJson(res, status, body) {
  res.writeHead(status, { 'content-type': 'application/json; charset=utf-8' })
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

createServer(async (req, res) => {
  if (req.method === 'GET' && req.url === '/health') return sendJson(res, 200, { ok: true, site: siteName })

  if (req.method === 'POST' && req.url === '/api/inquiry') {
    try {
      const input = await readJson(req)
      if (input.website) return sendJson(res, 200, { ok: true })
      if (!input.name || !input.email || !input.message || !/^\S+@\S+\.\S+$/.test(input.email)) {
        return sendJson(res, 400, { error: 'Please provide a name, valid email, and message.' })
      }
      if (!process.env.LEAD_WEBHOOK_URL) {
        return sendJson(res, 503, { error: 'Preview mode: inquiry delivery will be connected after recipients are confirmed.' })
      }
      const response = await fetch(process.env.LEAD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'content-type': 'application/json', authorization: process.env.LEAD_WEBHOOK_TOKEN ? `Bearer ${process.env.LEAD_WEBHOOK_TOKEN}` : '' },
        body: JSON.stringify({ site: siteName, ...input, receivedAt: new Date().toISOString() }),
      })
      if (!response.ok) throw new Error('Lead delivery failed')
      return sendJson(res, 200, { ok: true })
    } catch {
      return sendJson(res, 400, { error: 'We could not send that inquiry. Please call the office instead.' })
    }
  }

  if (req.method !== 'GET' && req.method !== 'HEAD') return sendJson(res, 405, { error: 'Method not allowed' })
  const requested = decodeURIComponent((req.url || '/').split('?')[0])
  const candidate = normalize(join(root, requested === '/' ? 'index.html' : requested))
  const file = candidate.startsWith(root) && existsSync(candidate) ? candidate : join(root, 'index.html')
  res.writeHead(200, { 'content-type': `${types[extname(file)] || 'application/octet-stream'}; charset=utf-8` })
  if (req.method === 'HEAD') return res.end()
  createReadStream(file).pipe(res)
}).listen(port, '0.0.0.0', () => console.log(`${siteName} listening on ${port}`))
