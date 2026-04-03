'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error('Failed to submit')

      setSubmitStatus('success')
      e.currentTarget.reset()
      setTimeout(() => setSubmitStatus('idle'), 5000)
    } catch (error) {
      console.error(error)
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus('idle'), 4000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <div className="form-row">
        <div className="fg">
          <label>Nombre</label>
          <input name="name" type="text" placeholder="Tu nombre" required />
        </div>
        <div className="fg">
          <label>Negocio / establecimiento</label>
          <input name="establishment" type="text" placeholder="Nombre del espacio" required />
        </div>
      </div>

      <div className="form-row">
        <div className="fg">
          <label>Tipo de espacio</label>
          <select name="type" required>
            <option value="">Seleccionar</option>
            <option value="clinica">Clínica estética</option>
            <option value="spa">Spa / wellness</option>
            <option value="dermatologo">Dermatólogo</option>
            <option value="esteticista">Esteticista / facialista</option>
            <option value="tienda">Tienda especializada</option>
            <option value="otro">Otro espacio profesional</option>
          </select>
        </div>
        <div className="fg">
          <label>Ciudad / zona</label>
          <input name="city" type="text" placeholder="Ej. Santo Domingo, Punta Cana" required />
        </div>
      </div>

      <div className="form-row">
        <div className="fg">
          <label>WhatsApp</label>
          <input name="whatsapp" type="tel" placeholder="+1 809 000 0000" required />
        </div>
        <div className="fg">
          <label>Email</label>
          <input name="email" type="email" placeholder="tu@email.com" required />
        </div>
      </div>

      <div className="fg">
        <label>Mensaje <span style={{ fontWeight: 300, opacity: 0.5 }}>(opcional)</span></label>
        <textarea name="message" rows={3} placeholder="Cuéntanos brevemente sobre tu espacio..." />
      </div>

      <button
        type="submit"
        disabled={isSubmitting || submitStatus !== 'idle'}
        className={`form-submit${submitStatus === 'success' ? ' success' : ''}`}
        style={submitStatus === 'error' ? { background: 'var(--rose)' } : undefined}
      >
        {submitStatus === 'success'
          ? '✓ Solicitud recibida'
          : submitStatus === 'error'
            ? 'Error. Intenta de nuevo.'
            : 'Solicitar dossier B2B'}
      </button>
      <p className="form-micro">Revisamos cada solicitud y te contactamos si hay encaje.</p>
    </form>
  )
}
