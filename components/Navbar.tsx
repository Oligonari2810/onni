'use client'

import { useState, useEffect } from 'react'
import { getTranslation, type Language } from '@/lib/i18n'

interface NavbarProps {
  lang: Language
  onLangChange: (lang: Language) => void
}

export default function Navbar({ lang, onLangChange }: NavbarProps) {
  const t = getTranslation(lang)
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
          <li><a href="#productos">{t.nav.links.products}</a></li>
          <li><a href="#puntos">{t.nav.links.points}</a></li>
          <li><a href="#b2b">{t.nav.links.b2b}</a></li>
        </ul>

        <div className="nav-right">
          <div className="lang-sel">
            {(['es', 'en', 'fr'] as const).map((l, i, arr) => (
              <span key={l}>
                <button
                  onClick={() => onLangChange(l)}
                  className={`lang-btn${lang === l ? ' active' : ''}`}
                >
                  {l.toUpperCase()}
                </button>
                {i < arr.length - 1 && <span className="lang-sep">·</span>}
              </span>
            ))}
          </div>
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
              <a href="#puntos" onClick={() => setMobileOpen(false)}>Puntos Onni</a>
              <a href="#b2b" onClick={() => setMobileOpen(false)}>B2B</a>
              <a href="#expansion" onClick={() => setMobileOpen(false)}>Expansión</a>
            </div>
            <div className="mobile-lang">
              {(['es', 'en', 'fr'] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => { onLangChange(l); setMobileOpen(false) }}
                  className={`lang-btn${lang === l ? ' active' : ''}`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
