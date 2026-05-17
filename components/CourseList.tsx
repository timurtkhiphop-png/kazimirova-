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
