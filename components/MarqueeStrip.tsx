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
    <div className="bg-primary py-3.5 select-none overflow-hidden">

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
