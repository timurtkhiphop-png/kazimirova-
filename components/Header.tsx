'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

interface HeaderProps {
  authorName?: string
  telegram?: string
  instagram?: string
  dark?: boolean
}

export function Header({ authorName = 'Юлия Казимирова', telegram, instagram, dark = false }: HeaderProps) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const close = () => setOpen(false)

  // dark-режим: всегда бордовый фон, белый текст
  const bgClass = dark
    ? 'bg-dark border-b border-white/[0.06]'
    : scrolled || open
      ? 'bg-cream/96 backdrop-blur-md border-b border-dark/6'
      : 'bg-transparent'

  const textClass = dark ? 'text-white' : scrolled || open ? 'text-dark' : 'text-white'
  const navTextClass = dark
    ? 'text-white/60 hover:text-white'
    : scrolled ? 'text-dark/50 hover:text-dark' : 'text-white/50 hover:text-white'
  const burgerClass = dark ? 'bg-white' : scrolled || open ? 'bg-dark' : 'bg-white'

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${bgClass}`}>

        <div className="flex items-center justify-between px-6 md:px-12 h-[72px]">

          {/* Логотип */}
          <Link href="/" onClick={close}
            className={`font-serif text-[17px] tracking-wide transition-colors duration-400 ${textClass}`}>
            {authorName}
          </Link>

          {/* Десктоп навигация */}
          <nav className="hidden md:flex items-center gap-10">
            {[
              { href: '/#courses', label: 'Курсы' },
            ].map(({ href, label }) => (
              <Link key={href} href={href}
                className={`font-sans text-[11px] tracking-[0.2em] uppercase transition-colors duration-300 ${navTextClass}`}>
                {label}
              </Link>
            ))}
          </nav>

          {/* Бургер */}
          <button onClick={() => setOpen(v => !v)} aria-label="Меню"
            className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8">
            <span className={`block h-px w-full transition-all duration-300 origin-center
              ${open ? 'rotate-45 translate-y-[7px]' : ''} ${burgerClass}`} />
            <span className={`block h-px transition-all duration-300
              ${open ? 'w-0 opacity-0' : 'w-3/4'} ${burgerClass}`} />
            <span className={`block h-px w-full transition-all duration-300 origin-center
              ${open ? '-rotate-45 -translate-y-[7px]' : ''} ${burgerClass}`} />
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

      </div>
    </>
  )
}
