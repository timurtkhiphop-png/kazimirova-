import type { Course } from '@/types'
import { CourseCard } from './CourseCard'

interface CourseListProps {
  courses: Course[]
  title?: string
}

export function CourseList({ courses, title = 'Курсы' }: CourseListProps) {
  if (!courses.length) return null

  const featured = courses.find(c => c.isFeatured)
  const rest = courses.filter(c => !c.isFeatured)

  return (
    <section id="courses" className="bg-cream">

      {/* ── Шапка секции ── */}
      <div className="container-site pt-28 pb-0">
        <div className="flex items-end justify-between gap-8 pb-10 border-b border-dark/[0.07]">
          <div className="flex items-end gap-6">
            {/* Большой декоративный номер */}
            <span className="font-serif text-[12vw] md:text-[8vw] font-light text-dark/[0.06]
                             leading-none select-none -mb-2">
              {String(courses.length).padStart(2, '0')}
            </span>
            <div className="pb-2">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-6 h-px bg-primary" />
                <p className="label">Программы</p>
              </div>
              <h2 className="font-serif text-5xl md:text-6xl text-dark font-light leading-[0.9]
                             tracking-[-0.02em]">
                {title}
              </h2>
            </div>
          </div>

          <p className="hidden md:block font-serif italic text-dark/50 text-lg max-w-[220px]
                        leading-relaxed text-right">
            Выберите программу, которая резонирует с вами
          </p>
        </div>
      </div>

      {/* ── Featured — кинематографичный ── */}
      {featured && (
        <div className="mt-0">
          <CourseCard course={featured} featured index={0} />
        </div>
      )}

      {/* ── Остальные ── */}
      {rest.length > 0 && (
        <div className="container-site py-20 md:py-28">
          <div className={`grid gap-x-8 md:gap-x-16 gap-y-20
            ${rest.length === 1 ? 'grid-cols-1 max-w-sm' :
              rest.length === 2 ? 'grid-cols-2' :
              'grid-cols-2 lg:grid-cols-3'}`}>
            {rest.map((course, i) => (
              <CourseCard key={course._id} course={course} index={featured ? i + 1 : i} />
            ))}
          </div>
        </div>
      )}

      {!rest.length && <div className="pb-28" />}
    </section>
  )
}
