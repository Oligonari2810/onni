'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface Inquiry {
  id: number
  name: string
  establishment: string
  type: string
  city: string
  whatsapp: string
  email: string
  message: string
  created_at: string
}

export default function AdminDashboard() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('')
  const [typeFilter, setTypeFilter] = useState('')

  useEffect(() => {
    fetchInquiries()
  }, [])

  async function fetchInquiries() {
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setInquiries(data || [])
    } catch (error) {
      console.error('Error fetching inquiries:', error)
    } finally {
      setLoading(false)
    }
  }

  function exportToCSV() {
    const headers = ['ID', 'Nombre', 'Establecimiento', 'Tipo', 'Ciudad', 'WhatsApp', 'Email', 'Mensaje', 'Fecha']
    const rows = inquiries.map(i => [
      i.id,
      i.name,
      i.establishment,
      i.type,
      i.city,
      i.whatsapp,
      i.email,
      i.message,
      new Date(i.created_at).toLocaleDateString('es-DO')
    ])

    const csv = [headers, ...rows].map(row => row.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `onni-leads-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  const filteredInquiries = inquiries.filter(i => {
    const matchesSearch = i.name.toLowerCase().includes(filter.toLowerCase()) ||
                         i.establishment.toLowerCase().includes(filter.toLowerCase()) ||
                         i.city.toLowerCase().includes(filter.toLowerCase()) ||
                         i.email.toLowerCase().includes(filter.toLowerCase())
    const matchesType = !typeFilter || i.type === typeFilter
    return matchesSearch && matchesType
  })

  const types = [...new Set(inquiries.map(i => i.type))]

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', padding: '40px 20px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#111827', marginBottom: '8px' }}>
            ONNI Admin Dashboard
          </h1>
          <p style={{ color: '#6b7280', fontSize: '16px' }}>
            Gestión de leads B2B y solicitudes de distribución
          </p>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>Total Leads</div>
            <div style={{ fontSize: '32px', fontWeight: '700', color: '#111827' }}>{inquiries.length}</div>
          </div>
          <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>Este Mes</div>
            <div style={{ fontSize: '32px', fontWeight: '700', color: '#111827' }}>
              {inquiries.filter(i => {
                const date = new Date(i.created_at)
                const now = new Date()
                return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
              }).length}
            </div>
          </div>
          <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>Tipos</div>
            <div style={{ fontSize: '32px', fontWeight: '700', color: '#111827' }}>{types.length}</div>
          </div>
        </div>

        {/* Filters */}
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '24px' }}>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
            <input
              type="text"
              placeholder="Buscar por nombre, ciudad, email..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              style={{ flex: 1, minWidth: '250px', padding: '12px 16px', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '14px' }}
            />
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              style={{ padding: '12px 16px', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '14px', minWidth: '200px' }}
            >
              <option value="">Todos los tipos</option>
              {types.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <button
              onClick={exportToCSV}
              disabled={inquiries.length === 0}
              style={{ padding: '12px 24px', backgroundColor: '#111827', color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: inquiries.length === 0 ? 'not-allowed' : 'pointer', opacity: inquiries.length === 0 ? 0.5 : 1 }}
            >
              Exportar CSV
            </button>
          </div>
        </div>

        {/* Table */}
        <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
          {loading ? (
            <div style={{ padding: '60px', textAlign: 'center', color: '#6b7280' }}>
              Cargando leads...
            </div>
          ) : filteredInquiries.length === 0 ? (
            <div style={{ padding: '60px', textAlign: 'center', color: '#6b7280' }}>
              {filter || typeFilter ? 'No se encontraron leads con esos filtros' : 'No hay leads todavía'}
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                    <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Fecha</th>
                    <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Nombre</th>
                    <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Establecimiento</th>
                    <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Tipo</th>
                    <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Ciudad</th>
                    <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Contacto</th>
                    <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Mensaje</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInquiries.map((inquiry, index) => (
                    <tr key={inquiry.id} style={{ borderTop: index > 0 ? '1px solid #f3f4f6' : 'none' }}>
                      <td style={{ padding: '16px', fontSize: '14px', color: '#6b7280' }}>
                        {new Date(inquiry.created_at).toLocaleDateString('es-DO', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                      </td>
                      <td style={{ padding: '16px', fontSize: '14px', fontWeight: '500', color: '#111827' }}>
                        {inquiry.name}
                      </td>
                      <td style={{ padding: '16px', fontSize: '14px', color: '#111827' }}>
                        {inquiry.establishment}
                      </td>
                      <td style={{ padding: '16px', fontSize: '14px' }}>
                        <span style={{ padding: '4px 12px', backgroundColor: '#f3f4f6', borderRadius: '9999px', fontSize: '12px', fontWeight: '500', color: '#374151' }}>
                          {inquiry.type}
                        </span>
                      </td>
                      <td style={{ padding: '16px', fontSize: '14px', color: '#6b7280' }}>
                        {inquiry.city}
                      </td>
                      <td style={{ padding: '16px', fontSize: '14px', color: '#6b7280' }}>
                        <div style={{ marginBottom: '4px' }}>{inquiry.email}</div>
                        <div style={{ fontSize: '12px' }}>{inquiry.whatsapp}</div>
                      </td>
                      <td style={{ padding: '16px', fontSize: '14px', color: '#6b7280', maxWidth: '300px' }}>
                        {inquiry.message || '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ marginTop: '40px', textAlign: 'center', color: '#9ca3af', fontSize: '14px' }}>
          ONNI Admin Dashboard © {new Date().getFullYear()} · Arias Group Caribe SRL
        </div>
      </div>
    </div>
  )
}
