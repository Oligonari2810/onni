import { Suspense } from 'react'
import CheckoutView from './CheckoutView'

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: 'var(--cream)', paddingTop: '200px', textAlign: 'center', color: 'var(--gray)' }}>Cargando...</div>}>
      <CheckoutView />
    </Suspense>
  )
}
