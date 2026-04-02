'use client'

import { getTranslation, type Language } from '@/lib/i18n'

interface HeroProps {
  lang: Language
}

export default function Hero({ lang }: HeroProps) {
  const t = getTranslation(lang)

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 min-h-screen relative overflow-hidden mt-24 md:mt-0">
      {/* Left */}
      <div className="bg-deep flex flex-col justify-center p-12 md:p-20 relative overflow-hidden">
        <div
          className="absolute text-9xl md:text-9xl font-korean font-light opacity-5 pointer-events-none"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: '#C4497A',
            fontSize: '20rem',
          }}
        >
          언니
        </div>

        <p className="text-xs uppercase tracking-widest text-blush mb-6 opacity-0 animate-[fadeUp_0.8s_0.2s_forwards]">
          {t.hero.eyebrow}
        </p>

        <h1 className="font-cormorant text-6xl md:text-7xl font-light leading-tight text-white mb-2 opacity-0 animate-[fadeUp_0.8s_0.4s_forwards]">
          <em className="italic text-blush">Onni</em>
          <br />
          <span className="text-2xl opacity-50 tracking-widest font-korean">언니</span>
        </h1>

        <p className="font-korean text-sm text-white text-opacity-25 mb-10 tracking-widest opacity-0 animate-[fadeUp_0.8s_0.5s_forwards]">
          La hermana mayor del Caribe
        </p>

        <p
          className="text-base leading-relaxed text-white text-opacity-60 max-w-sm mb-12 opacity-0 animate-[fadeUp_0.8s_0.6s_forwards]"
          dangerouslySetInnerHTML={{ __html: t.hero.description }}
        />

        <div className="flex gap-4 opacity-0 animate-[fadeUp_0.8s_0.8s_forwards]">
          <a
            href="#productos"
            className="px-9 py-4 bg-rose text-white text-xs uppercase tracking-widest hover:bg-opacity-80 transition-all"
          >
            {t.hero.cta1}
          </a>
          <a
            href="#b2b"
            className="px-9 py-4 border border-white border-opacity-20 text-white text-xs uppercase tracking-widest hover:border-blush hover:text-blush transition-all"
          >
            {t.hero.cta2}
          </a>
        </div>
      </div>

      {/* Right */}
      <div className="bg-nude hidden md:flex flex-col justify-end relative overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-b from-mist to-transparent"
          style={{ height: '60%', top: 0 }}
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-96 h-96">
            <div
              className="absolute w-80 h-80 rounded-full opacity-40 animate-pulse"
              style={{
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                background:
                  'radial-gradient(135deg, #E8B4C8 0%, #C4497A 100%)',
              }}
            />
            <div
              className="absolute w-56 h-56 rounded-full opacity-70 animate-pulse"
              style={{
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                background:
                  'radial-gradient(135deg, #ffffff 0%, #E8B4C8 100%)',
                animationDelay: '0.5s',
              }}
            />
            <div
              className="absolute w-32 h-32 rounded-full flex items-center justify-center bg-white shadow-lg"
              style={{
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 1,
              }}
            >
              <span className="font-cormorant text-5xl font-light text-rose tracking-widest">
                언니
              </span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-px bg-white bg-opacity-12 relative z-10">
          {t.hero.stats.map((stat, i) => (
            <div
              key={i}
              className="bg-nude p-7 opacity-0 animate-[fadeUp_0.6s_1s_forwards]"
            >
              <span className="font-cormorant text-3xl font-light text-rose block">
                {stat.value}
              </span>
              <span className="text-xs uppercase tracking-widest text-gray mt-1 line-clamp-2 block">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
