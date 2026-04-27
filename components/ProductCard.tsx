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
  const [imgError, setImgError] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
    })
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1500)
  }

  const isLowStock = product.stock <= 15
  const mainImage = product.images[0]

  return (
    <Link href={`/products/${product.slug}`} className={`catalogo-link ${reveal ? 'reveal' : ''}`}>
      <div className="catalogo-card">
        {/* Product image */}
        <div className="catalogo-image-wrapper">
          {mainImage && !imgError ? (
            <img
              src={mainImage}
              alt={product.name}
              className="catalogo-image"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="catalogo-image-fallback" style={{ background: product.color }}>
              <span>{product.name.charAt(0)}</span>
            </div>
          )}
        </div>

        {/* Badges row */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '12px', marginBottom: '8px' }}>
          {product.bestSeller && (
            <span className="badge badge-bestseller">Bestseller</span>
          )}
          {product.vegan && (
            <span className="badge badge-caribbean">Vegano</span>
          )}
          <span className="badge badge-skin">{SKIN_TYPE_LABELS[product.skinType]}</span>
        </div>

        <span className="catalogo-cat">{product.category}</span>
        <h3>{product.name}</h3>
        <p className="catalogo-benefit">{product.benefit}</p>
        <p className="catalogo-micro">{product.micro}</p>

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
