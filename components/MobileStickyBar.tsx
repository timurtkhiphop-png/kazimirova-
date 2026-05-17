'use client'

import { useState, useEffect } from 'react'

interface MobileStickyBarProps {
  price: number
  isSubscription: boolean
  prodamusUrl: string
}

export function MobileStickyBar({ price, isSubscription, prodamusUrl }: MobileStickyBarProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 280)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-50 md:hidden
                     transition-transform duration-400 ease-out
                     ${visible ? 'translate-y-0' : 'translate-y-full'}`}>
      {/* Тонкая линия-акцент сверху */}
      <div className="h-px bg-primary/60" />
      <div className="bg-dark flex items-center gap-4 px-5 py-4">
        <div className="flex-1 min-w-0">
          <span className="font-serif text-2xl text-white leading-none">
            {price.toLocaleString('ru')} ₽
          </span>
          {isSubscription && (
            <span className="font-sans text-[10px] text-white/35 ml-1.5">/мес</span>
          )}
        </div>
        <a href={prodamusUrl} target="_blank" rel="noopener noreferrer"
          className="shrink-0 bg-primary px-7 py-3.5
                     font-sans text-[10px] tracking-[0.25em] uppercase text-white
                     active:opacity-80 transition-opacity">
          {isSubscription ? 'Оформить' : 'Купить'}
        </a>
      </div>
    </div>
  )
}
