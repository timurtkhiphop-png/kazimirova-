import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center text-center px-6">
      <p className="section-subtitle mb-4">Страница не найдена</p>
      <h1 className="font-serif text-6xl text-dark mb-8">404</h1>
      <Link href="/" className="btn-outline">
        На главную
      </Link>
    </div>
  )
}
