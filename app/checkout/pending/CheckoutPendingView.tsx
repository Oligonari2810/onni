'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

const PAYMENT_INFO = {
  nequi: process.env.NEXT_PUBLIC_NEQUI_NUMBER || '849-475-4442',
  bank: {
    name: process.env.NEXT_PUBLIC_BANK_NAME || 'Banco Popular Dominicano',
    type: 'Cuenta de ahorros',
    account: process.env.NEXT_PUBLIC_BANK_ACCOUNT || '235-014928-0-01',
    holder: process.env.NEXT_PUBLIC_BUSINESS_NAME || 'ONNI Cosmetics',
    rnc: process.env.NEXT_PUBLIC_RNC || '132-09871-5',
  },
}

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '18494754442'

export default function CheckoutPendingView() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const wa = searchParams.get('wa') === '1'
  const encodedMsg = searchParams.get('msg') || ''
  const [timeLeft, setTimeLeft] = useState(30 * 60)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (timeLeft <= 0) return
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [timeLeft])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  const openWhatsApp = () => {
    if (encodedMsg) {
      window.location.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMsg}`
    } else {
      window.location.href = `https://wa.me/${WHATSAPP_NUMBER}`
    }
  }

  const copyPaymentInfo = () => {
    const text = `Nequi: ${PAYMENT_INFO.nequi}
Banco: ${PAYMENT_INFO.bank.name}
Cuenta: ${PAYMENT_INFO.bank.account}
Titular: ${PAYMENT_INFO.bank.holder}
RNC: ${PAYMENT_INFO.bank.rnc}`
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--cream)',
      paddingTop: '120px',
      paddingBottom: '80px',
    }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>

        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{
            width: '80px', height: '80px', borderRadius: '50%',
            background: '#FEF3C7', display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: '1.8rem', margin: '0 auto 20px',
            fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, letterSpacing: '.08em',
            color: 'var(--deep)',
          }}>
            PENDIENTE
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.8rem,4vw,2.5rem)', fontWeight: 300, color: 'var(--deep)', marginBottom: '12px' }}>
            Pedido reservado
          </h1>
          <p style={{ fontSize: '.95rem', color: 'var(--gray)', lineHeight: 1.7 }}>
            Esperando comprobante de pago
          </p>
        </div>

        {/* Countdown */}
        <div style={{
          background: 'var(--deep)', borderRadius: '12px', padding: '24px',
          marginBottom: '32px', display: 'inline-flex', alignItems: 'center', gap: '12px',
        }}>
          <span style={{ fontSize: '.82rem', color: 'rgba(255,255,255,.6)', textTransform: 'uppercase', letterSpacing: '.1em' }}>
            Reserva expira en
          </span>
          <span style={{
            fontFamily: "'Cormorant Garamond',serif", fontSize: '2.2rem', fontWeight: 400,
            color: 'var(--blush)', fontVariantNumeric: 'tabular-nums',
          }}>
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </span>
        </div>

        {/* Steps */}
        <div style={{
          background: 'var(--white)', borderRadius: '12px', padding: '32px',
          marginBottom: '24px', boxShadow: '0 2px 12px rgba(0,0,0,.04)', textAlign: 'left',
        }}>
          <h2 style={{ fontSize: '.72rem', letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--gray)', marginBottom: '20px' }}>
            Siguientes pasos
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { num: '1', text: 'Transfiere a los datos de abajo (Nequi o Banco Popular)' },
              { num: '2', text: 'Envia comprobante por WhatsApp' },
              { num: '3', text: 'Confirmamos tu pago (menos de 15 min)' },
              { num: '4', text: 'Procesamos y enviamos tu pedido' },
            ].map((step) => (
              <div key={step.num} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <div style={{
                  width: '32px', height: '32px', borderRadius: '50%',
                  background: 'var(--rose)', color: 'var(--white)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '.78rem', fontWeight: 600, flexShrink: 0,
                  fontFamily: "'Cormorant Garamond',serif",
                }}>
                  {step.num}
                </div>
                <p style={{ fontSize: '.88rem', color: 'var(--charcoal)', lineHeight: 1.5, margin: 0 }}>
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Payment info */}
        <div style={{
          background: '#F0FDF4', borderRadius: '12px', padding: '24px',
          marginBottom: '24px', border: '1px solid #BBF7D0', textAlign: 'left',
        }}>
          <h3 style={{ fontSize: '.82rem', fontWeight: 600, color: '#166534', marginBottom: '14px' }}>
            Datos para transferir
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <span style={{ fontSize: '.72rem', letterSpacing: '.14em', textTransform: 'uppercase', color: '#166534', fontWeight: 500 }}>Nequi</span>
              <span style={{ fontSize: '.88rem', color: '#15803D', marginLeft: '6px', fontWeight: 500 }}>{PAYMENT_INFO.nequi}</span>
            </div>
            <div>
              <p style={{ fontSize: '.88rem', color: '#15803D', fontWeight: 500, margin: '0 0 2px' }}>{PAYMENT_INFO.bank.name}</p>
              <p style={{ fontSize: '.78rem', color: '#166534', margin: 0 }}>
                {PAYMENT_INFO.bank.type}: <strong>{PAYMENT_INFO.bank.account}</strong>
              </p>
              <p style={{ fontSize: '.78rem', color: '#166534', margin: 0 }}>
                Titular: {PAYMENT_INFO.bank.holder} &middot; RNC: {PAYMENT_INFO.bank.rnc}
              </p>
            </div>
          </div>
          <button onClick={copyPaymentInfo} style={{
            marginTop: '14px', padding: '8px 16px', background: '#166534', color: '#fff',
            border: 'none', borderRadius: '6px', fontSize: '.72rem', letterSpacing: '.1em',
            textTransform: 'uppercase', cursor: 'pointer', fontFamily: "'DM Sans',sans-serif",
          }}>
            {copied ? 'Copiado' : 'Copiar datos de pago'}
          </button>
        </div>

        {/* WhatsApp button */}
        {wa && (
          <button onClick={openWhatsApp} style={{
            width: '100%', padding: '18px', background: '#25D366', color: 'var(--white)',
            border: 'none', borderRadius: '8px', fontSize: '.82rem', letterSpacing: '.12em',
            textTransform: 'uppercase', cursor: 'pointer', fontFamily: "'DM Sans',sans-serif",
            fontWeight: 600, marginBottom: '12px',
          }}>
            Enviar pedido por WhatsApp
          </button>
        )}

        <button onClick={() => router.push('/#productos')} style={{
          width: '100%', padding: '14px', background: 'transparent', color: 'var(--rose)',
          border: '1px solid var(--rose)', borderRadius: '8px', fontSize: '.72rem',
          letterSpacing: '.12em', textTransform: 'uppercase', cursor: 'pointer',
          fontFamily: "'DM Sans',sans-serif", transition: 'all .3s',
        }}>
          Volver a productos
        </button>
      </div>
    </div>
  )
}
