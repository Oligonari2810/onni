'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/lib/useCart'
import type { Product } from '@/lib/products'

const SKIN_TYPE_LABELS: Record<string, string> = {
  oily: 'Piel grasa',
  combination: 'Mixta',
  all: 'Todo tipo',
  sensitive: 'Sensible',
  mature: 'Prevención',
}

export default function ProductCard({ product, reveal = true }: { product: Product; reveal?: boolean }) {
  const { addToCart } = useCart()
  const [justAdded, setJustAdded] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      category: product.category,
      image: product.image,
    })
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1500)
  }

  const isLowStock = product.stock <= 5
  const mainImage = product.image
  const compareAt = product.msrp || product.cost
  const hasDiscount = Boolean(compareAt && compareAt > product.price)
  const savingsPercent = hasDiscount ? Math.round(((compareAt! - product.price) / compareAt!) * 100) : 0
  const quickBenefits = product.benefits.split(/[·,]/).map((b) => b.trim()).filter(Boolean).slice(0, 2)

  return (
    <Link href={`/products/${product.slug}`} className={`catalogo-link ${reveal ? 'reveal' : ''}`}>
      <div className="catalogo-card">
        {/* Product image */}
        <div
          className="catalogo-image-wrapper"
          style={{
            backgroundImage: `url(${mainImage})`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
        </div>

        {/* Badges row */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '12px', marginBottom: '8px' }}>
          {product.badges.map((badge, i) => (
            <span key={i} className="badge badge-bestseller">{badge}</span>
          ))}
          {hasDiscount && <span className="badge" style={{ background: "#166534", color: "#fff" }}>Ahorra {savingsPercent}%</span>}
        </div>

        <span className="catalogo-cat">{product.brand}</span>
        <h3>{product.name}</h3>
        <p className="catalogo-benefit">{product.benefits}</p>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '6px' }}>
          {quickBenefits.map((b) => <span key={b} className="badge" style={{ background: 'rgba(196,73,122,.08)' }}>{b}</span>)}
        </div>
        <p className="catalogo-micro" style={{ fontSize: '.75rem', color: 'var(--gray)', marginTop: '8px' }}>
          {product.description.substring(0, 60)}...
        </p>

        {/* Price */}
        <p className="catalogo-price" style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: '1.5rem',
          fontWeight: 400,
          color: 'var(--blush)',
          marginTop: '16px',
          marginBottom: '4px',
        }}>
          ${product.price.toFixed(2)}
        </p>
        {hasDiscount && (
          <p style={{ fontSize: '.78rem', color: 'var(--gray)', marginBottom: '4px' }}>
            Antes <span style={{ textDecoration: 'line-through' }}>${compareAt?.toFixed(2)}</span>
          </p>
        )}

        {/* Stock indicator */}
        {isLowStock && product.stock > 0 && (
          <p style={{ fontSize: '.68rem', color: '#D97706', marginBottom: '6px' }}>
            Pocas unidades
          </p>
        )}

        {/* Add to Cart button */}
        <button
          onClick={handleAddToCart}
          className="add-to-cart-btn"
          style={{
            width: '100%',
            padding: '10px 16px',
            background: justAdded ? '#2E7D4F' : 'var(--rose)',
            color: 'var(--white)',
            border: 'none',
            fontSize: '.7rem',
            letterSpacing: '.12em',
            textTransform: 'uppercase',
            fontFamily: "'DM Sans',sans-serif",
            cursor: 'pointer',
            transition: 'all .3s',
            marginTop: '8px',
          }}
        >
          {justAdded ? 'Agregado' : 'Agregar al carrito'}
        </button>

        {/* Payment icons */}
        <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', marginTop: '10px' }}>
          <span className="payment-icon" style={{ fontSize: '.58rem', padding: '2px 6px' }}>Visa</span>
          <span className="payment-icon" style={{ fontSize: '.58rem', padding: '2px 6px' }}>MC</span>
          <span className="payment-icon" style={{ fontSize: '.58rem', padding: '2px 6px' }}>Nequi</span>
        </div>
      </div>
    </Link>
  )
}
