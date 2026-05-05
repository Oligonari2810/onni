import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import ProductJsonLd from '@/components/seo/ProductJsonLd'
import ProductDetailView from './ProductDetailView'
import { getProductBySlug, products } from '@/lib/products'

const SITE_URL = 'https://www.onnicosmetics.com'

type ProductPageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }))
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (!product) {
    return {
      title: 'Producto no encontrado | ONNI Cosmetics',
      robots: { index: false, follow: false },
    }
  }

  const title = `${product.name} | ${product.brand} | ONNI Cosmetics`
  const description = `${product.benefits}. ${product.description}`
  const productUrl = `${SITE_URL}/products/${product.slug}`
  const imageUrl = product.image.startsWith('http') ? product.image : `${SITE_URL}${product.image}`

  return {
    title,
    description,
    alternates: {
      canonical: productUrl,
    },
    openGraph: {
      title,
      description,
      url: productUrl,
      type: 'website',
      siteName: 'ONNI Cosmetics',
      images: [
        {
          url: imageUrl,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (!product) {
    return (
      <>
        <Navbar />
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--cream)' }}>
          <p>Producto no encontrado</p>
        </div>
      </>
    )
  }

  return (
    <>
      <ProductJsonLd product={product} />
      <Navbar />
      <ProductDetailView product={product} />
    </>
  )
}
