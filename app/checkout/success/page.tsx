import { Suspense } from 'react'
import SuccessView from './SuccessView'

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: 'var(--cream)', paddingTop: '200px', textAlign: 'center', color: 'var(--gray)' }}>Cargando...</div>}>
      <SuccessView />
    </Suspense>
  )
}
