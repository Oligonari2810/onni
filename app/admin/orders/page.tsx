'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '18494754442'

interface Order {
  id: number
  stripe_session_id: string
  customer_email: string | null
  customer_name: string | null
  customer_phone: string | null
  customer_address: string | null
  customer_city: string | null
  customer_country: string | null
  customer_notes: string | null
  total_usd: number
  status: string
  payment_method: string | null
  payment_deadline: string | null
  payment_confirmed_at: string | null
  shipping_cost: number | null
  items: any[]
  created_at: string
}

const STATUS_LABELS: Record<string, string> = {
  paid: 'Pagado',
  awaiting_payment_confirmation: 'Esperando comprobante',
  pending_whatsapp_payment: 'Pendiente WhatsApp',
  shipped: 'Enviado',
  canceled: 'Cancelado',
}

const STATUS_COLORS: Record<string, string> = {
  paid: '#2E7D4F',
  awaiting_payment_confirmation: '#D97706',
  pending_whatsapp_payment: '#2563EB',
  shipped: '#7C3AED',
  canceled: '#DC2626',
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [filter, setFilter] = useState<string>('awaiting_payment_confirmation')
  const [search, setSearch] = useState('')
  const [updatingStatus, setUpdatingStatus] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [confirming, setConfirming] = useState<number | null>(null)
  const [authChecked, setAuthChecked] = useState(false)
  const router = useRouter()

  const fetchOrders = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) console.error('Error fetching orders:', error)
    else setOrders(data || [])
    setLoading(false)
  }

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      router.push('/admin/login')
      return
    }
    setAuthChecked(true)
    fetchOrders()
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  useEffect(() => {
    checkAuth()
  }, [])

  useEffect(() => {
    if (authChecked) {
      fetchOrders()
    }
  }, [filter, authChecked])

  const updateOrderStatus = async (orderId: number, status: string) => {
    setUpdatingStatus(orderId)
    const payload: Record<string, string> = { status }
    if (status === 'paid') payload.payment_confirmed_at = new Date().toISOString()

    const { error } = await supabase
      .from('orders')
      .update(payload)
      .eq('id', orderId)

    if (error) {
      console.error('Error updating order:', error)
      alert('Error al actualizar pedido')
    } else {
      fetchOrders()
    }
    setUpdatingStatus(null)
  }

  const confirmPayment = async (orderId: number) => {
    setConfirming(orderId)
    await updateOrderStatus(orderId, 'paid')
    setConfirming(null)
  }

  const formatCurrency = (amount: number) => `$${amount.toFixed(2)}`
  const formatDate = (date: string) => {
    return new Date(date).toLocaleString('es-DO', {
      month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
    })
  }

  const filteredOrders = (filter === 'all'
    ? orders
    : orders.filter((o) => o.status === filter))
    .filter((order) => {
      const query = search.trim().toLowerCase()
      if (!query) return true
      const fields = [
        order.id?.toString(),
        order.stripe_session_id,
        order.customer_email,
        order.customer_name,
        order.customer_phone,
        order.customer_city,
        order.status,
        order.payment_method,
      ]
      return fields.some((field) => field?.toLowerCase().includes(query))
    })

  const orderStats = {
    total: orders.length,
    awaiting: orders.filter((order) => order.status === 'awaiting_payment_confirmation').length,
    paid: orders.filter((order) => order.status === 'paid').length,
    revenue: orders
      .filter((order) => order.status === 'paid')
      .reduce((sum, order) => sum + (order.total_usd || 0), 0),
  }

  if (!authChecked) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--cream)' }}>
        <p style={{ fontSize: '.9rem', color: 'var(--gray)' }}>Verificando sesión...</p>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)', paddingTop: '100px', paddingBottom: '60px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '2rem', fontWeight: 300, color: 'var(--deep)' }}>
              Pedidos ONNI
            </h1>
            <p style={{ fontSize: '.82rem', color: 'var(--gray)' }}>Panel de administración</p>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <button onClick={fetchOrders} style={{
              padding: '10px 20px', background: 'var(--white)', border: '1px solid var(--line)',
              borderRadius: '6px', fontSize: '.72rem', letterSpacing: '.1em', textTransform: 'uppercase',
              cursor: 'pointer', fontFamily: "'DM Sans',sans-serif", color: 'var(--gray)',
            }}>
              Refrescar
            </button>
            <button onClick={handleLogout} style={{
              padding: '10px 20px', background: 'var(--deep)', border: 'none',
              borderRadius: '6px', fontSize: '.72rem', letterSpacing: '.1em', textTransform: 'uppercase',
              cursor: 'pointer', fontFamily: "'DM Sans',sans-serif", color: 'var(--white)',
            }}>
              Cerrar sesión
            </button>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px', marginBottom: '20px' }}>
          {[
            { label: 'Pedidos', value: orderStats.total },
            { label: 'Esperando pago', value: orderStats.awaiting },
            { label: 'Pagados', value: orderStats.paid },
            { label: 'Ingresos pagados', value: formatCurrency(orderStats.revenue) },
          ].map((stat) => (
            <div key={stat.label} style={{ background: 'var(--white)', border: '1px solid var(--line)', borderRadius: '12px', padding: '16px' }}>
              <p style={{ margin: 0, fontSize: '.68rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--gray)' }}>{stat.label}</p>
              <p style={{ margin: '6px 0 0', fontSize: '1.35rem', color: 'var(--deep)', fontWeight: 700 }}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Search */}
        <div style={{ marginBottom: '16px' }}>
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Buscar por pedido, email, teléfono, ciudad o estado"
            style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid var(--line)', background: 'var(--white)', fontSize: '.88rem', fontFamily: "'DM Sans',sans-serif" }}
          />
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
          {[
            { value: 'all', label: 'Todos' },
            { value: 'awaiting_payment_confirmation', label: 'Esperando comprobante' },
            { value: 'pending_whatsapp_payment', label: 'Pendiente WhatsApp' },
            { value: 'paid', label: 'Pagados' },
            { value: 'shipped', label: 'Enviados' },
            { value: 'canceled', label: 'Cancelados' },
          ].map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              style={{
                padding: '8px 16px', borderRadius: '6px', fontSize: '.75rem',
                letterSpacing: '.08em', cursor: 'pointer', transition: 'all .2s',
                fontFamily: "'DM Sans',sans-serif",
                background: filter === f.value ? 'var(--deep)' : 'var(--white)',
                color: filter === f.value ? 'var(--white)' : 'var(--gray)',
                border: filter === f.value ? 'none' : '1px solid var(--line)',
              }}
            >
              {f.label} ({f.value === 'all' ? orders.length : orders.filter((o) => o.status === f.value).length})
            </button>
          ))}
        </div>

        {/* Orders table */}
        {loading ? (
          <p style={{ textAlign: 'center', color: 'var(--gray)', padding: '40px' }}>Cargando pedidos...</p>
        ) : filteredOrders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', background: 'var(--white)', borderRadius: '12px' }}>
            <p style={{ fontSize: '1.2rem', color: 'var(--gray)', marginBottom: '8px' }}>No hay pedidos</p>
            <p style={{ fontSize: '.82rem', color: 'var(--gray)' }}>Los pedidos aparecerán aquí cuando los clientes realicen compras</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {filteredOrders.map((order) => (
              <div key={order.id} style={{
                background: 'var(--white)', borderRadius: '12px', padding: '24px',
                boxShadow: '0 2px 8px rgba(0,0,0,.04)',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                      <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.2rem', fontWeight: 400 }}>
                        #{order.id}
                      </span>
                      <span style={{
                        padding: '4px 10px', borderRadius: '4px', fontSize: '.68rem',
                        fontWeight: 600, letterSpacing: '.05em', textTransform: 'uppercase',
                        background: (STATUS_COLORS[order.status] || '#6B7280') + '15',
                        color: STATUS_COLORS[order.status] || '#6B7280',
                      }}>
                        {STATUS_LABELS[order.status] || order.status}
                      </span>
                      {order.payment_method && (
                        <span style={{
                          padding: '4px 10px', borderRadius: '4px', fontSize: '.65rem',
                          background: 'var(--mist)', color: 'var(--gray)',
                        }}>
                          {order.payment_method === 'local_transfer' ? 'Transferencia' : 'Stripe'}
                        </span>
                      )}
                    </div>
                    <p style={{ fontSize: '.72rem', color: 'var(--gray)' }}>
                      {formatDate(order.created_at)}
                    </p>
                  </div>
                  <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.5rem', fontWeight: 400, color: 'var(--rose)' }}>
                    {formatCurrency(order.total_usd)}
                  </span>
                </div>

                {/* Customer info */}
                {order.customer_name && (
                  <div style={{
                    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                    gap: '8px', padding: '12px', background: '#FAFAFA', borderRadius: '8px',
                    marginBottom: '12px', fontSize: '.78rem',
                  }}>
                    <div><strong>Nombre:</strong> {order.customer_name}</div>
                    <div><strong>Teléfono:</strong> {order.customer_phone || '—'}</div>
                    <div><strong>Ciudad:</strong> {order.customer_city || '—'}</div>
                    <div><strong>Dirección:</strong> {order.customer_address || '—'}</div>
                  </div>
                )}

                {(order.customer_email || order.customer_notes) && (
                  <div style={{ padding: '12px', background: '#FAFAFA', borderRadius: '8px', marginBottom: '12px', fontSize: '.78rem' }}>
                    {order.customer_email && <div><strong>Email:</strong> {order.customer_email}</div>}
                    {order.customer_notes && <div style={{ marginTop: '4px' }}><strong>Notas:</strong> {order.customer_notes}</div>}
                  </div>
                )}

                {/* Items */}
                <div style={{ marginBottom: '12px' }}>
                  <p style={{ fontSize: '.68rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--gray)', marginBottom: '8px' }}>
                    Productos
                  </p>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {Array.isArray(order.items) && order.items.map((item: any, i: number) => (
                      <span key={i} style={{
                        padding: '4px 10px', borderRadius: '4px', fontSize: '.75rem',
                        background: 'var(--nude)', color: 'var(--charcoal)',
                      }}>
                        {item.name} × {item.quantity}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Payment deadline */}
                {order.status === 'awaiting_payment_confirmation' && order.payment_deadline && (
                  <div style={{
                    padding: '10px 14px', background: '#FFF7ED', borderRadius: '6px',
                    fontSize: '.72rem', color: '#C2410C', marginBottom: '12px',
                  }}>
                    ⏰ Confirmar antes de: {formatDate(order.payment_deadline)}
                  </div>
                )}

                {/* Actions */}
                {order.status === 'awaiting_payment_confirmation' && (
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <button
                      onClick={() => confirmPayment(order.id)}
                      disabled={confirming === order.id}
                      style={{
                        padding: '10px 20px', background: '#2E7D4F', color: '#fff',
                        border: 'none', borderRadius: '6px', fontSize: '.75rem',
                        cursor: confirming === order.id ? 'not-allowed' : 'pointer',
                        fontFamily: "'DM Sans',sans-serif", fontWeight: 600,
                      }}
                    >
                      {confirming === order.id ? 'Procesando...' : '✓ Confirmar pago'}
                    </button>
                    <a
                      href={`https://wa.me/${order.customer_phone?.replace(/[^0-9]/g, '') || WHATSAPP_NUMBER}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        padding: '10px 20px', background: '#25D366', color: '#fff',
                        borderRadius: '6px', fontSize: '.75rem', textDecoration: 'none',
                        fontFamily: "'DM Sans',sans-serif", fontWeight: 600,
                      }}
                    >
                      WhatsApp
                    </a>
                    <button
                      onClick={() => updateOrderStatus(order.id, 'canceled')}
                      disabled={updatingStatus === order.id}
                      style={{
                        padding: '10px 16px', background: '#FEF2F2', color: '#B91C1C',
                        border: '1px solid #FECACA', borderRadius: '6px', fontSize: '.75rem',
                        cursor: updatingStatus === order.id ? 'not-allowed' : 'pointer',
                        fontFamily: "'DM Sans',sans-serif", fontWeight: 600,
                      }}
                    >
                      Cancelar
                    </button>
                    <span style={{ fontSize: '.68rem', color: 'var(--gray)' }}>
                      Verificar comprobante en WhatsApp antes de confirmar
                    </span>
                  </div>
                )}

                {order.status === 'paid' && (
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <button
                      onClick={() => updateOrderStatus(order.id, 'shipped')}
                      disabled={updatingStatus === order.id}
                      style={{
                        padding: '10px 20px', background: '#7C3AED', color: '#fff',
                        border: 'none', borderRadius: '6px', fontSize: '.75rem',
                        cursor: updatingStatus === order.id ? 'not-allowed' : 'pointer',
                        fontFamily: "'DM Sans',sans-serif", fontWeight: 600,
                      }}
                    >
                      Marcar enviado
                    </button>
                    <span style={{ fontSize: '.68rem', color: 'var(--gray)' }}>Preparar despacho y notificar al cliente.</span>
                  </div>
                )}

                                {order.status === 'pending_whatsapp_payment' && (
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-block', padding: '10px 20px', background: '#25D366', color: '#fff',
                      borderRadius: '6px', fontSize: '.75rem', textDecoration: 'none',
                      fontFamily: "'DM Sans',sans-serif", fontWeight: 600,
                    }}
                  >
                    Abrir WhatsApp para coordinar
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
