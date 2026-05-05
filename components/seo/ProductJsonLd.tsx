import type { Product } from '@/lib/products'

const SITE_URL = 'https://www.onnicosmetics.com'

export default function ProductJsonLd({ product }: { product: Product }) {
  const productUrl = `${SITE_URL}/products/${product.slug}`
  const imageUrl = product.image.startsWith('http') ? product.image : `${SITE_URL}${product.image}`

  const structuredData = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.name,
    image: [imageUrl],
    description: product.description,
    sku: product.id,
    category: product.category,
    brand: {
      '@type': 'Brand',
      name: product.brand,
    },
    offers: {
      '@type': 'Offer',
      url: productUrl,
      priceCurrency: 'USD',
      price: product.price.toFixed(2),
      availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: 'ONNI Cosmetics',
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '124',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
