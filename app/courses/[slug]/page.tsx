import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { PortableText } from '@portabletext/react'
import { client } from '@/sanity/client'
import { courseBySlugQuery, siteSettingsQuery } from '@/sanity/queries'
import type { Course, SiteSettings } from '@/types'
import { urlFor } from '@/sanity/image'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { BenefitsAccordion } from '@/components/BenefitsAccordion'

export const revalidate = 60

interface PageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  try {
    const courses = await client.fetch<Pick<Course, 'slug'>[]>(
      `*[_type == "course" && isActive == true]{ slug }`
    )
    return courses.map(c => ({ slug: c.slug.current }))
  } catch { return [] }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const course = await client.fetch<Course>(courseBySlugQuery, { slug: params.slug })
    if (!course) return { title: 'Курс не найден' }
    const imageUrl = course.image ? urlFor(course.image).width(1200).height(630).url() : undefined
    return {
      title: `${course.title} — Юлия Казимирова`,
      description: course.shortDescription,
      openGraph: {
        title: course.title,
        description: course.shortDescription,
        images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630 }] : [],
      },
    }
  } catch { return { title: 'Курс' } }
}

export default async function CoursePage({ params }: PageProps) {
  let course: Course | null = null
  let settings: SiteSettings | null = null

  try {
    ;[course, settings] = await Promise.all([
      client.fetch<Course>(courseBySlugQuery, { slug: params.slug }),
      client.fetch<SiteSettings>(siteSettingsQuery),
    ])
  } catch { notFound() }

  if (!course) notFound()

  const heroSource = course.heroImage ?? course.image
  const heroImageUrl = heroSource ? urlFor(heroSource).width(1920).url() : null
  const isSubscription = course.courseType === 'subscription'

  const ptComponents = {
    block: {
      h2: ({ children }: any) => (
        <h2 className="font-serif text-3xl md:text-4xl text-dark mt-16 mb-6 leading-tight">{children}</h2>
      ),
      h3: ({ children }: any) => (
        <h3 className="font-serif text-2xl text-dark mt-10 mb-3">{children}</h3>
      ),
      blockquote: ({ children }: any) => (
        <blockquote className="border-l-2 border-primary pl-8 italic text-dark/60 my-8 text-xl font-serif leading-relaxed">
          {children}
        </blockquote>
      ),
      normal: ({ children }: any) => (
        <p className="font-sans text-[16px] text-dark/65 leading-[1.9]">{children}</p>
      ),
    },
    marks: {
      strong: ({ children }: any) => <strong className="font-semibold text-dark">{children}</strong>,
      em: ({ children }: any) => <em className="italic text-primary">{children}</em>,
    },
  }

  return (
    <>
      <Header authorName={settings?.authorName} telegram={settings?.telegram} instagram={settings?.instagram} />

      <main className="bg-cream">

        {/* ── Hero — всегда на всю ширину ── */}
        <div className="relative overflow-hidden bg-dark">
          {heroImageUrl && (
            <img src={heroImageUrl} alt={course.title}
              style={{ width: '100%', height: 'auto', display: 'block' }} />
          )}

          {/* Усиленный градиент для читаемости */}
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(59,26,35,0.97) 0%, rgba(59,26,35,0.6) 35%, rgba(59,26,35,0.15) 70%, transparent 100%)' }} />

          {/* Текст поверх — прижат к низу */}
          <div className="absolute bottom-0 left-0 right-0 px-6 md:px-12 lg:px-20 pb-14 md:pb-20">
            <div className="max-w-screen-xl mx-auto">

              {/* Тип курса */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-primary" />
                <p className="font-sans text-[10px] tracking-[0.35em] uppercase text-primary/80">
                  {isSubscription ? 'Подписка' : 'Курс'} · Юлия Казимирова
                </p>
              </div>

              {/* Заголовок */}
              <h1 className="font-serif font-light text-white leading-[0.9] tracking-[-0.02em]
                             text-[12vw] sm:text-[8vw] md:text-[6vw] lg:text-[5vw] max-w-4xl mb-6">
                {course.title}
              </h1>


              {/* Цена + кнопка прямо в hero */}
              <div className="flex flex-wrap items-center gap-6">
                <div>
                  <span className="font-serif text-4xl md:text-5xl text-white leading-none">
                    {course.price.toLocaleString('ru')} ₽
                  </span>
                  {isSubscription && (
                    <span className="font-sans text-sm text-white/40 ml-2">/мес</span>
                  )}
                  {course.oldPrice && (
                    <span className="font-sans text-sm text-white/25 line-through ml-3">
                      {course.oldPrice.toLocaleString('ru')} ₽
                    </span>
                  )}
                </div>

                {course.prodamusUrl && (
                  <a href={course.prodamusUrl} target="_blank" rel="noopener noreferrer"
                    className="group relative inline-flex items-center overflow-hidden
                               border border-white/50 px-10 py-4
                               transition-colors duration-500 hover:border-primary">
                    <span className="absolute inset-0 bg-primary translate-y-full
                                     transition-transform duration-500 ease-out group-hover:translate-y-0" />
                    <span className="relative font-sans text-[11px] tracking-[0.3em] uppercase
                                     text-white z-10">
                      {isSubscription ? 'Оформить подписку' : 'Начать обучение'}
                    </span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── Основной контент ── */}
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20 py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">

            {/* Левая колонка — контент */}
            <div className="lg:col-span-7">

              {/* Описание */}
              {course.description && (
                <div className="space-y-5 mb-16">
                  <PortableText value={course.description} components={ptComponents} />
                </div>
              )}

              {/* Что входит — аккордеон */}
              {course.benefits && course.benefits.length > 0 && (
                <BenefitsAccordion benefits={course.benefits} />
              )}

              {/* Нижний CTA блок */}
              {course.prodamusUrl && (
                <div className="hidden md:block bg-dark p-10 lg:p-14">
                  <p className="font-sans text-[9px] tracking-[0.35em] uppercase text-white/30 mb-6">
                    Готовы начать путь?
                  </p>
                  <div className="flex items-end justify-between gap-8">
                    <div>
                      <div className="flex items-baseline gap-3 mb-2">
                        <span className="font-serif text-5xl text-white">
                          {course.price.toLocaleString('ru')} ₽
                        </span>
                        {isSubscription && (
                          <span className="font-sans text-base text-white/35">/мес</span>
                        )}
                      </div>
                      {course.oldPrice && (
                        <span className="font-sans text-sm text-white/25 line-through">
                          {course.oldPrice.toLocaleString('ru')} ₽
                        </span>
                      )}
                      {course.duration && (
                        <p className="font-sans text-xs text-white/30 mt-3">{course.duration}</p>
                      )}
                    </div>
                    <a href={course.prodamusUrl} target="_blank" rel="noopener noreferrer"
                      className="group relative inline-flex items-center overflow-hidden shrink-0
                                 border border-white/30 px-10 py-4
                                 transition-colors duration-500 hover:border-primary">
                      <span className="absolute inset-0 bg-primary translate-y-full
                                       transition-transform duration-500 ease-out group-hover:translate-y-0" />
                      <span className="relative font-sans text-[11px] tracking-[0.3em] uppercase
                                       text-white z-10">
                        {isSubscription ? 'Оформить подписку' : 'Купить курс'}
                      </span>
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Правая колонка — сайдбар */}
            <aside className="hidden lg:block lg:col-span-4 lg:col-start-9">
              <div className="sticky top-24 space-y-6">

                {/* Карточка с ценой */}
                <div className="bg-dark p-8">
                  <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-white/30 mb-5">
                    Стоимость
                  </p>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="font-serif text-4xl text-white leading-none">
                      {course.price.toLocaleString('ru')} ₽
                    </span>
                    {isSubscription && (
                      <span className="font-sans text-sm text-white/35">/мес</span>
                    )}
                  </div>
                  {course.oldPrice && (
                    <span className="font-sans text-sm text-white/25 line-through">
                      {course.oldPrice.toLocaleString('ru')} ₽
                    </span>
                  )}
                  {course.duration && (
                    <p className="font-sans text-xs text-white/30 mt-5 pt-5 border-t border-white/[0.08]">
                      {course.duration}
                    </p>
                  )}

                  {course.prodamusUrl && (
                    <a href={course.prodamusUrl} target="_blank" rel="noopener noreferrer"
                      className="group relative inline-flex items-center justify-center w-full
                                 overflow-hidden border border-white/30 px-8 py-4 mt-6
                                 transition-colors duration-500 hover:border-primary">
                      <span className="absolute inset-0 bg-primary translate-y-full
                                       transition-transform duration-500 ease-out group-hover:translate-y-0" />
                      <span className="relative font-sans text-[11px] tracking-[0.3em] uppercase
                                       text-white z-10">
                        {isSubscription ? 'Оформить подписку' : 'Купить курс'}
                      </span>
                    </a>
                  )}
                </div>

                {/* Автор */}
                {settings?.authorName && (
                  <div className="border border-dark/[0.08] p-6">
                    <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-dark/30 mb-3">
                      Автор курса
                    </p>
                    <p className="font-serif text-xl text-dark">{settings.authorName}</p>
                  </div>
                )}

                <Link href="/#courses"
                  className="group inline-flex items-center gap-3">
                  <span className="w-5 h-px bg-dark/20 transition-all duration-400 group-hover:w-10 group-hover:bg-primary" />
                  <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-dark/35
                                   hover:text-primary transition-colors duration-300">
                    Все программы
                  </span>
                </Link>
              </div>
            </aside>
          </div>
        </div>

        {/* Мобильная нижняя кнопка */}
        {course.prodamusUrl && (
          <div className="md:hidden px-6 pb-12 space-y-4">
            <a href={course.prodamusUrl} target="_blank" rel="noopener noreferrer"
              className="group relative flex items-center justify-center overflow-hidden
                         bg-dark w-full py-5 transition-colors duration-500">
              <span className="absolute inset-0 bg-primary translate-y-full
                               transition-transform duration-500 ease-out group-hover:translate-y-0" />
              <span className="relative font-sans text-[11px] tracking-[0.3em] uppercase text-white z-10">
                {isSubscription ? 'Оформить подписку' : 'Начать обучение'}
              </span>
            </a>
            <Link href="/#courses"
              className="font-sans text-[10px] tracking-[0.25em] uppercase text-dark/35
                         hover:text-primary transition-colors flex items-center justify-center gap-2">
              ← Все программы
            </Link>
          </div>
        )}
      </main>

      <Footer settings={settings} />
    </>
  )
}
