import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import { CartProvider } from '@/lib/useCart'
import AnalyticsProvider from '@/components/analytics/AnalyticsProvider'
import CartSidebar from '@/components/CartSidebar'
import PageViewTracker from '@/components/analytics/PageViewTracker'

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
      {/* 🔵 GOOGLE ANALYTICS 4 - Official Google Tag */}
      <head>
        <Script
          id="gtag-script"
          src="https://www.googletagmanager.com/gtag/js?id=G-9H9HCNYVPV"
          strategy="afterInteractive"
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-9H9HCNYVPV', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>
      
      <body className="antialiased">
        <CartProvider>
          {children}
          {/* 👈 Cart Sidebar */}
          <CartSidebar />
          {/* 👈 Page View Tracker for SPA navigation */}
          <PageViewTracker />
        </CartProvider>
      </body>
    </html>
  )
}
