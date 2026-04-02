import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ONNI — K-Beauty Formulado para el Caribe',
  description: 'Los mejores productos K-beauty seleccionados para el clima del Caribe. Ciencia coreana, formulación tropical, precio accesible.',
  keywords: 'K-beauty, skincare, Caribe, República Dominicana, cosmética, SPF, Punta Cana',
  openGraph: {
    title: 'ONNI — K-Beauty Formulado para el Caribe',
    description: 'Los mejores productos K-beauty seleccionados para el clima del Caribe.',
    type: 'website',
    url: 'https://onni.com',
    locale: 'es_DO',
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
        <div className="cursor" id="cur"></div>
        <div className="cursor-ring" id="curR"></div>
        {children}
      </body>
    </html>
  )
}
