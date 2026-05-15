import type { PortableTextBlock } from '@portabletext/react'

export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
}

export interface Course {
  _id: string
  title: string
  slug: { current: string }
  courseType: 'one-time' | 'subscription'
  isFeatured: boolean
  image: SanityImage
  heroImage?: SanityImage
  shortDescription?: string
  description?: PortableTextBlock[]
  benefits?: string[]
  duration?: string
  price: number
  oldPrice?: number
  prodamusUrl?: string
}

export interface Hero {
  heading: string
  subheading?: string
  buttonText?: string
  buttonLink?: string
  backgroundVideo?: string
  backgroundImage?: SanityImage
}

export interface SiteSettings {
  authorName: string
  photo?: SanityImage
  philosophyTitle?: string
  philosophyText?: PortableTextBlock[]
  philosophyLinkText?: string
  philosophyLinkUrl?: string
  telegram?: string
  instagram?: string
  vk?: string
  youtube?: string
  coursesTitle?: string
  seoDescription?: string
  seoImage?: SanityImage
}
