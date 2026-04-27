'use client'

import { useCart } from '@/lib/useCart'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

type PaymentMethod = 'stripe' | 'transfer' | null

interface TransferForm {
  name: string
  phone: string
  address: string
  city: string
  province: string
  notes: string
}

const PAYMENT_INFO = {
  nequi: process.env.NEXT_PUBLIC_NEQUI_NUMBER || '849-475-4442',
  bank: {
    name: process.env.NEXT_PUBLIC_BANK_NAME || 'Banco Popular Dominicano',
    type: 'Cuenta de ahorros',
    account: process.env.NEXT_PUBLIC_BANK_ACCOUNT || '235-014928-0-01',
    holder: process.env.NEXT_PUBLIC_BUSINESS_NAME || 'ONNI Cosmetics',
    rnc: process.env.NEXT_PUBLIC_RNC || '132-09871-5',
  },
}

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '18494754442'

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null)
  const [isRD, setIsRD] = useState(false)
  const canceled = searchParams.get('canceled')
  const [transferForm, setTransferForm] = useState<TransferForm>({
    name: '',
    phone: '',
    address: '',
    city: '',
    province: '',
    notes: '',
  })
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof TransferForm, string>>>({})
  const [copied, setCopied] = useState(false)

  // Detect RD timezone
  useEffect(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
      if (tz.includes('Santo_Domingo') || tz.includes('America/Santo')) {
        setIsRD(true)
        setPaymentMethod('transfer')
      } else {
        setPaymentMethod('stripe')
      }
    } catch {
      setPaymentMethod('stripe')
    }
  }, [])

  // Shipping estimate
  const shipping = isRD ? 5.00 : 15.00
  const subtotal = total
  const orderTotal = subtotal + shipping

  if (items.length === 0) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '16px',
        padding: '120px 24px 80px',
        background: 'var(--cream)',
      }}>
        <p style={{ fontSize: '1.2rem', color: 'var(--gray)' }}>Tu carrito está vacío</p>
        <button
          onClick={() => router.push('/#productos')}
          style={{
            padding: '12px 32px',
            background: 'var(--rose)',
            color: 'var(--white)',
            border: 'none',
            fontSize: '.78rem',
            letterSpacing: '.15em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            fontFamily: "'DM Sans',sans-serif",
          }}
        >
          Ver productos
        </button>
      </div>
    )
  }

  const handleStripePayment = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/checkout/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, shipping }),
      })

      if (!res.ok) {
        throw new Error('Error al crear la sesión de pago')
      }

      const { url } = await res.json()
      if (url) {
        clearCart()
        window.location.href = url
      }
    } catch (err) {
      console.error('Checkout error:', err)
      alert('Hubo un error al procesar el pago. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  const validateForm = (): boolean => {
    const errors: Partial<Record<keyof TransferForm, string>> = {}
    if (!transferForm.name.trim()) errors.name = 'Nombre es requerido'
    if (!transferForm.phone.trim()) errors.phone = 'Teléfono es requerido'
    if (!transferForm.address.trim()) errors.address = 'Dirección es requerida'
    if (!transferForm.city.trim()) errors.city = 'Ciudad es requerida'
    if (!transferForm.province.trim()) errors.province = 'Provincia es requerida'
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const generateWhatsappMessage = () => {
    const itemsList = items
      .map((item) => `  • ${item.name} x${item.quantity} — $${(item.price * item.quantity).toFixed(2)} USD`)
      .join('\n')

    return `🛍️ *Nuevo Pedido - ONNI K-Beauty* 🇰🇷

━━━━━━━━━━━━━━━━━━━━━

📦 *Productos:*
${itemsList}

💰 Subtotal: $${subtotal.toFixed(2)} USD
🚚 Envío: $${shipping.toFixed(2)} USD (${transferForm.city}, RD)
🎯 *Total: $${orderTotal.toFixed(2)} USD*

━━━━━━━━━━━━━━━━━━━━━

👤 *Datos de envío:*
• Nombre: ${transferForm.name}
• Teléfono: ${transferForm.phone}
• Dirección: ${transferForm.address}
• Ciudad: ${transferForm.city}, ${transferForm.province}

${transferForm.notes ? `📝 *Notas:* ${transferForm.notes}\n\n` : ''}
💳 *Pago por Transferencia/Nequi:*
• Nequi: ${PAYMENT_INFO.nequi}
• Banco Popular: ${PAYMENT_INFO.bank.account}
  Titular: ${PAYMENT_INFO.bank.holder}
  RNC: ${PAYMENT_INFO.bank.rnc}

⏰ Tu pedido está reservado por 30 minutos.
📎 Envía tu comprobante de pago por aquí para confirmar.
✨ ¡Gracias por confiar en ONNI!`
  }

  const handleTransferOrder = async () => {
    if (!validateForm()) return

    setLoading(true)
    try {
      const paymentDeadline = new Date(Date.now() + 30 * 60 * 1000).toISOString()

      const { error } = await supabase
        .from('orders')
        .insert({
          stripe_session_id: `tr_${Date.now()}`,
          customer_email: null,
          total_usd: orderTotal,
          status: 'awaiting_payment_confirmation',
          payment_method: 'local_transfer',
          payment_deadline: paymentDeadline,
          items: items.map((item) => ({
            productId: item.productId,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
          customer_name: transferForm.name,
          customer_phone: transferForm.phone,
          customer_address: `${transferForm.address}, ${transferForm.city}, ${transferForm.province}`,
          customer_city: transferForm.city,
          customer_country: 'República Dominicana',
          customer_notes: transferForm.notes,
          shipping_cost: shipping,
          created_at: new Date().toISOString(),
        })

      if (error) {
        console.error('Supabase error:', error)
      }

      clearCart()
      const message = generateWhatsappMessage()
      const encoded = encodeURIComponent(message)
      router.push(`/checkout/pending?wa=1&msg=${encoded}`)
    } catch (err) {
      console.error('Transfer order error:', err)
      alert('Hubo un error. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  const copyPaymentInfo = () => {
    const text = `Nequi: ${PAYMENT_INFO.nequi}
Banco: ${PAYMENT_INFO.bank.name}
Cuenta: ${PAYMENT_INFO.bank.account}
Titular: ${PAYMENT_INFO.bank.holder}
RNC: ${PAYMENT_INFO.bank.rnc}`
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Shared styles
  const inputStyle = (error?: string) => ({
    padding: '12px 16px',
    border: `1px solid ${error ? '#E53E3E' : 'rgba(0,0,0,.12)'}`,
    borderRadius: '8px',
    fontSize: '.92rem',
    fontFamily: "'DM Sans',sans-serif",
    outline: 'none',
    transition: 'border-color .2s',
    background: 'var(--white)',
    width: '100%',
  })

  const errorStyle = { fontSize: '.72rem', color: '#E53E3E', marginTop: '2px' }
  const labelStyle = { fontSize: '.78rem', fontWeight: 500, color: 'var(--charcoal)' }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)', paddingTop: '120px', paddingBottom: '80px' }}>
      <div style={{ maxWidth: '640px', margin: '0 auto', padding: '0 24px' }}>
        <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 300, color: 'var(--deep)', marginBottom: '8px' }}>
          Checkout
        </h1>
        <p style={{ fontSize: '.88rem', color: 'var(--gray)', marginBottom: '40px' }}>
          Pago 100% anticipado · Envío tras confirmar pago
        </p>

        {canceled && (
          <div style={{ padding: '16px', background: '#FFF3E0', borderRadius: '8px', marginBottom: '24px', fontSize: '.88rem', color: '#E65100' }}>
            El pago fue cancelado. Tu carrito sigue disponible.
          </div>
        )}

        {/* ── Order summary ── */}
        <div style={{ background: 'var(--white)', borderRadius: '12px', padding: '32px', marginBottom: '32px', boxShadow: '0 2px 12px rgba(0,0,0,.04)' }}>
          <h2 style={{ fontSize: '.72rem', letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--gray)', marginBottom: '20px' }}>
            Resumen del pedido
          </h2>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px', padding: 0, margin: 0 }}>
            {items.map((item) => (
              <li key={item.productId} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px solid var(--line)' }}>
                <div>
                  <p style={{ fontWeight: 500, fontSize: '.92rem' }}>{item.name}</p>
                  <p style={{ fontSize: '.78rem', color: 'var(--gray)' }}>Cantidad: {item.quantity}</p>
                </div>
                <p style={{ fontWeight: 600, fontSize: '.92rem' }}>${(item.price * item.quantity).toFixed(2)}</p>
              </li>
            ))}
          </ul>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '20px', marginTop: '8px', borderTop: '1px solid var(--line)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.88rem', color: 'var(--gray)' }}>
              <span>Subtotal</span><span>${subtotal.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.88rem', color: 'var(--gray)' }}>
              <span>Envío {isRD ? '(RD)' : '(Internacional)'}</span><span>${shipping.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '12px', marginTop: '4px', borderTop: '2px solid var(--deep)' }}>
              <span style={{ fontSize: '1rem', fontWeight: 600 }}>Total</span>
              <span style={{ fontSize: '1.3rem', fontWeight: 700 }}>${orderTotal.toFixed(2)} USD</span>
            </div>
          </div>
        </div>

        {/* ── Payment method selector ── */}
        <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.3rem', fontWeight: 400, color: 'var(--deep)', marginBottom: '16px' }}>
          Método de pago
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '32px' }}>
          {/* Stripe */}
          <button
            onClick={() => setPaymentMethod('stripe')}
            style={{
              padding: '20px 16px', borderRadius: '12px',
              border: paymentMethod === 'stripe' ? '2px solid var(--rose)' : '1px solid var(--line)',
              background: paymentMethod === 'stripe' ? 'rgba(196,73,122,.04)' : 'var(--white)',
              cursor: 'pointer', textAlign: 'left', transition: 'all .2s',
              fontFamily: "'DM Sans',sans-serif",
            }}
          >
            <div style={{ fontSize: '1.1rem', marginBottom: '8px', fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, letterSpacing: '.08em', textTransform: 'uppercase' }}>Tarjeta</div>
            <p style={{ fontWeight: 600, fontSize: '.82rem', color: 'var(--deep)', marginBottom: '4px' }}>
              Pagar con Tarjeta
            </p>
            <p style={{ fontSize: '.68rem', color: 'var(--gray)', lineHeight: 1.5 }}>
              Visa, Mastercard, AmEx<br/>Internacional
            </p>
          </button>

          {/* Transfer/Nequi */}
          <button
            onClick={() => setPaymentMethod('transfer')}
            style={{
              padding: '20px 16px', borderRadius: '12px',
              border: paymentMethod === 'transfer' ? '2px solid #25D366' : '1px solid var(--line)',
              background: paymentMethod === 'transfer' ? 'rgba(37,211,102,.04)' : 'var(--white)',
              cursor: 'pointer', textAlign: 'left', transition: 'all .2s',
              fontFamily: "'DM Sans',sans-serif",
            }}
          >
            <div style={{ fontSize: '1.1rem', marginBottom: '8px', fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, letterSpacing: '.08em', textTransform: 'uppercase' }}>Transferencia</div>
            <p style={{ fontWeight: 600, fontSize: '.82rem', color: 'var(--deep)', marginBottom: '4px' }}>
              Transferencia / Nequi
            </p>
            <p style={{ fontSize: '.68rem', color: 'var(--gray)', lineHeight: 1.5 }}>
              Pago 100% anticipado<br/>RD — Confirmación &lt;15 min
            </p>
          </button>
        </div>

        {/* ── Stripe flow ── */}
        {paymentMethod === 'stripe' && (
          <div>
            <button onClick={handleStripePayment} disabled={loading} style={{
              width: '100%', padding: '18px', background: loading ? 'var(--gray)' : 'var(--deep)',
              color: 'var(--white)', border: 'none', borderRadius: '8px', fontSize: '.82rem',
              letterSpacing: '.15em', textTransform: 'uppercase', cursor: loading ? 'not-allowed' : 'pointer',
              fontFamily: "'DM Sans',sans-serif", transition: 'background .3s',
            }}>
              {loading ? 'Procesando...' : 'Ir a Stripe Checkout'}
            </button>
            <p style={{ fontSize: '.72rem', color: 'var(--gray)', textAlign: 'center', marginTop: '12px', lineHeight: 1.6 }}>
              Pago seguro con Stripe · Visa/Mastercard/AmEx
            </p>
          </div>
        )}

        {/* ── Transfer/Nequi flow ── */}
        {paymentMethod === 'transfer' && (
          <div style={{ background: 'var(--white)', borderRadius: '12px', padding: '32px', boxShadow: '0 2px 12px rgba(0,0,0,.04)' }}>

            {/* Payment info box */}
            <div style={{ background: '#F0FDF4', borderRadius: '10px', padding: '20px', marginBottom: '28px', border: '1px solid #BBF7D0' }}>
              <h3 style={{ fontSize: '.82rem', fontWeight: 600, color: '#166534', marginBottom: '14px' }}>
                Datos para transferir
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <span style={{ fontSize: '.72rem', letterSpacing: '.14em', textTransform: 'uppercase', color: '#166534', fontWeight: 500 }}>Nequi</span>
                  <span style={{ fontSize: '.88rem', color: '#15803D', marginLeft: '6px', fontWeight: 500 }}>{PAYMENT_INFO.nequi}</span>
                </div>
                <div>
                  <p style={{ fontSize: '.88rem', color: '#15803D', fontWeight: 500, margin: '0 0 2px' }}>{PAYMENT_INFO.bank.name}</p>
                  <p style={{ fontSize: '.78rem', color: '#166534', margin: 0 }}>
                    {PAYMENT_INFO.bank.type}: <strong>{PAYMENT_INFO.bank.account}</strong>
                  </p>
                  <p style={{ fontSize: '.78rem', color: '#166534', margin: 0 }}>
                    Titular: {PAYMENT_INFO.bank.holder} · RNC: {PAYMENT_INFO.bank.rnc}
                  </p>
                </div>
              </div>
              <button onClick={copyPaymentInfo} style={{
                marginTop: '14px', padding: '8px 16px', background: '#166534', color: '#fff',
                border: 'none', borderRadius: '6px', fontSize: '.72rem', letterSpacing: '.1em',
                textTransform: 'uppercase', cursor: 'pointer', fontFamily: "'DM Sans',sans-serif",
              }}>
                {copied ? '✓ Copiado' : 'Copiar datos de pago'}
              </button>
            </div>

            {/* Warning */}
            <div style={{ background: '#FFFBEB', borderRadius: '8px', padding: '14px 16px', marginBottom: '24px', border: '1px solid #FDE68A', fontSize: '.78rem', color: '#92400E', lineHeight: 1.6 }}>
              <strong>Importante:</strong>
              <br/>El envío se procesa SOLO después de confirmar tu comprobante de pago.
              Envía tu comprobante por WhatsApp. Confirmación en &lt;15 min (Lun-Sáb 9am-6pm AST).
            </div>

            {/* Form */}
            <h3 style={{ fontSize: '.72rem', letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--gray)', marginBottom: '20px' }}>
              Datos de envío
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={labelStyle}>Nombre completo *</label>
                <input type="text" value={transferForm.name} onChange={(e) => setTransferForm({ ...transferForm, name: e.target.value })} placeholder="Tu nombre completo" style={inputStyle(formErrors.name)} />
                {formErrors.name && <span style={errorStyle}>{formErrors.name}</span>}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={labelStyle}>Teléfono *</label>
                <input type="tel" value={transferForm.phone} onChange={(e) => setTransferForm({ ...transferForm, phone: e.target.value })} placeholder="+1 809-000-0000" style={inputStyle(formErrors.phone)} />
                {formErrors.phone && <span style={errorStyle}>{formErrors.phone}</span>}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={labelStyle}>Dirección de envío *</label>
                <input type="text" value={transferForm.address} onChange={(e) => setTransferForm({ ...transferForm, address: e.target.value })} placeholder="Calle, número, edificio" style={inputStyle(formErrors.address)} />
                {formErrors.address && <span style={errorStyle}>{formErrors.address}</span>}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={labelStyle}>Ciudad *</label>
                  <input type="text" value={transferForm.city} onChange={(e) => setTransferForm({ ...transferForm, city: e.target.value })} placeholder="Santo Domingo" style={inputStyle(formErrors.city)} />
                  {formErrors.city && <span style={errorStyle}>{formErrors.city}</span>}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={labelStyle}>Provincia *</label>
                  <select value={transferForm.province} onChange={(e) => setTransferForm({ ...transferForm, province: e.target.value })} style={inputStyle(formErrors.province)}>
                    <option value="">Seleccionar</option>
                    <option value="Distrito Nacional">Distrito Nacional</option>
                    <option value="Santo Domingo">Santo Domingo</option>
                    <option value="Santiago">Santiago</option>
                    <option value="La Vega">La Vega</option>
                    <option value="Duarte">Duarte</option>
                    <option value="La Romana">La Romana</option>
                    <option value="San Pedro de Macorís">San Pedro de Macorís</option>
                    <option value="Puerto Plata">Puerto Plata</option>
                    <option value="La Altagracia">La Altagracia</option>
                    <option value="Samaná">Samaná</option>
                    <option value="Peravia">Peravia</option>
                    <option value="San Cristóbal">San Cristóbal</option>
                    <option value="Espaillat">Espaillat</option>
                    <option value="Otra">Otra</option>
                  </select>
                  {formErrors.province && <span style={errorStyle}>{formErrors.province}</span>}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={labelStyle}>Notas <span style={{ fontWeight: 300, color: 'var(--gray)' }}>(opcional)</span></label>
                <textarea value={transferForm.notes} onChange={(e) => setTransferForm({ ...transferForm, notes: e.target.value })} placeholder="Instrucciones especiales, referencia de pago, etc." rows={3} style={{ ...inputStyle(), resize: 'vertical' }} />
              </div>
            </div>

            <button onClick={handleTransferOrder} disabled={loading} style={{
              width: '100%', padding: '18px', background: loading ? 'var(--gray)' : '#25D366',
              color: 'var(--white)', border: 'none', borderRadius: '8px', fontSize: '.82rem',
              letterSpacing: '.12em', textTransform: 'uppercase', cursor: loading ? 'not-allowed' : 'pointer',
              fontFamily: "'DM Sans',sans-serif", marginTop: '24px', transition: 'background .3s', fontWeight: 600,
            }}>
              {loading ? 'Procesando...' : 'Enviar pedido y pagar por WhatsApp'}
            </button>

            <p style={{ fontSize: '.72rem', color: 'var(--gray)', textAlign: 'center', marginTop: '12px', lineHeight: 1.6 }}>
              1. Envía el pedido → 2. Transfiere → 3. Envía comprobante por WhatsApp → 4. Confirmamos y enviamos
            </p>
          </div>
        )}

        <button onClick={() => router.push('/#productos')} style={{
          width: '100%', padding: '14px', background: 'transparent', color: 'var(--rose)',
          border: '1px solid var(--rose)', borderRadius: '8px', fontSize: '.72rem',
          letterSpacing: '.12em', textTransform: 'uppercase', cursor: 'pointer',
          fontFamily: "'DM Sans',sans-serif", marginTop: '12px', transition: 'all .3s',
        }}>
          ← Volver a productos
        </button>
      </div>
    </div>
  )
}
