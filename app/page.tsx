'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import ContactForm from '@/components/ContactForm'
import { type Language } from '@/lib/i18n'

const products = [
  {
    emoji: '✨',
    badge: '⭐ Estrella',
    bg: 'linear-gradient(135deg,#fce4ec,#f8bbd0)',
    brand: 'Seleccion Onni · Serum tratamiento',
    name: 'Serum Niacinamide 10% + TXA 4%',
    claim: 'Manchas, hiperpigmentacion, unificacion de tono. La triada activa mas potente para el clima del Caribe.',
    price: '$28-32',
    tags: ['Niacinamide', 'TXA'],
  },
  {
    emoji: '🌑',
    badge: null,
    bg: 'linear-gradient(135deg,#1a1a2e,#2c1a24)',
    brand: 'Seleccion Onni · Limpieza paso 1',
    name: 'Aceite Limpiador Gentle Black',
    claim: 'Doble limpieza para piel grasa tropical. Sin fragancia, emulsifica al instante, no deja residuo.',
    price: '$22-26',
    tags: ['Oil cleanse', 'Sin alcohol'],
  },
  {
    emoji: '🌿',
    badge: null,
    bg: 'linear-gradient(135deg,#e8f5e9,#c8e6c9)',
    brand: 'Seleccion Onni · Limpieza paso 2',
    name: 'Espuma Limpiadora Heartleaf',
    claim: 'Low-pH para equilibrar el microbioma. Controla sebo y poros en clima humedo sin resecar.',
    price: '$18-22',
    tags: ['Low pH', 'BHA'],
  },
  {
    emoji: '☀️',
    badge: '⭐ Estrella',
    bg: 'linear-gradient(135deg,#fff9c4,#fff176)',
    brand: 'Seleccion Onni · Proteccion solar',
    name: 'Protector Solar SPF50+ PA++++',
    claim: 'El SPF que el Caribe necesitaba. Sin cast blanco, textura leche, reef-safe. Proteccion UV maxima.',
    price: '$26-30',
    tags: ['SPF50+', 'PA++++'],
  },
  {
    emoji: '🍑',
    badge: null,
    bg: 'linear-gradient(135deg,#fce4ec,#ffe0b2)',
    brand: 'Seleccion Onni · Serum hidratante',
    name: 'Serum Niacinamide 5% + Peach',
    claim: 'Luminosidad e hidratacion en textura ultra-ligera. Niacinamida 5%, triple hialuronico, arbutina.',
    price: '$20-24',
    tags: ['Hydrating', 'Glow'],
  },
  {
    emoji: '🌊',
    badge: null,
    bg: 'linear-gradient(135deg,#e3f2fd,#bbdefb)',
    brand: 'Seleccion Onni · Tratamiento express',
    name: 'Sheet Masks -- Caja x10',
    claim: 'Visible en 20 minutos. Clean beauty, packaging biodegradable, reef-safe. El regalo perfecto.',
    price: '$22-26',
    tags: ['Clean', 'Reef-safe'],
  },
]

const testimonials = [
  {
    text: 'Llevaba anos buscando un SPF que no dejara cara blanca. El de Onni es el primero que realmente funciona. Lo uso todos los dias y no se nota absolutamente nada.',
    name: 'Maria J.',
    role: 'Santo Domingo · Cliente',
  },
  {
    text: 'Como farmaceutica me sorprendio la calidad de los ingredientes activos. El serum de niacinamida al 10% es comparable a marcas dermatologicas europeas a la mitad del precio.',
    name: 'Dra. Valentina R.',
    role: 'Farmaceutica · Naco',
  },
  {
    text: 'En 6 semanas vi la diferencia en mis manchas. Por fin una seleccion que entiende lo que le pasa a nuestra piel en este clima. Onni llego para quedarse.',
    name: 'Carlos M.',
    role: 'Punta Cana · Cliente',
  },
]

const credItems = [
  { icon: '🇰🇷', text: 'Origen certificado · Corea del Sur' },
  { icon: '✓', text: 'Registro MISPAS en tramite' },
  { icon: '🌿', text: 'Sin alcohol denat · Sin parabenos' },
  { icon: '🌊', text: 'Reef-safe · SPF certificado' },
  { icon: '🧪', text: 'Testado dermatologicamente' },
  { icon: '📦', text: 'Envio · Republica Dominicana' },
]

const puntosSD = [
  { icon: '💊', name: 'Carol · Naco', addr: 'Av. Gustavo Mejia Ricart No. 24', type: 'farmacia' },
  { icon: '💊', name: 'Carol · Bella Vista', addr: 'Av. Sarasota No. 101 · 24h', type: 'farmacia' },
  { icon: '💊', name: 'Carol · Churchill', addr: 'Av. Winston Churchill esq. Mejia Ricart · 24h', type: 'farmacia' },
  { icon: '💊', name: 'Los Hidalgos · Piantini', addr: 'Ensanche Piantini, Santo Domingo', type: 'farmacia' },
  { icon: '💊', name: 'Los Hidalgos · Naco', addr: 'Ensanche Naco, Santo Domingo', type: 'farmacia' },
  { icon: '💊', name: 'Medicar GBC · Naco', addr: 'Av. Tiradentes #56, Plaza Armiben', type: 'farmacia' },
  { icon: '🏥', name: 'InMed · Piantini', addr: 'Instituto de Medicina Estetica', type: 'clinica' },
  { icon: '🏥', name: 'Sesderma Skin Center', addr: 'Acropolis Business Mall · Piantini', type: 'clinica' },
  { icon: '🏥', name: 'Cifre · Clinica Estetica', addr: 'Av. Independencia, Plaza El Portal', type: 'clinica' },
  { icon: '🌸', name: 'Etra Spa · Piantini', addr: 'Ensanche Piantini · Cadena nacional', type: 'spa' },
  { icon: null, name: 'En seleccion', addr: 'Proximo punto Onni · SD 2025', type: 'ghost' },
]

const puntosPC = [
  { icon: '💊', name: 'Carol · Blue Mall', addr: 'Boulevard Turistico esq. Juanillo', type: 'farmacia' },
  { icon: '💊', name: 'Los Hidalgos · Bavaro', addr: 'Bavaro City Center · Delivery hoteles', type: 'farmacia' },
  { icon: '💊', name: 'Medicar GBC · Bavaro', addr: 'Bavaro · Apertura 2024', type: 'farmacia' },
  { icon: '🏥', name: 'ProfEstetic', addr: 'Plaza Paseo San Juan · Bavaro', type: 'clinica' },
  { icon: '🏥', name: 'CM-Clinic', addr: 'Av. Alemania, junto Hotel Secrets', type: 'clinica' },
  { icon: '🌸', name: 'Serenity Beauty Studio', addr: 'Plaza Barcelo Local 211 · Bavaro', type: 'spa' },
  { icon: '🌸', name: 'Etra Spa · Punta Cana', addr: 'Hotel Ocean Blue + VIK Arena Blanca', type: 'spa' },
]

const countries = [
  { flag: '🇩🇴', name: 'Rep. Dominicana', status: 'Activo · 2025', statusClass: 'active', desc: 'Base · SD + Punta Cana', highlight: true },
  { flag: '🇹🇨', name: 'Turks & Caicos', status: 'Proximamente', statusClass: 'soon', desc: 'Providenciales · Premium', highlight: false },
  { flag: '🇵🇷', name: 'Puerto Rico', status: '2026', statusClass: 'soon', desc: 'San Juan · Puerta EE.UU.', highlight: false },
  { flag: '🇹🇹', name: 'Trinidad & Tobago', status: '2026', statusClass: 'soon', desc: 'Mayor PIB del Caribe', highlight: false },
  { flag: '🇯🇲', name: 'Jamaica', status: '2027', statusClass: 'future', desc: 'Kingston · 3M hab.', highlight: false },
  { flag: '🇧🇧', name: 'Barbados', status: '2027', statusClass: 'future', desc: 'Bridgetown · Premium', highlight: false },
  { flag: '🇨🇼', name: 'Curazao', status: '2027', statusClass: 'future', desc: 'Willemstad · Europa', highlight: false },
  { flag: '🇦🇼', name: 'Aruba', status: '2027', statusClass: 'future', desc: 'Oranjestad · Turismo', highlight: false },
  { flag: '🇲🇶', name: 'Martinica', status: '2028', statusClass: 'future', desc: 'Dpto. frances', highlight: false },
  { flag: '🇬🇵', name: 'Guadalupe', status: '2028', statusClass: 'future', desc: 'Caribe francofono', highlight: false },
  { flag: '🇻🇮', name: 'Islas Virgenes US', status: '2028', statusClass: 'future', desc: 'St. Thomas · USA', highlight: false },
  { flag: '🇸🇷', name: 'Surinam', status: '2029', statusClass: 'future', desc: 'Caribe continental', highlight: false },
  { flag: '🇧🇿', name: 'Belice', status: '2029', statusClass: 'future', desc: 'Puente LATAM-Caribe', highlight: false },
  { flag: '🇭🇹', name: 'Haiti', status: 'Largo plazo', statusClass: 'future', desc: '11M hab. · Con socio local', highlight: false },
  { flag: '🌍', name: '+ Caribe', status: 'TBD', statusClass: 'future', desc: 'Mas mercados', highlight: false },
]

const b2bChannels = [
  { icon: '💊', title: 'Farmacias', desc: 'Documentacion MISPAS completa. Margen atractivo para el canal farmaceutico.' },
  { icon: '🏥', title: 'Clinicas esteticas', desc: 'Linea para prescripcion dermatologica. Argumentario cientifico incluido.' },
  { icon: '🌸', title: 'Spas & bienestar', desc: 'Kit de cabina disponible. Formacion en K-beauty para tu equipo.' },
  { icon: '🛍️', title: 'Tiendas especializadas', desc: 'Distribucion exclusiva por zona. Material de visual merchandising incluido.' },
]

export default function Home() {
  const [lang, setLang] = useState<Language>('es')
  const [puntosFilter, setPuntosFilter] = useState('all')

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

  const filterPunto = (p: { type: string }) => {
    if (puntosFilter === 'all') return true
    if (puntosFilter === 'sd' || puntosFilter === 'pc') return true
    return p.type === puntosFilter
  }

  return (
    <>
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

      {/* MANIFIESTO */}
      <section className="px-7 md:px-20 py-20 md:py-36 max-w-[1400px] mx-auto" id="nosotras">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
          <div className="reveal">
            <span className="text-xs tracking-widest uppercase text-rose block mb-5">Nuestro manifiesto</span>
            <blockquote className="font-cormorant text-3xl md:text-5xl font-light leading-snug text-deep">
              &ldquo;Que el Caribe tenga por primera vez productos disenados para <em className="italic text-rose">su clima real</em> y su realidad.&rdquo;
            </blockquote>
          </div>
          <div className="flex flex-col gap-9">
            {[
              { num: '01', title: 'La hermana mayor', text: 'En coreano, Onni significa hermana mayor. La que ya paso por lo que tu estas viviendo. La que fue a Corea, investigo, probo -- y trajo lo que realmente funciona aqui.' },
              { num: '02', title: 'Curaduria, no fabricacion', text: 'No fabricamos. Seleccionamos. Entre miles de productos K-beauty escogemos los que tienen la ciencia, la textura y los ingredientes correctos para el clima del Caribe.' },
              { num: '03', title: 'El Caribe como protagonista', text: 'Sin estandares asiaticos ni europeos. Sin claim de blanqueamiento. El Caribe como referencia, no como mercado secundario.' },
            ].map((p) => (
              <div key={p.num} className="flex gap-6 items-start reveal">
                <span className="font-cormorant text-5xl font-light text-rose/20 leading-none flex-shrink-0">{p.num}</span>
                <div>
                  <h4 className="text-sm tracking-wider uppercase text-deep mb-2">{p.title}</h4>
                  <p className="text-sm leading-relaxed text-gray">{p.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POR QUE K-BEAUTY */}
      <section className="bg-deep px-7 md:px-20 py-20 md:py-36">
        <div className="text-center mb-16 reveal">
          <span className="text-xs tracking-widest uppercase text-blush block mb-5">Por que K-beauty para el Caribe</span>
          <h2 className="font-cormorant text-4xl md:text-5xl font-light text-white leading-tight">
            Tu clima tiene necesidades<br /><em className="italic text-rose">que nadie estaba sirviendo</em>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5 max-w-[1200px] mx-auto">
          {[
            { icon: '☀️', title: 'Indice UV extremo', text: 'El Caribe tiene UV <strong class="text-blush font-normal">10-12</strong> frente al 3-5 de Seul. El SPF 50+ PA++++ no es lujo -- es necesidad. K-beauty lleva 30 anos perfeccionandolo sin cast blanco.' },
            { icon: '🌿', title: 'Hiperpigmentacion tropical', text: 'En el Caribe la hiperpigmentacion post-inflamatoria es el problema numero uno. <strong class="text-blush font-normal">Niacinamida + acido tranexamico + arbutina</strong> es la triada que funciona. Nadie la habia traido aqui.' },
            { icon: '💧', title: 'Humedad y sebo', text: 'Con 70-90% de humedad constante, las cremas densas sofocan y generan acne. K-beauty invento las texturas <strong class="text-blush font-normal">gel y water-based</strong> exactamente para esto.' },
          ].map((card) => (
            <div key={card.title} className="group bg-white/[0.03] p-10 border border-white/5 relative overflow-hidden transition-all duration-400 hover:bg-rose/[0.06] reveal">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-rose scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />
              <span className="text-3xl block mb-5">{card.icon}</span>
              <h3 className="font-cormorant text-xl font-normal text-white mb-3">{card.title}</h3>
              <p className="text-sm leading-relaxed text-white/40" dangerouslySetInnerHTML={{ __html: card.text }} />
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCTOS */}
      <section className="px-7 md:px-20 py-20 md:py-36 bg-cream" id="productos">
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-4 mb-16 reveal">
          <div>
            <span className="text-xs tracking-widest uppercase text-rose block mb-5">Seleccion Onni</span>
            <h2 className="font-cormorant text-4xl md:text-5xl font-light text-deep leading-tight">
              Los mejores<br /><em className="italic text-rose">para el Caribe</em>
            </h2>
          </div>
          <p className="text-sm text-gray max-w-[280px] md:text-right leading-relaxed">
            Cada producto fue elegido por su eficacia especifica para el clima del Caribe: texturas ligeras, activos verificados, sin irritantes.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5">
          {products.map((p) => (
            <div key={p.name} className="bg-nude overflow-hidden relative transition-transform duration-400 hover:-translate-y-1 reveal">
              <div className="h-64 flex items-center justify-center relative overflow-hidden" style={{ background: p.bg }}>
                <div className="absolute inset-0 bg-gradient-to-br from-rose/[0.06] to-transparent" />
                <span className="text-6xl relative z-[1]">{p.emoji}</span>
                {p.badge && (
                  <span className="absolute top-5 right-5 text-[0.62rem] tracking-widest uppercase py-1 px-3 bg-rose text-white z-[2]">{p.badge}</span>
                )}
              </div>
              <div className="p-7">
                <p className="text-[0.62rem] tracking-widest uppercase text-rose mb-2">{p.brand}</p>
                <h3 className="font-cormorant text-xl font-normal text-deep mb-2.5 leading-tight">{p.name}</h3>
                <p className="text-sm leading-relaxed text-gray mb-4">{p.claim}</p>
                <div className="flex justify-between items-center pt-4 border-t border-rose/[0.12]">
                  <div className="font-cormorant text-xl font-light text-deep">
                    {p.price} <span className="font-dm text-xs text-gray">USD</span>
                  </div>
                  <div className="flex gap-1">
                    {p.tags.map((tag) => (
                      <span key={tag} className="text-[0.58rem] py-0.5 px-2 bg-rose/[0.08] text-rose tracking-wider">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CARIBE */}
      <section className="px-7 md:px-20 py-20 md:py-36 bg-nude" id="caribe">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
          <div className="reveal">
            <span className="text-xs tracking-widest uppercase text-rose block mb-5">La ciencia detras del Caribe</span>
            <h2 className="font-cormorant text-4xl md:text-5xl font-light text-deep leading-tight mb-6">
              Por que el Caribe<br />necesita su <em className="italic text-rose">propio K-beauty</em>
            </h2>
            <p className="text-sm leading-relaxed text-gray mb-4">
              El Caribe tiene un clima unico que destruye los productos formulados para otros mercados. Corea lleva 30 anos perfeccionando <strong className="text-rose font-medium">exactamente los activos que funcionan aqui</strong>: SPF ligero sin cast, niacinamida para manchas, texturas que no sofocan con 35C y 85% de humedad.
            </p>
            <p className="text-sm leading-relaxed text-gray mb-9">
              Onni hace la traduccion. Seleccionamos los productos con la formula correcta para este clima especifico, los probamos y los traemos.
            </p>
            <div className="flex gap-2.5 flex-wrap">
              {['Republica Dominicana', 'Turks & Caicos', 'Puerto Rico', 'Trinidad'].map((t) => (
                <span key={t} className="py-2 px-4 border border-rose/[0.12] text-xs tracking-wider uppercase text-rose transition-all hover:bg-rose hover:text-white">{t}</span>
              ))}
            </div>
          </div>
          <div className="reveal">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0.5">
              <div className="md:col-span-2 bg-deep p-8">
                <div className="font-cormorant text-5xl font-light text-blush leading-none">UV 12</div>
                <div className="text-[0.65rem] tracking-widest uppercase text-white/40 mt-1.5 mb-2.5">Indice UV en el Caribe</div>
                <div className="text-xs leading-relaxed text-white/40">Versus 3-5 en Seul. El SPF 50+ PA++++ no es cosmetica -- es salud publica en el Caribe.</div>
              </div>
              <div className="bg-white p-8">
                <div className="font-cormorant text-5xl font-light text-rose leading-none">85%</div>
                <div className="text-[0.65rem] tracking-widest uppercase text-gray mt-1.5 mb-2.5">Humedad relativa media</div>
                <div className="text-xs leading-relaxed text-gray">Las cremas densas sofocan la piel. Las texturas gel y water-based son la solucion.</div>
              </div>
              <div className="bg-white p-8">
                <div className="font-cormorant text-5xl font-light text-rose leading-none">PIH</div>
                <div className="text-[0.65rem] tracking-widest uppercase text-gray mt-1.5 mb-2.5">El problema numero uno</div>
                <div className="text-xs leading-relaxed text-gray">Hiperpigmentacion post-inflamatoria. Nadie habia traido la solucion coreana al Caribe.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="px-7 md:px-20 py-20 md:py-36 bg-cream">
        <div className="text-center mb-16 reveal">
          <span className="text-xs tracking-widest uppercase text-rose block mb-5">Lo que dicen</span>
          <h2 className="font-cormorant text-4xl md:text-5xl font-light text-deep leading-tight">
            Quienes ya <em className="italic text-rose">confian en Onni</em>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-nude p-8 md:p-10 relative reveal">
              <span className="absolute top-3 left-6 font-cormorant text-7xl text-rose/10 leading-none">&ldquo;</span>
              <div className="text-sm text-rose mb-4">★★★★★</div>
              <p className="text-sm leading-relaxed text-charcoal mb-6 pt-4 relative z-[1]">{t.text}</p>
              <div className="flex items-center gap-3 pt-4 border-t border-rose/[0.12]">
                <div className="w-9 h-9 rounded-full bg-mist flex items-center justify-center text-base flex-shrink-0">👤</div>
                <div>
                  <div className="text-sm font-medium text-deep">{t.name}</div>
                  <div className="text-xs text-gray">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CREDIBILIDAD */}
      <div className="bg-deep px-7 md:px-20 py-7 flex items-center justify-center gap-8 md:gap-14 flex-wrap">
        {credItems.map((c) => (
          <div key={c.text} className="flex items-center gap-2.5 opacity-50 hover:opacity-100 transition-opacity">
            <span className="text-xl">{c.icon}</span>
            <span className="text-[0.68rem] tracking-widest uppercase text-white">{c.text}</span>
          </div>
        ))}
      </div>

      {/* PUNTOS ONNI */}
      <section className="px-7 md:px-20 py-20 md:py-36 bg-nude" id="puntos">
        <div className="text-center mb-14 reveal">
          <span className="text-xs tracking-widest uppercase text-rose block mb-5">Red de distribucion exclusiva</span>
          <h2 className="font-cormorant text-4xl md:text-5xl font-light text-deep leading-tight">
            Puntos <em className="italic text-rose">Onni</em> seleccionados
          </h2>
          <p className="text-sm text-gray max-w-xl mx-auto mt-4 leading-relaxed">
            Onni no esta en todas partes. <strong className="text-rose font-medium">Esta en los lugares correctos.</strong> Cada punto es elegido por su alineacion con los valores de marca, capacidad de prescripcion y exclusividad por zona.
          </p>
        </div>

        <div className="flex gap-2.5 flex-wrap justify-center mb-14">
          {[
            { key: 'all', label: 'Todos' },
            { key: 'farmacia', label: '💊 Farmacias' },
            { key: 'clinica', label: '🏥 Clinicas' },
            { key: 'spa', label: '🌸 Spas' },
            { key: 'sd', label: 'Santo Domingo' },
            { key: 'pc', label: 'Punta Cana' },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setPuntosFilter(f.key)}
              className={`py-2 px-5 border text-xs tracking-wider uppercase transition-all ${
                puntosFilter === f.key
                  ? 'bg-rose text-white border-rose'
                  : 'border-rose/20 text-gray hover:bg-rose hover:text-white hover:border-rose'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Santo Domingo */}
        {puntosFilter !== 'pc' && (
          <div className="mb-12 reveal">
            <div className="font-cormorant text-2xl font-light text-deep flex items-center gap-3 mb-6 pb-4 border-b border-rose/[0.12]">
              <span className="w-2 h-2 rounded-full bg-rose flex-shrink-0" />
              Santo Domingo
              <span className="text-[0.65rem] tracking-widest uppercase text-gray ml-auto font-dm">11 puntos</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-0.5">
              {puntosSD.filter(filterPunto).map((p) => (
                <div
                  key={p.name}
                  className={`group p-6 relative overflow-hidden transition-transform hover:-translate-y-0.5 ${
                    p.type === 'ghost'
                      ? 'opacity-30 border border-dashed border-rose/20 bg-transparent'
                      : 'bg-white'
                  }`}
                >
                  {p.type !== 'ghost' && (
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-rose scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />
                  )}
                  <span className="text-2xl block mb-2.5" style={p.type === 'ghost' ? { filter: 'grayscale(1)' } : {}}>
                    {p.type === 'ghost' ? '➕' : p.icon}
                  </span>
                  <h4 className={`font-cormorant text-lg font-normal mb-1.5 ${p.type === 'ghost' ? 'text-gray' : 'text-deep'}`}>{p.name}</h4>
                  <p className="text-xs leading-relaxed text-gray">{p.addr}</p>
                  {p.type !== 'ghost' && (
                    <span className="inline-block mt-2.5 py-0.5 px-2.5 text-[0.58rem] tracking-widest uppercase border border-rose/25 text-rose">Lanzamiento 2025</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Punta Cana */}
        {puntosFilter !== 'sd' && (
          <div className="mb-12 reveal">
            <div className="font-cormorant text-2xl font-light text-deep flex items-center gap-3 mb-6 pb-4 border-b border-rose/[0.12]">
              <span className="w-2 h-2 rounded-full bg-rose flex-shrink-0" />
              Punta Cana · Bavaro
              <span className="text-[0.65rem] tracking-widest uppercase text-gray ml-auto font-dm">7 puntos</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-0.5">
              {puntosPC.filter(filterPunto).map((p) => (
                <div key={p.name} className="group bg-white p-6 relative overflow-hidden transition-transform hover:-translate-y-0.5">
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-rose scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />
                  <span className="text-2xl block mb-2.5">{p.icon}</span>
                  <h4 className="font-cormorant text-lg font-normal text-deep mb-1.5">{p.name}</h4>
                  <p className="text-xs leading-relaxed text-gray">{p.addr}</p>
                  <span className="inline-block mt-2.5 py-0.5 px-2.5 text-[0.58rem] tracking-widest uppercase border border-rose/25 text-rose">Lanzamiento 2025</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Exclusividad */}
        <div className="bg-deep px-7 md:px-20 py-16 mt-14 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center reveal">
          <div>
            <span className="text-xs tracking-widest uppercase text-blush block mb-4">Politica de distribucion</span>
            <h3 className="font-cormorant text-3xl md:text-4xl font-light text-white leading-snug mb-5">
              Onni elige a sus <em className="italic text-blush">puntos</em>
            </h3>
            <p className="text-sm leading-relaxed text-white/40">
              No trabajamos con cualquier establecimiento. Buscamos socios que compartan nuestra vision: <span className="text-blush">prescribir con conocimiento, no solo vender.</span> Cada punto es exclusivo en su zona -- si tu competidor llega primero, la ventana se cierra.
            </p>
          </div>
          <div className="flex flex-col gap-0.5">
            {[
              { num: '01', title: 'Alineacion de valores', text: 'Cuidado profesional, no solo comercial.' },
              { num: '02', title: 'Capacidad de prescripcion', text: 'Personal que entiende y explica K-beauty.' },
              { num: '03', title: 'Exclusividad por zona', text: 'Un solo punto Onni por area geografica.' },
            ].map((item) => (
              <div key={item.num} className="p-5 bg-white/[0.03] border border-white/5 flex gap-4 transition-colors hover:bg-rose/[0.07]">
                <span className="font-cormorant text-4xl font-light text-rose/30 leading-none flex-shrink-0">{item.num}</span>
                <div>
                  <h4 className="text-xs tracking-wider uppercase text-white mb-1">{item.title}</h4>
                  <p className="text-xs leading-relaxed text-white/35">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12 reveal">
          <p className="text-sm text-gray mb-4">Tu establecimiento quiere ser Punto Onni?</p>
          <a href="#b2b" className="inline-block px-9 py-4 bg-rose text-white text-xs uppercase tracking-widest hover:bg-rose/80 transition-all">
            Solicitar distribucion &rarr;
          </a>
        </div>
      </section>

      {/* B2B */}
      <section className="px-7 md:px-20 py-20 md:py-36 bg-cream" id="b2b">
        <div className="text-center mb-16 reveal">
          <span className="text-xs tracking-widest uppercase text-rose block mb-5">Distribucion B2B</span>
          <h2 className="font-cormorant text-4xl md:text-5xl font-light text-deep leading-tight">
            Eres farmacia, clinica<br />o <em className="italic text-rose">espacio de belleza</em>?
          </h2>
          <p className="text-sm text-gray max-w-lg mx-auto mt-4 leading-relaxed">
            Trabajamos con distribuidores, farmacias, clinicas esteticas y spas en Republica Dominicana y el Caribe.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-0.5 mb-16">
          {b2bChannels.map((ch) => (
            <div key={ch.title} className="group bg-nude p-10 text-center transition-all hover:bg-rose reveal">
              <span className="text-4xl block mb-4">{ch.icon}</span>
              <h3 className="font-cormorant text-xl font-normal text-deep mb-2.5 transition-colors group-hover:text-white">{ch.title}</h3>
              <p className="text-sm leading-relaxed text-gray transition-colors group-hover:text-white">{ch.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-deep px-7 md:px-20 py-16 grid grid-cols-1 md:grid-cols-2 gap-16 items-center reveal">
          <div>
            <h3 className="font-cormorant text-3xl md:text-4xl font-light text-white leading-tight mb-4">
              Hablemos de<br /><em className="italic text-blush">tu negocio</em>
            </h3>
            <p className="text-sm leading-relaxed text-white/40">
              Escribenos con los datos de tu establecimiento y te enviamos el dossier de producto, condiciones de distribucion y pricing B2B en 24 horas.
            </p>
          </div>
          <ContactForm lang={lang} />
        </div>
      </section>

      {/* EXPANSION */}
      <section className="px-7 md:px-20 py-20 md:py-36 bg-nude" id="expansion">
        <div className="text-center mb-16 reveal">
          <span className="text-xs tracking-widest uppercase text-rose block mb-5">Expansion regional</span>
          <h2 className="font-cormorant text-4xl md:text-5xl font-light text-deep leading-tight">
            Onni llega<br />a todo el <em className="italic text-rose">Caribe</em>
          </h2>
          <p className="text-sm text-gray max-w-md mx-auto mt-4 leading-relaxed">
            Mismo clima. Misma necesidad. Una sola marca que entiende el Caribe entero.
          </p>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-0.5 max-w-[1400px] mx-auto">
          {countries.map((c) => (
            <div
              key={c.name}
              className={`p-5 text-center transition-all ${
                c.highlight
                  ? 'bg-deep'
                  : c.name === '+ Caribe'
                    ? 'opacity-30 border border-dashed border-rose/[0.12]'
                    : 'bg-white hover:bg-mist'
              } reveal`}
            >
              <span className="text-3xl block mb-2.5">{c.flag}</span>
              <div className={`font-cormorant text-base font-normal mb-1.5 ${c.highlight ? 'text-white' : 'text-deep'}`}>{c.name}</div>
              <span className={`inline-block text-[0.58rem] tracking-widest uppercase py-0.5 px-2 mb-2 ${
                c.statusClass === 'active' ? 'bg-rose/[0.12] text-rose'
                : c.statusClass === 'soon' ? 'bg-[#C9A96E]/10 text-[#C9A96E]'
                : 'bg-gray/[0.08] text-gray'
              }`}>
                {c.status}
              </span>
              <p className={`text-xs leading-relaxed ${c.highlight ? 'text-white/40' : 'text-gray'}`}>{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-charcoal px-7 md:px-20 pt-16 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-[2fr_1fr_1fr_1fr] gap-9 md:gap-14 mb-14 pb-14 border-b border-white/5">
          <div className="col-span-2 md:col-span-1">
            <span className="font-cormorant text-3xl font-light text-white tracking-widest block mb-1.5">
              <em className="italic text-blush">O</em>NNI
            </span>
            <span className="text-xs text-white/30 tracking-wider block mb-5">K-Beauty Formulado para el Caribe</span>
            <p className="text-xs leading-relaxed text-white/25 max-w-[260px]">
              Division independiente bajo paraguas legal de FASSA (Espana). Distribucion en Republica Dominicana y el Caribe.
            </p>
          </div>
          <div>
            <h4 className="text-[0.65rem] tracking-widest uppercase text-white/35 mb-4">Productos</h4>
            <ul className="flex flex-col gap-2.5">
              <li><a href="#productos" className="text-xs text-white/25 hover:text-blush transition-colors">Serums</a></li>
              <li><a href="#productos" className="text-xs text-white/25 hover:text-blush transition-colors">Limpiadores</a></li>
              <li><a href="#productos" className="text-xs text-white/25 hover:text-blush transition-colors">Proteccion solar</a></li>
              <li><a href="#productos" className="text-xs text-white/25 hover:text-blush transition-colors">Mascarillas</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[0.65rem] tracking-widest uppercase text-white/35 mb-4">Empresa</h4>
            <ul className="flex flex-col gap-2.5">
              <li><a href="#nosotras" className="text-xs text-white/25 hover:text-blush transition-colors">Nuestra historia</a></li>
              <li><a href="#caribe" className="text-xs text-white/25 hover:text-blush transition-colors">Por que el Caribe</a></li>
              <li><a href="#puntos" className="text-xs text-white/25 hover:text-blush transition-colors">Puntos Onni</a></li>
              <li><a href="#expansion" className="text-xs text-white/25 hover:text-blush transition-colors">Expansion</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[0.65rem] tracking-widest uppercase text-white/35 mb-4">B2B</h4>
            <ul className="flex flex-col gap-2.5">
              <li><a href="#b2b" className="text-xs text-white/25 hover:text-blush transition-colors">Farmacias</a></li>
              <li><a href="#b2b" className="text-xs text-white/25 hover:text-blush transition-colors">Clinicas</a></li>
              <li><a href="#b2b" className="text-xs text-white/25 hover:text-blush transition-colors">Spas</a></li>
              <li><a href="#b2b" className="text-xs text-white/25 hover:text-blush transition-colors">Contacto</a></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/[0.18]">
            &copy; 2025 Onni Cosmetics. Hecho con <span className="text-rose">♥</span> para el Caribe.
          </p>
          <div className="flex gap-5">
            <a href="#" className="text-[0.65rem] tracking-widest uppercase text-white/25 hover:text-blush transition-colors">Instagram</a>
            <a href="#" className="text-[0.65rem] tracking-widest uppercase text-white/25 hover:text-blush transition-colors">TikTok</a>
            <a href="#" className="text-[0.65rem] tracking-widest uppercase text-white/25 hover:text-blush transition-colors">WhatsApp</a>
          </div>
        </div>
      </footer>
    </>
  )
}
