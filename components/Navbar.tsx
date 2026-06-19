'use client'

import { useState, useEffect } from 'react'
import { useCart } from '@/lib/useCart'

export default function Navbar() {
  const { setIsOpen: setCartOpen, items } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
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
          <li><a href="#nosotras">Nosotras</a></li>
          <li><a href="#productos">Productos</a></li>
          <li><a href="#rutinas">Rutinas</a></li>
          <li><a href="/blog">Blog</a></li>
          <li><a href="#reviews">Reviews</a></li>
        </ul>

        <div className="nav-right">
          <button
            className="cart-button"
            onClick={() => setCartOpen(true)}
            aria-label="Abrir carrito de compras"
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
            aria-label="Abrir menú de navegación"
            aria-expanded={mobileOpen}
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
              <a href="#nosotras" onClick={() => setMobileOpen(false)}>Nosotras</a>
              <a href="#productos" onClick={() => setMobileOpen(false)}>Productos</a>
              <a href="#rutinas" onClick={() => setMobileOpen(false)}>Rutinas</a>
              <a href="/blog" onClick={() => setMobileOpen(false)}>Blog</a>
              <a href="#reviews" onClick={() => setMobileOpen(false)}>Reviews</a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
