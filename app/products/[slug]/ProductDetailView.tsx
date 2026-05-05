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
        id: product.id,
        name: product.name,
        price: product.price,
        category: product.category,
        image: product.image,
        slug: product.slug,
      })
    }
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1500)
  }

  const isLowStock = product.stock <= 5
  const isPopular = product.badges.includes('Bestseller') || product.badges.includes('Trending')
  const inStock = product.stock > 0
  const compareAt = product.msrp > product.price ? product.msrp : null
  const savingsPercent = compareAt ? Math.round(((compareAt - product.price) / compareAt) * 100) : 0

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)', paddingTop: '100px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px 150px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px' }} className="product-detail-grid">

          {/* LEFT: Gallery */}
          <div>
            <ProductGallery images={[product.image]} productName={product.name} />
          </div>

          {/* RIGHT: Product info */}
          <div>
            {/* Badges */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
              {product.badges.map((badge, i) => (
                <span key={i} className="badge badge-bestseller">{badge}</span>
              ))}
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

            {/* Description */}
            <p style={{ fontSize: '.92rem', lineHeight: 1.75, color: 'var(--charcoal)', marginBottom: '16px' }}>
              {product.description}
            </p>

            <div style={{ padding: '14px 16px', background: 'var(--white)', border: '1px solid var(--line)', borderRadius: '10px', marginBottom: '20px' }}>
              <p style={{ fontSize: '.72rem', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--gray)', marginBottom: '6px' }}>Beneficio ONNI</p>
              <p style={{ fontSize: '.92rem', color: 'var(--deep)', lineHeight: 1.6, margin: 0 }}>{product.benefits}</p>
            </div>

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
            {compareAt && (
              <p style={{ fontSize: '.78rem', color: 'var(--gray)', marginBottom: '8px' }}>
                Antes <span style={{ textDecoration: 'line-through' }}>${compareAt.toFixed(2)}</span> · Ahorra {savingsPercent}%
              </p>
            )}

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
                <p style={{ fontSize: '.88rem', color: 'var(--charcoal)' }}>{product.skinTypes.map(t => SKIN_TYPE_LABELS[t]).join(', ')}</p>
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
                <div style={{ fontSize: '.88rem', color: 'var(--charcoal)', lineHeight: 1.7 }}>
                  <p>Aplica sobre el rostro limpio por la mañana y/o por la noche.</p>
                  <p style={{ marginTop: '8px' }}>Masajea suavemente hasta que se absorba completamente.</p>
                  <p style={{ marginTop: '8px' }}>Para mejores resultados, usa consistentemente como parte de tu rutina diaria.</p>
                  <p style={{ marginTop: '8px' }}><strong>Tip Caribe:</strong> en la mañana termina siempre con protector solar y reaplica si sudas o estás al aire libre.</p>
                </div>
              )}

              {activeTab === 'ingredients' && (
                <div style={{ fontSize: '.88rem', color: 'var(--charcoal)', lineHeight: 1.7 }}>
                  <p><strong>Beneficio principal:</strong> {product.benefits}</p>
                  <p style={{ marginTop: '12px' }}><strong>Descripción:</strong> {product.description}</p>
                  <p style={{ marginTop: '12px' }}><strong>Combina bien con:</strong> limpieza suave, hidratación ligera y SPF diario.</p>
                  <p style={{ marginTop: '12px' }}><strong>Evita mezclar:</strong> introduce activos fuertes poco a poco si tu piel está sensible.</p>
                </div>
              )}

              {activeTab === 'inci' && (
                <p style={{ fontSize: '.82rem', color: 'var(--charcoal)', lineHeight: 1.7 }}>
                  Consulta la etiqueta del producto para la lista completa de ingredientes.
                </p>
              )}
            </div>

            {/* Tropical routine guidance */}
            <div style={{ marginTop: '28px', padding: '18px', background: 'rgba(196,73,122,.06)', borderRadius: '12px', border: '1px solid rgba(196,73,122,.12)' }}>
              <p style={{ fontSize: '.7rem', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--rose)', marginBottom: '8px' }}>Guía rápida</p>
              <p style={{ fontSize: '.86rem', color: 'var(--charcoal)', lineHeight: 1.65, margin: 0 }}>Ideal para una rutina tropical: textura ligera, uso constante y protección solar como último paso de la mañana.</p>
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

        <div style={{ position: 'fixed', left: 0, right: 0, bottom: 0, zIndex: 55, background: 'rgba(255,255,255,.98)', borderTop: '1px solid var(--line)', padding: '10px 16px calc(10px + env(safe-area-inset-bottom))', backdropFilter: 'blur(6px)' }}>
          <div style={{ maxWidth: '720px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ minWidth: '92px' }}>
              <p style={{ margin: 0, fontSize: '.68rem', color: 'var(--gray)' }}>Total</p>
              <p style={{ margin: 0, fontWeight: 700, color: 'var(--deep)' }}>${product.price.toFixed(2)}</p>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={!inStock}
              style={{ flex: 1, padding: '13px 14px', background: justAdded ? '#2E7D4F' : inStock ? 'var(--rose)' : 'var(--gray)', color: 'var(--white)', border: 'none', borderRadius: '10px', fontSize: '.78rem', letterSpacing: '.08em', textTransform: 'uppercase', fontFamily: "'DM Sans',sans-serif", fontWeight: 700 }}
            >
              {justAdded ? 'Agregado' : inStock ? 'Agregar al carrito' : 'Agotado'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
