'use client'

import { bundles, getBundleProducts, getBundleTotal } from '@/lib/bundles'
import { useCart } from '@/lib/useCart'

export default function BundlesSection() {
  const { addToCart, setIsOpen } = useCart()

  const handleAddBundle = (bundleId: string) => {
    const bundle = bundles.find((item) => item.id === bundleId)
    if (!bundle) return

    getBundleProducts(bundle).forEach((product) => {
      if (!product) return
      addToCart({
        id: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
      })
    })

    setIsOpen(true)
  }

  return (
    <section className="rutinas" id="rutinas">
      <div className="rutinas-header">
        <span className="section-label">Tus Rutinas</span>
        <h2 className="section-title">Empieza por tu <em>rutina</em></h2>
        <p className="rutinas-desc">K-Beauty adaptado al clima del Caribe. Rutinas completas con pasos esenciales.</p>
      </div>
      <div className="rutinas-grid">
        {bundles.map((bundle) => {
          const bundleProducts = getBundleProducts(bundle)
          const total = getBundleTotal(bundle)

          return (
            <div className="rutina-card" key={bundle.id}>
              <div className="rutina-image" style={{ background: bundle.gradient }}>
                <span className="rutina-icon">{bundle.icon}</span>
              </div>
              <div className="rutina-body">
                <h3>{bundle.name}</h3>
                <p>{bundle.description}</p>
                <div className="rutina-steps">
                  <strong>Pasos:</strong> {bundleProducts.map((product) => product?.category).join(' · ')}
                </div>
                {bundle.highlight && <div className="rutina-save">{bundle.highlight}</div>}
                <div className="rutina-price">
                  <span className="rutina-price-amount">${total.toFixed(2)}</span>
                </div>
                <button className="rutina-btn" onClick={() => handleAddBundle(bundle.id)}>
                  Comprar rutina
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
