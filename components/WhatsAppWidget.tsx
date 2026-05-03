'use client'

import { useState } from 'react'

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false)

  const phoneNumber = '18494754442'
  const message = 'Hola ONNI! 👋 Quiero información sobre sus productos K-Beauty'

  const handleOpenChat = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
  }

  return (
    <>
      {/* Botón flotante */}
      <button
        onClick={handleOpenChat}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: '#25D366',
          border: 'none',
          boxShadow: '0 4px 12px rgba(37, 211, 102, 0.4)',
          cursor: 'pointer',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform 0.3s, box-shadow 0.3s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)'
          e.currentTarget.style.boxShadow = '0 6px 16px rgba(37, 211, 102, 0.5)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)'
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(37, 211, 102, 0.4)'
        }}
        aria-label="Chat en WhatsApp"
      >
        {/* Icono de WhatsApp */}
        <svg
          viewBox="0 0 32 32"
          style={{ width: '32px', height: '32px', fill: 'white' }}
        >
          <path d="M16 0c-8.837 0-16 7.163-16 16 0 2.825 0.737 5.607 2.137 8.048l-2.137 7.952 7.933-2.127c2.42 1.37 5.173 2.127 8.067 2.127 8.837 0 16-7.163 16-16s-7.163-16-16-16zM16 29.467c-2.482 0-4.908-0.646-7.07-1.87l-0.507-0.292-5.245 1.407 1.407-5.245-0.292-0.507c-1.224-2.162-1.87-4.588-1.87-7.07 0-7.72 6.28-14 14-14s14 6.28 14 14-6.28 14-14 14zM21.793 18.793c-0.232-0.116-1.373-0.677-1.586-0.753-0.213-0.076-0.368-0.116-0.523 0.116-0.155 0.232-0.601 0.753-0.736 0.908-0.136 0.155-0.271 0.174-0.503 0.058-0.232-0.116-0.979-0.361-1.865-1.151-0.691-0.616-1.158-1.378-1.293-1.61-0.136-0.232-0.014-0.357 0.101-0.472 0.105-0.105 0.232-0.271 0.348-0.406 0.116-0.136 0.155-0.232 0.232-0.387 0.076-0.155 0.038-0.29-0.019-0.406-0.058-0.116-0.523-1.261-0.717-1.726-0.189-0.454-0.381-0.393-0.523-0.4l-0.446-0.008c-0.155 0-0.406 0.058-0.619 0.29-0.213 0.232-0.812 0.794-0.812 1.939s0.832 2.252 0.948 2.407c0.116 0.155 1.633 2.496 3.956 3.498 0.554 0.239 0.985 0.381 1.322 0.488 0.558 0.177 1.065 0.152 1.464 0.093 0.449-0.067 1.373-0.561 1.566-1.104 0.193-0.543 0.193-1.008 0.136-1.104-0.058-0.096-0.213-0.155-0.446-0.271z"/>
        </svg>
      </button>

      {/* Tooltip */}
      <div
        style={{
          position: 'fixed',
          bottom: '96px',
          right: '24px',
          backgroundColor: 'white',
          padding: '12px 16px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          zIndex: 1000,
          maxWidth: '250px',
          animation: 'fadeIn 0.3s ease-out',
        }}
      >
        <p style={{ fontSize: '14px', color: '#111827', margin: '0 0 4px 0' }}>
          ¿Tenés consultas?
        </p>
        <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>
          Escribinos por WhatsApp
        </p>
        {/* Flechita */}
        <div style={{
          position: 'absolute',
          bottom: '-8px',
          right: '32px',
          width: '16px',
          height: '16px',
          backgroundColor: 'white',
          transform: 'rotate(45deg)',
          boxShadow: '2px 2px 4px rgba(0,0,0,0.1)',
        }} />
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  )
}
