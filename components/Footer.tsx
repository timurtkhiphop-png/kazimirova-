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

  const links: { href: string; label: string; external?: boolean }[] = [
    { href: '/#courses', label: 'Курсы' },
    ...socials.map(s => ({ href: s.url!, label: s.label, external: true })),
  ]

  return (
    <footer className="bg-dark">

      {/* ── Декоративная полоса ── */}
      <div className="relative border-b border-white/[0.06] overflow-hidden">
        <p className="font-serif font-light text-white/[0.05] select-none pointer-events-none
                      text-[18vw] leading-none py-3 px-6 md:px-12 whitespace-nowrap">
          {name}
        </p>
        <div className="absolute inset-0 flex items-center px-6 md:px-12 lg:px-16">
          <div className="flex items-center gap-6">
            <div className="w-8 h-px bg-primary/60" />
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-white/30">
              {settings?.seoDescription ?? 'Онлайн-курсы · Женские практики'}
            </p>
          </div>
        </div>
      </div>

      {/* ── Основная строка ── */}
      <div className="container-site">
        <div className="py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

          {/* Имя — слева */}
          <Link href="/"
            className="font-serif text-xl text-white/70 hover:text-white
                       transition-colors duration-300 shrink-0">
            {name}
          </Link>

          {/* Ссылки — справа в одну строку */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {links.map(({ href, label, external }) =>
              external ? (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="font-sans text-[11px] tracking-[0.2em] uppercase text-white/35
                             hover:text-primary transition-colors duration-200">
                  {label}
                </a>
              ) : (
                <Link key={label} href={href}
                  className="font-sans text-[11px] tracking-[0.2em] uppercase text-white/35
                             hover:text-white transition-colors duration-200">
                  {label}
                </Link>
              )
            )}
          </div>
        </div>

      </div>

      {/* ── Нижняя строка — на всю ширину ── */}
      <div className="border-t border-white/[0.06]">
        <div className="container-site py-3 flex items-center justify-between">
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
