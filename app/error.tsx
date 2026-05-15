'use client'

export default function Error({
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
        <h2 className="font-serif text-3xl text-dark mb-4">Что-то пошло не так</h2>
        <p className="font-sans text-sm text-dark/40 mb-8 leading-relaxed">
          Произошла ошибка при загрузке страницы. Попробуйте обновить.
        </p>
        <button onClick={reset}
          className="font-sans text-[11px] tracking-[0.25em] uppercase
                     border border-dark/30 px-8 py-4 text-dark
                     hover:bg-dark hover:text-cream transition-all duration-300">
          Попробовать снова
        </button>
      </div>
    </div>
  )
}
