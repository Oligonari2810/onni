'use client'

import Navbar from '@/components/Navbar'
import Link from 'next/link'

export default function SunscreenArticle() {
  return (
    <>
      <Navbar />

      <article style={{ minHeight: '100vh', backgroundColor: '#f9fafb', padding: '80px 20px 60px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          
          {/* Breadcrumb */}
          <div style={{ marginBottom: '32px', fontSize: '14px', color: '#6b7280' }}>
            <Link href="/blog" style={{ color: '#6b7280', textDecoration: 'none' }}>Blog</Link>
            <span style={{ margin: '0 8px' }}>/</span>
            <Link href="/blog#proteccion-solar" style={{ color: '#6b7280', textDecoration: 'none' }}>Protección Solar</Link>
            <span style={{ margin: '0 8px' }}>/</span>
            <span style={{ color: '#111827' }}>Protector Solar Tropical</span>
          </div>

          {/* Header */}
          <header style={{ marginBottom: '48px' }}>
            <span style={{ fontSize: '12px', color: '#059669', fontWeight: '500', textTransform: 'uppercase' }}>
              Protección Solar
            </span>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '700', color: '#111827', marginTop: '16px', marginBottom: '24px', lineHeight: '1.2' }}>
              Cómo Elegir Protector Solar para Clima Tropical
            </h1>
            <p style={{ fontSize: '18px', color: '#6b7280', lineHeight: '1.7' }}>
              SPF50+ no es suficiente. Te contamos qué buscar en un protector solar para el Caribe: textura, filtros, resistencia al agua y más.
            </p>
            <div style={{ display: 'flex', gap: '24px', marginTop: '24px', fontSize: '14px', color: '#9ca3af' }}>
              <span>⏱️ 7 min de lectura</span>
              <span>📅 23 Abr 2026</span>
            </div>
          </header>

          {/* Featured Image */}
          <div style={{ width: '100%', aspectRatio: '16/9', backgroundColor: '#f3f4f6', borderRadius: '12px', overflow: 'hidden', marginBottom: '48px' }}>
            <img
              src="https://images.unsplash.com/photo-1556228720-19de7526bb8e?w=1200&h=675&fit=crop"
              alt="Protector solar en playa tropical"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          {/* Content */}
          <div style={{ fontSize: '18px', lineHeight: '1.8', color: '#374151' }}>
            
            {/* Intro */}
            <section style={{ marginBottom: '48px' }}>
              <p style={{ marginBottom: '20px' }}>
                Vivir en el Caribe significa disfrutar de playas paradisíacas, clima cálido todo el año... y <strong>radiación UV extrema constante</strong>. República Dominicana tiene un índice UV de 11-12 (extremo) la mayor parte del año.
              </p>
              <p style={{ marginBottom: '20px' }}>
                Esto significa que tu protector solar no puede ser cualquiera. No sirve el mismo que usarías en Madrid en invierno. Acá necesitás protección real, texturas que aguanten la humedad y fórmulas que no te hagan brillar como un faro.
              </p>
              <div style={{ backgroundColor: '#FEF3C7', padding: '24px', borderRadius: '8px', border: '1px solid #FDE68A' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#92400E', marginBottom: '12px' }}>
                  ☀️ Datos clave del Caribe
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li style={{ marginBottom: '8px' }}>📍 <strong>Índice UV:</strong> 11-12 (extremo) todo el año</li>
                  <li style={{ marginBottom: '8px' }}>📍 <strong>Humedad:</strong> 70-85% promedio</li>
                  <li style={{ marginBottom: '8px' }}>📍 <strong>Temperatura:</strong> 25-32°C todo el año</li>
                  <li style={{ marginBottom: '8px' }}>📍 <strong>Reposición:</strong> Cada 2 horas si estás al sol</li>
                </ul>
              </div>
            </section>

            {/* Qué buscar */}
            <section style={{ marginBottom: '48px' }}>
              <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#111827', marginBottom: '24px' }}>
                7 Cosas que DEBÉS Buscar en un Protector Solar Tropical
              </h2>
              
              {[
                {
                  title: '1. SPF50+ PA++++ (protección máxima)',
                  desc: 'SPF50+ bloquea 98% de rayos UVB. PA++++ es la máxima protección contra UVA (los que causan envejecimiento). En el Caribe, nada menos que esto es aceptable.'
                },
                {
                  title: '2. Textura ligera tipo esencia o gel-cream',
                  desc: 'Las texturas densas y grasosas se derriten con la humedad y te hacen brillar. Buscá fórmulas "water-based", "essence", "gel" o "milky". Se absorben rápido y no dejan residuo.'
                },
                {
                  title: '3. Resistente al agua y al sudor (water resistant)',
                  desc: 'Aunque no vayas a la playa, el sudor de caminar por la ciudad o esperar la guagua puede derretir tu protector. "Water resistant" significa que aguanta 40-80 minutos de agua/sudor.'
                },
                {
                  title: '4. Sin cast blanco (no white cast)',
                  desc: 'Los protectores minerales (óxido de zinc, titanio) suelen dejar capa blanca. En piel morena o negra se nota mucho. Buscá fórmulas "invisible finish" o filtros químicos modernos.'
                },
                {
                  title: '5. No comedogénico (non-comedogenic)',
                  desc: 'En clima húmedo, los poros se obstruyen más fácil. "Non-comedogenic" significa que la fórmula no causa brotes de acné. Ideal para piel grasa o mixta.'
                },
                {
                  title: '6. Con ingredientes hidratantes adicionales',
                  desc: 'Ácido hialurónico, niacinamida, centella asiática. Estos ingredientes benefician tu piel mientras la protegen. En el Caribe, la hidratación es clave aunque haga calor.'
                },
                {
                  title: '7. Finish mate o natural (no shiny)',
                  desc: 'Nadie quiere brillar como espejo a las 10 AM. Los protectores "matte finish" o "natural finish" controlan el exceso de grasa y te mantienen fresca por más tiempo.'
                },
              ].map((item, idx) => (
                <div key={idx} style={{ marginBottom: '24px' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#111827', marginBottom: '12px' }}>
                    {item.title}
                  </h3>
                  <p style={{ color: '#4b5563', lineHeight: '1.7' }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </section>

            {/* Tipos de filtros */}
            <section style={{ marginBottom: '48px' }}>
              <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#111827', marginBottom: '24px' }}>
                Filtros Químicos vs. Minerales: ¿Cuál es Mejor para el Caribe?
              </h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
                <div style={{ padding: '24px', backgroundColor: '#E0F2FE', borderRadius: '8px', border: '1px solid #BAE6FD' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#075985', marginBottom: '16px' }}>
                    🔵 Filtros Químicos
                  </h3>
                  <p style={{ fontSize: '14px', color: '#0C4A6E', marginBottom: '16px' }}>
                    Absorben los rayos UV y los transforman en calor que la piel libera.
                  </p>
                  <strong style={{ fontSize: '14px', color: '#075985' }}>Ventajas:</strong>
                  <ul style={{ fontSize: '14px', color: '#0C4A6E', padding: 0, margin: '8px 0 0 20px' }}>
                    <li>Texturas más ligeras</li>
                    <li>Sin cast blanco</li>
                    <li>Se sienten como skincare</li>
                    <li>Ideales para uso diario</li>
                  </ul>
                </div>
                <div style={{ padding: '24px', backgroundColor: '#FEF3C7', borderRadius: '8px', border: '1px solid #FDE68A' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#92400E', marginBottom: '16px' }}>
                    🟡 Filtros Minerales (Físicos)
                  </h3>
                  <p style={{ fontSize: '14px', color: '#78350F', marginBottom: '16px' }}>
                    Forman una barrera física que refleja los rayos UV como un espejo.
                  </p>
                  <strong style={{ fontSize: '14px', color: '#92400E' }}>Ventajas:</strong>
                  <ul style={{ fontSize: '14px', color: '#78350F', padding: 0, margin: '8px 0 0 20px' }}>
                    <li>Ideales para piel sensible</li>
                    <li>Protección inmediata</li>
                    <li>Más estables al sol</li>
                    <li>Mejores para playa/piscina</li>
                  </ul>
                </div>
              </div>

              <div style={{ backgroundColor: '#F0FDF4', padding: '24px', borderRadius: '8px', border: '1px solid #BBF7D0' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#166534', marginBottom: '12px' }}>
                  ✅ Veredicto para el Caribe
                </h3>
                <p style={{ color: '#166534', lineHeight: '1.7' }}>
                  <strong>Uso diario (ciudad, oficina):</strong> Filtros químicos o híbridos por su textura ligera y finish invisible.
                </p>
                <p style={{ color: '#166534', lineHeight: '1.7', marginTop: '12px' }}>
                  <strong>Playa, piscina, deporte:</strong> Filtros minerales o híbridos con mayor resistencia al agua.
                </p>
              </div>
            </section>

            {/* Errores comunes */}
            <section style={{ marginBottom: '48px' }}>
              <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#111827', marginBottom: '24px' }}>
                5 Errores que Te Quitan Protección
              </h2>
              
              {[
                {
                  error: 'No usar la cantidad suficiente',
                  correccion: 'Necesitás 1/4 de cucharadita para rostro y cuello (aprox. 2 dedos de producto). Menos que eso reduce el SPF drásticamente.'
                },
                {
                  error: 'No reaplicar cada 2-3 horas',
                  correccion: 'El SPF se degrada con el tiempo, el sudor y la fricción. Configurá una alarma en el celular si es necesario.'
                },
                {
                  error: 'Pensar que con maquillaje con SPF es suficiente',
                  correccion: 'El maquillaje no se aplica en la cantidad necesaria para alcanzar el SPF declarado. Siempre usá protector solar debajo.'
                },
                {
                  error: 'No usar protector solar en días nublados',
                  desc: 'El 80% de los rayos UV atraviesan las nubes. En el Caribe, el índice UV es alto incluso cuando está "nublado".'
                },
                {
                  error: 'Olvidar zonas clave',
                  correccion: 'Orejas, cuello, escote, dorso de las manos y pies (si usás sandalias). Ahí también hay cáncer de piel.'
                },
              ].map((item, idx) => (
                <div key={idx} style={{ 
                  backgroundColor: '#FEF2F2', 
                  padding: '20px', 
                  borderRadius: '8px', 
                  border: '1px solid #FEE2E2',
                  marginBottom: '16px'
                }}>
                  <p style={{ color: '#991B1B', marginBottom: '8px' }}>
                    <strong>❌ {item.error}</strong>
                  </p>
                  <p style={{ color: '#7F1D1D', fontSize: '15px' }}>
                    <strong>✅ {item.correccion || item.desc}</strong>
                  </p>
                </div>
              ))}
            </section>

            {/* Productos ONNI */}
            <section style={{ marginBottom: '48px', padding: '32px', backgroundColor: '#FDF2F8', borderRadius: '12px', border: '1px solid #FBCFE8' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#9D174D', marginBottom: '16px' }}>
                Protectores Solares en ONNI
              </h2>
              <p style={{ color: '#9D174D', marginBottom: '24px' }}>
                Seleccionamos protectores solares coreanos específicamente formulados para climas tropicales:
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: '16px' }}>
                  <strong style={{ color: '#9D174D' }}>Protector Solar SPF50+ PA++++</strong> — Textura essence, filtros modernos de nueva generación, sin cast blanco, resistente al sudor. Ideal para uso diario en ciudad.
                </li>
                <li style={{ marginBottom: '16px' }}>
                  <strong style={{ color: '#9D174D' }}>Round Lab Birch Juice Sunscreen</strong> — Con extracto de abedul y niacinamida. Finish natural, hidratación ligera, perfecto para piel grasa o mixta.
                </li>
                <li style={{ marginBottom: '16px' }}>
                  <strong style={{ color: '#9D174D' }}>Mixsoon Bean Sun Serum</strong> — Protector solar en formato sérum con extracto de frijol. Ultra ligero, sin white cast, ideal para usar debajo del maquillaje.
                </li>
              </ul>
              <Link 
                href="/#productos" 
                style={{ 
                  display: 'inline-block',
                  marginTop: '24px',
                  padding: '12px 24px', 
                  background: '#C4497A', 
                  color: '#FFFFFF', 
                  textDecoration: 'none',
                  fontSize: '14px', 
                  letterSpacing: '0.1em', 
                  textTransform: 'uppercase',
                  borderRadius: '4px',
                  fontWeight: '600'
                }}
              >
                Ver protectores solares →
              </Link>
            </section>

            {/* Rutina recomendada */}
            <section style={{ marginBottom: '48px' }}>
              <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#111827', marginBottom: '24px' }}>
                Rutina de Protección Solar para el Caribe
              </h2>
              
              <div style={{ backgroundColor: '#E0F2FE', padding: '24px', borderRadius: '8px', border: '1px solid #BAE6FD' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#075985', marginBottom: '20px' }}>
                  🌅 Rutina de Mañana
                </h3>
                <ol style={{ padding: 0, margin: 0, paddingLeft: '20px', color: '#0C4A6E' }}>
                  <li style={{ marginBottom: '12px' }}>Limpiador suave o solo agua</li>
                  <li style={{ marginBottom: '12px' }}>Tónico (opcional: con niacinamida para poros)</li>
                  <li style={{ marginBottom: '12px' }}>Sérum (vitamina C por la mañana para potenciar protección)</li>
                  <li style={{ marginBottom: '12px' }}>Contorno de ojos (opcional)</li>
                  <li style={{ marginBottom: '12px' }}>Crema hidratante ligera o gel-cream</li>
                  <li style={{ marginBottom: '12px' }}><strong>PROTECTOR SOLAR SPF50+ PA++++ (2 dedos de producto)</strong></li>
                  <li style={{ marginBottom: '12px' }}>Maquillaje (si usás)</li>
                </ol>
              </div>

              <div style={{ backgroundColor: '#FEF3C7', padding: '24px', borderRadius: '8px', border: '1px solid #FDE68A', marginTop: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#92400E', marginBottom: '16px' }}>
                  🕐 Reaplicación durante el día
                </h3>
                <p style={{ color: '#78350F', marginBottom: '16px' }}>
                  <strong>Cada 2-3 horas:</strong>
                </p>
                <ul style={{ color: '#78350F', padding: 0, margin: 0, paddingLeft: '20px' }}>
                  <li>Si tenés maquillaje: usá spray de protector solar o polvo con SPF</li>
                  <li>Sin maquillaje: aplicá otra capa de protector solar (tipo essence que no arruina el look)</li>
                  <li>Si estuviste en agua o sudaste mucho: reaplicá inmediatamente</li>
                </ul>
              </div>
            </section>

            {/* Conclusión */}
            <section style={{ marginBottom: '48px' }}>
              <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#111827', marginBottom: '24px' }}>
                Conclusión
              </h2>
              <p style={{ color: '#4b5563', lineHeight: '1.7', marginBottom: '20px' }}>
                En el Caribe, el protector solar <strong>no es opcional</strong>. Es tan esencial como cepillarse los dientes. La buena noticia es que los protectores solares coreanos han avanzado tanto que ya no son esas cremas blancas y grasosas de antes.
              </p>
              <p style={{ color: '#4b5563', lineHeight: '1.7' }}>
                Hoy tenés fórmulas que se sienten como agua, no dejan residuo, y hasta benefician tu piel con ingredientes activos. Solo recordá: <strong>SPF50+ PA++++, textura ligera, y reaplicar cada 2-3 horas</strong>. Tu piel del futuro te lo va a agradecer.
              </p>
            </section>

          </div>

          {/* Author Bio */}
          <div style={{ 
            padding: '32px', 
            backgroundColor: 'white', 
            borderRadius: '12px', 
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            marginBottom: '48px'
          }}>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <div style={{ 
                width: '60px', 
                height: '60px', 
                borderRadius: '50%', 
                backgroundColor: '#FCE7F3',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px'
              }}>
                ☀️
              </div>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', marginBottom: '4px' }}>
                  Equipo ONNI
                </h3>
                <p style={{ fontSize: '14px', color: '#6b7280' }}>
                  Expertos en K-Beauty adaptado al clima tropical del Caribe.
                </p>
              </div>
            </div>
          </div>

          {/* Back to Blog */}
          <div style={{ textAlign: 'center' }}>
            <Link 
              href="/blog" 
              style={{ 
                fontSize: '14px', 
                color: '#C4497A', 
                textDecoration: 'none',
                fontWeight: '500'
              }}
            >
              ← Volver al Blog
            </Link>
          </div>

        </div>
      </article>
    </>
  )
}
