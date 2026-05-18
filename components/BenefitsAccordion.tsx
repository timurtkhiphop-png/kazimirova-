interface Props {
  benefits: string[]
}

// Codepoints новых эмодзи (BMP, < 65535)
const CP_EFIRY   = '☀'.codePointAt(0)!  // 9728
const CP_PODCAST = '❤'.codePointAt(0)!  // 10084
const CP_FILM    = '✨'.codePointAt(0)!  // 10024
const CP_SPECIAL = '💎'.codePointAt(0)! // 128142 (Supplementary)

function startsWithCP(text: string, cp: number) {
  return text.codePointAt(0) === cp
}

// Убирает ведущие не-буквенные символы — работает для любых emoji (BMP и выше)
function strip(text: string): string {
  // Срезаем ведущие символы пока не встретим букву, цифру или кавычку
  let i = 0
  while (i < text.length) {
    const cp = text.codePointAt(i)!
    const ch = String.fromCodePoint(cp)
    if (/[A-Za-zА-яЁё0-9"«»""(]/.test(ch)) break
    i += ch.length
  }
  return text.slice(i)
}

export function BenefitsAccordion({ benefits }: Props) {
  const efiry    = benefits.filter(b => startsWithCP(b, CP_EFIRY))
  const podcasts = benefits.filter(b => startsWithCP(b, CP_PODCAST))
  const films    = benefits.filter(b => startsWithCP(b, CP_FILM))
  const practice = benefits.filter(b => b.startsWith('Практика'))
  const special  = benefits.filter(b => startsWithCP(b, CP_SPECIAL))

  const groups = [
    { emoji: '☀️', label: 'Эфиры',           items: efiry },
    { emoji: '❤️', label: 'Подкасты',         items: podcasts },
    { emoji: '✨',  label: 'Разборы фильмов', items: films },
    { emoji: '🌸', label: 'Практики',         items: practice },
  ].filter(g => g.items.length > 0)

  return (
    <div className="mb-16">
      <h2 className="font-serif text-3xl md:text-4xl text-dark text-center tracking-[-0.02em] mb-8">
        Состав курса
      </h2>

      <div className="rounded-2xl overflow-hidden border border-dark/[0.07]">
        {groups.map((group, gi) => (
          <div key={group.label}
            className={`px-6 md:px-8 py-6 ${gi < groups.length - 1 ? 'border-b border-dark/[0.07]' : ''}`}>

            <p className="font-sans text-[11px] tracking-[0.3em] uppercase text-primary mb-4">
              {group.emoji} {group.label}
            </p>

            <div className="space-y-2">
              {group.items.map((item, i) => (
                <p key={i} className="font-serif text-xl md:text-3xl text-dark/75 leading-[1.5]">
                  {strip(item)}
                </p>
              ))}
            </div>
          </div>
        ))}

        {special.map((item, i) => (
          <div key={i} className="px-6 md:px-8 py-4 bg-primary/5 border-t border-dark/[0.07]">
            <p className="font-serif text-base text-dark/50 leading-[1.5] text-center">
              {strip(item)}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
