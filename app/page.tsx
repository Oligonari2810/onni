'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import ProductCard from '@/components/product/ProductCard'
import ShippingModal from '@/components/shipping/ShippingModal'
import { products } from '@/lib/products'
import SkinQuiz from '@/components/SkinQuiz'
import EmailPopup from '@/components/EmailPopup'
import ExitPopup from '@/components/ExitPopup'
import ChatWidget from '@/components/ChatWidget'

export default function Home() {
  const [shippingOpen, setShippingOpen] = useState(false)

  // MEJORA 8: Marquee pause cuando no está visible (performance)
  useEffect(() => {
    const marquee = document.querySelector('.marquee') as HTMLElement | null
    if (!marquee) return
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const target = entry.target as HTMLElement
        target.style.animationPlayState = entry.isIntersecting ? 'running' : 'paused'
      })
    }, { threshold: 0 })
    
    observer.observe(marquee)
    
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
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
    return () => reveals.forEach((el) => obs.unobserve(el))
  }, [])

  return (
    <>
      {/* MEJORA 5: Skip link para accesibilidad */}
      <a href="#main-content" className="skip-link">Saltar al contenido</a>

      <Navbar />

      {/* HERO - CON IMAGEN EAGER LOADING */}
      <section className="hero" id="hero">
        <div className="hero-content">
          <span className="hero-eyebrow">K-Beauty para piel tropical · 언니</span>
          <h1 className="hero-title">K-Beauty seleccionado<br /><em>para tu piel</em> en el Caribe</h1>
          <p className="hero-desc">Rutinas coreanas seleccionadas para <strong>humedad, sol, manchas y piel sensible</strong>. Texturas ligeras que sí funcionan en clima tropical.</p>
          <div className="hero-actions">
            <a href="#productos" className="btn-primary">Comprar ahora</a>
            <a href="#rutinas" className="btn-ghost">Ver rutinas</a>
          </div>
        </div>
        <div className="hero-image-container">
          {/* MEJORA 7: Loading eager en hero image para LCP */}
          <img 
            src="/WhatsApp Image 2026-05-02 at 12.47.30.jpeg" 
            alt="Tu hermana mayor del Caribe" 
            className="hero-image"
            loading="eager"
            fetchPriority="high"
          />
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee">
        <div className="marquee-track">
          <span className="marquee-item">Ciencia coreana</span>
          <span className="marquee-item">Formulado para el Caribe</span>
          <span className="marquee-item">Sin cast blanco</span>
          <span className="marquee-item">Texturas ligeras</span>
          <span className="marquee-item">Manchas · SPF · Humedad</span>
          <span className="marquee-item">Tu hermana mayor</span>
          <span className="marquee-item">언니 · Onni</span>
          <span className="marquee-item">Ciencia coreana</span>
          <span className="marquee-item">Formulado para el Caribe</span>
          <span className="marquee-item">Sin cast blanco</span>
          <span className="marquee-item">Texturas ligeras</span>
          <span className="marquee-item">Manchas · SPF · Humedad</span>
          <span className="marquee-item">Tu hermana mayor</span>
          <span className="marquee-item">언니 · Onni</span>
        </div>
      </div>

      {/* Main content anchor para skip link */}
      <div id="main-content" />

      {/* MANIFIESTO */}
      <section className="manifesto" id="nosotras">
        <div className="manifesto-content">
          <div className="manifesto-text">
            <span className="section-label">Nuestro manifiesto</span>
            <blockquote className="manifesto-quote">
              &ldquo;Que el Caribe tenga por primera vez productos diseñados para <em>su clima real</em>&nbsp;y su realidad.&rdquo;
            </blockquote>
            <div className="manifesto-points">
              <div className="manifesto-point">
                <span className="manifesto-num">01</span>
                <div>
                  <h4>La hermana mayor</h4>
                  <p>En coreano, Onni (언니) significa hermana mayor. La que ya pasó por lo que tú estás viviendo.</p>
                </div>
              </div>
              <div className="manifesto-point">
                <span className="manifesto-num">02</span>
                <div>
                  <h4>Curaduría, no fabricación</h4>
                  <p>No fabricamos. Seleccionamos. Entre miles de productos K-beauty escogemos los que funcionan aquí.</p>
                </div>
              </div>
              <div className="manifesto-point">
                <span className="manifesto-num">03</span>
                <div>
                  <h4>El Caribe como protagonista</h4>
                  <p>Sin estándares asiáticos ni europeos. El Caribe como referencia, no como mercado secundario.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="manifesto-image-wrapper">
            <img src="/WhatsApp Image 2026-05-02 at 12.47.30 (1).jpeg" alt="ONNI Cosmetics" className="manifesto-image" />
          </div>
        </div>
      </section>

      {/* PRODUCTOS */}
      <section className="catalogo" id="productos">
        <div className="catalogo-header">
          <span className="section-label">Best sellers</span>
          <h2 className="section-title">Best sellers para tu <em>rutina diaria</em></h2>
          <p className="catalogo-desc">Seleccionados para manchas, humedad, SPF y piel sensible en el Caribe.</p>
        </div>
        <div className="catalogo-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <p className="catalogo-closing">Cada producto cumple una función concreta. La línea completa se entiende mejor en protocolo.</p>
      </section>

      {/* RUTINAS - CON IMÁGENES */}
      <section className="rutinas" id="rutinas">
        <div className="rutinas-header">
          <span className="section-label">Tus Rutinas</span>
          <h2 className="section-title">Empieza por tu <em>rutina</em></h2>
          <p className="rutinas-desc">K-Beauty adaptado al clima del Caribe. Rutinas completas con pasos esenciales.</p>
        </div>
        <div className="rutinas-grid">
          <div className="rutina-card">
            <div className="rutina-image" style={{ background: 'linear-gradient(135deg, #FBD0DF 0%, #E8B4C8 100%)' }}>
              <span className="rutina-icon">✨</span>
            </div>
            <div className="rutina-body">
              <h3>Glow Caribeño</h3>
              <p>Para piel luminosa en clima húmedo</p>
              <div className="rutina-steps"><strong>Pasos:</strong> Limpiador · Vitamina C · SPF</div>
              <div className="rutina-price">
                <span className="rutina-price-amount">$58</span>
                <span className="rutina-save">Ahorra 15%</span>
              </div>
              <button className="rutina-btn">Comprar rutina</button>
            </div>
          </div>
          <div className="rutina-card">
            <div className="rutina-image" style={{ background: 'linear-gradient(135deg, #D8E5F3 0%, #B8D4E8 100%)' }}>
              <span className="rutina-icon">🌿</span>
            </div>
            <div className="rutina-body">
              <h3>Piel Sensible</h3>
              <p>Calma y repara piel reactiva</p>
              <div className="rutina-steps"><strong>Pasos:</strong> Limpiador suave · Toner · Crema</div>
              <div className="rutina-price">
                <span className="rutina-price-amount">$52</span>
              </div>
              <button className="rutina-btn">Comprar rutina</button>
            </div>
          </div>
          <div className="rutina-card">
            <div className="rutina-image" style={{ background: 'linear-gradient(135deg, #FBEBBB 0%, #E8D4A8 100%)' }}>
              <span className="rutina-icon">🔥</span>
            </div>
            <div className="rutina-body">
              <h3>Acné Tropical</h3>
              <p>Control de grasa y brotes</p>
              <div className="rutina-steps"><strong>Pasos:</strong> Cleanser · Niacinamida · SPF oil-free</div>
              <div className="rutina-price">
                <span className="rutina-price-amount">$60</span>
              </div>
              <button className="rutina-btn">Comprar rutina</button>
            </div>
          </div>
        </div>
      </section>

      {/* CONFIANZA B2C - LIMPIO */}
      <section className="b2c-cta">
        <div className="b2c-cta-inner">
          <span className="section-label">Compra directa</span>
          <h2 className="b2c-cta-title">ONNI para tu <em>rutina personal</em></h2>
          <p className="b2c-cta-desc">Productos originales, pagos seguros y envíos a República Dominicana y el Caribe.</p>
          <div className="b2c-cta-features">
            <span className="b2c-cta-feat">🚚 Envío Caribe</span>
            <span className="b2c-cta-feat">💳 Tarjeta internacional</span>
            <span className="b2c-cta-feat">📱 Nequi / Transferencia RD</span>
            <span className="b2c-cta-feat">🇰🇷 Importado de Corea</span>
          </div>
          <div className="b2c-cta-actions">
            <a href="#productos" className="b2c-btn-primary">Comprar ahora</a>
            <button className="b2c-btn-outline" onClick={() => setShippingOpen(true)}>Opciones de envío</button>
          </div>
        </div>
      </section>

      {/* CONTEXTO CARIBE */}
      <section className="contexto">
        <div className="contexto-header">
          <span className="section-label">El Caribe</span>
          <h2 className="contexto-title">El Caribe necesita otra<br /><em>selección cosmética</em></h2>
          <p className="contexto-desc">Alta radiación UV, humedad constante y tendencia a la hiperpigmentación exigen fórmulas, texturas y activos distintos.</p>
        </div>
        <div className="contexto-grid">
          <div className="contexto-card">
            <span className="contexto-icon">☀️</span>
            <h3>Radiación UV constante</h3>
            <p>Requiere protectores que realmente se usen a diario, sin residuo ni incomodidad.</p>
          </div>
          <div className="contexto-card">
            <span className="contexto-icon">💧</span>
            <h3>Humedad que satura la piel</h3>
            <p>En clima tropical, las texturas densas saturan la piel y provocan brotes. Las fórmulas ligeras evitan ese problema.</p>
          </div>
          <div className="contexto-card">
            <span className="contexto-icon">🔴</span>
            <h3>Manchas y PIH recurrentes</h3>
            <p>Requiere activos bien elegidos y buena tolerancia cutánea en uso diario.</p>
          </div>
        </div>
        <div className="contexto-cta">
          <a href="#productos" className="btn-primary">Ver productos recomendados</a>
        </div>
      </section>

      {/* SKIN QUIZ */}
      <SkinQuiz />

      {/* TESTIMONIOS - MEJORADO */}
      <section className="testimonios" id="reviews">
        <div className="testimonios-header">
          <span className="section-label">Reviews</span>
          <h2 className="testimonios-title">Lo que dicen nuestras clientas</h2>
        </div>
        <div className="testi-grid">
          <div className="testi">
            <div className="testi-stars">★★★★★</div>
            <p className="testi-text">"Por fin productos que funcionan en el clima de Santo Domingo. La textura ligera del cleanser es perfecta para mi piel grasa."</p>
            <div className="testi-footer">
              <div className="testi-avatar">👩</div>
              <div>
                <div className="testi-name">María José</div>
                <div className="testi-role">Santo Domingo, RD</div>
              </div>
            </div>
          </div>
          <div className="testi">
            <div className="testi-stars">★★★★★</div>
            <p className="testi-text">"Pedí la rutina Glow y llegó súper rápido. El Vitamina C ya me está quitando las manchas del sol."</p>
            <div className="testi-footer">
              <div className="testi-avatar">👩</div>
              <div>
                <div className="testi-name">Carolina</div>
                <div className="testi-role">San Juan, PR</div>
              </div>
            </div>
          </div>
          <div className="testi">
            <div className="testi-stars">★★★★★</div>
            <p className="testi-text">"Llevo un año usando los productos y mi piel nunca ha estado mejor. El Reedle Shot es mi favorito."</p>
            <div className="testi-footer">
              <div className="testi-avatar">👩🏼</div>
              <div>
                <div className="testi-name">Ana Paula</div>
                <div className="testi-role">Punta Cana, RD</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq" id="faq">
        <div className="faq-header">
          <span className="section-label">Ayuda</span>
          <h2 className="faq-title">Preguntas frecuentes</h2>
        </div>
        <div className="faq-list">
          <div className="faq-item">
            <button className="faq-question">¿Son originales los productos?</button>
            <div className="faq-answer"><p>Todos nuestros productos son 100% originales, importados directamente de laboratorios coreanos autorizados. Cada lote cuenta con registro sanitario y trazabilidad completa.</p></div>
          </div>
          <div className="faq-item">
            <button className="faq-question">¿Hacen envíos a República Dominicana y el Caribe?</button>
            <div className="faq-answer"><p>República Dominicana: entrega en 1-3 días hábiles en Santo Domingo, 3-5 días en el interior. Caribe internacional: 5-14 días según el país. Costo de envío RD: RD$250 (~$5 USD). Gratis en compras mayores a $75 USD.</p></div>
          </div>
          <div className="faq-item">
            <button className="faq-question">¿Qué métodos de pago aceptan?</button>
            <div className="faq-answer"><p>Tarjeta de crédito o débito internacional (Visa, Mastercard, AmEx) vía Stripe. Para República Dominicana: Nequi y transferencia bancaria al Banco Popular. Pago 100% anticipado en todos los casos.</p></div>
          </div>
          <div className="faq-item">
            <button className="faq-question">¿Son aptos para clima tropical?</button>
            <div className="faq-answer"><p>Sí. Seleccionamos exclusivamente productos con texturas ligeras, control de grasa y protección SPF50+ diseñados para resistir alta humedad y radiación UV. Cada producto pasa por un filtro de adaptación al clima caribeño.</p></div>
          </div>
          <div className="faq-item">
            <button className="faq-question">¿Cuánto tarda la confirmación del pedido?</button>
            <div className="faq-answer"><p>Los pedidos con tarjeta se confirman de forma automática. Los pagos por Nequi o transferencia se confirman en menos de 15 minutos en horario laboral (Lun-Sab 9am-6pm AST).</p></div>
          </div>
          <div className="faq-item">
            <button className="faq-question">¿Puedo devolver un producto?</button>
            <div className="faq-answer"><p>Aceptamos devoluciones si el producto llega dañado o no corresponde con tu pedido. Contáctanos por WhatsApp dentro de las 48 horas siguientes a la entrega con fotos del producto y tu comprobante.</p></div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-top">
          <div className="footer-brand">
            <span className="logo"><em>O</em>NNI</span>
            <p>K-Beauty seleccionado para el Caribe.</p>
          </div>
          <div className="footer-col">
            <h4>Productos</h4>
            <ul>
              <li><a href="#productos">Sérums</a></li>
              <li><a href="#productos">Limpiadores</a></li>
              <li><a href="#productos">Protección solar</a></li>
              <li><a href="#rutinas">Rutinas</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Empresa</h4>
            <ul>
              <li><a href="#nosotras">Nosotras</a></li>
              <li><a href="#productos">Productos</a></li>
              <li><a href="#reviews">Reviews</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Ayuda</h4>
            <ul>
              <li><a href="#faq">Preguntas frecuentes</a></li>
              <li><a href="#">Envíos</a></li>
              <li><a href="#">Devoluciones</a></li>
              <li><a href="#">Contacto</a></li>
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

      {/* Shipping Modal */}
      <ShippingModal isOpen={shippingOpen} onClose={() => setShippingOpen(false)} />

      {/* Enterprise Features */}
      <EmailPopup />
      <ExitPopup />
      <ChatWidget />
    </>
  )
}
