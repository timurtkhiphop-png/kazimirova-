'use client'

import Link from 'next/link'

export default function CourseError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <p className="font-serif text-[6rem] leading-none text-dark/[0.06] select-none mb-4">!</p>
        <h2 className="font-serif text-3xl text-dark mb-4">Не удалось загрузить курс</h2>
        <p className="font-sans text-sm text-dark/40 mb-8 leading-relaxed">
          Возможно, проблема с соединением. Попробуйте обновить страницу.
        </p>
        <div className="flex items-center justify-center gap-6">
          <button onClick={reset}
            className="font-sans text-[11px] tracking-[0.25em] uppercase
                       bg-dark text-cream px-8 py-4
                       hover:bg-primary transition-all duration-300">
            Обновить
          </button>
          <Link href="/#courses"
            className="font-sans text-[11px] tracking-[0.25em] uppercase text-dark/40
                       hover:text-dark transition-colors duration-300">
            ← Все курсы
          </Link>
        </div>
      </div>
    </div>
  )
}
