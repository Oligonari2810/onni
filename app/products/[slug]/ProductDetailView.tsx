'use client'

import { useState } from 'react'
import { useCart } from '@/lib/useCart'
import type { Product } from '@/lib/products'
import ProductGallery from '@/components/product/ProductGallery'

const SKIN_TYPE_LABELS: Record<string, string> = {
  oily: 'Piel grasa',
  combination: 'Mixta',
  all: 'Todo tipo',
  sensitive: 'Sensible',
  mature: 'Prevención',
}

export default function ProductDetailView({ product }: { product: Product }) {
  const { addToCart } = useCart()
  const [justAdded, setJustAdded] = useState(false)
  const [qty, setQty] = useState(1)
  const [activeTab, setActiveTab] = useState<'how-to-use' | 'ingredients' | 'inci'>('how-to-use')

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      addToCart({
        productId: product.id,
        name: product.name,
        price: product.price,
        category: product.category,
      })
    }
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1500)
  }

  const isLowStock = product.stock <= 15
  const isPopular = product.popularity > 30
  const inStock = product.stock > 0

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)', paddingTop: '100px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px' }} className="product-detail-grid">

          {/* LEFT: Gallery */}
          <div>
            <ProductGallery images={product.images} productName={product.name} />
          </div>

          {/* RIGHT: Product info */}
          <div>
            {/* Badges */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
              {product.bestSeller && <span className="badge badge-bestseller">Bestseller</span>}
              {product.vegan && <span className="badge badge-caribbean">Vegano</span>}
              {product.crueltyFree && <span className="badge badge-skin">Cruelty-free</span>}
              <span className="badge badge-caribbean">Caribbean</span>
            </div>

            {/* Category */}
            <span style={{ fontSize: '.68rem', letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--rose)' }}>
              {product.category}
            </span>

            {/* Name */}
            <h1 style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: 'clamp(2rem,3.5vw,2.8rem)',
              fontWeight: 300,
              color: 'var(--deep)',
              lineHeight: 1.15,
              margin: '8px 0 12px',
            }}>
              {product.name}
            </h1>

            {/* Volume */}
            <p style={{ fontSize: '.82rem', color: 'var(--gray)', marginBottom: '16px' }}>
              {product.volume}
            </p>

            {/* Description */}
            <p style={{ fontSize: '.92rem', lineHeight: 1.75, color: 'var(--charcoal)', marginBottom: '24px' }}>
              {product.description}
            </p>

            {/* Price */}
            <p style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: '2rem',
              fontWeight: 400,
              color: 'var(--rose)',
              marginBottom: '4px',
            }}>
              ${product.price.toFixed(2)} <span style={{ fontSize: '.88rem', color: 'var(--gray)', fontWeight: 300 }}>USD</span>
            </p>

            {/* Urgency / stock */}
            <div style={{ marginBottom: '24px' }}>
              <p style={{ fontSize: '.78rem', color: isLowStock ? '#D97706' : '#2E7D4F' }}>
                {inStock ? (
                  isLowStock
                    ? `Pocas unidades disponibles (${product.stock} restantes)`
                    : 'Disponible'
                ) : (
                  'Agotado'
                )}
              </p>
              {isPopular && (
                <p style={{ fontSize: '.72rem', color: 'var(--gray)', marginTop: '4px' }}>
                  Popular en Republica Dominicana
                </p>
              )}
            </div>

            {/* Quantity + Add to cart */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--line)', borderRadius: '6px' }}>
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  style={{
                    width: '40px', height: '44px', border: 'none', background: 'transparent',
                    fontSize: '1.1rem', cursor: 'pointer', color: 'var(--charcoal)',
                    fontFamily: "'DM Sans',sans-serif",
                  }}
                >
                  -
                </button>
                <span style={{ width: '36px', textAlign: 'center', fontSize: '.92rem', fontWeight: 500 }}>
                  {qty}
                </span>
                <button
                  onClick={() => setQty(Math.min(product.stock, qty + 1))}
                  style={{
                    width: '40px', height: '44px', border: 'none', background: 'transparent',
                    fontSize: '1.1rem', cursor: 'pointer', color: 'var(--charcoal)',
                    fontFamily: "'DM Sans',sans-serif",
                  }}
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={!inStock}
                style={{
                  flex: 1, padding: '0 32px', height: '48px',
                  background: justAdded ? '#2E7D4F' : inStock ? 'var(--deep)' : 'var(--gray)',
                  color: 'var(--white)', border: 'none', borderRadius: '6px',
                  fontSize: '.78rem', letterSpacing: '.14em', textTransform: 'uppercase',
                  cursor: inStock ? 'pointer' : 'not-allowed',
                  fontFamily: "'DM Sans',sans-serif", transition: 'all .3s',
                }}
              >
                {justAdded ? 'Agregado al carrito' : inStock ? 'Agregar al carrito' : 'Agotado'}
              </button>
            </div>

            {/* Quick info */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '32px' }}>
              <div style={{ padding: '12px', background: 'var(--white)', borderRadius: '8px', border: '1px solid var(--line)' }}>
                <p style={{ fontSize: '.65rem', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--gray)', marginBottom: '4px' }}>Tipo de piel</p>
                <p style={{ fontSize: '.88rem', color: 'var(--charcoal)' }}>{SKIN_TYPE_LABELS[product.skinType]}</p>
              </div>
              <div style={{ padding: '12px', background: 'var(--white)', borderRadius: '8px', border: '1px solid var(--line)' }}>
                <p style={{ fontSize: '.65rem', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--gray)', marginBottom: '4px' }}>Ideal para</p>
                <p style={{ fontSize: '.88rem', color: 'var(--charcoal)' }}>{product.category}</p>
              </div>
            </div>

            {/* Tabs */}
            <div style={{ borderTop: '1px solid var(--line)', paddingTop: '24px' }}>
              <div style={{ display: 'flex', gap: '0', marginBottom: '20px', overflowX: 'auto' }}>
                {[
                  { key: 'how-to-use' as const, label: 'Como usar' },
                  { key: 'ingredients' as const, label: 'Ingredientes clave' },
                  { key: 'inci' as const, label: 'INCI completo' },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    style={{
                      padding: '8px 0', marginRight: '24px', flexShrink: 0,
                      background: 'none', border: 'none', borderBottom: activeTab === tab.key ? '2px solid var(--rose)' : '2px solid transparent',
                      fontSize: '.78rem', letterSpacing: '.08em', textTransform: 'uppercase',
                      cursor: 'pointer', color: activeTab === tab.key ? 'var(--deep)' : 'var(--gray)',
                      fontFamily: "'DM Sans',sans-serif", transition: 'all .2s',
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {activeTab === 'how-to-use' && (
                <ol style={{ paddingLeft: '20px', margin: 0 }}>
                  {product.howToUse.map((step, i) => (
                    <li key={i} style={{ fontSize: '.88rem', color: 'var(--charcoal)', lineHeight: 1.7, marginBottom: '8px' }}>
                      {step}
                    </li>
                  ))}
                </ol>
              )}

              {activeTab === 'ingredients' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {product.keyIngredients.map((ing) => (
                    <div key={ing.name} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                      <span style={{
                        width: '8px', height: '8px', borderRadius: '50%',
                        background: 'var(--rose)', flexShrink: 0, marginTop: '6px',
                      }} />
                      <div>
                        <p style={{ fontSize: '.88rem', fontWeight: 500, color: 'var(--deep)', marginBottom: '2px' }}>
                          {ing.name}
                        </p>
                        <p style={{ fontSize: '.82rem', color: 'var(--gray)', lineHeight: 1.5 }}>
                          {ing.benefit}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'inci' && (
                <p style={{ fontSize: '.82rem', color: 'var(--charcoal)', lineHeight: 1.7, fontFamily: 'monospace', background: 'var(--white)', padding: '16px', borderRadius: '8px' }}>
                  {product.fullIngredients}
                </p>
              )}
            </div>

            {/* Payment icons */}
            <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid var(--line)', display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '.72rem', color: 'var(--gray)', letterSpacing: '.08em', textTransform: 'uppercase' }}>Pago:</span>
              <span className="payment-icon">Visa</span>
              <span className="payment-icon">MC</span>
              <span className="payment-icon">Nequi</span>
              <span className="payment-icon">Transfer</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
