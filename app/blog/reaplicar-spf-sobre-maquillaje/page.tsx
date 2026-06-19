import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import ArticleJsonLd from '@/components/seo/ArticleJsonLd'

const SITE_URL = 'https://www.onnicosmetics.com'

export const generateMetadata = async (): Promise<Metadata> => {
  const title = 'Cómo reaplicar protector solar sobre maquillaje sin arruinarlo'
  const description = 'Técnicas y productos para reaplicar SPF durante el día sin comprometer tu maquillaje.'
  const url = `${SITE_URL}/blog/reaplicar-spf-sobre-maquillaje`

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: 'ONNI Cosmetics', images: [{ url: '/og-image.svg' }] },
  }
}

export default function ReapplySPF() {
  const url = `${SITE_URL}/blog/reaplicar-spf-sobre-maquillaje`
  return (
    <>
      <ArticleJsonLd
        url={url}
        title="Cómo reaplicar protector solar sobre maquillaje sin arruinarlo"
        image={`${SITE_URL}/og-image.svg`}
        description="Técnicas y productos para reaplicar SPF durante el día sin comprometer tu maquillaje."
        datePublished="2026-06-19"
      />
      <Navbar />
      <main style={{ padding: 40, maxWidth: 900, margin: '0 auto' }}>
        <h1>Cómo reaplicar protector solar sobre maquillaje sin arruinarlo</h1>
        <p>Consejos prácticos: polvos SPF, sprays y aplicaciones puntuales.</p>
        <p>Ver guía completa sobre <Link href="/blog/mejor-protector-solar-clima-tropical">protectores solares</Link>.</p>
      </main>
    </>
  )
}

