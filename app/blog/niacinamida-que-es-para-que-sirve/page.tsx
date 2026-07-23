'use client'

import Navbar from '@/components/Navbar'
import Link from 'next/link'

export default function NiacinamideArticle() {
  return (
    <>
      <Navbar />

      <article style={{ minHeight: '100vh', backgroundColor: '#f9fafb', padding: '80px 20px 60px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          
          {/* Breadcrumb */}
          <div style={{ marginBottom: '32px', fontSize: '14px', color: '#6b7280' }}>
            <Link href="/blog" style={{ color: '#6b7280', textDecoration: 'none' }}>Blog</Link>
            <span style={{ margin: '0 8px' }}>/</span>
            <Link href="/blog#ingredientes" style={{ color: '#6b7280', textDecoration: 'none' }}>Ingredientes</Link>
            <span style={{ margin: '0 8px' }}>/</span>
            <span style={{ color: '#111827' }}>Niacinamida</span>
          </div>

          {/* Header */}
          <header style={{ marginBottom: '48px' }}>
            <span style={{ fontSize: '12px', color: '#059669', fontWeight: '500', textTransform: 'uppercase' }}>
              Ingredientes
            </span>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '700', color: '#111827', marginTop: '16px', marginBottom: '24px', lineHeight: '1.2' }}>
              Niacinamida: Qué es y Para Qué Sirve
            </h1>
            <p style={{ fontSize: '18px', color: '#6b7280', lineHeight: '1.7' }}>
              El ingrediente estrella del K-Beauty explicado por expertos. Beneficios, cómo usarlo, con qué combinarlo y errores comunes.
            </p>
            <div style={{ display: 'flex', gap: '24px', marginTop: '24px', fontSize: '14px', color: '#9ca3af' }}>
              <span>⏱️ 6 min de lectura</span>
              <span>📅 24 Abr 2026</span>
            </div>
          </header>

          {/* Featured Image */}
          <div style={{ width: '100%', aspectRatio: '16/9', backgroundColor: '#f3f4f6', borderRadius: '12px', overflow: 'hidden', marginBottom: '48px' }}>
            <img
              src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=1200&h=675&fit=crop"
              alt="Niacinamida ingrediente skincare"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          {/* Content */}
          <div style={{ fontSize: '18px', lineHeight: '1.8', color: '#374151' }}>
            
            {/* ¿Qué es? */}
            <section style={{ marginBottom: '48px' }}>
              <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#111827', marginBottom: '24px' }}>
                ¿Qué es la Niacinamida?
              </h2>
              <p style={{ marginBottom: '20px' }}>
                La <strong>niacinamida</strong> (también conocida como nicotinamida) es una forma de <strong>vitamina B3</strong> que se ha convertido en uno de los ingredientes más populares y estudiados del skincare moderno.
              </p>
              <p style={{ marginBottom: '20px' }}>
                A diferencia de otros activos potentes como el retinol o los AHA, la niacinamida es <strong>increíblemente versátil y bien tolerada</strong> por casi todos los tipos de piel, incluyendo la sensible. Esto la convierte en un ingrediente &quot;comodín&quot; que puede beneficiar a prácticamente cualquiera.
              </p>
              <div style={{ backgroundColor: '#F0FDF4', padding: '24px', borderRadius: '8px', border: '1px solid #BBF7D0', margin: '32px 0' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#166534', marginBottom: '12px' }}>
                  🌟 Lo que tenés que saber
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li style={{ marginBottom: '8px' }}>✅ Es soluble en agua, por lo que se encuentra principalmente en sérums y tónicos</li>
                  <li style={{ marginBottom: '8px' }}>✅ Funciona bien en concentraciones del 2-10%</li>
                  <li style={{ marginBottom: '8px' }}>✅ Se puede usar mañana y noche</li>
                  <li style={{ marginBottom: '8px' }}>✅ Es compatible con casi todos los demás ingredientes</li>
                </ul>
              </div>
            </section>

            {/* Beneficios */}
            <section style={{ marginBottom: '48px' }}>
              <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#111827', marginBottom: '24px' }}>
                7 Beneficios Comprobados de la Niacinamida
              </h2>
              
              {[
                {
                  title: '1. Reduce la apariencia de poros dilatados',
                  desc: 'La niacinamida ayuda a regular la producción de sebo, lo que hace que los poros se vean más pequeños con el uso continuo. Ideal para piel grasa o mixta en clima tropical.'
                },
                {
                  title: '2. Unifica el tono de la piel',
                  desc: 'Inhibe la transferencia de melanina a las células de la superficie, ayudando a reducir manchas oscuras, hiperpigmentación y melasma. Perfecta para el Caribe donde la radiación UV es alta todo el año.'
                },
                {
                  title: '3. Fortalece la barrera cutánea',
                  desc: 'Estimula la producción de ceramidas y otros lípidos esenciales que mantienen la barrera de la piel fuerte y saludable. Una barrera fuerte significa menos sensibilidad y mejor hidratación.'
                },
                {
                  title: '4. Reduce rojeces e inflamación',
                  desc: 'Tiene propiedades antiinflamatorias que ayudan a calmar condiciones como rosácea, acné e irritación general. Excelente para piel sensible reactiva.'
                },
                {
                  title: '5. Controla el exceso de grasa',
                  desc: 'Regula la producción de sebo sin resecar la piel. Esto es crucial en climas húmedos donde el exceso de grasa puede causar brotes y poros obstruidos.'
                },
                {
                  title: '6. Minimiza líneas finas y arrugas',
                  desc: 'Estimula la producción de colágeno y mejora la elasticidad de la piel. Con el uso continuo, se ven menos signos de envejecimiento prematuro.'
                },
                {
                  title: '7. Protege contra el daño ambiental',
                  desc: 'Tiene propiedades antioxidantes que ayudan a proteger la piel contra el estrés oxidativo causado por la contaminación y los rayos UV (aunque NO reemplaza el protector solar).'
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

            {/* Cómo usar */}
            <section style={{ marginBottom: '48px' }}>
              <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#111827', marginBottom: '24px' }}>
                ¿Cómo Usar Niacinamida en tu Rutina?
              </h2>
              
              <div style={{ backgroundColor: '#FEF3C7', padding: '24px', borderRadius: '8px', border: '1px solid #FDE68A', marginBottom: '32px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#92400E', marginBottom: '16px' }}>
                  📋 Paso a paso para clima tropical
                </h3>
                <ol style={{ padding: 0, margin: 0, paddingLeft: '20px' }}>
                  <li style={{ marginBottom: '12px', color: '#78350F' }}>
                    <strong>Mañana:</strong> Limpiador → Tónico con niacinamida → Sérum → Protector solar SPF50+
                  </li>
                  <li style={{ marginBottom: '12px', color: '#78350F' }}>
                    <strong>Noche:</strong> Doble limpieza → Tónico → Sérum con niacinamida → Crema hidratante
                  </li>
                  <li style={{ marginBottom: '12px', color: '#78350F' }}>
                    <strong>Frecuencia:</strong> Se puede usar 2 veces al día todos los días
                  </li>
                  <li style={{ marginBottom: '12px', color: '#78350F' }}>
                    <strong>Concentración ideal:</strong> 5-10% para la mayoría de las pieles
                  </li>
                </ol>
              </div>

              <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#111827', marginBottom: '16px' }}>
                ¿Con qué ingredientes se puede combinar?
              </h3>
              <p style={{ color: '#4b5563', marginBottom: '20px' }}>
                La niacinamida es increíblemente versátil y se lleva bien con casi todo:
              </p>
              <ul style={{ color: '#4b5563', marginBottom: '20px' }}>
                <li style={{ marginBottom: '8px' }}>✅ <strong>Ácido hialurónico:</strong> Hidratación extra</li>
                <li style={{ marginBottom: '8px' }}>✅ <strong>Retinol:</strong> Potencian efectos antiedad (usar en rutinas separadas: niacinamida de día, retinol de noche)</li>
                <li style={{ marginBottom: '8px' }}>✅ <strong>Vitamina C:</strong> Sí, se pueden usar juntos (mito desmentido). De hecho, potencian la luminosidad.</li>
                <li style={{ marginBottom: '8px' }}>✅ <strong>AHA/BHA:</strong> No hay problema, pero si tenés piel sensible, usalos en momentos diferentes</li>
                <li style={{ marginBottom: '8px' }}>✅ <strong>Ácido tranexámico:</strong> Combinación potente para manchas (como en nuestro Sérum Niacinamide + TXA)</li>
              </ul>
            </section>

            {/* Errores comunes */}
            <section style={{ marginBottom: '48px' }}>
              <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#111827', marginBottom: '24px' }}>
                5 Errores Comunes al Usar Niacinamida
              </h2>
              
              {[
                {
                  error: 'Esperar resultados inmediatos',
                  correccion: 'La niacinamida trabaja a largo plazo. Los primeros resultados se ven a las 4-6 semanas, y los mejores a los 3 meses de uso continuo.'
                },
                {
                  error: 'Usar concentraciones muy altas',
                  correccion: 'Más no siempre es mejor. Concentraciones del 10% son efectivas. El 20%+ puede causar irritación sin beneficios adicionales.'
                },
                {
                  error: 'Abandonar si hay ligera irritación inicial',
                  correccion: 'Algunas pieles necesitan un período de ajuste. Empezá usándola día por medio y aumentá gradualmente.'
                },
                {
                  error: 'No usar protector solar',
                  correccion: 'Aunque la niacinamida ayuda con las manchas, sin SPF50+ diario estás perdiendo el tiempo. El sol oscurece las manchas más rápido de lo que la niacinamida las aclara.'
                },
                {
                  error: 'Aplicar en piel húmeda',
                  correccion: 'Esperá a que tu piel esté seca antes de aplicar sérums con niacinamida. En piel húmeda puede causar más irritación.'
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
                    <strong>✅ {item.correccion}</strong>
                  </p>
                </div>
              ))}
            </section>

            {/* Productos ONNI */}
            <section style={{ marginBottom: '48px', padding: '32px', backgroundColor: '#FDF2F8', borderRadius: '12px', border: '1px solid #FBCFE8' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#9D174D', marginBottom: '16px' }}>
                Productos ONNI con Niacinamida
              </h2>
              <p style={{ color: '#9D174D', marginBottom: '24px' }}>
                Nuestra selección K-Beauty incluye varios productos con niacinamida en concentraciones efectivas:
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: '16px' }}>
                  <strong style={{ color: '#9D174D' }}>Sérum Niacinamide + TXA</strong> — 5% niacinamida + 2% ácido tranexámico para manchas rebeldes
                </li>
                <li style={{ marginBottom: '16px' }}>
                  <strong style={{ color: '#9D174D' }}>Sérum Peach + Niacinamide</strong> — 3% niacinamida + extracto de durazno para luminosidad diaria
                </li>
                <li style={{ marginBottom: '16px' }}>
                  <strong style={{ color: '#9D174D' }}>1025 Dokdo Toner (Round Lab)</strong> — Niacinamida + agua de mar profunda para equilibrio y poros
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
                Ver productos →
              </Link>
            </section>

            {/* Conclusión */}
            <section style={{ marginBottom: '48px' }}>
              <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#111827', marginBottom: '24px' }}>
                Conclusión
              </h2>
              <p style={{ color: '#4b5563', lineHeight: '1.7', marginBottom: '20px' }}>
                La niacinamida es uno de esos ingredientes raros que <strong>realmente cumple con su hype</strong>. Es segura, efectiva, versátil y adecuada para casi todos los tipos de piel y preocupaciones.
              </p>
              <p style={{ color: '#4b5563', lineHeight: '1.7' }}>
                Si recién comenzás con el skincare coreano o buscás un activo que puedas usar a largo plazo sin irritación, la niacinamida es una excelente opción. Solo recordá: <strong>constancia es clave</strong> y <strong>siempre, siempre usá protector solar</strong>.
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
                👩‍⚕️
              </div>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', marginBottom: '4px' }}>
                  Equipo ONNI
                </h3>
                <p style={{ fontSize: '14px', color: '#6b7280' }}>
                  Curaduría K-Beauty con criterio científico para el clima del Caribe.
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
