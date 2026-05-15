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
    <div className="bg-primary overflow-hidden py-3.5 select-none">
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
  )
}
