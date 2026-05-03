'use client'

import { useParams } from 'next/navigation'
import { products } from '@/lib/products'
import Navbar from '@/components/Navbar'
import { useCart } from '@/lib/useCart'
import { useState } from 'react'
import ProductJsonLd from '@/components/seo/ProductJsonLd'

export default function ProductPage() {
  const params = useParams()
  const { addToCart } = useCart()
  const [selectedImage, setSelectedImage] = useState(0)
  const [justAdded, setJustAdded] = useState(false)

  const product = products.find(p => p.slug === params.slug)

  if (!product) {
    return (
      <>
        <Navbar />
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p>Producto no encontrado</p>
        </div>
      </>
    )
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.image,
    })
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1500)
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  return (
    <>
      {/* 👈 Inyecta el Schema para Google */}
      <ProductJsonLd product={{
        slug: product.slug,
        brand: 'ONNI',
        name: product.name,
        price: product.price,
        stock: product.stock || 10,
        rating: '4.8',
        reviews: '124',
        description: product.benefits
      }} />

      <Navbar />

      {/* Product Details */}
      <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', padding: '40px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          {/* Breadcrumb */}
          <div style={{ marginBottom: '24px', fontSize: '14px', color: '#6b7280' }}>
            <a href="/#productos" style={{ color: '#6b7280', textDecoration: 'none' }}>Productos</a>
            <span style={{ margin: '0 8px' }}>/</span>
            <span>{product.category}</span>
            <span style={{ margin: '0 8px' }}>/</span>
            <span style={{ color: '#111827' }}>{product.name}</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', marginBottom: '64px' }}>
            {/* Images */}
            <div>
              <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', marginBottom: '16px' }}>
                <div style={{ width: '100%', aspectRatio: '4/5', backgroundColor: '#f3f4f6', borderRadius: '8px', overflow: 'hidden', marginBottom: '16px' }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              </div>
            </div>

            {/* Info */}
            <div>
              <span style={{ fontSize: '14px', color: '#059669', fontWeight: '500', textTransform: 'uppercase' }}>
                {product.category}
              </span>
              
              <h1 style={{ fontSize: '36px', fontWeight: '700', color: '#111827', marginTop: '8px', marginBottom: '16px' }}>
                {product.name}
              </h1>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <span style={{ fontSize: '28px', fontWeight: '700', color: '#be185d' }}>${product.price.toFixed(2)}</span>
                {product.stock <= 15 && product.stock > 0 && (
                  <span style={{ fontSize: '14px', color: '#d97706', fontWeight: '500' }}>
                    Pocas unidades ({product.stock} disponibles)
                  </span>
                )}
                {product.stock === 0 && (
                  <span style={{ fontSize: '14px', color: '#dc2626', fontWeight: '500' }}>
                    Agotado
                  </span>
                )}
              </div>

              <p style={{ fontSize: '16px', color: '#4b5563', lineHeight: '1.7', marginBottom: '24px' }}>
                {product.description}
              </p>

              {/* Badges */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
                {product.badges.map((badge, i) => (
                  <span key={i} style={{ padding: '6px 12px', backgroundColor: '#d1fae5', color: '#065f46', borderRadius: '9999px', fontSize: '12px', fontWeight: '500' }}>
                    {badge}
                  </span>
                ))}
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                style={{
                  width: '100%',
                  padding: '16px',
                  background: justAdded ? '#2E7D4F' : product.stock === 0 ? '#9ca3af' : '#111827',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: '600',
                  fontSize: '16px',
                  cursor: product.stock === 0 ? 'not-allowed' : 'pointer',
                  marginBottom: '12px',
                  transition: 'all 0.3s',
                }}
              >
                {justAdded ? '¡Agregado!' : product.stock === 0 ? 'Agotado' : 'Agregar al carrito'}
              </button>

              <p style={{ fontSize: '12px', color: '#9ca3af', textAlign: 'center' }}>
                Envío gratis en pedidos mayores a $50
              </p>

              {/* Trust badges */}
              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '24px', paddingTop: '24px', borderTop: '1px solid #e5e7eb' }}>
                <div style={{ textAlign: 'center' }}>
                  <span style={{ fontSize: '24px' }}>🚚</span>
                  <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>Envío 3-10 días</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <span style={{ fontSize: '24px' }}>🔒</span>
                  <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>Pago seguro</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <span style={{ fontSize: '24px' }}>↩️</span>
                  <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>30 días devolución</p>
                </div>
              </div>
            </div>
          </div>

          {/* Full Ingredients - Solo si existe */}
          {product.fullIngredients && (
            <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '32px', marginBottom: '64px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>Ingredientes Completos</h2>
              <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: '1.8' }}>
                {product.fullIngredients}
              </p>
            </div>
          )}

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div style={{ marginBottom: '64px' }}>
              <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '24px', color: '#111827' }}>
                Productos relacionados
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
                {relatedProducts.map((p) => (
                  <a
                    key={p.id}
                    href={`/products/${p.slug}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '16px', transition: 'transform 0.3s', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                      <div style={{ width: '100%', aspectRatio: '4/5', backgroundColor: '#f3f4f6', borderRadius: '8px', marginBottom: '12px', overflow: 'hidden' }}>
                        <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>{p.category}</p>
                      <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px', color: '#111827' }}>{p.name}</h3>
                      <p style={{ fontSize: '18px', fontWeight: '700', color: '#be185d' }}>${p.price.toFixed(2)}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
