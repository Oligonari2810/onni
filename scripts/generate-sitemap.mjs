import { writeFileSync } from 'node:fs'
import { products } from '../lib/products.ts'

const SITE_URL = 'https://www.onnicosmetics.com'
const lastmod = new Date().toISOString().split('T')[0]

const staticRoutes = [
  { loc: '/', changefreq: 'weekly', priority: '1.0' },
  { loc: '/products', changefreq: 'weekly', priority: '0.9' },
  { loc: '/blog', changefreq: 'weekly', priority: '0.7' },
  { loc: '/blog/rutina-coreana-piel-tropical', changefreq: 'monthly', priority: '0.6' },
  { loc: '/blog/protector-solar-clima-tropical', changefreq: 'monthly', priority: '0.6' },
  { loc: '/blog/niacinamida-que-es-para-que-sirve', changefreq: 'monthly', priority: '0.6' },
  { loc: '/shipping', changefreq: 'yearly', priority: '0.3' },
  { loc: '/terms', changefreq: 'yearly', priority: '0.3' },
  { loc: '/privacy', changefreq: 'yearly', priority: '0.3' },
]

const productRoutes = products.map((product) => ({
  loc: `/products/${product.slug}`,
  changefreq: 'weekly',
  priority: '0.8',
}))

const routes = [...staticRoutes, ...productRoutes]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((route) => `  <url>
    <loc>${SITE_URL}${route.loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n')}
</urlset>
`

writeFileSync('public/sitemap.xml', xml)
console.log(`Generated public/sitemap.xml with ${routes.length} URLs.`)
