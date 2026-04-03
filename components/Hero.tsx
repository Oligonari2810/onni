'use client'

import { type Language } from '@/lib/i18n'

interface HeroProps {
  lang: Language
}

export default function Hero({ lang }: HeroProps) {
  return (
    <section className="hero" id="inicio">
      <div className="hero-left hero-left-centered">
        <p className="hero-eyebrow">K-Beauty · Caribe</p>
        <h1 className="hero-title">
          <em>Onni</em><br />
          <span className="hero-title-kr">언니</span>
        </h1>
        <p className="hero-korean">La hermana mayor del Caribe</p>
        <p className="hero-desc">Ciencia coreana formulada para el Caribe.</p>
      </div>

      <div className="hero-right">
        <div className="hero-visual">
          <div className="hero-circles">
            <div className="circle-1"></div>
            <div className="circle-2"></div>
            <div className="circle-3">언니</div>
          </div>
        </div>
      </div>
    </section>
  )
}
