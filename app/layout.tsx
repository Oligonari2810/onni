import type { Metadata } from 'next'
import './globals.css'
import { CartProvider } from '@/lib/useCart'
import AnalyticsProvider from '@/components/analytics/AnalyticsProvider'

// Force dynamic rendering to avoid useSearchParams errors in production
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: {
    default: 'ONNI Cosmetics | K-Beauty para el Caribe',
    template: '%s | ONNI Cosmetics',
  },
  description: 'Cosmética coreana seleccionada para piel tropical. Texturas ligeras, SPF y control de grasa. Envíos a República Dominicana y el Caribe.',
  keywords: ['K-Beauty Caribe', 'Cosmética RD', 'SPF Piel Grasa', 'VT Reedle Shot', 'Beauty of Joseon', 'ONNI Cosmetics', 'Nequi RD', 'piel grasa trópico'],
  metadataBase: new URL('https://www.onnicosmetics.com'),
  openGraph: {
    type: 'website',
    locale: 'es_DO',
    url: 'https://onnicosmetics.com',
    siteName: 'ONNI Cosmetics',
    images: ['/og-image.svg'],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@onnicosmetics',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="antialiased">
        {/* 👈 Analytics (GA4 + Meta Pixel) */}
        <AnalyticsProvider />
        
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  )
}
