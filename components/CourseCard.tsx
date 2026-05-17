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

  /* ── FEATURED — кинематографичный, полная ширина ── */
  if (featured) {
    return (
      <Link href={`/courses/${course.slug.current}`}
        className="group relative block overflow-hidden">

        <div className="relative h-[60vh] md:h-[78vh] w-full overflow-hidden bg-dark/30">
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

        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-14 lg:p-20
                        flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-6 h-px bg-primary" />
              <p className="font-sans text-[9px] tracking-[0.4em] uppercase text-white/40">
                {isSubscription ? 'Подписка' : 'Курс'} · Рекомендуем
              </p>
            </div>
            <h3 className="font-serif font-light text-white leading-[0.9]
                           text-4xl md:text-6xl lg:text-7xl xl:text-8xl
                           tracking-[-0.02em]">
              {course.title}
            </h3>
            {course.shortDescription && (
              <p className="mt-5 font-sans text-sm text-white/35 max-w-md leading-[1.8] hidden md:block">
                {course.shortDescription}
              </p>
            )}
          </div>

          <div className="flex flex-col items-start md:items-end gap-5 shrink-0">
            <div className="text-left md:text-right">
              <p className="font-serif text-4xl md:text-5xl text-white leading-none">
                {course.price.toLocaleString('ru')} ₽
              </p>
              {isSubscription && (
                <p className="font-sans text-[11px] text-white/35 mt-1">/в месяц</p>
              )}
            </div>
            <span className="inline-flex items-center gap-3 font-sans text-[10px] tracking-[0.3em]
                             uppercase text-white border border-white/25 px-7 py-3.5
                             transition-all duration-500
                             group-hover:bg-white group-hover:text-dark group-hover:border-white">
              Подробнее
              <span className="transition-transform duration-400 group-hover:translate-x-1.5">→</span>
            </span>
          </div>
        </div>

        {/* Нижняя линия-акцент */}
        <div className="absolute bottom-0 left-0 w-0 h-px bg-primary
                        transition-all duration-700 group-hover:w-full" />
      </Link>
    )
  }

  /* ── ОБЫЧНАЯ карточка — портретная, editorial ── */
  return (
    <Link href={`/courses/${course.slug.current}`} className="group flex flex-col">

      {/* Фото — высокое, портрет */}
      <div className="relative overflow-hidden bg-blush" style={{ aspectRatio: '3/4' }}>
        {imageUrl ? (
          <Image src={imageUrl} alt={course.title} fill
            className="object-cover object-center transition-transform duration-[1.1s] ease-out group-hover:scale-[1.07]"
            sizes="(max-width: 768px) 100vw, 33vw" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-blush to-border-rose
                          flex items-center justify-center">
            <span className="font-serif text-6xl text-primary/10">✦</span>
          </div>
        )}

        {/* Тип */}
        <span className="absolute top-4 left-4 font-sans text-[8px] tracking-[0.3em]
                         uppercase text-dark/60 bg-white/85 backdrop-blur-sm px-3 py-1.5">
          {isSubscription ? 'Подписка' : 'Курс'}
        </span>

        {/* Hover тёмный overlay */}
        <div className="absolute inset-0 bg-dark/0 transition-colors duration-600 group-hover:bg-dark/40" />

        {/* Стрелка на hover */}
        <div className="absolute inset-0 flex items-center justify-center
                        opacity-0 transition-all duration-400 group-hover:opacity-100
                        translate-y-2 group-hover:translate-y-0">
          <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-white
                           border border-white/50 px-5 py-2.5">
            Подробнее
          </span>
        </div>
      </div>

      {/* Текст под фото */}
      <div className="pt-6">
        <div className="flex items-start gap-3 mb-3">
          <span className="font-serif text-xs text-primary/40 mt-0.5 shrink-0">
            {String(index + 1).padStart(2, '0')}
          </span>
          <h3 className="font-serif text-xl md:text-2xl text-dark leading-[1.1] flex-1
                         tracking-[-0.01em]">
            {course.title}
          </h3>
        </div>

        {course.shortDescription && (
          <p className="font-sans text-[12px] text-dark/40 leading-relaxed mt-2 line-clamp-2">
            {course.shortDescription}
          </p>
        )}

        <div className="mt-5 pt-4 border-t border-dark/[0.07] flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="font-serif text-xl text-dark">
              {course.price.toLocaleString('ru')} ₽
            </span>
            {isSubscription && (
              <span className="font-sans text-[10px] text-dark/30">/мес</span>
            )}
          </div>
          {course.oldPrice && (
            <span className="font-sans text-[11px] text-dark/20 line-through">
              {course.oldPrice.toLocaleString('ru')} ₽
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
