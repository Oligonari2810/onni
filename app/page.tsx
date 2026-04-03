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
          <p className="distro-desc">Trabajamos con clínicas estéticas, spas y profesionales que buscan una línea K-Beauty seleccionada para el clima del Caribe y con potencial real de rotación en cabina y retail. ONNI desarrolla puntos selectivos por zona, con catálogo validado, soporte comercial y enfoque de prescripción.</p>
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
            <p>Selección enfocada en rotación y uso real en clima tropical.</p>
          </div>
          <div className="distro-card reveal">
            <span className="distro-circle" style={{ background: '#E2F3DC' }} />
            <h3>Soporte comercial y formación</h3>
            <p>Te ayudamos a integrar y vender la línea dentro de tu servicio.</p>
          </div>
        </div>
        <div className="distro-cta reveal">
          <a href="#b2b" className="btn-primary">Solicitar punto ONNI en tu zona</a>
          <p className="distro-micro">Seleccionamos un número limitado de puntos por zona.</p>
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
            <h3>Radiación UV constante</h3>
            <p>Requiere protectores que realmente se usen a diario, sin residuo ni incomodidad.</p>
          </div>
          <div className="contexto-card reveal">
            <span className="distro-circle" style={{ background: '#FBEBBB' }} />
            <h3>Humedad que satura la piel</h3>
            <p>En clima tropical, las texturas densas saturan la piel y provocan brotes. Las fórmulas ligeras evitan ese problema.</p>
          </div>
          <div className="contexto-card reveal">
            <span className="distro-circle" style={{ background: '#E2F3DC' }} />
            <h3>Manchas y PIH recurrentes</h3>
            <p>Requiere activos bien elegidos y buena tolerancia cutánea en uso diario.</p>
          </div>
        </div>
        <p className="contexto-closing reveal">Por eso ONNI no importa por catálogo. Selecciona lo que funciona aquí.</p>
      </section>

      {/* PRODUCTOS */}
      <section className="catalogo" id="productos">
        <div className="catalogo-header reveal">
          <span className="section-label">Selección ONNI</span>
          <h2 className="section-title">Una línea pensada para prescripción<br /><em>en clima tropical</em></h2>
          <p className="catalogo-desc">Siete productos, cuatro necesidades clave del Caribe: protección solar, manchas, limpieza adaptada a humedad y tratamiento complementario.</p>
        </div>
        <div className="catalogo-grid">
          <div className="catalogo-card reveal">
            <span className="distro-circle" style={{ background: '#FBEBBB' }} />
            <span className="catalogo-cat">Manchas</span>
            <h3>Sérum Niacinamide + TXA</h3>
            <p className="catalogo-benefit">Ayuda a mejorar hiperpigmentación y tono desigual.</p>
            <p className="catalogo-micro">Para piel con marcas, PIH o manchas visibles.</p>
          </div>
          <div className="catalogo-card reveal">
            <span className="distro-circle" style={{ background: '#E2F3DC' }} />
            <span className="catalogo-cat">Limpieza</span>
            <h3>Aceite limpiador Gentle Black</h3>
            <p className="catalogo-benefit">Retira SPF, sebo y residuos sin dejar sensación pesada.</p>
            <p className="catalogo-micro">Ideal para doble limpieza en piel grasa o mixta.</p>
          </div>
          <div className="catalogo-card reveal">
            <span className="distro-circle" style={{ background: '#E2F3DC' }} />
            <span className="catalogo-cat">Limpieza</span>
            <h3>Espuma Heartleaf</h3>
            <p className="catalogo-benefit">Limpia sin resecar y ayuda a mantener equilibrio en clima húmedo.</p>
            <p className="catalogo-micro">Para uso diario en piel con sebo, poros o sensibilidad.</p>
          </div>
          <div className="catalogo-card reveal">
            <span className="distro-circle" style={{ background: '#D8E5F3' }} />
            <span className="catalogo-cat">Protección solar</span>
            <h3>Protector solar SPF50+</h3>
            <p className="catalogo-benefit">Protección alta con textura ligera y uso cómodo diario.</p>
            <p className="catalogo-micro">Pensado para alta radiación UV y clima tropical.</p>
          </div>
          <div className="catalogo-card reveal">
            <span className="distro-circle" style={{ background: '#D8E5F3' }} />
            <span className="catalogo-cat">Hidratación</span>
            <h3>Sérum Peach + Niacinamide</h3>
            <p className="catalogo-benefit">Aporta luminosidad e hidratación con textura ligera.</p>
            <p className="catalogo-micro">Para piel opaca o deshidratada en clima cálido.</p>
          </div>
          <div className="catalogo-card reveal">
            <span className="distro-circle" style={{ background: '#D8E5F3' }} />
            <span className="catalogo-cat">Tratamiento complementario</span>
            <h3>Sheet Masks x10</h3>
            <p className="catalogo-benefit">Aporte rápido de hidratación y confort.</p>
            <p className="catalogo-micro">Útiles en cabina, regalo o activación de rutina.</p>
          </div>
          <div className="catalogo-card reveal">
            <span className="distro-circle" style={{ background: '#C9B8E8' }} />
            <span className="catalogo-cat">Antiedad</span>
            <h3>Sérum Retinol + Bakuchiol</h3>
            <p className="catalogo-benefit">Apoya renovación y firmeza con enfoque tolerable.</p>
            <p className="catalogo-micro">Para rutina nocturna en piel que busca prevención o corrección.</p>
          </div>
        </div>
        <p className="catalogo-closing reveal">Cada producto cumple una función concreta. La línea completa se entiende mejor en protocolo.</p>
        <div className="catalogo-cta reveal">
          <a href="#b2b" className="btn-primary">Solicitar dossier B2B</a>
        </div>
      </section>

      {/* B2B */}
      <section className="b2b-v3" id="b2b">
        <div className="b2b-v3-header reveal">
          <span className="section-label">Solicitud B2B</span>
          <h2 className="section-title b2b-v3-title">Solicita información para<br /><em>tu punto ONNI</em></h2>
          <p className="b2b-v3-desc">Si tu clínica, spa o espacio profesional encaja con el modelo ONNI, te enviaremos dossier de producto, condiciones de distribución y siguiente paso comercial.</p>
          <p className="b2b-v3-filter">Trabajamos de forma selectiva y revisamos cada solicitud personalmente.</p>
        </div>
        <div className="b2b-v3-form reveal">
          <ContactForm />
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
            { id: 'phase-1', label: 'Activo · 2026', status: 's-activo', title: 'República Dominicana', text: 'Base de operaciones · Santo Domingo + Punta Cana' },
            { id: 'phase-2', label: 'Próximamente · 2026', status: 's-pronto', title: 'Turks & Caicos', text: 'Providenciales · Mercado premium anglófono' },
            { id: 'phase-3', label: '2026', status: 's-pronto', title: 'Puerto Rico · Trinidad & Tobago', text: 'Puerta al mercado hispano EE.UU. · Mayor PIB del Caribe' },
            { id: 'phase-4', label: '2027', status: 's-futuro', title: 'Jamaica · Barbados · Curazao · Aruba', text: 'Caribe anglófono y holandés' },
            { id: 'phase-5', label: '2028', status: 's-futuro', title: 'Martinica · Guadalupe · Islas Vírgenes US', text: 'Caribe francófono y americano' },
            { id: 'phase-6', label: '2029+', status: 's-futuro', title: 'Surinam · Belice · Haití', text: 'Con socios locales' },
          ].map((phase) => (
            <div key={phase.id} className={`accordion-phase${phase.id === 'phase-1' ? ' accordion-phase-active' : ''}`}>
              <button
                className={`accordion-trigger${expandedPhase === phase.id ? ' open' : ''}`}
                onClick={() => setExpandedPhase(expandedPhase === phase.id ? null : phase.id)}
              >
                <span className={`country-status ${phase.status}`}>{phase.label}</span>
                <span className="accordion-title">{phase.title}</span>
                <span className="accordion-arrow">{expandedPhase === phase.id ? '−' : '+'}</span>
              </button>
              {expandedPhase === phase.id && (
                <div className="accordion-content">
                  <p className="accordion-text">{phase.text}</p>
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
              <li><a href="#nosotras">Nosotros</a></li>
              <li><a href="#productos">Productos</a></li>
              <li><a href="#expansion">Expansión</a></li>
              <li><a href="#">Onni Academy</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>B2B</h4>
            <ul>
              <li><a href="#b2b">Clínicas estéticas</a></li>
              <li><a href="#b2b">Spas &amp; wellness</a></li>
              <li><a href="#b2b">Dermatólogos</a></li>
              <li><a href="#b2b">Esteticistas</a></li>
              <li><a href="#b2b" className="footer-link-sm">Profesionales independientes</a></li>
              <li><a href="#b2b">Contacto</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 Onni Cosmetics · Arias Group Caribe SRL</p>
          <div className="footer-social">
            <a href="https://www.instagram.com/onni_cosmetics_rd/" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://wa.me/18494754442" target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </div>
        </div>
      </footer>
    </>
  )
}
