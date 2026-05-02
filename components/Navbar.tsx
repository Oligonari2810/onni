'use client'

import { useState, useEffect } from 'react'
import { useCart } from '@/lib/useCart'

export default function Navbar() {
  const { setIsOpen: setCartOpen, items } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [nosotrosOpen, setNosotrosOpen] = useState(false)

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <nav id="nav" className={scrolled ? 'scrolled' : ''}>
        <a href="#" className="nav-logo"><em>O</em>NNI</a>

        <ul className="nav-links">
          <li className="nav-dropdown-wrap">
            <button
              className="nav-dropdown-trigger"
              onClick={() => setNosotrosOpen(!nosotrosOpen)}
            >
              Nosotros <span className="nav-arrow">▾</span>
            </button>
            {nosotrosOpen && (
              <div className="nav-dropdown" onClick={() => setNosotrosOpen(false)}>
                <a href="#nosotras">Manifiesto</a>
                <a href="#caribe">El Caribe</a>
              </div>
            )}
          </li>
          <li><a href="#productos">Productos</a></li>
          <li><a href="#b2b">B2B</a></li>
        </ul>

        <div className="nav-right">
          <button
            className="cart-button"
            onClick={() => setCartOpen(true)}
            aria-label="Carrito de compras"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            {cartCount > 0 && (
              <span className="cart-count">{cartCount}</span>
            )}
          </button>
          <button
            className="hamburger"
            onClick={() => setMobileOpen(true)}
            aria-label="Menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="mobile-overlay" onClick={() => setMobileOpen(false)}>
          <div className="mobile-overlay-inner" onClick={(e) => e.stopPropagation()}>
            <button className="mobile-close" onClick={() => setMobileOpen(false)}>✕</button>
            <div className="mobile-nav-links">
              <a href="#nosotras" onClick={() => setMobileOpen(false)}>Manifiesto</a>
              <a href="#caribe" onClick={() => setMobileOpen(false)}>El Caribe</a>
              <a href="#productos" onClick={() => setMobileOpen(false)}>Productos</a>
              <a href="#b2b" onClick={() => setMobileOpen(false)}>B2B</a>
              <a href="#expansion" onClick={() => setMobileOpen(false)}>Expansión</a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
