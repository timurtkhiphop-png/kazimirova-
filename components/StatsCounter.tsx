'use client'

import { useEffect, useRef, useState } from 'react'

interface Stat {
  num: string   // e.g. "500+"
  label: string
}

function useCountUp(target: number, duration = 1400, started: boolean) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!started) return
    let startTime: number | null = null
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      // ease-out quart
      const eased = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [started, target, duration])

  return count
}

function StatItem({ num, label, index, started }: { num: string; label: string; index: number; started: boolean }) {
  const hasPlus = num.endsWith('+')
  const numeric = parseInt(num.replace('+', ''), 10)
  const count = useCountUp(numeric, 1200 + index * 150, started)

  return (
    <div
      className={`group flex flex-col items-center justify-center
                  py-7 px-3 text-center relative overflow-hidden
                  transition-colors duration-500 hover:bg-primary/5
                  ${index < 2 ? 'border-r border-dark/[0.07]' : ''}`}
    >
      {/* Линия снизу при ховере */}
      <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary
                       transition-all duration-500 group-hover:w-full" />

      {/* Число */}
      <p className="font-serif leading-none mb-2 transition-colors duration-300 group-hover:text-primary"
         style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', color: started ? undefined : 'inherit' }}>
        <span className="tabular-nums">{started ? count : 0}</span>
        {hasPlus && <span>+</span>}
      </p>

      {/* Подпись */}
      <p className="font-sans text-[8px] tracking-[0.22em] uppercase text-dark/35
                    whitespace-pre-line leading-relaxed">
        {label}
      </p>

      {/* Полоска-индикатор под числом — заполняется при появлении */}
      <span
        className="absolute bottom-0 left-0 h-[2px] bg-primary/30 transition-all ease-out"
        style={{
          width: started ? '100%' : '0%',
          transitionDuration: `${1200 + index * 150}ms`,
        }}
      />
    </div>
  )
}

const STATS: Stat[] = [
  { num: '5+',   label: 'лет\nпрактики' },
  { num: '500+', label: 'учениц' },
  { num: '10+',  label: 'программ' },
]

export function StatsCounter() {
  const ref = useRef<HTMLDivElement>(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect() } },
      { threshold: 0.4 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="mt-8 grid grid-cols-3 gap-0 border border-dark/[0.07]">
      {STATS.map((s, i) => (
        <StatItem key={s.label} {...s} index={i} started={started} />
      ))}
    </div>
  )
}
