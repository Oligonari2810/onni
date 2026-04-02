'use client'

import { getTranslation, type Language } from '@/lib/i18n'

interface HeroProps {
  lang: Language
}

export default function Hero({ lang }: HeroProps) {
  const t = getTranslation(lang)

  return (
    <section className="hero" id="inicio">
      <div className="hero-left">
        <p className="hero-eyebrow">{t.hero.eyebrow}</p>
        <h1 className="hero-title">
          <em>Onni</em><br />
          <span className="hero-title-kr">언니</span>
        </h1>
        <p className="hero-korean">La hermana mayor del Caribe</p>
        <p
          className="hero-desc"
          dangerouslySetInnerHTML={{ __html: t.hero.description }}
        />
        <div className="hero-actions">
          <a href="#productos" className="btn-primary">{t.hero.cta1}</a>
          <a href="#b2b" className="btn-ghost">{t.hero.cta2}</a>
        </div>
      </div>

      <div className="hero-right">
        <div className="hero-visual">
          <div className="hero-circles">
            <div className="circle-1"></div>
            <div className="circle-2"></div>
            <div className="circle-3">언니</div>
          </div>
        </div>
        <div className="hero-stats">
          {t.hero.stats.map((stat, i) => (
            <div key={i} className="hero-stat">
              <span className="hero-stat-n">{stat.value}</span>
              <span className="hero-stat-l">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
