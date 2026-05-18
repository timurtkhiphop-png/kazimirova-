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
import { MobileStickyBar } from '@/components/MobileStickyBar'

export const revalidate = 60
export const dynamicParams = true

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
        <h2 className="font-serif text-2xl md:text-4xl text-dark mt-12 mb-4 leading-[1.2]">{children}</h2>
      ),
      h3: ({ children }: any) => (
        <h3 className="font-serif text-xl md:text-3xl text-primary mt-8 mb-2 leading-[1.3]">{children}</h3>
      ),
      blockquote: ({ children }: any) => (
        <blockquote className="border-l-2 border-primary pl-6 font-serif text-xl md:text-3xl text-dark/60 my-8 leading-[1.5] italic">
          {children}
        </blockquote>
      ),
      normal: ({ children }: any) => (
        <p className="font-serif text-xl md:text-3xl text-dark/75 leading-[1.5]">{children}</p>
      ),
    },
    list: {
      bullet: ({ children }: any) => (
        <ul className="space-y-3 my-4 pl-0">{children}</ul>
      ),
    },
    listItem: {
      bullet: ({ children }: any) => (
        <li className="font-serif text-xl md:text-3xl text-dark/75 leading-[1.5] flex gap-3">
          <span className="text-primary shrink-0 mt-0.5">•</span>
          <span>{children}</span>
        </li>
      ),
    },
    marks: {
      strong: ({ children }: any) => <strong className="font-semibold text-dark">{children}</strong>,
      em: ({ children }: any) => <em className="italic text-primary">{children}</em>,
    },
  }

  return (
    <>
      <Header authorName={settings?.authorName} telegram={settings?.telegram} instagram={settings?.instagram} dark />

      <main className="bg-cream">

        {/* ── Hero мобиле (< lg): фото + текст под ним ── */}
        <div className="lg:hidden">
          {/* Фото: высота по пропорциям изображения — без обрезки и без пустот */}
          <div className="relative bg-dark mt-[72px]">
            {heroImageUrl && (
              <img src={heroImageUrl} alt={course.title}
                className="w-full h-auto block" />
            )}
            <div className="absolute inset-0"
              style={{ background: 'linear-gradient(to top, rgba(59,26,35,0.75) 0%, rgba(59,26,35,0.1) 50%, transparent 100%)' }} />
            {/* Лейбл поверх фото */}
            <div className="absolute bottom-4 left-5 flex items-center gap-2">
              <div className="w-4 h-px bg-primary" />
              <p className="font-sans text-[8px] tracking-[0.3em] uppercase text-primary/90">
                {isSubscription ? 'Подписка' : 'Курс'} · Юлия Казимирова
              </p>
            </div>
          </div>

          {/* Текстовый блок под фото */}
          <div className="bg-dark px-5 pt-4 pb-6">
            <h1 className="font-serif font-light text-white leading-[1.05] tracking-[-0.02em]
                           text-[9vw] mb-3">
              {course.title}
            </h1>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-[8vw] text-white leading-none">
                {course.price.toLocaleString('ru')} ₽
              </span>
              {isSubscription && (
                <span className="font-sans text-xs text-white/40">/мес</span>
              )}
            </div>
            {course.oldPrice && (
              <p className="font-sans text-xs text-white/25 line-through mt-1">
                {course.oldPrice.toLocaleString('ru')} ₽
              </p>
            )}
          </div>
        </div>

        {/* ── Hero десктоп (lg+): полноэкранный ── */}
        <div className="hidden lg:block relative overflow-hidden bg-dark h-[80vh]">
          {heroImageUrl && (
            <img src={heroImageUrl} alt={course.title}
              className="absolute inset-0 w-full h-full object-cover object-center" />
          )}
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(59,26,35,0.97) 0%, rgba(59,26,35,0.65) 40%, rgba(59,26,35,0.2) 75%, transparent 100%)' }} />
          <div className="absolute bottom-0 left-0 right-0 px-12 lg:px-20 pb-20 pt-24">
            <div className="max-w-screen-xl mx-auto">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-px bg-primary" />
                <p className="font-sans text-[9px] tracking-[0.35em] uppercase text-primary/80">
                  {isSubscription ? 'Подписка' : 'Курс'} · Юлия Казимирова
                </p>
              </div>
              <h1 className="font-serif font-light text-white leading-[0.92] tracking-[-0.02em]
                             text-[8vw] md:text-[6vw] lg:text-[5vw] max-w-4xl mb-5">
                {course.title}
              </h1>
              <div className="flex items-center gap-6">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-5xl text-white leading-none">
                      {course.price.toLocaleString('ru')} ₽
                    </span>
                    {isSubscription && (
                      <span className="font-sans text-xs text-white/40">/мес</span>
                    )}
                  </div>
                  {course.oldPrice && (
                    <p className="font-sans text-xs text-white/25 line-through mt-1">
                      {course.oldPrice.toLocaleString('ru')} ₽
                    </p>
                  )}
                </div>
                {course.prodamusUrl && (
                  <a href={course.prodamusUrl} target="_blank" rel="noopener noreferrer"
                    className="group relative inline-flex items-center overflow-hidden
                               border border-white/50 px-10 py-4
                               transition-colors duration-500 hover:border-primary">
                    <span className="absolute inset-0 bg-primary translate-y-full
                                     transition-transform duration-500 ease-out group-hover:translate-y-0" />
                    <span className="relative font-sans text-[11px] tracking-[0.3em] uppercase text-white z-10">
                      {isSubscription ? 'Оформить подписку' : 'Купить курс'}
                    </span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── Основной контент ── */}
        <div className="max-w-screen-xl mx-auto px-5 md:px-12 lg:px-20 py-8 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20">

            {/* Левая колонка — контент */}
            <div className="lg:col-span-7">

              {/* Описание */}
              {course.description && (
                <div className="space-y-4 mb-8 md:mb-16">
                  <PortableText value={course.description} components={ptComponents} />
                </div>
              )}

              {/* Состав курса */}
              {course.benefits && course.benefits.length > 0 && (
                <BenefitsAccordion benefits={course.benefits} />
              )}

              {/* CTA блок — цена + кнопка */}
              {course.prodamusUrl && (
                <div className="rounded-2xl bg-dark px-6 py-7 md:px-10 md:py-9 flex items-center justify-between gap-6 mb-8">
                  <div>
                    <p className="font-sans text-[8px] tracking-[0.3em] uppercase text-white/30 mb-3">
                      {isSubscription ? 'Стоимость подписки' : 'Стоимость курса'}
                    </p>
                    <div className="flex items-baseline gap-2">
                      <span className="font-serif text-4xl md:text-5xl text-white leading-none">
                        {course.price.toLocaleString('ru')} ₽
                      </span>
                      {isSubscription && (
                        <span className="font-sans text-xs text-white/35">/мес</span>
                      )}
                    </div>
                    {course.duration && (
                      <p className="font-sans text-[10px] text-white/30 mt-2">{course.duration}</p>
                    )}
                  </div>
                  <a href={course.prodamusUrl} target="_blank" rel="noopener noreferrer"
                    className="shrink-0 bg-primary rounded-xl px-6 py-3.5
                               font-sans text-[10px] tracking-[0.2em] uppercase text-white
                               hover:brightness-110 transition-all duration-300">
                    {isSubscription ? 'Оформить подписку' : 'Купить курс'}
                  </a>
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

        {/* Кнопка «все курсы» на мобиле — над sticky bar */}
        <div className="lg:hidden px-5 pt-2 pb-32">
          <Link href="/#courses"
            className="flex items-center justify-center gap-2 w-full py-4 border border-dark/15
                       font-sans text-[10px] tracking-[0.25em] uppercase text-dark/40
                       hover:text-primary hover:border-primary transition-colors duration-300">
            ← Все курсы
          </Link>
        </div>
      </main>

      {/* Sticky CTA бар — только мобиле */}
      {course.prodamusUrl && (
        <MobileStickyBar
          price={course.price}
          isSubscription={isSubscription}
          prodamusUrl={course.prodamusUrl}
        />
      )}

      <Footer settings={settings} />
    </>
  )
}
