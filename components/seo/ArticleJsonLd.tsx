const SITE_URL = 'https://www.onnicosmetics.com'

export default function ArticleJsonLd({
  url,
  title,
  image,
  description,
  datePublished,
  authorName,
}: {
  url: string
  title: string
  image: string
  description: string
  datePublished: string
  authorName?: string
}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image: [image],
    author: {
      '@type': 'Person',
      name: authorName || 'Equipo ONNI',
    },
    publisher: {
      '@type': 'Organization',
      name: 'ONNI Cosmetics',
      url: SITE_URL,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    datePublished,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

