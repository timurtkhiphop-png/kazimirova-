export function MarqueeStrip() {
  const items = [
    'Женские практики',
    '✦',
    'Онлайн-курсы',
    '✦',
    'Телесные практики',
    '✦',
    'Юлия Казимирова',
    '✦',
    'Женские практики',
    '✦',
    'Онлайн-курсы',
    '✦',
    'Телесные практики',
    '✦',
    'Юлия Казимирова',
    '✦',
  ]

  return (
    <div className="relative bg-primary py-3.5 select-none overflow-hidden">
      {/* Fade-переходы сверху и снизу — сглаживают стык с героем и блоком курсов */}
      <div className="absolute top-0 left-0 right-0 h-3 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(59,26,35,0.6), transparent)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-3 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(59,26,35,0.6), transparent)' }} />

      {/* Мобиле: статичная строка по центру */}
      <div className="flex sm:hidden items-center justify-center gap-3">
        <span className="font-sans text-[8px] tracking-[0.2em] uppercase text-white/65">
          Женские практики
        </span>
        <span className="text-white/35 text-[8px]">✦</span>
        <span className="font-sans text-[8px] tracking-[0.2em] uppercase text-white/65">
          Онлайн-курсы
        </span>
      </div>

      {/* Десктоп: бегущая строка */}
      <div className="hidden sm:block">
        <div className="marquee-track flex whitespace-nowrap">
          {[...items, ...items].map((item, i) => (
            <span key={i}
              className={`font-sans mx-5
                ${item === '✦'
                  ? 'text-white/35 text-[8px]'
                  : 'text-white/65 text-[10px] tracking-[0.28em] uppercase'
                }`}>
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
