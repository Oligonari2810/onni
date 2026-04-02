'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import ContactForm from '@/components/ContactForm'
import { type Language } from '@/lib/i18n'

export default function Home() {
  const [lang, setLang] = useState<Language>('es')

  useEffect(() => {
    // Custom cursor
    const cur = document.getElementById('cur')
    const curR = document.getElementById('curR')
    let mx = 0,
      my = 0,
      rx = 0,
      ry = 0

    const handleMouseMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
    }

    document.addEventListener('mousemove', handleMouseMove)

    const animateCursor = () => {
      if (cur) {
        cur.style.left = mx + 'px'
        cur.style.top = my + 'px'
      }
      rx += (mx - rx) * 0.12
      ry += (my - ry) * 0.12
      if (curR) {
        curR.style.left = rx + 'px'
        curR.style.top = ry + 'px'
      }
      requestAnimationFrame(animateCursor)
    }

    animateCursor()

    // Reveal on scroll
    const reveals = document.querySelectorAll('.reveal')
    const revealOnScroll = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(
              () => entry.target.classList.add('visible'),
              i * 80
            )
          }
        })
      },
      { threshold: 0.08 }
    )

    reveals.forEach((el) => revealOnScroll.observe(el))

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      reveals.forEach((el) => revealOnScroll.unobserve(el))
    }
  }, [])

  return (
    <>
      <div id="cur" className="cursor" />
      <div id="curR" className="cursor-ring" />
      <Navbar lang={lang} onLangChange={setLang} />
      <Hero lang={lang} />

      {/* MARQUEE */}
      <div className="bg-rose py-3.5 overflow-hidden">
        <div className="flex gap-12 animate-marquee whitespace-nowrap">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex gap-12">
              <span className="text-xs uppercase tracking-widest text-white/80 flex items-center gap-12 flex-shrink-0">
                Ciencia coreana
              </span>
              <span className="text-xs uppercase tracking-widest text-white/80 flex items-center gap-12 flex-shrink-0">
                Formulado para el Caribe
              </span>
              <span className="text-xs uppercase tracking-widest text-white/80 flex items-center gap-12 flex-shrink-0">
                Sin cast blanco
              </span>
              <span className="text-xs uppercase tracking-widest text-white/80 flex items-center gap-12 flex-shrink-0">
                Seleccionado con criterio
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION: B2B CONTACT */}
      <section className="bg-deep px-12 md:px-20 py-28" id="b2b">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start max-w-5xl mx-auto">
          <div className="reveal">
            <h3 className="font-cormorant text-3xl md:text-4xl font-light text-white leading-tight mb-4">
              Hablemos de <em className="italic text-blush">tu negocio</em>
            </h3>
            <p className="text-sm leading-relaxed text-white/40 mb-6">
              Escríbenos con los datos de tu establecimiento y te enviamos el
              dossier de producto, condiciones de distribución y pricing B2B en
              24 horas.
            </p>
          </div>

          <div className="reveal">
            <ContactForm lang={lang} />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-charcoal px-12 md:px-20 py-16 text-center">
        <p className="text-xs text-white/20">
          © 2025 Onni Cosmetics. Hecho con <span className="text-rose">♥</span>{' '}
          para el Caribe.
        </p>
      </footer>
    </>
  )
}
