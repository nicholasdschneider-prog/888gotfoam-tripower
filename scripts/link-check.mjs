import { existsSync, readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'

const apps = ['apps/tri-power', 'apps/she-pallets']
const errors = []

for (const app of apps) {
  const sourcePath = resolve(app, 'src/App.tsx')
  const source = readFileSync(sourcePath, 'utf8')
  const ids = new Set([...source.matchAll(/id="([^"]+)"/g)].map(match => match[1]))
  for (const match of source.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const target = match[1]
    if (target.startsWith('#') && !ids.has(target.slice(1))) errors.push(`${app}: missing anchor ${target}`)
    if (target.startsWith('/images/') && !existsSync(resolve(app, 'public', target.slice(1)))) errors.push(`${app}: missing asset ${target}`)
  }
  if (!existsSync(resolve(dirname(sourcePath), 'styles.css'))) errors.push(`${app}: missing stylesheet`)
}

if (errors.length) {
  console.error(errors.join('\n'))
  process.exit(1)
}
console.log(`Checked internal anchors and public assets for ${apps.length} sites.`)
