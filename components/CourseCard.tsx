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

        {/* Фото */}
        <div className="relative overflow-hidden bg-blush shrink-0
                        w-[38vw] h-[50vw]
                        sm:w-full sm:h-auto sm:aspect-[3/4]">
          {imageUrl ? (
            <Image src={imageUrl} alt={course.title} fill
              className="object-cover object-center transition-transform duration-[1.1s] ease-out group-hover:scale-[1.06]"
              sizes="(max-width: 640px) 38vw, 33vw" />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-b from-blush to-rose-100
                            flex items-center justify-center">
              <span className="font-serif text-4xl text-primary/10">✦</span>
            </div>
          )}

          {/* Тип — только на десктопе поверх фото */}
          <span className="hidden sm:block absolute top-4 left-4 font-sans text-[8px] tracking-[0.3em]
                           uppercase text-dark/60 bg-white/85 backdrop-blur-sm px-3 py-1.5">
            {isSubscription ? 'Подписка' : 'Курс'}
          </span>

          {/* Hover overlay — только десктоп */}
          <div className="hidden sm:block absolute inset-0 bg-dark/0
                          transition-colors duration-600 group-hover:bg-dark/40" />
          <div className="hidden sm:flex absolute inset-0 items-center justify-center
                          opacity-0 transition-all duration-400 group-hover:opacity-100
                          translate-y-2 group-hover:translate-y-0">
            <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-white
                             border border-white/50 px-5 py-2.5">
              Подробнее
            </span>
          </div>
        </div>

        {/* Текст */}
        {/* Мобиле: справа от фото, flex-col, justify-between */}
        {/* sm+: под фото, обычный поток */}
        <div className="flex-1 sm:flex-none
                        pl-4 py-1 sm:pl-0 sm:pt-6
                        flex flex-col justify-between sm:block">

          {/* Тип — только мобиле */}
          <p className="sm:hidden font-sans text-[8px] tracking-[0.35em] uppercase text-dark/30 mb-1">
            {isSubscription ? 'Подписка' : 'Курс'}
          </p>

          {/* Название — мобиле */}
          <h3 className="sm:hidden font-serif text-[4.5vw] text-dark leading-[1.2] tracking-[-0.01em]">
            {course.title}
          </h3>

          {/* Название — десктоп (с номером) */}
          <div className="hidden sm:flex items-start gap-3 mb-3">
            <span className="font-serif text-xs text-primary/40 mt-0.5 shrink-0">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="font-serif text-xl md:text-2xl text-dark leading-[1.1] flex-1
                           tracking-[-0.01em]">
              {course.title}
            </h3>
          </div>

          {course.shortDescription && (
            <p className="hidden sm:block font-sans text-[12px] text-dark/40 leading-relaxed mt-2 line-clamp-2">
              {course.shortDescription}
            </p>
          )}

          {/* Цена */}
          <div className="mt-auto sm:mt-5 sm:pt-4 sm:border-t sm:border-dark/[0.07]">
            <span className="font-serif text-[4.5vw] sm:text-xl text-dark">
              {course.price.toLocaleString('ru')} ₽
            </span>
            {isSubscription && (
              <span className="font-sans text-[8px] sm:text-[10px] text-dark/30 ml-1">/мес</span>
            )}
            {course.oldPrice && (
              <div className="font-sans text-[10px] sm:text-[11px] text-dark/20 line-through">
                {course.oldPrice.toLocaleString('ru')} ₽
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Разделитель между карточками на мобиле */}
      <div className="sm:hidden mt-4 h-px bg-dark/[0.07]" />
    </Link>
  )
}
