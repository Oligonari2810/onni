'use client'

import { type Language } from '@/lib/i18n'

interface HeroProps {
  lang: Language
}

export default function Hero({ lang }: HeroProps) {
  return (
    <section className="hero" id="inicio">
      <div className="hero-left hero-left-centered">
        <p className="hero-eyebrow">Distribución especializada · K-Beauty para el Caribe</p>
        <h1 className="hero-title hero-title-v3">
          K-Beauty seleccionado para<br />el clima del <em>Caribe</em>
        </h1>
        <p className="hero-subtitle">
          Distribución especializada para clínicas, spas y profesionales.<br className="hero-br-desktop" />
          Formulaciones adaptadas a piel tropical: manchas, humedad y alta radiación UV.
        </p>
        <div className="hero-actions">
          <a href="#b2b" className="btn-primary">Solicitar punto ONNI</a>
          <a href="https://wa.me/18494754442?text=Hola%2C%20quiero%20informaci%C3%B3n%20para%20ser%20punto%20ONNI." className="btn-ghost" target="_blank" rel="noopener noreferrer">Hablar por WhatsApp</a>
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
      </div>
    </section>
  )
}
