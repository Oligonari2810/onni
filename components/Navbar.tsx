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
    <nav
      className={`fixed top-0 w-full z-100 px-12 py-6 flex items-center justify-between transition-all duration-400 ${
        scrolled
          ? 'backdrop-blur-sm border-b border-rose/[0.12]'
          : ''
      }`}
      style={{
        backgroundColor: scrolled ? 'rgba(250, 244, 240, 0.95)' : 'transparent',
      }}
    >
      <a href="#" className="text-3xl font-light tracking-widest text-deep font-cormorant">
        <em className="italic text-rose">O</em>NNI
      </a>

      <ul className="hidden md:flex gap-8 list-none">
        <li>
          <a
            href="#nosotras"
            className="text-xs uppercase tracking-wider text-charcoal opacity-70 hover:opacity-100 hover:text-rose transition-opacity"
          >
            {t.nav.links.about}
          </a>
        </li>
        <li>
          <a
            href="#productos"
            className="text-xs uppercase tracking-wider text-charcoal opacity-70 hover:opacity-100 hover:text-rose transition-opacity"
          >
            {t.nav.links.products}
          </a>
        </li>
        <li>
          <a
            href="#caribe"
            className="text-xs uppercase tracking-wider text-charcoal opacity-70 hover:opacity-100 hover:text-rose transition-opacity"
          >
            {t.nav.links.caribbean}
          </a>
        </li>
        <li>
          <a
            href="#puntos"
            className="text-xs uppercase tracking-wider text-charcoal opacity-70 hover:opacity-100 hover:text-rose transition-opacity"
          >
            {t.nav.links.points}
          </a>
        </li>
        <li>
          <a
            href="#b2b"
            className="text-xs uppercase tracking-wider text-charcoal opacity-70 hover:opacity-100 hover:text-rose transition-opacity"
          >
            {t.nav.links.b2b}
          </a>
        </li>
      </ul>

      <div className="flex items-center gap-5 ml-auto">
        <div className="flex gap-1.5 items-center">
          {(['es', 'en', 'fr'] as const).map((l, i, arr) => (
            <div key={l}>
              <button
                onClick={() => onLangChange(l)}
                className={`text-xs uppercase tracking-wider transition-colors px-1 py-0.5 ${
                  lang === l
                    ? 'text-rose font-medium'
                    : 'text-gray hover:text-rose'
                }`}
              >
                {l}
              </button>
              {i < arr.length - 1 && (
                <span className="text-xs text-rose opacity-30 mx-1">·</span>
              )}
            </div>
          ))}
        </div>
        <a
          href="#b2b"
          className="text-xs uppercase tracking-wider px-6 py-2.5 border border-rose text-rose hover:bg-rose hover:text-white transition-all"
        >
          {t.nav.cta}
        </a>
      </div>
    </nav>
  )
}
