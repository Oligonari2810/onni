import { Suspense } from 'react'
import CheckoutPendingView from './CheckoutPendingView'

export default function CheckoutPendingPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: 'var(--cream)', paddingTop: '200px', textAlign: 'center', color: 'var(--gray)' }}>Cargando...</div>}>
      <CheckoutPendingView />
    </Suspense>
  )
}
