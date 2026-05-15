import Link from 'next/link'
import type { Hero as HeroType } from '@/types'
import { urlFor } from '@/sanity/image'

interface HeroProps {
  data: HeroType | null
}

export function Hero({ data }: HeroProps) {
  const bgImage = data?.backgroundImage
    ? urlFor(data.backgroundImage).width(1920).url()
    : null

  return (
    <section className="relative min-h-screen overflow-hidden" style={{ backgroundColor: '#3B1A23' }}>

      {/* Фон */}
      <div className="absolute inset-0 overflow-hidden">
        {data?.backgroundVideo ? (
          <video autoPlay muted loop playsInline
            className="hero-bg w-full h-full object-cover"
            style={{ opacity: 0.9 }}
            poster={bgImage ?? undefined}>
            <source src={data.backgroundVideo} type="video/mp4" />
          </video>
        ) : bgImage ? (
          <img src={bgImage} alt=""
            className="hero-bg w-full h-full object-cover object-center"
            style={{ opacity: 0.9 }} />
        ) : null}

        {/* Оверлей снизу */}
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(59,26,35,0.80) 0%, rgba(59,26,35,0.15) 45%, rgba(59,26,35,0.10) 100%)' }} />
      </div>

      {/* Вертикальный текст слева */}
      <div className="hidden lg:flex absolute left-8 top-1/2 -translate-y-1/2 z-10
                      flex-col items-center gap-5">
        <div className="w-px h-20 bg-white/20" />
        <p style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          className="font-sans text-[9px] tracking-[0.4em] uppercase text-white/30">
          Online · Practice · {new Date().getFullYear()}
        </p>
        <div className="w-px h-20 bg-white/20" />
      </div>

      {/* Основной контент */}
      <div className="relative z-10 flex flex-col min-h-screen">

        {/* Отступ под хедер */}
        <div className="h-24" />

        {/* Центральный блок */}
        <div className="flex-1 flex flex-col justify-center px-6 md:px-16 lg:px-28">

          {/* Метка */}
          <div className="hero-content flex items-center gap-4 mb-8">
            <div className="w-10 h-[2px] bg-primary" />
            <p className="font-sans text-[10px] tracking-[0.35em] uppercase text-white font-medium"
               style={{ textShadow: '0 0 20px rgba(196,115,138,0.8)' }}>
              Онлайн-курсы · Женские практики
            </p>
          </div>

          {/* Главный заголовок */}
          <h1 className="hero-content-delay font-serif font-light text-white
                         text-[13vw] sm:text-[11vw] md:text-[9vw] lg:text-[7.5vw]
                         max-w-5xl tracking-[-0.02em]"
              style={{ lineHeight: '0.9' }}>
            {data?.heading
              ? data.heading.split(' ').map((word, i) => (
                  <span key={i} className={i % 2 === 1 ? 'italic text-primary/80' : ''}>
                    {word}{' '}
                  </span>
                ))
              : (
                <>
                  <span>Женские</span>{' '}
                  <span className="italic text-primary/80">практики</span>
                </>
              )
            }
          </h1>

          {/* Линия */}
          <div className="mt-8 w-14 h-px bg-white/20" />

          {/* Подзаголовок */}
          {data?.subheading && (
            <p className="mt-6 font-sans text-sm text-white/40 max-w-sm leading-relaxed">
              {data.subheading}
            </p>
          )}

          {/* CTA */}
          <div className="hero-content-delay2 mt-10">
            <Link href={data?.buttonLink ?? '#courses'}
              className="group relative inline-flex items-center overflow-hidden
                         border border-white/50 px-10 py-4
                         transition-colors duration-500 hover:border-primary">
              {/* Заливка снизу вверх */}
              <span className="absolute inset-0 bg-primary
                               translate-y-full transition-transform duration-500 ease-out
                               group-hover:translate-y-0" />
              <span className="relative font-sans text-[12px] tracking-[0.3em] uppercase
                               text-white transition-colors duration-500 z-10">
                {data?.buttonText ?? 'Начать путь'}
              </span>
            </Link>
          </div>
        </div>

        {/* Низ */}
        <div className="px-6 md:px-16 lg:px-28 pb-10 flex items-center justify-between">
          <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-white/20">
            Прокрутите вниз
          </p>
          <div className="flex flex-col items-center gap-1">
            <div className="w-px h-8 bg-white/15" />
            <div className="w-1 h-1 bg-primary/60 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  )
}
