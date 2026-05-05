import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const productsSource = readFileSync('lib/products.ts', 'utf8')
const bundlesSource = readFileSync('lib/bundles.ts', 'utf8')

const productBlocks = [...productsSource.matchAll(/\{\s*id:\s*"([^"]+)"[\s\S]*?skinTypes:\s*\[([^\]]*)\][\s\S]*?\}/g)]
const products = productBlocks.map((match) => {
  const block = match[0]
  const readString = (key) => block.match(new RegExp(`${key}:\\s*"([^"]+)"`))?.[1]
  const readNumber = (key) => Number(block.match(new RegExp(`${key}:\\s*([0-9.]+)`))?.[1])

  return {
    id: match[1],
    slug: readString('slug'),
    name: readString('name'),
    image: readString('image'),
    price: readNumber('price'),
    msrp: readNumber('msrp'),
    cost: readNumber('cost'),
    stock: readNumber('stock'),
  }
})

const failures = []
const seenIds = new Set()
const seenSlugs = new Set()

if (products.length === 0) failures.push('No products found in lib/products.ts')

for (const product of products) {
  if (!product.id) failures.push(`Product without id: ${product.name || 'unknown'}`)
  if (seenIds.has(product.id)) failures.push(`Duplicate product id: ${product.id}`)
  seenIds.add(product.id)

  if (!product.slug) failures.push(`Product ${product.id} is missing slug`)
  if (seenSlugs.has(product.slug)) failures.push(`Duplicate product slug: ${product.slug}`)
  seenSlugs.add(product.slug)

  if (!product.name) failures.push(`Product ${product.id} is missing name`)
  if (!Number.isFinite(product.price) || product.price <= 0) failures.push(`Product ${product.id} has invalid price`)
  if (!Number.isFinite(product.stock) || product.stock < 0) failures.push(`Product ${product.id} has invalid stock`)
  if (!product.image) failures.push(`Product ${product.id} is missing image`)
  if (product.image && !existsSync(join('public', product.image))) failures.push(`Product ${product.id} image does not exist: ${product.image}`)
}

const bundleBlocks = [...bundlesSource.matchAll(/\{\s*id:\s*'([^']+)'[\s\S]*?productIds:\s*\[([^\]]+)\][\s\S]*?\}/g)]
if (bundleBlocks.length === 0) failures.push('No bundles found in lib/bundles.ts')

for (const match of bundleBlocks) {
  const bundleId = match[1]
  const productIds = [...match[2].matchAll(/'([^']+)'/g)].map((idMatch) => idMatch[1])
  if (productIds.length === 0) failures.push(`Bundle ${bundleId} has no productIds`)

  for (const productId of productIds) {
    if (!seenIds.has(productId)) failures.push(`Bundle ${bundleId} references unknown product id: ${productId}`)
  }
}

if (failures.length > 0) {
  console.error('Catalog validation failed:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(`Validated ${products.length} products and ${bundleBlocks.length} bundles.`)
