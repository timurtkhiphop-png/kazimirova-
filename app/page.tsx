import { client } from '@/sanity/client'
import { heroQuery, coursesQuery, siteSettingsQuery } from '@/sanity/queries'
import type { Hero, Course, SiteSettings } from '@/types'
import { Header } from '@/components/Header'
import { Hero as HeroSection } from '@/components/Hero'
import { CourseList } from '@/components/CourseList'
import { MarqueeStrip } from '@/components/MarqueeStrip'
import { Footer } from '@/components/Footer'
import type { Metadata } from 'next'
import { urlFor } from '@/sanity/image'

export const revalidate = 60

async function fetchSafe<T>(query: string, fallback: T): Promise<T> {
  try {
    return await client.fetch<T>(query)
  } catch {
    return fallback
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = await fetchSafe<SiteSettings | null>(siteSettingsQuery, null)
  const ogImage = settings?.seoImage ? urlFor(settings.seoImage).width(1200).height(630).url() : undefined
  return {
    title: settings?.authorName ? `${settings.authorName} — онлайн-курсы` : 'Онлайн-курсы',
    description: settings?.seoDescription ?? 'Онлайн-курсы по женской энергии и телесным практикам',
    openGraph: {
      title: settings?.authorName ?? 'Онлайн-курсы',
      description: settings?.seoDescription ?? '',
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : [],
    },
  }
}

export default async function HomePage() {
  const [hero, courses, settings] = await Promise.all([
    fetchSafe<Hero | null>(heroQuery, null),
    fetchSafe<Course[]>(coursesQuery, []),
    fetchSafe<SiteSettings | null>(siteSettingsQuery, null),
  ])

  return (
    <>
      <Header
        authorName={settings?.authorName}
        telegram={settings?.telegram}
        instagram={settings?.instagram}
      />
      <main>
        <HeroSection data={hero} settings={settings} />
        <MarqueeStrip />
        <CourseList courses={courses} title={settings?.coursesTitle} />
      </main>
      <Footer settings={settings} />
    </>
  )
}
