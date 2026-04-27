import Navbar from '@/components/Navbar'
import Link from 'next/link'

const posts = [
  {
    slug: 'rutina-coreana-piel-tropical',
    title: 'Rutina Coreana de 10 Pasos para Piel Tropical',
    excerpt: 'Adaptá la famosa rutina coreana al clima del Caribe. Te enseñamos cómo modificar cada paso para humedad alta y radiación UV constante.',
    category: 'Rutinas',
    readTime: '8 min',
    date: '25 Abr 2026',
    image: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=800&h=600&fit=crop',
  },
  {
    slug: 'niacinamida-que-es-para-que-sirve',
    title: 'Niacinamida: Qué es y Para Qué Sirve',
    excerpt: 'El ingrediente estrella del K-Beauty explicado por expertos. Beneficios, cómo usarlo, con qué combinarlo y errores comunes.',
    category: 'Ingredientes',
    readTime: '6 min',
    date: '24 Abr 2026',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&h=600&fit=crop',
  },
  {
    slug: 'protector-solar-clima-tropical',
    title: 'Cómo Elegir Protector Solar para Clima Tropical',
    excerpt: 'SPF50+ no es suficiente. Te contamos qué buscar en un protector solar para el Caribe: textura, filtros, resistencia al agua y más.',
    category: 'Protección Solar',
    readTime: '7 min',
    date: '23 Abr 2026',
    image: 'https://images.unsplash.com/photo-1556228720-19de7526bb8e?w=800&h=600&fit=crop',
  },
]

export default function BlogPage() {
  return (
    <>
      <Navbar />
      
      {/* Hero */}
      <div style={{ backgroundColor: '#fce7f3', padding: '80px 20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '48px', fontWeight: '700', color: '#111827', marginBottom: '16px' }}>
          ONNI Academy
        </h1>
        <p style={{ fontSize: '18px', color: '#6b7280', maxWidth: '600px', margin: '0 auto' }}>
          Tips de skincare coreano adaptado al clima del Caribe
        </p>
      </div>

      {/* Posts */}
      <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', padding: '60px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '32px' }}>
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <article style={{ backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', transition: 'transform 0.3s' }}>
                  <div style={{ width: '100%', height: '240px', backgroundColor: '#f3f4f6', overflow: 'hidden' }}>
                    <img
                      src={post.image}
                      alt={post.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div style={{ padding: '24px' }}>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                      <span style={{ fontSize: '12px', color: '#059669', fontWeight: '500', textTransform: 'uppercase' }}>
                        {post.category}
                      </span>
                      <span style={{ fontSize: '12px', color: '#9ca3af' }}>·</span>
                      <span style={{ fontSize: '12px', color: '#9ca3af' }}>{post.readTime}</span>
                    </div>
                    <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#111827', marginBottom: '12px', lineHeight: '1.4' }}>
                      {post.title}
                    </h2>
                    <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.7', marginBottom: '16px' }}>
                      {post.excerpt}
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '12px', color: '#9ca3af' }}>{post.date}</span>
                      <span style={{ fontSize: '14px', color: '#be185d', fontWeight: '600' }}>Leer más →</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
