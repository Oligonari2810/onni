'use client'

import { useState } from 'react'

const faqs = [
  {
    question: 'Son originales los productos',
    answer:
      'Todos nuestros productos son 100% originales, importados directamente de laboratorios coreanos autorizados. Cada lote cuenta con registro sanitario y trazabilidad completa.',
  },
  {
    question: 'Hacen envios a Republica Dominicana y el Caribe',
    answer:
      'Republica Dominicana: entrega en 1-3 dias habiles en Santo Domingo, 3-5 dias en el interior. Caribe internacional: 5-14 dias segun el pais. Costo de envio RD: RD$250 (~$5 USD). Gratis en compras mayores a $75 USD.',
  },
  {
    question: 'Que metodos de pago aceptan',
    answer:
      'Tarjeta de credito o debito internacional (Visa, Mastercard, AmEx) via Stripe. Para Republica Dominicana: Nequi y transferencia bancaria al Banco Popular. Pago 100% anticipado en todos los casos.',
  },
  {
    question: 'Son aptos para clima tropical',
    answer:
      'Si. Seleccionamos exclusivamente productos con texturas ligeras, control de grasa y proteccion SPF50+ disenados para resistir alta humedad y radiacion UV. Cada producto pasa por un filtro de adaptacion al clima caribeno.',
  },
  {
    question: 'Cuanto tarda la confirmacion del pedido',
    answer:
      'Los pedidos con tarjeta se confirman de forma automatica. Los pagos por Nequi o transferencia se confirman en menos de 15 minutos en horario laboral (Lun-Sab 9am-6pm AST).',
  },
  {
    question: 'Puedo devolver un producto',
    answer:
      'Aceptamos devoluciones si el producto llega danado o no corresponde con tu pedido. Contactanos por WhatsApp dentro de las 48 horas siguientes a la entrega con fotos del producto y tu comprobante.',
  },
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="faq-section">
      <div className="faq-inner">
        <span className="section-label">Preguntas frecuentes</span>
        <h2 className="faq-title">Lo que necesitas saber</h2>

        <div className="faq-list">
          {faqs.map((faq, i) => (
            <div key={i} className="faq-item">
              <button
                className="faq-question"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
              >
                <span>{faq.question}</span>
                <span className={`faq-arrow ${openIndex === i ? 'faq-arrow-open' : ''}`}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M4 6L8 10L12 6" />
                  </svg>
                </span>
              </button>
              <div className={`faq-answer-wrapper ${openIndex === i ? 'faq-answer-open' : ''}`}>
                <p className="faq-answer">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
