import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import ArticleJsonLd from '@/components/seo/ArticleJsonLd'

const SITE_URL = 'https://www.onnicosmetics.com'

export const generateMetadata = async (): Promise<Metadata> => {
  const title = 'Rutina K‑Beauty para clima húmedo: 5 pasos esenciales'
  const description = 'Rutina matutina y nocturna K‑Beauty adaptada a alta humedad: texturas ligeras, capas y productos clave.'
  const url = `${SITE_URL}/blog/rutina-k-beauty-humedad`

  return { title, description, alternates: { canonical: url }, openGraph: { title, description, url, siteName: 'ONNI Cosmetics', images: [{ url: '/og-image.svg' }] } }
}

export default function KBeautyHumidity() {
  const url = `${SITE_URL}/blog/rutina-k-beauty-humedad`
  return (
    <>
      <ArticleJsonLd
        url={url}
        title="Rutina K‑Beauty para clima húmedo: 5 pasos esenciales"
        image={`${SITE_URL}/og-image.svg`}
        description="Rutina matutina y nocturna K‑Beauty adaptada a alta humedad: texturas ligeras, capas y productos clave."
        datePublished="2026-06-19"
      />
      <Navbar />
      <main style={{ padding: 40, maxWidth: 900, margin: '0 auto' }}>
        <h1>Rutina K‑Beauty para clima húmedo: 5 pasos esenciales</h1>
        <p>Consejos para adaptar la rutina coreana a la humedad del Caribe.</p>
        <p>Véase también: <Link href="/blog/ingredientes-k-beauty-caribe">ingredientes K‑Beauty para el Caribe</Link>.</p>
      </main>
    </>
  )
}

