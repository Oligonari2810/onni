'use client'

import { useState, useEffect, useRef } from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import ContactForm from '@/components/ContactForm'
import { type Language } from '@/lib/i18n'

export default function Home() {
  const [lang, setLang] = useState<Language>('es')
  const [puntosFilter, setPuntosFilter] = useState('all')

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

  // Filter puntos
  const filterPuntos = (type: string, city: string) => {
    if (puntosFilter === 'all') return true
    if (puntosFilter === 'sd' || puntosFilter === 'pc') return city === puntosFilter
    return type === puntosFilter
  }

  const showSD = puntosFilter !== 'pc'
  const showPC = puntosFilter !== 'sd'

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

      {/* POR QUÉ */}
      <section className="why">
        <div className="why-header reveal">
          <span className="section-label">Por qué K-beauty para el Caribe</span>
          <h2 className="section-title" style={{ color: 'var(--white)' }}>Tu clima tiene necesidades<br /><em>que nadie estaba sirviendo</em></h2>
        </div>
        <div className="why-grid">
          <div className="why-card reveal">
            <span className="why-icon">☀️</span>
            <h3>Índice UV extremo</h3>
            <p>El Caribe tiene UV <strong>10–12</strong> frente al 3–5 de Seúl. El SPF 50+ PA++++ no es lujo — es necesidad. K-beauty lleva 30 años perfeccionándolo sin cast blanco.</p>
          </div>
          <div className="why-card reveal">
            <span className="why-icon">🌿</span>
            <h3>Hiperpigmentación tropical</h3>
            <p>En el Caribe la hiperpigmentación post-inflamatoria es el problema número uno. <strong>Niacinamida + ácido tranexámico + arbutina</strong> es la tríada que funciona. Nadie la había traído aquí.</p>
          </div>
          <div className="why-card reveal">
            <span className="why-icon">💧</span>
            <h3>Humedad y sebo</h3>
            <p>Con 70–90% de humedad constante, las cremas densas sofocan y generan acné. K-beauty inventó las texturas <strong>gel y water-based</strong> exactamente para esto.</p>
          </div>
        </div>
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
            <div className="prod-visual" style={{ background: 'linear-gradient(135deg,#fce4ec,#f8bbd0)' }}>
              <span className="prod-emoji">✨</span>
              <span className="prod-badge">⭐ Estrella</span>
            </div>
            <div className="prod-info">
              <p className="prod-brand">Selección Onni · Sérum tratamiento</p>
              <h3 className="prod-name">Sérum Niacinamide 10% + TXA 4%</h3>
              <p className="prod-claim">Manchas, hiperpigmentación, unificación de tono. La tríada activa más potente para el clima del Caribe.</p>
              <div className="prod-footer">
                <div className="prod-price">$28–32 <span>USD</span></div>
                <div className="prod-tags"><span className="prod-tag">Niacinamide</span><span className="prod-tag">TXA</span></div>
              </div>
            </div>
          </div>

          <div className="prod-card reveal">
            <div className="prod-visual" style={{ background: 'linear-gradient(135deg,#1a1a2e,#2c1a24)' }}>
              <span className="prod-emoji">🌑</span>
            </div>
            <div className="prod-info">
              <p className="prod-brand">Selección Onni · Limpieza paso 1</p>
              <h3 className="prod-name">Aceite Limpiador Gentle Black</h3>
              <p className="prod-claim">Doble limpieza para piel grasa tropical. Sin fragancia, emulsifica al instante, no deja residuo.</p>
              <div className="prod-footer">
                <div className="prod-price">$22–26 <span>USD</span></div>
                <div className="prod-tags"><span className="prod-tag">Oil cleanse</span><span className="prod-tag">Sin alcohol</span></div>
              </div>
            </div>
          </div>

          <div className="prod-card reveal">
            <div className="prod-visual" style={{ background: 'linear-gradient(135deg,#e8f5e9,#c8e6c9)' }}>
              <span className="prod-emoji">🌿</span>
            </div>
            <div className="prod-info">
              <p className="prod-brand">Selección Onni · Limpieza paso 2</p>
              <h3 className="prod-name">Espuma Limpiadora Heartleaf</h3>
              <p className="prod-claim">Low-pH para equilibrar el microbioma. Controla sebo y poros en clima húmedo sin resecar.</p>
              <div className="prod-footer">
                <div className="prod-price">$18–22 <span>USD</span></div>
                <div className="prod-tags"><span className="prod-tag">Low pH</span><span className="prod-tag">BHA</span></div>
              </div>
            </div>
          </div>

          <div className="prod-card reveal">
            <div className="prod-visual" style={{ background: 'linear-gradient(135deg,#fff9c4,#fff176)' }}>
              <span className="prod-emoji">☀️</span>
              <span className="prod-badge">⭐ Estrella</span>
            </div>
            <div className="prod-info">
              <p className="prod-brand">Selección Onni · Protección solar</p>
              <h3 className="prod-name">Protector Solar SPF50+ PA++++</h3>
              <p className="prod-claim">El SPF que el Caribe necesitaba. Sin cast blanco, textura leche, reef-safe. Protección UV máxima.</p>
              <div className="prod-footer">
                <div className="prod-price">$26–30 <span>USD</span></div>
                <div className="prod-tags"><span className="prod-tag">SPF50+</span><span className="prod-tag">PA++++</span></div>
              </div>
            </div>
          </div>

          <div className="prod-card reveal">
            <div className="prod-visual" style={{ background: 'linear-gradient(135deg,#fce4ec,#ffe0b2)' }}>
              <span className="prod-emoji">🍑</span>
            </div>
            <div className="prod-info">
              <p className="prod-brand">Selección Onni · Sérum hidratante</p>
              <h3 className="prod-name">Sérum Niacinamide 5% + Peach</h3>
              <p className="prod-claim">Luminosidad e hidratación en textura ultra-ligera. Niacinamida 5%, triple hialurónico, arbutina.</p>
              <div className="prod-footer">
                <div className="prod-price">$20–24 <span>USD</span></div>
                <div className="prod-tags"><span className="prod-tag">Hydrating</span><span className="prod-tag">Glow</span></div>
              </div>
            </div>
          </div>

          <div className="prod-card reveal">
            <div className="prod-visual" style={{ background: 'linear-gradient(135deg,#e3f2fd,#bbdefb)' }}>
              <span className="prod-emoji">🌊</span>
            </div>
            <div className="prod-info">
              <p className="prod-brand">Selección Onni · Tratamiento express</p>
              <h3 className="prod-name">Sheet Masks — Caja x10</h3>
              <p className="prod-claim">Visible en 20 minutos. Clean beauty, packaging biodegradable, reef-safe. El regalo perfecto.</p>
              <div className="prod-footer">
                <div className="prod-price">$22–26 <span>USD · caja</span></div>
                <div className="prod-tags"><span className="prod-tag">Clean</span><span className="prod-tag">Reef-safe</span></div>
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

      {/* TESTIMONIOS */}
      <section className="testimonios">
        <div className="testimonios-header reveal">
          <span className="section-label">Lo que dicen</span>
          <h2 className="section-title">Quienes ya <em>confían en Onni</em></h2>
        </div>
        <div className="testi-grid">
          <div className="testi reveal">
            <div className="testi-stars">★★★★★</div>
            <p className="testi-text">Llevaba años buscando un SPF que no dejara cara blanca. El de Onni es el primero que realmente funciona. Lo uso todos los días y no se nota absolutamente nada.</p>
            <div className="testi-footer">
              <div className="testi-avatar">👤</div>
              <div><div className="testi-name">María J.</div><div className="testi-role">Santo Domingo · Cliente</div></div>
            </div>
          </div>
          <div className="testi reveal">
            <div className="testi-stars">★★★★★</div>
            <p className="testi-text">Como farmacéutica me sorprendió la calidad de los ingredientes activos. El sérum de niacinamida al 10% es comparable a marcas dermatológicas europeas a la mitad del precio.</p>
            <div className="testi-footer">
              <div className="testi-avatar">👤</div>
              <div><div className="testi-name">Dra. Valentina R.</div><div className="testi-role">Farmacéutica · Naco</div></div>
            </div>
          </div>
          <div className="testi reveal">
            <div className="testi-stars">★★★★★</div>
            <p className="testi-text">En 6 semanas vi la diferencia en mis manchas. Por fin una selección que entiende lo que le pasa a nuestra piel en este clima. Onni llegó para quedarse.</p>
            <div className="testi-footer">
              <div className="testi-avatar">👤</div>
              <div><div className="testi-name">Carlos M.</div><div className="testi-role">Punta Cana · Cliente</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* CREDIBILIDAD */}
      <div className="cred">
        <div className="cred-item"><span className="cred-icon">🇰🇷</span><span className="cred-text">Origen certificado · Corea del Sur</span></div>
        <div className="cred-item"><span className="cred-icon">✓</span><span className="cred-text">Registro MISPAS en trámite</span></div>
        <div className="cred-item"><span className="cred-icon">🌿</span><span className="cred-text">Sin alcohol denat · Sin parabenos</span></div>
        <div className="cred-item"><span className="cred-icon">🌊</span><span className="cred-text">Reef-safe · SPF certificado</span></div>
        <div className="cred-item"><span className="cred-icon">🧪</span><span className="cred-text">Testado dermatológicamente</span></div>
        <div className="cred-item"><span className="cred-icon">📦</span><span className="cred-text">Envío · República Dominicana</span></div>
      </div>

      {/* PUNTOS ONNI */}
      <section className="puntos" id="puntos">
        <div className="puntos-header reveal">
          <span className="section-label">Red de distribución exclusiva</span>
          <h2 className="section-title">Puntos <em>Onni</em> seleccionados</h2>
          <p>Onni no está en todas partes. <strong>Está en los lugares correctos.</strong> Cada punto es elegido por su alineación con los valores de marca, capacidad de prescripción y exclusividad por zona.</p>
        </div>

        <div className="puntos-filters">
          {[
            { key: 'all', label: 'Todos' },
            { key: 'farmacia', label: '💊 Farmacias' },
            { key: 'clinica', label: '🏥 Clínicas' },
            { key: 'spa', label: '🌸 Spas' },
            { key: 'sd', label: 'Santo Domingo' },
            { key: 'pc', label: 'Punta Cana' },
          ].map((f) => (
            <button
              key={f.key}
              className={`pf${puntosFilter === f.key ? ' active' : ''}`}
              onClick={() => setPuntosFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>

        {showSD && (
          <div className="puntos-city reveal" id="city-sd">
            <div className="puntos-city-title">Santo Domingo <span className="puntos-city-count">11 puntos</span></div>
            <div className="puntos-grid">
              {[
                { icon: '💊', name: 'Carol · Naco', addr: 'Av. Gustavo Mejía Ricart No. 24', type: 'farmacia' },
                { icon: '💊', name: 'Carol · Bella Vista', addr: 'Av. Sarasota No. 101 · 24h', type: 'farmacia' },
                { icon: '💊', name: 'Carol · Churchill', addr: 'Av. Winston Churchill esq. Mejía Ricart · 24h', type: 'farmacia' },
                { icon: '💊', name: 'Los Hidalgos · Piantini', addr: 'Ensanche Piantini, Santo Domingo', type: 'farmacia' },
                { icon: '💊', name: 'Los Hidalgos · Naco', addr: 'Ensanche Naco, Santo Domingo', type: 'farmacia' },
                { icon: '💊', name: 'Medicar GBC · Naco', addr: 'Av. Tiradentes #56, Plaza Armiben', type: 'farmacia' },
                { icon: '🏥', name: 'InMed · Piantini', addr: 'Instituto de Medicina Estética', type: 'clinica' },
                { icon: '🏥', name: 'Sesderma Skin Center', addr: 'Acrópolis Business Mall · Piantini', type: 'clinica' },
                { icon: '🏥', name: 'Cifré · Clínica Estética', addr: 'Av. Independencia, Plaza El Portal', type: 'clinica' },
                { icon: '🌸', name: 'Etra Spa · Piantini', addr: 'Ensanche Piantini · Cadena nacional', type: 'spa' },
              ].filter((p) => filterPuntos(p.type, 'sd')).map((p) => (
                <div key={p.name} className="pc" data-type={p.type} data-city="sd">
                  <span className="pc-icon">{p.icon}</span>
                  <h4>{p.name}</h4>
                  <p>{p.addr}</p>
                  <span className="pc-badge">Lanzamiento 2025</span>
                </div>
              ))}
              {(puntosFilter === 'all' || puntosFilter === 'sd' || puntosFilter === 'farmacia') && (
                <div className="pc ghost" data-type="farmacia" data-city="sd">
                  <span className="pc-icon" style={{ filter: 'grayscale(1)' }}>➕</span>
                  <h4 style={{ color: 'var(--gray)' }}>En selección</h4>
                  <p>Próximo punto Onni · SD 2025</p>
                </div>
              )}
            </div>
          </div>
        )}

        {showPC && (
          <div className="puntos-city reveal" id="city-pc" style={{ marginTop: 48 }}>
            <div className="puntos-city-title">Punta Cana · Bávaro <span className="puntos-city-count">7 puntos</span></div>
            <div className="puntos-grid">
              {[
                { icon: '💊', name: 'Carol · Blue Mall', addr: 'Boulevard Turístico esq. Juanillo', type: 'farmacia' },
                { icon: '💊', name: 'Los Hidalgos · Bávaro', addr: 'Bávaro City Center · Delivery hoteles', type: 'farmacia' },
                { icon: '💊', name: 'Medicar GBC · Bávaro', addr: 'Bávaro · Apertura 2024', type: 'farmacia' },
                { icon: '🏥', name: 'ProfEstetic', addr: 'Plaza Paseo San Juan · Bávaro', type: 'clinica' },
                { icon: '🏥', name: 'CM-Clinic', addr: 'Av. Alemania, junto Hotel Secrets', type: 'clinica' },
                { icon: '🌸', name: 'Serenity Beauty Studio', addr: 'Plaza Barceló Local 211 · Bávaro', type: 'spa' },
                { icon: '🌸', name: 'Etra Spa · Punta Cana', addr: 'Hotel Ocean Blue + VIK Arena Blanca', type: 'spa' },
              ].filter((p) => filterPuntos(p.type, 'pc')).map((p) => (
                <div key={p.name} className="pc" data-type={p.type} data-city="pc">
                  <span className="pc-icon">{p.icon}</span>
                  <h4>{p.name}</h4>
                  <p>{p.addr}</p>
                  <span className="pc-badge">Lanzamiento 2025</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="exclusividad reveal">
          <div className="excl-left">
            <span className="section-label" style={{ color: 'var(--blush)' }}>Política de distribución</span>
            <h3>Onni elige a sus <em>puntos</em></h3>
            <p>No trabajamos con cualquier establecimiento. Buscamos socios que compartan nuestra visión: <span>prescribir con conocimiento, no solo vender.</span> Cada punto es exclusivo en su zona — si tu competidor llega primero, la ventana se cierra.</p>
          </div>
          <div className="excl-criteria">
            <div className="excl-item"><span className="excl-num">01</span><div className="excl-text"><h4>Alineación de valores</h4><p>Cuidado profesional, no solo comercial.</p></div></div>
            <div className="excl-item"><span className="excl-num">02</span><div className="excl-text"><h4>Capacidad de prescripción</h4><p>Personal que entiende y explica K-beauty.</p></div></div>
            <div className="excl-item"><span className="excl-num">03</span><div className="excl-text"><h4>Exclusividad por zona</h4><p>Un solo punto Onni por área geográfica.</p></div></div>
          </div>
        </div>

        <div className="puntos-cta reveal">
          <p>¿Tu establecimiento quiere ser Punto Onni?</p>
          <a href="#b2b" className="btn-primary">Solicitar distribución →</a>
        </div>
      </section>

      {/* B2B */}
      <section className="b2b" id="b2b">
        <div className="b2b-header reveal">
          <span className="section-label">Distribución B2B</span>
          <h2 className="section-title">¿Eres farmacia, clínica<br />o <em>espacio de belleza</em>?</h2>
          <p>Trabajamos con distribuidores, farmacias, clínicas estéticas y spas en República Dominicana y el Caribe.</p>
        </div>
        <div className="b2b-canales">
          <div className="b2b-canal reveal"><span className="icon">💊</span><h3>Farmacias</h3><p>Documentación MISPAS completa. Margen atractivo para el canal farmacéutico.</p></div>
          <div className="b2b-canal reveal"><span className="icon">🏥</span><h3>Clínicas estéticas</h3><p>Línea para prescripción dermatológica. Argumentario científico incluido.</p></div>
          <div className="b2b-canal reveal"><span className="icon">🌸</span><h3>Spas &amp; bienestar</h3><p>Kit de cabina disponible. Formación en K-beauty para tu equipo.</p></div>
          <div className="b2b-canal reveal"><span className="icon">🛍️</span><h3>Tiendas especializadas</h3><p>Distribución exclusiva por zona. Material de visual merchandising incluido.</p></div>
        </div>
        <div className="b2b-contact reveal">
          <div className="b2b-contact-l">
            <h3>Hablemos de<br /><em>tu negocio</em></h3>
            <p>Escríbenos con los datos de tu establecimiento y te enviamos el dossier de producto, condiciones de distribución y pricing B2B en 24 horas.</p>
          </div>
          <ContactForm lang={lang} />
        </div>
      </section>

      {/* EXPANSIÓN */}
      <section className="expansion" id="expansion">
        <div className="expansion-header reveal">
          <span className="section-label">Expansión regional</span>
          <h2 className="section-title">Onni llega<br />a todo el <em>Caribe</em></h2>
          <p>Mismo clima. Misma necesidad. Una sola marca que entiende el Caribe entero.</p>
        </div>
        <div className="countries">
          <div className="country active reveal"><span className="country-flag">🇩🇴</span><div className="country-name">Rep. Dominicana</div><span className="country-status s-activo">Activo · 2025</span><p className="country-desc">Base · SD + Punta Cana</p></div>
          <div className="country reveal"><span className="country-flag">🇹🇨</span><div className="country-name">Turks &amp; Caicos</div><span className="country-status s-pronto">Próximamente</span><p className="country-desc">Providenciales · Premium</p></div>
          <div className="country reveal"><span className="country-flag">🇵🇷</span><div className="country-name">Puerto Rico</div><span className="country-status s-pronto">2026</span><p className="country-desc">San Juan · Puerta EE.UU.</p></div>
          <div className="country reveal"><span className="country-flag">🇹🇹</span><div className="country-name">Trinidad &amp; Tobago</div><span className="country-status s-pronto">2026</span><p className="country-desc">Mayor PIB del Caribe</p></div>
          <div className="country reveal"><span className="country-flag">🇯🇲</span><div className="country-name">Jamaica</div><span className="country-status s-futuro">2027</span><p className="country-desc">Kingston · 3M hab.</p></div>
          <div className="country reveal"><span className="country-flag">🇧🇧</span><div className="country-name">Barbados</div><span className="country-status s-futuro">2027</span><p className="country-desc">Bridgetown · Premium</p></div>
          <div className="country reveal"><span className="country-flag">🇨🇼</span><div className="country-name">Curazao</div><span className="country-status s-futuro">2027</span><p className="country-desc">Willemstad · Europa</p></div>
          <div className="country reveal"><span className="country-flag">🇦🇼</span><div className="country-name">Aruba</div><span className="country-status s-futuro">2027</span><p className="country-desc">Oranjestad · Turismo</p></div>
          <div className="country reveal"><span className="country-flag">🇲🇶</span><div className="country-name">Martinica</div><span className="country-status s-futuro">2028</span><p className="country-desc">Dpto. francés</p></div>
          <div className="country reveal"><span className="country-flag">🇬🇵</span><div className="country-name">Guadalupe</div><span className="country-status s-futuro">2028</span><p className="country-desc">Caribe francófono</p></div>
          <div className="country reveal"><span className="country-flag">🇻🇮</span><div className="country-name">Islas Vírgenes US</div><span className="country-status s-futuro">2028</span><p className="country-desc">St. Thomas · USA</p></div>
          <div className="country reveal"><span className="country-flag">🇸🇷</span><div className="country-name">Surinam</div><span className="country-status s-futuro">2029</span><p className="country-desc">Caribe continental</p></div>
          <div className="country reveal"><span className="country-flag">🇧🇿</span><div className="country-name">Belice</div><span className="country-status s-futuro">2029</span><p className="country-desc">Puente LATAM-Caribe</p></div>
          <div className="country reveal"><span className="country-flag">🇭🇹</span><div className="country-name">Haití</div><span className="country-status s-futuro">Largo plazo</span><p className="country-desc">11M hab. · Con socio local</p></div>
          <div className="country ghost-country reveal"><span className="country-flag">🌍</span><div className="country-name">+ Caribe</div><span className="country-status s-futuro">TBD</span><p className="country-desc">Más mercados</p></div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-top">
          <div className="footer-brand">
            <span className="logo"><em>O</em>NNI</span>
            <span className="tagline">언니 · K-Beauty Formulado para el Caribe</span>
            <p>División independiente bajo paraguas legal de FASSA (España). Distribución en República Dominicana y el Caribe.</p>
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
            </ul>
          </div>
          <div className="footer-col">
            <h4>B2B</h4>
            <ul>
              <li><a href="#b2b">Farmacias</a></li>
              <li><a href="#b2b">Clínicas</a></li>
              <li><a href="#b2b">Spas</a></li>
              <li><a href="#b2b">Contacto</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 Onni Cosmetics. Hecho con <span>♥</span> para el Caribe.</p>
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
