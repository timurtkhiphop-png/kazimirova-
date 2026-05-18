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

  const socials = [
    { label: 'Instagram', href: 'https://instagram.com/kazimirova_julia' },
    { label: 'Telegram',  href: 'https://t.me/kazimirova_juliya' },
    { label: 'YouTube',   href: 'https://youtube.com/@kazimirova-julia' },
  ]

  const filteredCourses = courses.filter(c => c.slug?.current)

  return (
    <>
      {/* ── Хиро: ровно один экран ── */}
      <section className="relative overflow-hidden"
        style={{ minHeight: '100svh', backgroundColor: '#3B1A23', display: 'flex', flexDirection: 'column' }}>

        {/* Фон */}
        <div className="absolute inset-0 overflow-hidden">
          <img src="/hero-mobile.jpg" alt=""
            className="lg:hidden absolute inset-0 w-full h-full object-cover object-center" />
          {data?.backgroundVideo ? (
            <video autoPlay muted loop playsInline
              className="hidden lg:block hero-bg w-full h-full object-cover"
              style={{ opacity: 0.9 }} poster={bgImage ?? undefined}>
              <source src={data.backgroundVideo} type="video/mp4" />
            </video>
          ) : bgImage ? (
            <img src={bgImage} alt=""
              className="hidden lg:block hero-bg w-full h-full object-cover object-center" />
          ) : null}
          <div className="absolute inset-0" style={{ background: 'rgba(90,20,45,0.22)' }} />
          <div className="absolute inset-0 lg:hidden"
            style={{ background: 'linear-gradient(to top, rgba(59,26,35,1) 0%, rgba(59,26,35,0.6) 25%, rgba(59,26,35,0.2) 55%, rgba(59,26,35,0) 100%)' }} />
          <div className="absolute inset-0 hidden lg:block"
            style={{ background: 'linear-gradient(to top, rgba(59,26,35,1) 0%, rgba(59,26,35,0.45) 30%, rgba(59,26,35,0.1) 65%, rgba(59,26,35,0) 100%)' }} />
        </div>

        {/* Вертикальный текст слева — десктоп */}
        <div className="hidden lg:flex absolute left-8 top-1/2 -translate-y-1/2 z-10 flex-col items-center gap-5">
          <div className="w-px h-20 bg-white/20" />
          <p style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
            className="font-sans text-[9px] tracking-[0.4em] uppercase text-white/30">
            Online · Practice · {new Date().getFullYear()}
          </p>
          <div className="w-px h-20 bg-white/20" />
        </div>

        {/* Контент */}
        <div className="relative z-10 flex-1 flex flex-col items-center" style={{ paddingTop: '80px' }}>
          {photoUrl ? (
            <div className="w-full lg:w-[min(600px,80vw)] flex flex-col">

              {/* Надпись + имя */}
              <div className="hero-content-delay text-center mb-3">
                <p className="font-sans text-[10px] tracking-[0.4em] uppercase mb-2 text-white">
                  Женские практики · Онлайн-курсы
                </p>
                <h1 className="font-script leading-[1.1] text-white"
                    style={{ fontSize: 'clamp(2.5rem, 10vw, 6rem)' }}>
                  {firstName} {lastName}
                </h1>
                <div className="flex items-center justify-center gap-3 mt-3">
                  <div className="w-12 h-px bg-white/60" />
                  <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
                  <div className="w-12 h-px bg-white/60" />
                </div>
              </div>

              {/* Фото — без обрезки */}
              <div className="overflow-hidden lg:rounded-3xl">
                <img src={photoUrl} alt={settings?.authorName ?? ''}
                  className="hero-content w-full h-auto block"
                  style={{ maxHeight: 'calc(100svh - 230px)', objectFit: 'contain', objectPosition: 'bottom center' }} />
              </div>

              {/* Соцсети — сразу под фото */}
              <div className="flex items-center justify-center gap-5 py-4 hero-content-delay2">
                {socials.map((s, i) => (
                  <span key={s.label} className="flex items-center gap-5">
                    <a href={s.href} target="_blank" rel="noopener noreferrer"
                      className="font-sans text-[10px] tracking-[0.25em] uppercase text-white/50 hover:text-white transition-colors duration-300">
                      {s.label}
                    </a>
                    {i < socials.length - 1 && <span className="w-1 h-1 rounded-full bg-white/20" />}
                  </span>
                ))}
              </div>

              {/* Кнопки курсов — только мобиле, сразу под соцсетями */}
              {filteredCourses.length > 0 && (
                <div className="lg:hidden flex flex-col gap-3 px-2 pb-6 hero-content-delay2">
                  {filteredCourses.map(course => (
                    <Link key={course._id} href={`/courses/${course.slug.current}`}
                      className="w-full bg-primary rounded-2xl py-5 px-6
                                 font-serif text-xl text-white text-center font-normal
                                 hover:brightness-110 transition-all duration-300">
                      {course.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="text-center hero-content-delay px-6 flex-1 flex flex-col justify-center">
              <p className="font-sans text-[9px] tracking-[0.4em] uppercase mb-6 text-primary/70">
                Женские практики · Онлайн-курсы
              </p>
              <h1 className="font-serif font-light leading-[0.85] tracking-[-0.02em] text-white"
                  style={{ fontSize: 'clamp(3rem, 10vw, 8rem)' }}>
                {firstName}<br />
                <span className="italic text-primary">{lastName}</span>
              </h1>
            </div>
          )}
        </div>
      </section>

      {/* Кнопки курсов — десктоп, ниже fold */}
      {filteredCourses.length > 0 && (
        <div className="hidden lg:flex flex-col items-center gap-3 px-4 pt-6 pb-8" style={{ backgroundColor: '#3B1A23' }}>
          <div className="w-full lg:w-[min(600px,80vw)] flex flex-col gap-3">
            {filteredCourses.map(course => (
              <Link key={course._id} href={`/courses/${course.slug.current}`}
                className="w-full bg-primary rounded-2xl py-5 px-6
                           font-serif text-xl text-white text-center font-normal
                           hover:brightness-110 transition-all duration-300">
                {course.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
