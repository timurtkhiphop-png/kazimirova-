'use client'

import { useState } from 'react'

interface Props {
  benefits: string[]
}

export function BenefitsAccordion({ benefits }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <div className="mb-16">
      {/* Заголовок-кнопка */}
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between group py-6 border-b border-dark/[0.07] border-t"
      >
        <div className="flex items-center gap-3">
          <div className="w-6 h-px bg-primary" />
          <p className="font-sans text-[10px] tracking-[0.35em] uppercase text-dark/40">Программа</p>
        </div>

        <div className="flex items-center gap-4">
          <h2 className="font-serif text-2xl md:text-3xl text-dark font-light tracking-[-0.02em]">
            Что входит
          </h2>
          {/* Иконка + / − */}
          <div className="w-9 h-9 border border-dark/20 flex items-center justify-center shrink-0
                          transition-colors duration-300 group-hover:border-primary group-hover:bg-primary/5">
            <span className="relative w-3 h-3">
              <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-dark transition-colors duration-300 group-hover:bg-primary" />
              <span className={`absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-dark transition-all duration-300 group-hover:bg-primary
                               ${open ? 'opacity-0 scale-y-0' : 'opacity-100 scale-y-100'}`} />
            </span>
          </div>
        </div>
      </button>

      {/* Список */}
      <div className={`overflow-hidden transition-all duration-500 ease-in-out
                       ${open ? 'max-h-[9999px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="space-y-0 pt-2">
          {benefits.map((benefit, i) => (
            <div key={i}
              className="group flex items-start gap-6 py-5 border-b border-dark/[0.07]
                         hover:bg-blush/50 transition-colors duration-300 -mx-4 px-4">
              <span className="font-serif text-primary/50 text-sm mt-0.5 shrink-0 select-none
                               group-hover:text-primary transition-colors duration-300">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="font-sans text-[15px] text-dark/70 leading-relaxed">{benefit}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
