import { groq } from 'next-sanity'

export const heroQuery = groq`
  *[_type == "hero"][0] {
    heading,
    subheading,
    buttonText,
    buttonLink,
    backgroundVideo,
    backgroundImage
  }
`

export const coursesQuery = groq`
  *[_type == "course" && isActive == true] | order(order asc) {
    _id,
    title,
    slug,
    courseType,
    isFeatured,
    image,
    shortDescription,
    duration,
    price,
    oldPrice
  }
`

export const courseBySlugQuery = groq`
  *[_type == "course" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    courseType,
    isFeatured,
    image,
    heroImage,
    shortDescription,
    description,
    benefits,
    duration,
    price,
    oldPrice,
    prodamusUrl
  }
`

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    authorName,
    photo,
    philosophyTitle,
    philosophyText,
    philosophyLinkText,
    philosophyLinkUrl,
    telegram,
    instagram,
    vk,
    youtube,
    coursesTitle,
    seoDescription,
    seoImage
  }
`
