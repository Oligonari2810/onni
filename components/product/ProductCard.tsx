'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useCart } from '@/lib/useCart'
import { Check } from 'lucide-react'

interface Product {
  id: string
  slug: string
  brand: string
  name: string
  category: string
  benefits: string
  description: string
  price: number
  cost?: number
  msrp?: number
  stock: number
  image: string
  badges: string[]
  skinTypes: string[]
}

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <a href={`/products/${product.slug}`} className="catalogo-link reveal">
      <div className="catalogo-card">
        <div
          className="catalogo-image-wrapper"
          style={{
            backgroundImage: `url(${product.image})`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />

        {/* Badges */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', position: 'absolute', top: '12px', left: '12px', zIndex: 2 }}>
          {product.badges.map((badge, i) => (
            <span key={i} className="badge badge-bestseller">{badge}</span>
          ))}
        </div>
        
        {/* Stock urgency */}
        {product.stock <= 5 && product.stock > 0 && (
          <span style={{ position: 'absolute', top: '12px', right: '12px', background: 'var(--rose)', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 600 }}>
            🔥 Solo {product.stock}
          </span>
        )}

        <span className="catalogo-cat">{product.brand}</span>
        <h3>{product.name}</h3>
        <p className="catalogo-benefit">{product.benefits}</p>
        <p className="catalogo-micro" style={{ fontSize: '0.75rem', color: 'var(--gray)', marginTop: '8px' }}>{product.description.substring(0, 80)}...</p>

        <p
          className="catalogo-price"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '1.5rem',
            fontWeight: 400,
            color: 'var(--blush)',
            marginTop: '16px',
            marginBottom: '4px'
          }}
        >
          ${product.price.toFixed(2)}
        </p>
        
        <button
          onClick={(e) => {
            e.preventDefault()
            handleAddToCart()
          }}
          className="add-to-cart-btn"
          style={{
            width: '100%',
            padding: '10px 16px',
            background: added ? '#2E7D4F' : 'var(--rose)',
            color: 'var(--white)',
            border: 'none',
            fontSize: '.7rem',
            letterSpacing: '.12em',
            textTransform: 'uppercase',
            fontFamily: "'DM Sans', sans-serif",
            cursor: 'pointer',
            transition: 'all .3s',
            marginTop: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px'
          }}
        >
          {added ? (
            <>
              <Check size={14} strokeWidth={3} />
              Agregado
            </>
          ) : (
            'Agregar al carrito'
          )}
        </button>
        
        <div className="payment-icons">
          <span className="payment-icon">Visa</span>
          <span className="payment-icon">MC</span>
          <span className="payment-icon">Nequi</span>
        </div>
      </div>
    </a>
  )
}
