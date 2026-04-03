'use client'

import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [nosotrosOpen, setNosotrosOpen] = useState(false)

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
