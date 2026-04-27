'use client'

import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError('Credenciales incorrectas')
      setLoading(false)
      return
    }

    // Check if user is admin
    const { data: adminCheck, error: adminError } = await supabase
      .from('admin_users')
      .select('id')
      .eq('user_id', data.user.id)
      .single()

    if (adminError || !adminCheck) {
      await supabase.auth.signOut()
      setError('No tienes permisos de administrador')
      setLoading(false)
      return
    }

    router.push('/admin/orders')
    router.refresh()
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--cream)', padding: '24px' }}>
      <div style={{ background: 'var(--white)', borderRadius: '16px', padding: '40px', width: '100%', maxWidth: '400px', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '2rem', fontWeight: 300, color: 'var(--deep)', marginBottom: '8px' }}>
            ONNI Admin
          </h1>
          <p style={{ fontSize: '.85rem', color: 'var(--gray)' }}>Inicia sesión para continuar</p>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label htmlFor="email" style={{ display: 'block', fontSize: '.75rem', letterSpacing: '.05em', color: 'var(--gray)', marginBottom: '6px' }}>
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%', padding: '12px 16px', borderRadius: '8px',
                border: '1px solid var(--line)', fontSize: '.9rem',
                fontFamily: "'DM Sans',sans-serif", outline: 'none',
              }}
              placeholder="admin@onni.com"
            />
          </div>

          <div>
            <label htmlFor="password" style={{ display: 'block', fontSize: '.75rem', letterSpacing: '.05em', color: 'var(--gray)', marginBottom: '6px' }}>
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%', padding: '12px 16px', borderRadius: '8px',
                border: '1px solid var(--line)', fontSize: '.9rem',
                fontFamily: "'DM Sans',sans-serif", outline: 'none',
              }}
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p style={{ fontSize: '.8rem', color: '#DC2626', background: '#FEF2F2', padding: '10px 14px', borderRadius: '6px', margin: 0 }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '14px', background: 'var(--deep)', color: 'var(--white)',
              border: 'none', borderRadius: '8px', fontSize: '.85rem',
              fontFamily: "'DM Sans',sans-serif", fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer', letterSpacing: '.05em',
              marginTop: '8px',
            }}
          >
            {loading ? 'Ingresando...' : 'Iniciar sesión'}
          </button>
        </form>
      </div>
    </div>
  )
}
