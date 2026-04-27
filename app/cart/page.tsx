'use client'

import { useCart } from '@/lib/useCart'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, total } = useCart()
  const router = useRouter()

  const shippingCost = total >= 50 ? 0 : 5.99
  const totalWithShipping = total + shippingCost

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '16px', color: '#111827' }}>Tu carrito está vacío</h1>
            <p style={{ color: '#6b7280', marginBottom: '24px' }}>Agregá productos para comenzar</p>
            <button
              onClick={() => router.push('/#productos')}
              style={{ padding: '12px 32px', background: '#111827', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}
            >
              Ver productos
            </button>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', padding: '40px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '32px', color: '#111827' }}>Carrito de compras</h1>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '32px' }}>
            {/* Items */}
            <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px' }}>Productos</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {items.map((item) => (
                  <div key={item.productId} style={{ display: 'flex', gap: '16px', paddingBottom: '16px', borderBottom: '1px solid #f3f4f6' }}>
                    <div style={{ width: '100px', height: '100px', borderRadius: '8px', backgroundColor: '#f3f4f6', flexShrink: 0, overflow: 'hidden' }}>
                      {item.image ? (
                        <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af' }}>
                          ONNI
                        </div>
                      )}
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827' }}>{item.name}</h3>
                      <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '4px' }}>{item.category}</p>
                      <p style={{ fontSize: '16px', fontWeight: '600', color: '#111827', marginTop: '8px' }}>${item.price.toFixed(2)}</p>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px' }}>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          style={{ width: '32px', height: '32px', borderRadius: '6px', border: '1px solid #e5e7eb', background: 'white', cursor: 'pointer', fontSize: '18px' }}
                        >
                          −
                        </button>
                        <span style={{ fontSize: '16px', fontWeight: '500', minWidth: '32px', textAlign: 'center' }}>{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          style={{ width: '32px', height: '32px', borderRadius: '6px', border: '1px solid #e5e7eb', background: 'white', cursor: 'pointer', fontSize: '18px' }}
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeFromCart(item.productId)}
                          style={{ marginLeft: 'auto', fontSize: '14px', color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', height: 'fit-content' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px' }}>Resumen</h2>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '14px', color: '#6b7280' }}>
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '14px', color: '#6b7280' }}>
                <span>Envío</span>
                <span>{shippingCost === 0 ? 'Gratis' : `$${shippingCost.toFixed(2)}`}</span>
              </div>
              
              {shippingCost > 0 && (
                <p style={{ fontSize: '12px', color: '#059669', marginBottom: '16px' }}>
                  Agregá ${ (50 - total).toFixed(2) } más para envío gratis
                </p>
              )}
              
              <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '16px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: '700', color: '#111827' }}>
                  <span>Total</span>
                  <span>${totalWithShipping.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => router.push('/checkout')}
                style={{ width: '100%', padding: '16px', background: '#111827', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '16px', cursor: 'pointer', marginBottom: '12px' }}
              >
                Proceder al checkout
              </button>

              <button
                onClick={() => router.push('/')}
                style={{ width: '100%', padding: '14px', background: 'white', color: '#111827', border: '1px solid #e5e7eb', borderRadius: '8px', fontWeight: '600', fontSize: '14px', cursor: 'pointer' }}
              >
                Seguir comprando
              </button>

              {/* Trust badges */}
              <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid #f3f4f6' }}>
                <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                  <span style={{ fontSize: '20px' }}>🔒</span>
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: '500' }}>Pago seguro</p>
                    <p style={{ fontSize: '12px', color: '#9ca3af' }}>Tus datos están protegidos</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                  <span style={{ fontSize: '20px' }}>🚚</span>
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: '500' }}>Envío rápido</p>
                    <p style={{ fontSize: '12px', color: '#9ca3af' }}>3-10 días hábiles</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <span style={{ fontSize: '20px' }}>↩️</span>
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: '500' }}>Devoluciones gratis</p>
                    <p style={{ fontSize: '12px', color: '#9ca3af' }}>30 días para devolver</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
