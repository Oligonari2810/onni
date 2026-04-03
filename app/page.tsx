'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import ContactForm from '@/components/ContactForm'
import { type Language } from '@/lib/i18n'

export default function Home() {
  const [lang, setLang] = useState<Language>('es')
  const [expandedPhase, setExpandedPhase] = useState<string | null>('phase-1')

  useEffect(() => {
    // Custom cursor
    const cur = document.getElementById('cur')
    const curR = document.getElementById('curR')
    let mx = 0, my = 0, rx = 0, ry = 0

    const handleMouseMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY }
    document.addEventListener('mousemove', handleMouseMove)

    const animateCursor = () => {
      if (cur) { cur.style.left = mx + 'px'; cur.style.top = my + 'px' }
      rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12
      if (curR) { curR.style.left = rx + 'px'; curR.style.top = ry + 'px' }
      requestAnimationFrame(animateCursor)
    }
    animateCursor()

    // Reveal on scroll
    const reveals = document.querySelectorAll('.reveal')
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), i * 80)
          obs.unobserve(e.target)
        }
      })
    }, { threshold: 0.08 })
    reveals.forEach((el) => obs.observe(el))

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      reveals.forEach((el) => obs.unobserve(el))
    }
  }, [])

  return (
    <>
      <Navbar lang={lang} onLangChange={setLang} />
      <Hero lang={lang} />

      {/* MARQUEE */}
      <div className="marquee">
        <div className="marquee-track">
          <span className="marquee-item">Ciencia coreana</span>
          <span className="marquee-item">Formulado para el Caribe</span>
          <span className="marquee-item">Sin cast blanco</span>
          <span className="marquee-item">Seleccionado con criterio</span>
          <span className="marquee-item">K-beauty · Caribe</span>
          <span className="marquee-item">Tu hermana mayor</span>
          <span className="marquee-item">언니 · Onni</span>
          <span className="marquee-item">Ciencia coreana</span>
          <span className="marquee-item">Formulado para el Caribe</span>
          <span className="marquee-item">Sin cast blanco</span>
          <span className="marquee-item">Seleccionado con criterio</span>
          <span className="marquee-item">K-beauty · Caribe</span>
          <span className="marquee-item">Tu hermana mayor</span>
          <span className="marquee-item">언니 · Onni</span>
        </div>
      </div>

      {/* DISTRIBUCIÓN */}
      <section className="distro" id="distribucion">
        <div className="distro-header reveal">
          <span className="section-label distro-label">Modelo de distribución</span>
          <h2 className="section-title distro-title">Distribución selectiva<br /><em>ONNI</em></h2>
          <p className="distro-desc">Trabajamos con clínicas estéticas, spas y profesionales que buscan una línea K-Beauty seleccionada para el clima del Caribe. ONNI desarrolla puntos selectivos por zona, con catálogo validado, soporte comercial y enfoque de prescripción.</p>
        </div>
        <div className="distro-grid">
          <div className="distro-card reveal">
            <span className="distro-circle" style={{ background: '#FBD0DF' }} />
            <h3>Un punto ONNI por zona</h3>
            <p>Cada zona se trabaja con exclusividad para proteger posicionamiento, margen y diferenciación.</p>
          </div>
          <div className="distro-card reveal">
            <span className="distro-circle" style={{ background: '#D8E5F3' }} />
            <h3>Catálogo corto y validado</h3>
            <p>Empezamos con una selección precisa de productos pensados para humedad, manchas y alta radiación UV.</p>
          </div>
          <div className="distro-card reveal">
            <span className="distro-circle" style={{ background: '#E2F3DC' }} />
            <h3>Soporte comercial y formación</h3>
            <p>Acompañamos la activación del punto ONNI con argumentario, enfoque de prescripción y apoyo comercial.</p>
          </div>
        </div>
        <div className="distro-cta reveal">
          <a href="#b2b" className="btn-primary">Solicitar punto ONNI</a>
        </div>
      </section>

      {/* MANIFIESTO */}
      <section className="manifesto" id="nosotras">
        <div className="reveal">
          <span className="section-label">Nuestro manifiesto</span>
          <blockquote className="manifesto-quote">
            &ldquo;Que el Caribe tenga por primera vez productos diseñados para <em>su clima real</em> y su realidad.&rdquo;
          </blockquote>
        </div>
        <div className="manifesto-right">
          <div className="manifesto-point reveal">
            <span className="manifesto-num">01</span>
            <div className="manifesto-text">
              <h4>La hermana mayor</h4>
              <p>En coreano, Onni (언니) significa hermana mayor. La que ya pasó por lo que tú estás viviendo. La que fue a Corea, investigó, probó — y trajo lo que realmente funciona aquí.</p>
            </div>
          </div>
          <div className="manifesto-point reveal">
            <span className="manifesto-num">02</span>
            <div className="manifesto-text">
              <h4>Curaduría, no fabricación</h4>
              <p>No fabricamos. Seleccionamos. Entre miles de productos K-beauty escogemos los que tienen la ciencia, la textura y los ingredientes correctos para el clima del Caribe.</p>
            </div>
          </div>
          <div className="manifesto-point reveal">
            <span className="manifesto-num">03</span>
            <div className="manifesto-text">
              <h4>El Caribe como protagonista</h4>
              <p>Sin estándares asiáticos ni europeos. Sin claim de blanqueamiento. El Caribe como referencia, no como mercado secundario.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTEXTO CARIBE */}
      <section className="contexto">
        <div className="contexto-header reveal">
          <span className="section-label">El contexto del Caribe</span>
          <h2 className="section-title contexto-title">El Caribe necesita otra<br /><em>selección cosmética</em></h2>
          <p className="contexto-desc">Alta radiación UV, humedad constante y tendencia a la hiperpigmentación exigen fórmulas, texturas y activos distintos. ONNI selecciona K-Beauty con mejor adaptación a estas condiciones.</p>
        </div>
        <div className="contexto-grid">
          <div className="contexto-card reveal">
            <span className="distro-circle" style={{ background: '#D8E5F3' }} />
            <h3>Alta radiación UV</h3>
            <p>La exposición solar constante exige protectores ligeros, cómodos y de uso diario real.</p>
          </div>
          <div className="contexto-card reveal">
            <span className="distro-circle" style={{ background: '#FBEBBB' }} />
            <h3>Humedad y sebo</h3>
            <p>En clima tropical, las texturas densas saturan la piel. Las fórmulas ligeras marcan la diferencia.</p>
          </div>
          <div className="contexto-card reveal">
            <span className="distro-circle" style={{ background: '#E2F3DC' }} />
            <h3>Manchas y PIH</h3>
            <p>La hiperpigmentación postinflamatoria requiere activos bien elegidos y buena tolerancia cutánea.</p>
          </div>
        </div>
        <p className="contexto-closing reveal">Por eso ONNI no importa por catálogo. Selecciona con criterio.</p>
      </section>

      {/* PRODUCTOS */}
      <section className="productos" id="productos">
        <div className="productos-header reveal">
          <div>
            <span className="section-label">Selección Onni</span>
            <h2 className="section-title">Los mejores<br /><em>para el Caribe</em></h2>
          </div>
          <p className="productos-sub">Cada producto fue elegido por su eficacia específica para el clima del Caribe: texturas ligeras, activos verificados, sin irritantes.</p>
        </div>
        <div className="productos-grid">
          <div className="prod-card reveal">
            <div className="prod-visual" style={{ background: 'radial-gradient(circle at 30% 40%, #FBEBBB 0%, #f5d77a 100%)' }}>
              <span className="prod-badge">⭐ Estrella</span>
            </div>
            <div className="prod-info">
              <p className="prod-brand">Selección Onni · Sérum tratamiento</p>
              <h3 className="prod-name">Sérum Niacinamide 10% + TXA 4%</h3>
              <p className="prod-claim">Manchas, hiperpigmentación, unificación de tono. La tríada activa más potente para el clima del Caribe.</p>
              <div className="prod-footer">
                <div className="prod-tags"><span className="prod-tag">Niacinamide</span><span className="prod-tag">TXA</span></div>
              </div>
            </div>
          </div>

          <div className="prod-card reveal">
            <div className="prod-visual" style={{ background: 'radial-gradient(circle at 30% 40%, #E2F3DC 0%, #b8dfaa 100%)' }}>
            </div>
            <div className="prod-info">
              <p className="prod-brand">Selección Onni · Limpieza paso 1</p>
              <h3 className="prod-name">Aceite Limpiador Gentle Black</h3>
              <p className="prod-claim">Doble limpieza para piel grasa tropical. Sin fragancia, emulsifica al instante, no deja residuo.</p>
              <div className="prod-footer">
                <div className="prod-tags"><span className="prod-tag">Oil cleanse</span><span className="prod-tag">Sin alcohol</span></div>
              </div>
            </div>
          </div>

          <div className="prod-card reveal">
            <div className="prod-visual" style={{ background: 'radial-gradient(circle at 30% 40%, #E2F3DC 0%, #b8dfaa 100%)' }}>
            </div>
            <div className="prod-info">
              <p className="prod-brand">Selección Onni · Limpieza paso 2</p>
              <h3 className="prod-name">Espuma Limpiadora Heartleaf</h3>
              <p className="prod-claim">Low-pH para equilibrar el microbioma. Controla sebo y poros en clima húmedo sin resecar.</p>
              <div className="prod-footer">
                <div className="prod-tags"><span className="prod-tag">Low pH</span><span className="prod-tag">BHA</span></div>
              </div>
            </div>
          </div>

          <div className="prod-card reveal">
            <div className="prod-visual" style={{ background: 'radial-gradient(circle at 30% 40%, #D8E5F3 0%, #a8c4e0 100%)' }}>
              <span className="prod-badge">⭐ Estrella</span>
            </div>
            <div className="prod-info">
              <p className="prod-brand">Selección Onni · Protección solar</p>
              <h3 className="prod-name">Protector Solar SPF50+ PA++++</h3>
              <p className="prod-claim">El SPF que el Caribe necesitaba. Sin cast blanco, textura leche, reef-safe. Protección UV máxima.</p>
              <div className="prod-footer">
                <div className="prod-tags"><span className="prod-tag">SPF50+</span><span className="prod-tag">PA++++</span></div>
              </div>
            </div>
          </div>

          <div className="prod-card reveal">
            <div className="prod-visual" style={{ background: 'radial-gradient(circle at 30% 40%, #FBEBBB 0%, #f5d77a 100%)' }}>
            </div>
            <div className="prod-info">
              <p className="prod-brand">Selección Onni · Sérum hidratante</p>
              <h3 className="prod-name">Sérum Niacinamide 5% + Peach</h3>
              <p className="prod-claim">Luminosidad e hidratación en textura ultra-ligera. Niacinamida 5%, triple hialurónico, arbutina.</p>
              <div className="prod-footer">
                <div className="prod-tags"><span className="prod-tag">Hydrating</span><span className="prod-tag">Glow</span></div>
              </div>
            </div>
          </div>

          <div className="prod-card reveal">
            <div className="prod-visual" style={{ background: 'radial-gradient(circle at 30% 40%, #D8E5F3 0%, #a8c4e0 100%)' }}>
            </div>
            <div className="prod-info">
              <p className="prod-brand">Selección Onni · Tratamiento express</p>
              <h3 className="prod-name">Sheet Masks — Caja x10</h3>
              <p className="prod-claim">Visible en 20 minutos. Clean beauty, packaging biodegradable, reef-safe. El regalo perfecto.</p>
              <div className="prod-footer">
                <div className="prod-tags"><span className="prod-tag">Clean</span><span className="prod-tag">Reef-safe</span></div>
              </div>
            </div>
          </div>

          <div className="prod-card reveal">
            <div className="prod-visual" style={{ background: 'radial-gradient(circle at 30% 40%, #C9B8E8 0%, #a893d4 100%)' }}>
              <span className="prod-badge">⭐ Estrella</span>
            </div>
            <div className="prod-info">
              <p className="prod-brand">Selección Onni · Antiedad</p>
              <h3 className="prod-name">Sérum Retinol + Bakuchiol</h3>
              <p className="prod-claim">Firmeza, renovación celular y reducción de arrugas. Bakuchiol sin fotosensibilización — seguro con UV 12 del Caribe.</p>
              <div className="prod-footer">
                <div className="prod-tags"><span className="prod-tag">Retinol</span><span className="prod-tag">Bakuchiol</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CARIBE */}
      <section className="caribe" id="caribe">
        <div className="reveal">
          <span className="section-label">La ciencia detrás del Caribe</span>
          <h2 className="section-title" style={{ marginBottom: 24 }}>Por qué el Caribe<br />necesita su <em>propio K-beauty</em></h2>
          <div className="caribe-left">
            <p>El Caribe tiene un clima único que destruye los productos formulados para otros mercados. Corea lleva 30 años perfeccionando <strong>exactamente los activos que funcionan aquí</strong>: SPF ligero sin cast, niacinamida para manchas, texturas que no sofocan con 35°C y 85% de humedad.</p>
            <p style={{ marginBottom: 0 }}>Onni hace la traducción. Seleccionamos los productos con la fórmula correcta para este clima específico, los probamos y los traemos.</p>
          </div>
          <div className="caribe-tags">
            <span className="caribe-tag">República Dominicana</span>
            <span className="caribe-tag">Turks &amp; Caicos</span>
            <span className="caribe-tag">Puerto Rico</span>
            <span className="caribe-tag">Trinidad</span>
          </div>
        </div>
        <div className="caribe-facts reveal">
          <div className="fact">
            <div className="fact-n">UV 12</div>
            <div className="fact-l">Índice UV en el Caribe</div>
            <div className="fact-d">Versus 3–5 en Seúl. El SPF 50+ PA++++ no es cosmética — es salud pública en el Caribe.</div>
          </div>
          <div className="fact">
            <div className="fact-n">85%</div>
            <div className="fact-l">Humedad relativa media</div>
            <div className="fact-d">Las cremas densas sofocan la piel. Las texturas gel y water-based son la solución.</div>
          </div>
          <div className="fact">
            <div className="fact-n">PIH</div>
            <div className="fact-l">El problema número uno</div>
            <div className="fact-d">Hiperpigmentación post-inflamatoria. Nadie había traído la solución coreana al Caribe.</div>
          </div>
        </div>
      </section>

      {/* B2B */}
      <section className="b2b" id="b2b">
        <div className="b2b-header reveal">
          <span className="section-label">Distribución B2B</span>
          <h2 className="section-title">Solicita ser<br /><em>Punto Onni</em></h2>
          <p>Trabajamos con clínicas estéticas, spas y tiendas especializadas en República Dominicana y el Caribe.</p>
        </div>

        <div className="b2b-contact reveal">
          <div className="b2b-contact-l">
            <h3>Solicita ser<br /><em>Punto Onni</em></h3>
            <p>Escríbenos con los datos de tu establecimiento y te enviamos el dossier de producto, condiciones de distribución y pricing B2B.</p>
            <p className="b2b-supervision">Revisamos cada solicitud personalmente. Te respondemos en 48 horas.</p>
          </div>
          <ContactForm lang={lang} />
        </div>

        <div className="b2b-canales b2b-canales-3">
          <div className="b2b-canal reveal"><span className="b2b-circle" style={{ background: '#D8E5F3' }} /><h3>Clínicas estéticas</h3><p>Línea para prescripción dermatológica. Argumentario científico incluido.</p></div>
          <div className="b2b-canal reveal"><span className="b2b-circle" style={{ background: '#FBD0DF' }} /><h3>Spas &amp; bienestar</h3><p>Kit de cabina disponible. Formación en K-beauty para tu equipo.</p></div>
          <div className="b2b-canal reveal"><span className="b2b-circle" style={{ background: '#FBEBBB' }} /><h3>Tiendas especializadas</h3><p>Distribución exclusiva por zona. Material de visual merchandising incluido.</p></div>
        </div>
      </section>

      {/* EXPANSIÓN */}
      <section className="expansion" id="expansion">
        <div className="expansion-header reveal">
          <span className="section-label">Expansión regional</span>
          <h2 className="section-title">Onni llega<br />a todo el <em>Caribe</em></h2>
          <p>Mismo clima. Misma necesidad. Una sola marca que entiende el Caribe entero.</p>
        </div>
        <div className="expansion-accordion reveal">
          {[
            { id: 'phase-1', label: 'Activo 2026', status: 's-activo', countries: [{ flag: '🇩🇴', name: 'Rep. Dominicana', desc: 'Base · SD + Punta Cana' }] },
            { id: 'phase-2', label: 'Próximamente', status: 's-pronto', countries: [{ flag: '🇹🇨', name: 'Turks & Caicos', desc: 'Providenciales · Premium' }] },
            { id: 'phase-3', label: '2026', status: 's-pronto', countries: [{ flag: '🇵🇷', name: 'Puerto Rico', desc: 'San Juan · Puerta EE.UU.' }, { flag: '🇹🇹', name: 'Trinidad & Tobago', desc: 'Mayor PIB del Caribe' }] },
            { id: 'phase-4', label: '2027', status: 's-futuro', countries: [{ flag: '🇯🇲', name: 'Jamaica', desc: 'Kingston · 3M hab.' }, { flag: '🇧🇧', name: 'Barbados', desc: 'Bridgetown · Premium' }, { flag: '🇨🇼', name: 'Curazao', desc: 'Willemstad · Europa' }, { flag: '🇦🇼', name: 'Aruba', desc: 'Oranjestad · Turismo' }] },
            { id: 'phase-5', label: '2028', status: 's-futuro', countries: [{ flag: '🇲🇶', name: 'Martinica', desc: 'Dpto. francés' }, { flag: '🇬🇵', name: 'Guadalupe', desc: 'Caribe francófono' }, { flag: '🇻🇮', name: 'Islas Vírgenes US', desc: 'St. Thomas · USA' }] },
            { id: 'phase-6', label: '2029+', status: 's-futuro', countries: [{ flag: '🇸🇷', name: 'Surinam', desc: 'Caribe continental' }, { flag: '🇧🇿', name: 'Belice', desc: 'Puente LATAM-Caribe' }, { flag: '🇭🇹', name: 'Haití', desc: '11M hab. · Con socio local' }] },
          ].map((phase) => (
            <div key={phase.id} className="accordion-phase">
              <button
                className={`accordion-trigger${expandedPhase === phase.id ? ' open' : ''}`}
                onClick={() => setExpandedPhase(expandedPhase === phase.id ? null : phase.id)}
              >
                <span className={`country-status ${phase.status}`}>{phase.label}</span>
                <span className="accordion-count">{phase.countries.length} {phase.countries.length === 1 ? 'país' : 'países'}</span>
                <span className="accordion-arrow">{expandedPhase === phase.id ? '−' : '+'}</span>
              </button>
              {expandedPhase === phase.id && (
                <div className="accordion-content">
                  {phase.countries.map((c) => (
                    <div key={c.name} className="accordion-country">
                      <span className="country-flag">{c.flag}</span>
                      <div>
                        <div className="country-name">{c.name}</div>
                        <p className="country-desc">{c.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-top">
          <div className="footer-brand">
            <span className="logo"><em>O</em>NNI</span>
            <span className="tagline">언니 · K-Beauty Formulado para el Caribe</span>
            <p>K-Beauty seleccionado para el Caribe.</p>
          </div>
          <div className="footer-col">
            <h4>Productos</h4>
            <ul>
              <li><a href="#productos">Sérums</a></li>
              <li><a href="#productos">Limpiadores</a></li>
              <li><a href="#productos">Protección solar</a></li>
              <li><a href="#productos">Mascarillas</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Empresa</h4>
            <ul>
              <li><a href="#nosotras">Nuestra historia</a></li>
              <li><a href="#caribe">Por qué el Caribe</a></li>
              <li><a href="#puntos">Puntos Onni</a></li>
              <li><a href="#expansion">Expansión</a></li>
              <li><a href="#">Onni Academy</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>B2B</h4>
            <ul>
              <li><a href="#b2b">Farmacias</a></li>
              <li><a href="#b2b">Clínicas estéticas</a></li>
              <li><a href="#b2b">Spas &amp; wellness</a></li>
              <li><a href="#b2b">Dermatólogos</a></li>
              <li><a href="#b2b">Esteticistas</a></li>
              <li><a href="#b2b">Profesionales independientes</a></li>
              <li><a href="#b2b">Contacto</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 Onni Cosmetics. Hecho con <span>♥</span> para el Caribe.</p>
          <div className="footer-social">
            <a href="#">Instagram</a>
            <a href="#">TikTok</a>
            <a href="#">WhatsApp</a>
          </div>
        </div>
      </footer>
    </>
  )
}
