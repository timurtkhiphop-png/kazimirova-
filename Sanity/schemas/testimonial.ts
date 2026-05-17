import { defineField, defineType } from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Отзывы',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Имя',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'text',
      title: 'Текст отзыва',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Фото',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'course',
      title: 'Курс',
      type: 'reference',
      to: [{ type: 'course' }],
      description: 'К какому курсу относится отзыв',
    }),
    defineField({
      name: 'isVisible',
      title: 'Показывать на сайте',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'order',
      title: 'Порядок',
      type: 'number',
      initialValue: 1,
    }),
  ],
  orderings: [{
    title: 'По порядку',
    name: 'orderAsc',
    by: [{ field: 'order', direction: 'asc' }],
  }],
  preview: {
    select: { title: 'name', subtitle: 'text', media: 'photo' },
    prepare({ title, subtitle, media }: Record<string, any>) {
      return { title, subtitle: subtitle?.slice(0, 80) + '...', media }
    },
  },
})
