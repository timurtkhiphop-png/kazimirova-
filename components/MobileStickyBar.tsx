'use client'

import { useState, useEffect, useRef } from 'react'

interface MobileStickyBarProps {
  price: number
  isSubscription: boolean
  prodamusUrl: string
}

export function MobileStickyBar({ price, isSubscription, prodamusUrl }: MobileStickyBarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [footerVisible, setFooterVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 280)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const footer = document.querySelector('footer')
    if (!footer) return
    const observer = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { threshold: 0 }
    )
    observer.observe(footer)
    return () => observer.disconnect()
  }, [])

  const visible = scrolled && !footerVisible

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-50 lg:hidden
                     transition-transform duration-300 ease-out
                     ${visible ? 'translate-y-0' : 'translate-y-full'}`}>
      <div className="h-px bg-primary/60" />
      <div className="bg-dark flex items-center gap-4 px-5 py-4"
        style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}>
        <div className="flex-1 min-w-0">
          <span className="font-serif text-2xl text-white leading-none">
            {price.toLocaleString('ru')} ₽
          </span>
          {isSubscription && (
            <span className="font-sans text-[10px] text-white/35 ml-1.5">/мес</span>
          )}
        </div>
        <a href={prodamusUrl} target="_blank" rel="noopener noreferrer"
          className="shrink-0 bg-primary rounded-lg px-7 py-3.5
                     font-sans text-[10px] tracking-[0.25em] uppercase text-white
                     active:opacity-80 transition-opacity">
          {isSubscription ? 'Оформить' : 'Купить'}
        </a>
      </div>
    </div>
  )
}
