import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import ArticleJsonLd from '@/components/seo/ArticleJsonLd'

const SITE_URL = 'https://www.onnicosmetics.com'

export const generateMetadata = async (): Promise<Metadata> => {
  const title = 'Tratamientos para hiperpigmentación en clima tropical'
  const description = 'Opciones efectivas para tratar manchas en piel expuesta al sol: rutinas, peelings y tratamientos profesionales.'
  const url = `${SITE_URL}/blog/tratamientos-hiperpigmentacion-tropical`

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: 'ONNI Cosmetics', images: [{ url: '/og-image.svg' }] },
  }
}

export default function TreatmentsHyperpig() {
  const url = `${SITE_URL}/blog/tratamientos-hiperpigmentacion-tropical`
  return (
    <>
      <ArticleJsonLd
        url={url}
        title="Tratamientos para hiperpigmentación en clima tropical"
        image={`${SITE_URL}/og-image.svg`}
        description="Opciones efectivas para tratar manchas en piel expuesta al sol: rutinas, peelings y tratamientos profesionales."
        datePublished="2026-06-19"
      />
      <Navbar />
      <main style={{ padding: 40, maxWidth: 900, margin: '0 auto' }}>
        <h1>Tratamientos para hiperpigmentación en clima tropical</h1>
        <p>Comparativa de tratamientos y recomendaciones para el Caribe.</p>
        <p>Ver también: <Link href="/blog/niacinamida-para-manchas-caribe">niacinamida para manchas</Link>.</p>
      </main>
    </>
  )
}

