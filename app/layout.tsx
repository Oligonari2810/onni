import type { Metadata } from 'next'
import './globals.css'
import { CartProvider } from '@/lib/useCart'
import CartSidebar from '@/components/CartSidebar'
import WhatsAppWidget from '@/components/WhatsAppWidget'

export const metadata: Metadata = {
  title: 'ONNI Cosmetics | K-Beauty Profesional para el Caribe y RD',
  description: 'Cosmética coreana seleccionada para piel tropical. Texturas ligeras, control de grasa y protección UV para República Dominicana, Caribe y LATAM. Envíos rápidos.',
  keywords: 'K-Beauty Caribe, cosmética tropical RD, SPF50 piel tropical, skincare clima húmedo, ONNI cosmetics República Dominicana, K-Beauty LATAM, Nequi RD, distribución cosmética Caribe, piel grasa trópico',
  openGraph: {
    title: 'ONNI - K-Beauty para el Caribe',
    description: 'Cosmética coreana para clima tropical',
    url: 'https://onnicosmetics.com',
    siteName: 'ONNI Cosmetics',
    locale: 'es_DO',
    type: 'website',
  },
}

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
        <CartProvider>
          <div className="cursor" id="cur"></div>
          <div className="cursor-ring" id="curR"></div>
          {children}
          <CartSidebar />
          <WhatsAppWidget />
        </CartProvider>
      </body>
    </html>
  )
}
