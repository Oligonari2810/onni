import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ONNI — K-Beauty seleccionado para el Caribe',
  description: 'Distribución especializada de K-Beauty coreano para clínicas, spas y profesionales. Seleccionado para el clima tropical del Caribe.',
  keywords: 'K-Beauty Caribe, distribución cosmética RD, SPF piel tropical, K-Beauty clínicas estéticas, ONNI',
  openGraph: {
    title: 'ONNI — K-Beauty seleccionado para el Caribe',
    description: 'Distribución B2B selectiva de K-Beauty adaptado al Caribe. Protección solar, manchas e hidratación para piel tropical.',
    type: 'website',
    url: 'https://onnicosmetics.com',
    locale: 'es_DO',
    // TODO: Add og:image once designed — images: [{ url: 'https://onnicosmetics.com/og.jpg', width: 1200, height: 630 }],
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
