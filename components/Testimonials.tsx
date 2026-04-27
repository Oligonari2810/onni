const testimonials = [
  {
    text: 'Llevo dos meses usando el serum TXA y las manchas del sol se han reducido mucho. La textura es ligera, nada grasosa. Lo recomiendo para quienes vivimos en climas calidos.',
    name: 'Maria G.',
    location: 'Santo Domingo, RD',
    initials: 'MG',
  },
  {
    text: 'Pedi por WhatsApp y me respondieron al minuto. El envio llego en dos dias a Santiago. Todo bien empacado y con instrucciones claras. Cien por ciento recomendado.',
    name: 'Carlos R.',
    location: 'Santiago, RD',
    initials: 'CR',
  },
  {
    text: 'Por fin una tienda que entiende que aqui hace calor y humedad todo el ano. El protector solar no deja residuo blanco y se absorbe en segundos. Lo uso bajo maquillaje sin problema.',
    name: 'Laura M.',
    location: 'San Juan, PR',
    initials: 'LM',
  },
]

export default function Testimonials() {
  return (
    <section className="testimonials-section">
      <div className="testimonials-inner">
        <span className="section-label">Experiencias reales</span>
        <h2 className="testimonials-title">Lo que dicen nuestros clientes</h2>

        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <div key={i} className="testimonial-card">
              {/* Stars */}
              <div className="testimonial-stars">
                {[1, 2, 3, 4, 5].map((s) => (
                  <svg key={s} width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 1.333L9.796 5.396 14.167 6.15 11 9.09l.744 4.577L8 11.667l-3.744 2.1-.001.001L5 9.09 1.833 6.15l4.371-.754L8 1.333z" />
                  </svg>
                ))}
              </div>

              <p className="testimonial-text">{t.text}</p>

              <div className="testimonial-footer">
                <div className="testimonial-avatar">
                  {t.initials}
                </div>
                <div>
                  <p className="testimonial-name">{t.name}</p>
                  <p className="testimonial-location">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
