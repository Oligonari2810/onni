import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { globSync } from 'node:fs'

const files = globSync('**/*.{ts,tsx,js,jsx,md}', {
  exclude: ['node_modules/**', '.next/**'],
})

const assetPattern = /["'`]((?:\/images\/|\/og-image|\/icon\.svg)[^"'`\s)]*)["'`]/g
const missing = new Map()

for (const file of files) {
  const source = readFileSync(file, 'utf8')
  for (const match of source.matchAll(assetPattern)) {
    const lineStart = source.lastIndexOf('\n', match.index) + 1
    const lineEnd = source.indexOf('\n', match.index)
    const line = source.slice(lineStart, lineEnd === -1 ? source.length : lineEnd)
    if (line.includes('.replace(')) continue

    const assetPath = match[1]
    const cleanPath = assetPath.split('?')[0]
    const publicPath = join('public', cleanPath)

    if (!existsSync(publicPath)) {
      if (!missing.has(cleanPath)) missing.set(cleanPath, [])
      missing.get(cleanPath).push(file)
    }
  }
}

if (missing.size > 0) {
  console.error('Missing public assets referenced by source files:')
  for (const [asset, refs] of missing.entries()) {
    console.error(`- ${asset}`)
    for (const ref of refs) console.error(`  referenced in ${ref}`)
  }
  process.exit(1)
}

console.log(`Validated public asset references in ${files.length} files.`)
