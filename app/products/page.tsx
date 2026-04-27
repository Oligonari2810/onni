'use client'

import { useState } from 'react'
import Link from 'next/link'
import ProductCard from '@/components/ProductCard'
import { products } from '@/lib/products'

export default function ProductsPage() {
  const [search, setSearch] = useState('')

  const filtered = products.filter((p) => {
    const q = search.toLowerCase()
    return (
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.benefit.toLowerCase().includes(q)
    )
  })

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)', paddingTop: '100px', paddingBottom: '80px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px 0' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="section-label">Catalogo completo</span>
          <h1 style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: 'clamp(2rem,4vw,3rem)',
            fontWeight: 300,
            color: 'var(--deep)',
            marginBottom: '8px',
          }}>
            Productos ONNI
          </h1>
          <p style={{ fontSize: '.92rem', color: 'var(--gray)' }}>
            Seleccion coreana para el clima del Caribe
          </p>
        </div>

        {/* Search bar */}
        <div style={{ maxWidth: '480px', margin: '0 auto 48px' }}>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar producto o categoria..."
              className="search-input"
              style={{
                width: '100%',
                padding: '14px 20px 14px 44px',
                border: '1px solid var(--line)',
                borderRadius: '6px',
                fontSize: '.92rem',
                fontFamily: "'DM Sans',sans-serif",
                outline: 'none',
                background: 'var(--white)',
                color: 'var(--deep)',
                transition: 'border-color .2s',
              }}
              onFocus={(e) => (e.target.style.borderColor = 'var(--rose)')}
              onBlur={(e) => (e.target.style.borderColor = 'var(--line)')}
            />
            <svg
              width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="var(--gray)" strokeWidth="1.5"
              style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
            >
              <circle cx="8" cy="8" r="5.5" />
              <path d="M12 12L16 16" />
            </svg>
            {search && (
              <button
                onClick={() => setSearch('')}
                style={{
                  position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', fontSize: '1.1rem', cursor: 'pointer',
                  color: 'var(--gray)', lineHeight: 1,
                }}
                aria-label="Limpiar busqueda"
              >
                x
              </button>
            )}
          </div>
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <p style={{ fontSize: '1.1rem', color: 'var(--gray)', marginBottom: '12px' }}>
              No encontramos ese producto
            </p>
            <p style={{ fontSize: '.88rem', color: 'var(--gray)', marginBottom: '24px' }}>
              Escríbenos por WhatsApp para consultarnos
            </p>
            <a
              href="https://wa.me/18494754442?text=Hola%2C%20busco%20un%20producto%20ONNI"
              target="_blank"
              rel="noopener noreferrer"
              className="b2c-btn-primary"
              style={{ display: 'inline-block', textDecoration: 'none' }}
            >
              Contactar por WhatsApp
            </a>
          </div>
        ) : (
          <div className="catalogo-grid" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
