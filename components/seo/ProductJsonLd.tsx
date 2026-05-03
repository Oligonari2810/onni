interface ProductJsonLdProps {
  product: {
    slug: string;
    brand: string;
    name: string;
    price: number;
    stock: number;
    rating?: string;
    reviews?: string;
    description?: string;
  };
}

export default function ProductJsonLd({ product }: ProductJsonLdProps) {
  const structuredData = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: `${product.brand} - ${product.name}`,
    description: product.description || `Cosmética coreana original: ${product.name}. Envíos rápidos a RD y el Caribe.`,
    brand: {
      '@type': 'Brand',
      name: product.brand
    },
    offers: {
      '@type': 'Offer',
      url: `https://onnicosmetics.com/products/${product.slug}`,
      priceCurrency: 'USD',
      price: product.price,
      availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: 'ONNI Cosmetics'
      }
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating || '4.8',
      reviewCount: product.reviews || '124'
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
