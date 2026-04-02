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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav id="nav" className={scrolled ? 'scrolled' : ''}>
      <a href="#" className="nav-logo"><em>O</em>NNI</a>

      <ul className="nav-links">
        <li><a href="#nosotras">{t.nav.links.about}</a></li>
        <li><a href="#productos">{t.nav.links.products}</a></li>
        <li><a href="#caribe">{t.nav.links.caribbean}</a></li>
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
        <a href="#b2b" className="nav-cta">{t.nav.cta}</a>
      </div>
    </nav>
  )
}
