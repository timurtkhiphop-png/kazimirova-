import type { Hero as HeroType, SiteSettings } from '@/types'
import { urlFor } from '@/sanity/image'

interface HeroProps {
  data: HeroType | null
  settings?: SiteSettings | null
}

export function Hero({ data, settings }: HeroProps) {
  const bgImage = data?.backgroundImage
    ? urlFor(data.backgroundImage).width(1920).url()
    : null

  const photoUrl = settings?.photo
    ? urlFor(settings.photo).width(900).url()
    : null

  const [firstName, ...rest] = (settings?.authorName ?? 'Юлия Казимирова').split(' ')
  const lastName = rest.join(' ')

  return (
    <section className="relative min-h-screen overflow-hidden" style={{ backgroundColor: '#3B1A23' }}>

      {/* Фоновое изображение */}
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
            style={{ opacity: 1 }} />
        ) : null}
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(59,26,35,0.55) 0%, rgba(59,26,35,0.15) 50%, rgba(59,26,35,0.05) 100%)' }} />
      </div>

      {/* Вертикальный текст слева */}
      <div className="hidden lg:flex absolute left-8 top-1/2 -translate-y-1/2 z-10 flex-col items-center gap-5">
        <div className="w-px h-20 bg-white/20" />
        <p style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          className="font-sans text-[9px] tracking-[0.4em] uppercase text-white/30">
          Online · Practice · {new Date().getFullYear()}
        </p>
        <div className="w-px h-20 bg-white/20" />
      </div>

      {/* Основной контент */}
      <div className="relative z-10 flex flex-col min-h-screen items-center justify-center">

        <div className="relative flex items-end justify-center w-full">

          {/* Фото */}
          {photoUrl && (
            <div style={{ width: 'min(600px, 80vw)' }}>

              {/* Имя над фото */}
              <div className="hero-content-delay text-center mb-4">
                <p className="font-sans text-[10px] tracking-[0.4em] uppercase mb-2 text-white">
                  Женские практики · Онлайн-курсы
                </p>
                <h1 className="font-script leading-[1.1] text-white"
                    style={{ fontSize: 'clamp(3rem, 9vw, 7rem)' }}>
                  {firstName} {lastName}
                </h1>
                <div className="flex items-center justify-center gap-3 mt-3">
                  <div className="w-12 h-px bg-white/60" />
                  <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
                  <div className="w-12 h-px bg-white/60" />
                </div>
              </div>

              {/* Фото */}
              <div className="relative overflow-hidden">
                <img
                  src={photoUrl}
                  alt={settings?.authorName ?? ''}
                  className="relative w-full h-auto block hero-content"
                />
              </div>

              {/* Подпись под фото */}
              {settings?.heroBio && (
                <p className="font-sans text-sm text-white/60 leading-relaxed text-center mt-5 max-w-sm mx-auto hero-content-delay2">
                  {settings.heroBio}
                </p>
              )}
            </div>
          )}

          {/* Если нет фото — просто имя */}
          {!photoUrl && (
            <div className="text-center hero-content-delay px-6">
              <p className="font-sans text-[9px] tracking-[0.4em] uppercase text-primary/70 mb-6">
                Женские практики · Онлайн-курсы
              </p>
              <h1 className="font-serif font-light text-white leading-[0.85] tracking-[-0.02em]"
                  style={{ fontSize: 'clamp(3rem, 10vw, 8rem)' }}>
                {firstName}
                <br />
                <span className="italic text-primary">{lastName}</span>
              </h1>
            </div>
          )}
        </div>

        {/* Низ */}
        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-16 lg:px-28 pb-10 flex items-center justify-between">
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
