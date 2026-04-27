'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const sessionId = searchParams.get('session_id')
  const [verified, setVerified] = useState(false)

  useEffect(() => {
    if (sessionId) {
      setVerified(true)
    }
  }, [sessionId])

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--cream)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: '24px',
      padding: '120px 24px 80px',
      textAlign: 'center',
    }}>
      <div style={{
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        background: '#E8F5E9',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '2.5rem',
      }}>
        ✓
      </div>

      <h1 style={{
        fontFamily: "'Cormorant Garamond',serif",
        fontSize: 'clamp(2rem,4vw,3rem)',
        fontWeight: 300,
        color: 'var(--deep)',
      }}>
        ¡Pago exitoso!
      </h1>

      <p style={{ fontSize: '.95rem', color: 'var(--gray)', maxWidth: '480px', lineHeight: 1.7 }}>
        Tu pedido ha sido procesado correctamente. Recibirás un email de confirmación pronto.
      </p>

      {sessionId && (
        <p style={{ fontSize: '.72rem', color: 'var(--gray)' }}>
          Session ID: {sessionId}
        </p>
      )}

      <button
        onClick={() => router.push('/#productos')}
        style={{
          padding: '14px 36px',
          background: 'var(--rose)',
          color: 'var(--white)',
          border: 'none',
          borderRadius: '8px',
          fontSize: '.78rem',
          letterSpacing: '.15em',
          textTransform: 'uppercase',
          cursor: 'pointer',
          fontFamily: "'DM Sans',sans-serif",
          marginTop: '16px',
        }}
      >
        Volver a productos
      </button>
    </div>
  )
}
