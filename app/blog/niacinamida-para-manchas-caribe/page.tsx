import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import ArticleJsonLd from '@/components/seo/ArticleJsonLd'

const SITE_URL = 'https://www.onnicosmetics.com'

export const generateMetadata = async (): Promise<Metadata> => {
  const title = 'Niacinamida para manchas en piel tropical: guía práctica'
  const description = 'Cómo usar niacinamida para reducir hiperpigmentación en climas tropicales y qué combinaciones funcionan mejor.'
  const url = `${SITE_URL}/blog/niacinamida-para-manchas-caribe`

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: 'ONNI Cosmetics', images: [{ url: '/og-image.svg' }] },
  }
}

export default function NiacinamideSpots() {
  const url = `${SITE_URL}/blog/niacinamida-para-manchas-caribe`
  return (
    <>
      <ArticleJsonLd
        url={url}
        title="Niacinamida para manchas en piel tropical: guía práctica"
        image={`${SITE_URL}/og-image.svg`}
        description="Cómo usar niacinamida para reducir hiperpigmentación en climas tropicales y qué combinaciones funcionan mejor."
        datePublished="2026-06-19"
      />
      <Navbar />
      <main style={{ padding: 40, maxWidth: 900, margin: '0 auto' }}>
        <h1>Niacinamida para manchas en piel tropical: guía práctica</h1>
        <p>Explicamos dosis, combinaciones y cómo usarla junto a SPF para mejores resultados.</p>
        <p>Relacionados: <Link href="/blog/tratamientos-hiperpigmentacion-tropical">tratamientos para hiperpigmentación</Link>.</p>
      </main>
    </>
  )
}

