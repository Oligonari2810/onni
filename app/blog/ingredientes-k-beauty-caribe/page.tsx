import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import ArticleJsonLd from '@/components/seo/ArticleJsonLd'

const SITE_URL = 'https://www.onnicosmetics.com'

export const generateMetadata = async (): Promise<Metadata> => {
  const title = 'Ingredientes K‑Beauty que funcionan en el Caribe'
  const description = 'Lista de ingredientes (niacinamida, centella, AHA leves) que mejor funcionan en pieles expuestas a calor y humedad.'
  const url = `${SITE_URL}/blog/ingredientes-k-beauty-caribe`

  return { title, description, alternates: { canonical: url }, openGraph: { title, description, url, siteName: 'ONNI Cosmetics', images: [{ url: '/og-image.svg' }] } }
}

export default function IngredientsKBeauty() {
  const url = `${SITE_URL}/blog/ingredientes-k-beauty-caribe`
  return (
    <>
      <ArticleJsonLd
        url={url}
        title="Ingredientes K‑Beauty que funcionan en el Caribe"
        image={`${SITE_URL}/og-image.svg`}
        description="Lista de ingredientes (niacinamida, centella, AHA leves) que mejor funcionan en pieles expuestas a calor y humedad."
        datePublished="2026-06-19"
      />
      <Navbar />
      <main style={{ padding: 40, maxWidth: 900, margin: '0 auto' }}>
        <h1>Ingredientes K‑Beauty que funcionan en el Caribe</h1>
        <p>Recomendaciones de activos y por qué elegirlos en clima tropical.</p>
        <p>Relacionados: <Link href="/blog/rutina-k-beauty-humedad">rutina K‑Beauty para clima húmedo</Link>.</p>
      </main>
    </>
  )
}

