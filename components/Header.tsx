'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

interface HeaderProps {
  authorName?: string
  telegram?: string
  instagram?: string
}

export function Header({ authorName = 'Юлия Казимирова', telegram, instagram }: HeaderProps) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const close = () => setOpen(false)

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500
        ${scrolled || open ? 'bg-cream/96 backdrop-blur-md border-b border-dark/6' : 'bg-transparent'}`}>

        <div className="flex items-center justify-between px-6 md:px-12 h-[72px]">

          {/* Логотип */}
          <Link href="/" onClick={close}
            className={`font-serif text-[17px] tracking-wide transition-colors duration-400
              ${scrolled || open ? 'text-dark' : 'text-white'}`}>
            {authorName}
          </Link>

          {/* Десктоп навигация */}
          <nav className="hidden md:flex items-center gap-10">
            {[
              { href: '/#courses', label: 'Курсы' },
            ].map(({ href, label }) => (
              <Link key={href} href={href}
                className={`font-sans text-[11px] tracking-[0.2em] uppercase
                  transition-colors duration-300
                  ${scrolled ? 'text-dark/50 hover:text-dark' : 'text-white/50 hover:text-white'}`}>
                {label}
              </Link>
            ))}
            {telegram && (
              <a href={telegram} target="_blank" rel="noopener noreferrer"
                className={`font-sans text-[11px] tracking-[0.2em] uppercase
                  transition-colors duration-300
                  ${scrolled ? 'text-dark/50 hover:text-primary' : 'text-white/50 hover:text-white'}`}>
                Telegram
              </a>
            )}
          </nav>

          {/* Бургер */}
          <button onClick={() => setOpen(v => !v)} aria-label="Меню"
            className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8">
            <span className={`block h-px w-full transition-all duration-300 origin-center
              ${open ? 'rotate-45 translate-y-[7px]' : ''}
              ${scrolled || open ? 'bg-dark' : 'bg-white'}`} />
            <span className={`block h-px transition-all duration-300
              ${open ? 'w-0 opacity-0' : 'w-3/4'}
              ${scrolled || open ? 'bg-dark' : 'bg-white'}`} />
            <span className={`block h-px w-full transition-all duration-300 origin-center
              ${open ? '-rotate-45 -translate-y-[7px]' : ''}
              ${scrolled || open ? 'bg-dark' : 'bg-white'}`} />
          </button>
        </div>
      </header>

      {/* Мобильное меню */}
      <div className={`fixed inset-0 z-40 bg-cream flex flex-col justify-center pl-8 gap-6
        transition-all duration-500 md:hidden
        ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>

        {[
          { href: '/#courses', label: 'Курсы' },
        ].map(({ href, label }, i) => (
          <Link key={href} href={href} onClick={close}
            className="font-serif text-[13vw] text-dark leading-none hover:text-primary transition-colors">
            {label}
          </Link>
        ))}

        {(telegram || instagram) && (
          <div className="flex gap-8 mt-8 pt-8 border-t border-dark/8">
            {telegram && (
              <a href={telegram} target="_blank" rel="noopener noreferrer" onClick={close}
                className="label text-dark/40 hover:text-primary transition-colors">
                Telegram
              </a>
            )}
            {instagram && (
              <a href={instagram} target="_blank" rel="noopener noreferrer" onClick={close}
                className="label text-dark/40 hover:text-primary transition-colors">
                Instagram
              </a>
            )}
          </div>
        )}
      </div>
    </>
  )
}
