import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import ArticleJsonLd from '@/components/seo/ArticleJsonLd'

const SITE_URL = 'https://www.onnicosmetics.com'

export const generateMetadata = async (): Promise<Metadata> => {
  const title = 'El mejor protector solar para clima tropical: guía definitiva'
  const description = 'Cómo elegir y usar protector solar en el Caribe: filtros, texturas y reaplicación para máxima protección sin sensación grasa.'
  const url = `${SITE_URL}/blog/mejor-protector-solar-clima-tropical`

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: 'ONNI Cosmetics',
      images: [
        {
          url: '/og-image.svg',
          alt: 'Protector solar ONNI',
        },
      ],
    },
  }
}

export default function SunscreenGuide() {
  const url = `${SITE_URL}/blog/mejor-protector-solar-clima-tropical`
  return (
    <>
      <ArticleJsonLd
        url={url}
        title="El mejor protector solar para clima tropical: guía definitiva"
        image={`${SITE_URL}/og-image.svg`}
        description="Cómo elegir y usar protector solar en el Caribe: filtros, texturas y reaplicación para máxima protección sin sensación grasa."
        datePublished="2026-06-19"
      />
      <Navbar />
      <main style={{ padding: '40px', maxWidth: 900, margin: '0 auto' }}>
        <h1>El mejor protector solar para clima tropical: guía definitiva</h1>
        <p>Elegir un protector solar que funcione en alta humedad y radiación es clave. Aquí te explicamos qué buscar y cómo usarlo.</p>

        <h2>Tipos de filtros</h2>
        <p>Explicación breve sobre físico vs químico.</p>

        <h2>Texturas recomendadas</h2>
        <p>Preferir geles y emulsiones ligeras para el Caribe.</p>

        <h2>Reaplicación y maquillaje</h2>
        <p>Cómo reaplicar sin arruinar tu base — mira también nuestro artículo sobre <Link href="/blog/reaplicar-spf-sobre-maquillaje">reaplicar SPF sobre maquillaje</Link>.</p>

        <h2>Productos recomendados</h2>
        <p>Enlace a <Link href="/products">productos</Link> y a nuestra selección en la tienda.</p>
      </main>
    </>
  )
}

