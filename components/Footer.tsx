import Link from 'next/link'
import type { SiteSettings } from '@/types'

interface FooterProps {
  settings?: SiteSettings | null
}

export function Footer({ settings }: FooterProps) {
  const socials = [
    { label: 'Telegram', url: settings?.telegram },
    { label: 'Instagram', url: settings?.instagram },
    { label: 'ВКонтакте', url: settings?.vk },
    { label: 'YouTube', url: settings?.youtube },
  ].filter(s => s.url)

  const name = settings?.authorName ?? 'Юлия Казимирова'
  const [firstName, lastName] = name.split(' ')

  return (
    <footer className="bg-dark overflow-hidden">

      {/* ── Большое имя — декор ── */}
      <div className="relative border-b border-white/[0.06] overflow-hidden">
        <p className="font-serif font-light text-white/[0.05] select-none pointer-events-none
                      text-[18vw] leading-none py-6 px-6 md:px-12 whitespace-nowrap">
          {firstName}&nbsp;{lastName}
        </p>

        {/* Оверлей с реальным контентом поверх */}
        <div className="absolute inset-0 flex items-center px-6 md:px-12 lg:px-16">
          <div className="flex items-center gap-6">
            <div className="w-8 h-px bg-primary/60" />
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-white/30">
              {settings?.seoDescription ?? 'Онлайн-курсы · Женские практики'}
            </p>
          </div>
        </div>
      </div>

      {/* ── Основной блок ── */}
      <div className="container-site">
        <div className="py-16 md:py-20 grid grid-cols-1 md:grid-cols-12 gap-12">

          {/* Имя + описание */}
          <div className="md:col-span-5">
            <Link href="/"
              className="font-serif text-3xl md:text-4xl text-white/80 hover:text-white
                         transition-colors duration-300 leading-tight block mb-5">
              {name}
            </Link>
            {settings?.seoDescription && (
              <p className="font-sans text-[13px] text-white/25 leading-relaxed max-w-xs">
                {settings.seoDescription}
              </p>
            )}
          </div>

          {/* Навигация */}
          <div className="md:col-span-3 md:col-start-7">
            <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-white/20 mb-7">
              Навигация
            </p>
            <div className="flex flex-col gap-4">
              {[
                { href: '/#about', label: 'О себе' },
                { href: '/#courses', label: 'Курсы' },
              ].map(({ href, label }) => (
                <Link key={href} href={href}
                  className="block font-sans text-[13px] text-white/40
                             hover:text-white transition-colors duration-200">
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Соцсети */}
          {socials.length > 0 && (
            <div className="md:col-span-3 md:col-start-10">
              <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-white/20 mb-7">
                Соцсети
              </p>
              <div className="flex flex-col gap-4">
                {socials.map(({ label, url }) => (
                  <a key={label} href={url!} target="_blank" rel="noopener noreferrer"
                    className="block font-sans text-[13px] text-white/40
                               hover:text-primary transition-colors duration-200">
                    {label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── Нижняя строка ── */}
        <div className="py-6 border-t border-white/[0.06]
                        flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <p className="font-sans text-[9px] tracking-[0.25em] uppercase text-white/15">
            © {new Date().getFullYear()} {name}
          </p>
          <p className="font-sans text-[9px] tracking-[0.25em] uppercase text-white/10">
            Все права защищены
          </p>
        </div>
      </div>
    </footer>
  )
}
