'use client'

import { useEffect } from 'react'

interface ShippingModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ShippingModal({ isOpen, onClose }: ShippingModalProps) {
  useEffect(() => {
    if (!isOpen) return
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEsc)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="shipping-overlay" onClick={onClose}>
      <div className="shipping-modal" onClick={(e) => e.stopPropagation()}>
        <button className="shipping-modal-close" onClick={onClose} aria-label="Cerrar">x</button>

        <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '2rem', fontWeight: 300, color: 'var(--deep)', marginBottom: '28px' }}>
          Envios ONNI
        </h2>

        <div className="shipping-section">
          <h3 style={{ fontSize: '.72rem', letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--rose)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '.95rem', fontWeight: 400, letterSpacing: '.12em', textTransform: 'uppercase' }}>República Dominicana</span>
          </h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ fontSize: '.88rem', color: 'var(--charcoal)', padding: '3px 0', paddingLeft: '14px', position: 'relative' }}>
              <span style={{ position: 'absolute', left: 0, color: 'var(--rose)', fontSize: '.55rem', top: '7px' }}>—</span>
              Santo Domingo: 1-3 días hábiles
            </li>
            <li style={{ fontSize: '.88rem', color: 'var(--charcoal)', padding: '3px 0', paddingLeft: '14px', position: 'relative' }}>
              <span style={{ position: 'absolute', left: 0, color: 'var(--rose)', fontSize: '.55rem', top: '7px' }}>—</span>
              Interior del país: 3-5 días hábiles
            </li>
            <li style={{ fontSize: '.88rem', color: 'var(--charcoal)', padding: '3px 0', paddingLeft: '14px', position: 'relative' }}>
              <span style={{ position: 'absolute', left: 0, color: 'var(--rose)', fontSize: '.55rem', top: '7px' }}>—</span>
              Costo: RD$250 / ~$5 USD
            </li>
            <li style={{ fontSize: '.88rem', color: 'var(--charcoal)', padding: '3px 0', paddingLeft: '14px', position: 'relative', fontWeight: 500 }}>
              <span style={{ position: 'absolute', left: 0, color: 'var(--rose)', fontSize: '.55rem', top: '7px' }}>—</span>
              Gratis en compras +$75 USD
            </li>
          </ul>
        </div>

        <div className="shipping-section">
          <h3 style={{ fontSize: '.72rem', letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--rose)', marginBottom: '12px' }}>
            <span style={{ fontSize: '.95rem', fontWeight: 400, letterSpacing: '.12em', textTransform: 'uppercase' }}>Caribe Internacional</span>
          </h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ fontSize: '.88rem', color: 'var(--charcoal)', padding: '3px 0', paddingLeft: '14px', position: 'relative' }}>
              <span style={{ position: 'absolute', left: 0, color: 'var(--rose)', fontSize: '.55rem', top: '7px' }}>—</span>
              Puerto Rico, Jamaica, Bahamas: 5-7 días
            </li>
            <li style={{ fontSize: '.88rem', color: 'var(--charcoal)', padding: '3px 0', paddingLeft: '14px', position: 'relative' }}>
              <span style={{ position: 'absolute', left: 0, color: 'var(--rose)', fontSize: '.55rem', top: '7px' }}>—</span>
              Resto del Caribe: 7-14 días
            </li>
            <li style={{ fontSize: '.88rem', color: 'var(--charcoal)', padding: '3px 0', paddingLeft: '14px', position: 'relative' }}>
              <span style={{ position: 'absolute', left: 0, color: 'var(--rose)', fontSize: '.55rem', top: '7px' }}>—</span>
              Costo: desde $15 USD (calculado en checkout)
            </li>
          </ul>
        </div>

        <div className="shipping-section">
          <h3 style={{ fontSize: '.72rem', letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--rose)', marginBottom: '12px' }}>
            <span style={{ fontSize: '.95rem', fontWeight: 400, letterSpacing: '.12em', textTransform: 'uppercase' }}>Procesamiento</span>
          </h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ fontSize: '.88rem', color: 'var(--charcoal)', padding: '3px 0', paddingLeft: '14px', position: 'relative' }}>
              <span style={{ position: 'absolute', left: 0, color: 'var(--rose)', fontSize: '.55rem', top: '7px' }}>—</span>
              Pedidos confirmados antes de 2pm AST se procesan mismo día
            </li>
            <li style={{ fontSize: '.88rem', color: 'var(--charcoal)', padding: '3px 0', paddingLeft: '14px', position: 'relative' }}>
              <span style={{ position: 'absolute', left: 0, color: 'var(--rose)', fontSize: '.55rem', top: '7px' }}>—</span>
              Recibirás tracking por email o WhatsApp
            </li>
          </ul>
        </div>

        <p style={{ fontSize: '.78rem', color: 'var(--gray)', fontStyle: 'italic', marginTop: '24px', textAlign: 'center' }}>
          ¿Dudas? <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '18494754442'}`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--rose)', textDecoration: 'underline' }}>+1 {process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/(\d)(?=\d{4})/g, '$1-') || '849-475-4442'}</a>
        </p>
      </div>
    </div>
  )
}
