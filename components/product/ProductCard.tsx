'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useCart } from '@/lib/useCart'
import { Check } from 'lucide-react'

interface Product {
  id: string
  slug: string
  name: string
  category: string
  benefit: string
  micro: string
  price: number
  images: string[]
  vegan?: boolean
  crueltyFree?: boolean
  skinType?: string
  climateTags?: string[]
  bestSeller?: boolean
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
      image: product.images[0],
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
            backgroundImage: `url(${product.images[0]})`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '12px', marginBottom: '8px' }}>
          {product.bestSeller && <span className="badge badge-bestseller">Bestseller</span>}
          {product.vegan && <span className="badge badge-caribbean">Vegano</span>}
          {product.skinType && <span className="badge badge-skin">{product.skinType}</span>}
        </div>
        
        <span className="catalogo-cat">{product.category}</span>
        <h3>{product.name}</h3>
        <p className="catalogo-benefit">{product.benefit}</p>
        <p className="catalogo-micro">{product.micro}</p>
        
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
