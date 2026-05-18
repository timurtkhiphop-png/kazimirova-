import Link from 'next/link'
import Image from 'next/image'
import type { Course } from '@/types'
import { urlFor } from '@/sanity/image'

interface CourseCardProps {
  course: Course
  featured?: boolean
  index?: number
}

export function CourseCard({ course, featured = false, index = 0 }: CourseCardProps) {
  const isSubscription = course.courseType === 'subscription'

  const imageUrl = course.image
    ? urlFor(course.image)
        .width(featured ? 1600 : 900)
        .height(featured ? 900 : 1200)
        .url()
    : null

  /* ── FEATURED — полная ширина, кинематографичный ── */
  if (featured) {
    return (
      <Link href={`/courses/${course.slug.current}`}
        className="group relative block overflow-hidden">

        <div className="relative h-[70vh] md:h-[78vh] w-full overflow-hidden bg-dark/30">
          {imageUrl ? (
            <Image src={imageUrl} alt={course.title} fill priority
              className="object-cover object-center transition-transform duration-[1.4s] ease-out group-hover:scale-[1.04]"
              sizes="100vw" />
          ) : (
            <div className="absolute inset-0" style={{ backgroundColor: '#3B1A23' }} />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-dark/85 via-dark/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-dark/40 via-transparent to-transparent" />
        </div>

        {/* Контент — мобиле: всё вертикально. Десктоп: в ряд */}
        <div className="absolute bottom-0 left-0 right-0
                        p-6 sm:p-10 md:p-14 lg:p-20
                        flex flex-col gap-5
                        sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-5 h-px bg-primary" />
              <p className="font-sans text-[9px] tracking-[0.4em] uppercase text-white/40">
                {isSubscription ? 'Подписка' : 'Курс'} · Рекомендуем
              </p>
            </div>
            <h3 className="font-serif font-light text-white leading-[0.9]
                           text-[11vw] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl
                           tracking-[-0.02em]">
              {course.title}
            </h3>
          </div>

          <div className="flex flex-row sm:flex-col items-center sm:items-end
                          justify-between sm:justify-start gap-4 shrink-0">
            <div>
              <p className="font-serif text-3xl sm:text-4xl md:text-5xl text-white leading-none">
                {course.price.toLocaleString('ru')} ₽
              </p>
              {isSubscription && (
                <p className="font-sans text-[10px] text-white/35 mt-1">/в месяц</p>
              )}
            </div>
            <span className="inline-flex items-center gap-3 font-sans text-[10px] tracking-[0.3em]
                             uppercase text-white border border-white/25 px-5 sm:px-7 py-3
                             transition-all duration-500
                             group-hover:bg-white group-hover:text-dark group-hover:border-white">
              Подробнее
              <span className="transition-transform duration-400 group-hover:translate-x-1.5">→</span>
            </span>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-0 h-px bg-primary
                        transition-all duration-700 group-hover:w-full" />
      </Link>
    )
  }

  /* ── ОБЫЧНАЯ карточка ──
     Мобиле: горизонтальная строка (фото слева, текст справа)
     sm+:    вертикальная портретная (фото сверху, текст снизу)
  ── */
  return (
    <Link href={`/courses/${course.slug.current}`} className="group block">

      {/* Обёртка: на мобиле — flex-row, на sm+ — flex-col */}
      <div className="flex sm:flex-col">

        {/* ── Мобиле: горизонтальная карточка в рамке (до sm) ── */}
        <div className="flex sm:hidden border border-white/10 overflow-hidden">

          {/* Фото мобиле */}
          <div className="relative overflow-hidden shrink-0 w-[38vw] h-[50vw]">
            {imageUrl ? (
              <Image src={imageUrl} alt={course.title} fill
                className="object-cover object-center"
                sizes="38vw" />
            ) : (
              <div className="absolute inset-0" style={{ backgroundColor: '#3B1A23' }} />
            )}
          </div>

          {/* Текст мобиле */}
          <div className="flex-1 px-4 py-3 flex flex-col justify-between border-l border-white/10">
            <div>
              <p className="font-sans text-[7px] tracking-[0.35em] uppercase text-white/30 mb-1.5">
                {isSubscription ? 'Подписка' : 'Курс'}
              </p>
              <h3 className="font-serif text-[4.2vw] text-white/85 leading-[1.2] tracking-[-0.01em]">
                {course.title}
              </h3>
            </div>
            <div className="flex items-baseline justify-between mt-3 pt-2 border-t border-white/[0.08]">
              <span className="font-serif text-[4.2vw] text-white">
                {course.price.toLocaleString('ru')} ₽
              </span>
              {isSubscription && (
                <span className="font-sans text-[2.8vw] text-white/30">/мес</span>
              )}
              {course.oldPrice && (
                <span className="font-serif text-[2.8vw] text-white/20 line-through">
                  {course.oldPrice.toLocaleString('ru')} ₽
                </span>
              )}
            </div>
          </div>
        </div>

        {/* ── sm+: вертикальная карточка в рамке ── */}
        <div className="hidden sm:flex flex-col border border-white/10
                        hover:border-white/25 transition-colors duration-400 overflow-hidden">

          {/* Фото */}
          <div className="relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
            {imageUrl ? (
              <Image src={imageUrl} alt={course.title} fill
                className="object-cover object-center transition-transform duration-[1.1s] ease-out group-hover:scale-[1.06]"
                sizes="33vw" />
            ) : (
              <div className="absolute inset-0" style={{ backgroundColor: '#3B1A23' }} />
            )}
            <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/30 transition-colors duration-500" />
            <div className="absolute inset-0 flex items-center justify-center
                            opacity-0 group-hover:opacity-100 transition-opacity duration-400">
              <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-white
                               border border-white/40 px-5 py-2.5">
                Подробнее
              </span>
            </div>
          </div>

          {/* Текстовый блок — всё по центру */}
          <div className="flex flex-col items-center text-center px-6 py-6 gap-3">
            <p className="font-sans text-[8px] tracking-[0.4em] uppercase text-white/30">
              {isSubscription ? 'Подписка' : 'Курс'}
            </p>
            <h3 className="font-serif text-xl md:text-2xl text-white/85 leading-[1.1] tracking-[-0.01em]">
              {course.title}
            </h3>
            {course.shortDescription && (
              <p className="font-sans text-[11px] text-white/35 leading-relaxed line-clamp-2">
                {course.shortDescription}
              </p>
            )}
            <div className="w-8 h-px bg-white/15 mt-1" />
            <div className="flex items-baseline gap-1.5">
              <span className="font-serif text-2xl text-white">
                {course.price.toLocaleString('ru')} ₽
              </span>
              {isSubscription && (
                <span className="font-sans text-[10px] text-white/30">/мес</span>
              )}
            </div>
            {course.oldPrice && (
              <span className="font-sans text-[11px] text-white/20 line-through -mt-2">
                {course.oldPrice.toLocaleString('ru')} ₽
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
