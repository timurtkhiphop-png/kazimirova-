import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import type { SiteSettings } from '@/types'
import { urlFor } from '@/sanity/image'
import { StatsCounter } from '@/components/StatsCounter'

interface AboutSectionProps {
  settings: SiteSettings | null
}

/* PortableText рендерер для блока «О себе» */
function makeAboutComponents() {
  let isFirstBlock = true
  return {
    block: {
      normal: ({ children }: any) => {
        const isLead = isFirstBlock
        isFirstBlock = false
        return isLead
          ? (
            <p className="font-serif text-[1.35rem] md:text-[1.6rem] text-dark leading-[1.55]
                           tracking-[-0.01em] mb-6">
              {children}
            </p>
          )
          : (
            <p className="font-sans text-[15px] md:text-[16px] text-dark/65 leading-[1.95] mb-0">
              {children}
            </p>
          )
      },
      h2: ({ children }: any) => (
        <h2 className="font-serif text-2xl text-dark mt-8 mb-3">{children}</h2>
      ),
      blockquote: ({ children }: any) => (
        <blockquote className="border-l-2 border-primary pl-6 italic font-serif text-dark/60 my-6 text-lg leading-relaxed">
          {children}
        </blockquote>
      ),
    },
    marks: {
      strong: ({ children }: any) => (
        <strong className="font-semibold text-dark">
          {children}
        </strong>
      ),
      em: ({ children }: any) => (
        <em className="font-serif text-primary" style={{ fontStyle: 'italic' }}>
          {children}
        </em>
      ),
    },
  }
}

export function AboutSection({ settings }: AboutSectionProps) {
  if (!settings) return null

  const photoUrl = settings.photo
    ? urlFor(settings.photo).width(600).height(750).url()
    : null

  const [firstName, ...rest] = (settings.authorName ?? 'Юлия Казимирова').split(' ')
  const lastName = rest.join(' ')

  const ptComponents = makeAboutComponents()

  return (
    <section id="about" className="bg-cream">
      <div className="container-site">

        {/* ── Шапка секции ── */}
        <div className="flex items-center justify-between py-8 border-b border-dark/[0.07]">
          <div className="flex items-center gap-3">
            <div className="w-5 h-px bg-primary" />
            <p className="label">{settings.philosophyTitle ?? 'О себе'}</p>
          </div>
          <p className="font-serif text-dark/[0.06] select-none"
             style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', lineHeight: 1 }}>
            02
          </p>
        </div>

        {/* ── Имя большое ── */}
        <div className="py-10 md:py-14 border-b border-dark/[0.07]">
          <h2 className="font-serif font-light leading-[0.9] tracking-[-0.03em]"
              style={{ fontSize: 'clamp(3.5rem, 9vw, 8rem)' }}>
            <span className="text-dark">{firstName} </span>
            <span className="italic text-primary">{lastName}</span>
          </h2>
        </div>

        {/* ── Основной грид ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0 py-14 md:py-20">

          {/* Текст — левая широкая колонка */}
          <div className="md:col-span-7 flex flex-col justify-between pr-0 md:pr-16">

            {/* Кавычка + текст */}
            <div>
              {/* Большая декоративная кавычка */}
              <p className="font-serif leading-none select-none -mb-6"
                 style={{ fontSize: '9rem', color: 'rgba(147,75,95,0.18)' }}>
                &ldquo;
              </p>
              {settings.philosophyText ? (
                <div className="space-y-4 max-w-[520px]">
                  <PortableText value={settings.philosophyText} components={ptComponents} />
                </div>
              ) : (
                <p className="font-serif text-xl text-dark/20 italic">
                  Заполните текст о себе в Studio
                </p>
              )}

              {/* Тонкая горизонтальная линия-разделитель */}
              <div className="flex items-center gap-4 mt-10 mb-0">
                <div className="w-8 h-px bg-primary/40" />
                <p className="font-sans text-[9px] tracking-[0.35em] uppercase text-dark/25">
                  {settings.authorName}
                </p>
              </div>
            </div>

            {/* Соцсети + ссылка */}
            <div className="mt-12">
              <div className="flex items-center justify-between pt-0">
                <div className="flex gap-5">
                  {[
                    { label: 'Telegram', url: settings.telegram },
                    { label: 'Instagram', url: settings.instagram },
                    { label: 'VK', url: settings.vk },
                    { label: 'YouTube', url: settings.youtube },
                  ].filter(s => s.url).map(({ label, url }) => (
                    <a key={label} href={url!} target="_blank" rel="noopener noreferrer"
                      className="font-sans text-[9px] tracking-[0.25em] uppercase text-dark/30
                                 hover:text-primary transition-colors duration-300">
                      {label}
                    </a>
                  ))}
                </div>

                {settings.philosophyLinkUrl && (
                  <Link href={settings.philosophyLinkUrl}
                    className="group inline-flex items-center gap-3">
                    <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-dark/35
                                     transition-colors group-hover:text-primary duration-300">
                      {settings.philosophyLinkText ?? 'Читать далее'}
                    </span>
                    <span className="w-6 h-px bg-dark/20 transition-all duration-500
                                     group-hover:w-12 group-hover:bg-primary" />
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Фото + статистика — правая колонка */}
          {photoUrl && (
            <div className="md:col-span-5 mt-12 md:mt-0 flex flex-col items-end">
              <div className="relative w-full max-w-[340px] md:max-w-none">

                {/* Рамка смещённая */}
                <div className="absolute -bottom-4 -right-4 w-full h-full border border-primary/30" />

                {/* Фото */}
                <div className="relative overflow-hidden bg-blush" style={{ aspectRatio: '4/5' }}>
                  <Image
                    src={photoUrl}
                    alt={settings.authorName}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 80vw, 35vw"
                  />
                </div>

                {/* Подпись */}
                <div className="mt-5 flex items-center gap-3">
                  <div className="w-4 h-px bg-primary" />
                  <p className="font-sans text-[9px] tracking-[0.25em] uppercase text-dark/35">
                    {settings.authorName}
                  </p>
                </div>

                {/* Статистика под фото — с анимацией счётчика */}
                <StatsCounter />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
