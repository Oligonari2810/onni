'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import ContactForm from '@/components/ContactForm'

export default function B2BPage() {
  const [activeTab, setActiveTab] = useState<'requirements' | 'margins' | 'faq'>('requirements')

  return (
    <>
      <Navbar />

      {/* Hero B2B */}
      <section style={{ 
        minHeight: '80vh', 
        background: 'linear-gradient(135deg, #1A0A12 0%, #2C1A24 100%)', 
        display: 'flex', 
        alignItems: 'center',
        padding: '120px 48px 80px'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
            <div>
              <span style={{ 
                fontSize: '0.68rem', 
                letterSpacing: '0.3em', 
                textTransform: 'uppercase', 
                color: '#E8B4C8',
                display: 'block',
                marginBottom: '24px'
              }}>
                Programa B2B
              </span>
              <h1 style={{ 
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', 
                fontWeight: '300', 
                color: '#FFFFFF',
                lineHeight: '1.1',
                marginBottom: '24px'
              }}>
                Sé distribuidor <em style={{ fontStyle: 'italic', color: '#E8B4C8' }}>ONNI</em> en tu zona
              </h1>
              <p style={{ 
                fontSize: '1.1rem', 
                color: 'rgba(255,255,255,0.7)', 
                lineHeight: '1.7',
                marginBottom: '32px'
              }}>
                Exclusividad territorial + márgenes del 40-50% + soporte comercial completo. 
                Únete a la revolución K-Beauty para el Caribe.
              </p>
              <div style={{ display: 'flex', gap: '16px' }}>
                <a 
                  href="#solicitud" 
                  style={{ 
                    padding: '16px 36px', 
                    background: '#C4497A', 
                    color: '#FFFFFF', 
                    textDecoration: 'none',
                    fontSize: '0.78rem', 
                    letterSpacing: '0.15em', 
                    textTransform: 'uppercase',
                    borderRadius: '4px',
                    transition: 'all 0.3s'
                  }}
                >
                  Solicitar aplicación
                </a>
                <a 
                  href="#beneficios" 
                  style={{ 
                    padding: '16px 36px', 
                    border: '1px solid rgba(255,255,255,0.3)', 
                    color: 'rgba(255,255,255,0.7)', 
                    textDecoration: 'none',
                    fontSize: '0.78rem', 
                    letterSpacing: '0.15em', 
                    textTransform: 'uppercase',
                    borderRadius: '4px',
                    transition: 'all 0.3s'
                  }}
                >
                  Ver beneficios
                </a>
              </div>
            </div>
            <div style={{ 
              background: 'rgba(255,255,255,0.05)', 
              borderRadius: '12px', 
              padding: '48px',
              backdropFilter: 'blur(10px)'
            }}>
              <h3 style={{ color: '#FFFFFF', fontSize: '1.2rem', marginBottom: '24px' }}>Beneficios clave</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {[
                  'Exclusividad territorial por zona',
                  'Márgenes del 40-50% sobre PVP',
                  'Catálogo premium de 7 productos',
                  'Soporte comercial y formación',
                  'Materiales de marketing incluidos',
                  'Envíos desde 3-10 días hábiles',
                ].map((item, idx) => (
                  <li key={idx} style={{ 
                    display: 'flex', 
                    gap: '12px', 
                    marginBottom: '16px',
                    color: 'rgba(255,255,255,0.8)',
                    fontSize: '0.95rem'
                  }}>
                    <span style={{ color: '#E8B4C8' }}>✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: '80px 48px', background: '#FAF4F0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '32px', textAlign: 'center' }}>
            {[
              { number: '40-50%', label: 'Margen promedio' },
              { number: '7', label: 'Productos bestsellers' },
              { number: '1', label: 'Zona exclusiva' },
              { number: '3-10', label: 'Días de envío' },
            ].map((stat, idx) => (
              <div key={idx} style={{ padding: '32px 24px', background: '#FFFFFF', borderRadius: '8px' }}>
                <div style={{ 
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: '3rem', 
                  fontWeight: '300', 
                  color: '#C4497A',
                  marginBottom: '8px'
                }}>
                  {stat.number}
                </div>
                <div style={{ fontSize: '0.85rem', color: '#8A7280', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requisitos, Márgenes, FAQ Tabs */}
      <section id="beneficios" style={{ padding: '100px 48px', background: '#FFFFFF' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ 
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: '2.5rem', 
              fontWeight: '300', 
              color: '#1A0A12',
              marginBottom: '16px'
            }}>
              Información para distribuidores
            </h2>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', borderBottom: '2px solid #EDE0E8' }}>
            {[
              { id: 'requirements', label: 'Requisitos' },
              { id: 'margins', label: 'Márgenes y ROI' },
              { id: 'faq', label: 'Preguntas Frecuentes' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                style={{
                  padding: '12px 24px',
                  background: 'none',
                  border: 'none',
                  borderBottom: activeTab === tab.id ? '2px solid #C4497A' : '2px solid transparent',
                  color: activeTab === tab.id ? '#C4497A' : '#8A7280',
                  fontSize: '0.85rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  cursor: 'pointer',
                  marginBottom: '-2px',
                  transition: 'all 0.3s'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'requirements' && (
            <div style={{ animation: 'fadeUp 0.4s ease-out' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1A0A12', marginBottom: '24px' }}>
                ¿Quién puede ser distribuidor ONNI?
              </h3>
              <div style={{ display: 'grid', gap: '24px' }}>
                {[
                  {
                    title: '🏥 Clínicas estéticas y dermatológicas',
                    desc: 'Espacios profesionales que buscan incorporar K-Beauty de alta gama en su retail o protocolos.'
                  },
                  {
                    title: '💆 Spas y centros de wellness',
                    desc: 'Negocios enfocados en experiencias premium que quieren ofrecer productos seleccionados.'
                  },
                  {
                    title: '🛍️ Tiendas de cosmética selectiva',
                    desc: 'Retailers con criterio curatorial que buscan diferenciarse con marcas únicas.'
                  },
                  {
                    title: '👩‍⚕️ Profesionales independientes',
                    desc: 'Esteticistas, makeup artists o consultoras de belleza con cartera de clientes establecida.'
                  },
                ].map((item, idx) => (
                  <div key={idx} style={{ 
                    padding: '24px', 
                    background: '#FAF4F0', 
                    borderRadius: '8px',
                    border: '1px solid #EDE0E8'
                  }}>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#1A0A12', marginBottom: '8px' }}>
                      {item.title}
                    </h4>
                    <p style={{ fontSize: '0.95rem', color: '#8A7280', lineHeight: '1.6' }}>
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '40px', padding: '24px', background: '#FEF3C7', borderRadius: '8px', border: '1px solid #FDE68A' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#92400E', marginBottom: '12px' }}>
                  📋 Requisitos mínimos
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {[
                    'Pedido mínimo inicial: $500 USD (aprox. 25-30 unidades)',
                    'Local comercial o espacio profesional establecido',
                    'Compromiso de exclusividad por zona geográfica',
                    'Alineación con valores de marca (curaduría, calidad, transparencia)',
                  ].map((req, idx) => (
                    <li key={idx} style={{ 
                      display: 'flex', 
                      gap: '12px', 
                      marginBottom: '12px',
                      color: '#78350F',
                      fontSize: '0.95rem'
                    }}>
                      <span>✓</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'margins' && (
            <div style={{ animation: 'fadeUp 0.4s ease-out' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1A0A12', marginBottom: '24px' }}>
                Márgenes y retorno de inversión
              </h3>
              
              <div style={{ padding: '32px', background: '#FAF4F0', borderRadius: '8px', marginBottom: '32px' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#1A0A12', marginBottom: '24px' }}>
                  Ejemplo real: Pedido inicial de $500 USD
                </h4>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid #C4497A' }}>
                        <th style={{ textAlign: 'left', padding: '12px', color: '#1A0A12' }}>Producto</th>
                        <th style={{ textAlign: 'right', padding: '12px', color: '#1A0A12' }}>Precio UMM</th>
                        <th style={{ textAlign: 'right', padding: '12px', color: '#1A0A12' }}>PVP Sugerido</th>
                        <th style={{ textAlign: 'right', padding: '12px', color: '#1A0A12' }}>Margen</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { name: 'Beauty of Joseon Eye Serum', umm: 6.60, pvp: 15.50 },
                        { name: 'VT Reedle Shot 1300', umm: 22.64, pvp: 48.00 },
                        { name: 'Goodal Vitamin C Serum', umm: 10.77, pvp: 24.00 },
                        { name: 'Dr. Althea 345 Cream', umm: 10.08, pvp: 22.50 },
                        { name: 'Manyo Cleansing Oil', umm: 9.66, pvp: 22.00 },
                        { name: "I'M FROM Rice Toner", umm: 8.09, pvp: 18.50 },
                        { name: 'Round Lab Dokdo Toner', umm: 10.44, pvp: 23.50 },
                      ].map((product, idx) => {
                        const margin = ((product.pvp - (product.umm + 1.23 + product.umm * 0.006)) / product.pvp * 100).toFixed(0)
                        return (
                          <tr key={idx} style={{ borderBottom: '1px solid #EDE0E8' }}>
                            <td style={{ padding: '12px', color: '#4B5563' }}>{product.name}</td>
                            <td style={{ textAlign: 'right', padding: '12px', color: '#4B5563' }}>${product.umm.toFixed(2)}</td>
                            <td style={{ textAlign: 'right', padding: '12px', color: '#4B5563' }}>${product.pvp.toFixed(2)}</td>
                            <td style={{ textAlign: 'right', padding: '12px', color: '#059669', fontWeight: '600' }}>{margin}%</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div style={{ padding: '24px', background: '#D1FAE5', borderRadius: '8px' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#065F46', marginBottom: '12px' }}>
                    💰 Inversión inicial
                  </h4>
                  <div style={{ fontSize: '2rem', fontWeight: '700', color: '#047857', marginBottom: '8px' }}>
                    $500 USD
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#065F46' }}>
                    Pedido mínimo (25-30 unidades surtidas)
                  </p>
                </div>
                <div style={{ padding: '24px', background: '#FEF3C7', borderRadius: '8px' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#92400E', marginBottom: '12px' }}>
                    📈 ROI estimado
                  </h4>
                  <div style={{ fontSize: '2rem', fontWeight: '700', color: '#B45309', marginBottom: '8px' }}>
                    40-50%
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#92400E' }}>
                    Margen bruto sobre precio de venta
                  </p>
                </div>
              </div>

              <div style={{ marginTop: '32px', padding: '24px', background: '#F3E8FF', borderRadius: '8px', border: '1px solid #E9D5FF' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#6B21A8', marginBottom: '12px' }}>
                  🎁 Beneficios adicionales
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {[
                    'Materiales de marketing: display, testers, folletos',
                    'Formación en productos y técnicas de venta',
                    'Acceso prioritario a nuevos lanzamientos',
                    'Soporte comercial personalizado',
                    'Exclusividad territorial protegida',
                  ].map((benefit, idx) => (
                    <li key={idx} style={{ 
                      display: 'flex', 
                      gap: '12px', 
                      marginBottom: '12px',
                      color: '#581C87',
                      fontSize: '0.95rem'
                    }}>
                      <span>✓</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'faq' && (
            <div style={{ animation: 'fadeUp 0.4s ease-out' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1A0A12', marginBottom: '24px' }}>
                Preguntas frecuentes B2B
              </h3>
              <div style={{ display: 'grid', gap: '20px' }}>
                {[
                  {
                    q: '¿Cuánto tiempo toma el proceso de aplicación?',
                    a: 'Revisamos cada solicitud en 3-5 días hábiles. Si es aprobada, coordinamos el pedido inicial y los materiales de marketing en 1-2 semanas.'
                  },
                  {
                    q: '¿Hay exclusividad real por zona?',
                    a: 'Sí. Trabajamos con UN solo distribuidor por zona geográfica definida. Esto protege tu inversión y te permite construir relaciones a largo plazo con tus clientes.'
                  },
                  {
                    q: '¿Puedo empezar con menos de $500 USD?',
                    a: 'El mínimo es flexible para profesionales independientes (desde $300 USD). Para clínicas y spas, recomendamos $500+ para tener surtido completo.'
                  },
                  {
                    q: '¿Cómo funcionan los envíos?',
                    a: 'Enviamos desde nuestro almacén central en RD. Los pedidos se procesan en 24-48h y llegan en 3-10 días hábiles según la ubicación.'
                  },
                  {
                    q: '¿Hay soporte para ventas?',
                    a: 'Sí. Incluimos formación en productos, materiales de marketing (display, testers, folletos) y soporte comercial continuo para ayudarte a vender.'
                  },
                  {
                    q: '¿Puedo devolver productos si no vendo?',
                    a: 'Aceptamos cambios de productos dentro de los 90 días si están en perfecto estado. No aceptamos devoluciones por cambio de opinión, pero sí exchanges.'
                  },
                ].map((item, idx) => (
                  <div key={idx} style={{ 
                    padding: '24px', 
                    background: '#FAF4F0', 
                    borderRadius: '8px',
                    border: '1px solid #EDE0E8'
                  }}>
                    <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#1A0A12', marginBottom: '12px' }}>
                      {item.q}
                    </h4>
                    <p style={{ fontSize: '0.95rem', color: '#8A7280', lineHeight: '1.7' }}>
                      {item.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Formulario de aplicación */}
      <section id="solicitud" style={{ padding: '100px 48px', background: '#FAF4F0' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ 
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: '2.5rem', 
              fontWeight: '300', 
              color: '#1A0A12',
              marginBottom: '16px'
            }}>
              Solicitar punto ONNI
            </h2>
            <p style={{ fontSize: '1rem', color: '#8A7280' }}>
              Completa el formulario y te contactaremos en 3-5 días hábiles.
            </p>
          </div>

          <div style={{ background: '#FFFFFF', borderRadius: '12px', padding: '48px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
            <ContactForm />
          </div>

          <div style={{ marginTop: '32px', padding: '24px', background: '#F0FDF4', borderRadius: '8px', border: '1px solid #BBF7D0' }}>
            <p style={{ fontSize: '0.9rem', color: '#166534', marginBottom: '12px' }}>
              <strong>📧 ¿Preferís contactar por email?</strong>
            </p>
            <p style={{ fontSize: '0.9rem', color: '#166534' }}>
              Escribinos a <a href="mailto:b2b@onnicosmetics.com" style={{ color: '#166534', fontWeight: '600' }}>b2b@onnicosmetics.com</a> y te enviaremos el kit de distribuidor completo.
            </p>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section style={{ padding: '80px 48px', background: '#1A0A12', textAlign: 'center' }}>
        <h2 style={{ 
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: '2rem', 
          fontWeight: '300', 
          color: '#FFFFFF',
          marginBottom: '16px'
        }}>
          ¿Tenés dudas sobre el programa?
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '32px' }}>
          Hablá con nuestro equipo comercial por WhatsApp
        </p>
        <a 
          href="https://wa.me/18494754442" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ 
            display: 'inline-block',
            padding: '16px 36px', 
            background: '#25D366', 
            color: '#FFFFFF', 
            textDecoration: 'none',
            fontSize: '0.9rem', 
            letterSpacing: '0.1em', 
            textTransform: 'uppercase',
            borderRadius: '4px',
            fontWeight: '600',
            transition: 'all 0.3s'
          }}
        >
          Hablar por WhatsApp
        </a>
      </section>
    </>
  )
}
