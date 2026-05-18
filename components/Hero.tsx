import Link from 'next/link'
import type { Hero as HeroType, SiteSettings, Course } from '@/types'
import { urlFor } from '@/sanity/image'

interface HeroProps {
  data: HeroType | null
  settings?: SiteSettings | null
  courses?: Course[]
}

export function Hero({ data, settings, courses = [] }: HeroProps) {
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

      {/* ── Фон: мобиле — светлый флoral, десктоп — из Sanity ── */}
      <div className="absolute inset-0 overflow-hidden">

        {/* Мобильный фон (до lg) */}
        <img
          src="/hero-mobile.jpg"
          alt=""
          className="lg:hidden absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Десктопный фон (lg+) */}
        {data?.backgroundVideo ? (
          <video autoPlay muted loop playsInline
            className="hidden lg:block hero-bg w-full h-full object-cover"
            style={{ opacity: 0.9 }}
            poster={bgImage ?? undefined}>
            <source src={data.backgroundVideo} type="video/mp4" />
          </video>
        ) : bgImage ? (
          <img src={bgImage} alt=""
            className="hidden lg:block hero-bg w-full h-full object-cover object-center" />
        ) : null}

        {/* Тёплый оверлей — сдвигает холодный фиолетовый фон в сторону тёплой бордовой палитры */}
        <div className="absolute inset-0"
          style={{ background: 'rgba(90,20,45,0.22)' }} />

        {/* Градиент мобиле: снизу до полного wine-цвета для бесшовного перехода */}
        <div className="absolute inset-0 lg:hidden"
          style={{ background: 'linear-gradient(to top, rgba(59,26,35,1) 0%, rgba(59,26,35,0.6) 25%, rgba(59,26,35,0.2) 55%, rgba(59,26,35,0) 100%)' }} />
        {/* Градиент десктоп */}
        <div className="absolute inset-0 hidden lg:block"
          style={{ background: 'linear-gradient(to top, rgba(59,26,35,1) 0%, rgba(59,26,35,0.45) 30%, rgba(59,26,35,0.1) 65%, rgba(59,26,35,0) 100%)' }} />
      </div>

      {/* Вертикальный текст слева — только десктоп */}
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
            <div className="w-full lg:w-[min(600px,80vw)]">


              {/* Имя над фото */}
              <div className="hero-content-delay text-center mb-4">
                {/* Мобиле: тёмный текст, Десктоп: белый */}
                <p className="font-sans text-[10px] tracking-[0.4em] uppercase mb-2 text-white">
                  Женские практики · Онлайн-курсы
                </p>
                <h1 className="font-script leading-[1.1] text-white"
                    style={{ fontSize: 'clamp(3rem, 12vw, 7rem)' }}>
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
                <p className="font-sans text-sm leading-relaxed text-center mt-5 max-w-sm mx-auto hero-content-delay2
                               text-white/60">
                  {settings.heroBio}
                </p>
              )}

              {/* Кнопки курсов */}
              {courses.length > 0 && (
                <div className="flex flex-col gap-3 mt-6 hero-content-delay2 px-2">
                  {courses.map(course => (
                    <Link
                      key={course._id}
                      href={`/courses/${course.slug.current}`}
                      className="w-full bg-primary rounded-2xl py-5 px-6
                                 font-serif text-xl text-white text-center font-normal
                                 hover:brightness-110 transition-all duration-300">
                      {course.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Если нет фото — просто имя */}
          {!photoUrl && (
            <div className="text-center hero-content-delay px-6">
              <p className="font-sans text-[9px] tracking-[0.4em] uppercase mb-6
                             text-[#3B1A23]/60 sm:text-primary/70">
                Женские практики · Онлайн-курсы
              </p>
              <h1 className="font-serif font-light leading-[0.85] tracking-[-0.02em]
                             text-[#3B1A23] sm:text-white"
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
            <div className="w-1 h-1 rounded-full bg-primary/60" />
          </div>
        </div>
      </div>
    </section>
  )
}
