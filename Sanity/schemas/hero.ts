import { defineField, defineType } from 'sanity'

export const hero = defineType({
  name: 'hero',
  title: 'Главная секция (Hero)',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Заголовок',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subheading',
      title: 'Подзаголовок',
      type: 'string',
    }),
    defineField({
      name: 'buttonText',
      title: 'Текст кнопки',
      type: 'string',
      initialValue: 'Начать путь',
    }),
    defineField({
      name: 'buttonLink',
      title: 'Ссылка кнопки',
      type: 'string',
    }),
    defineField({
      name: 'backgroundVideo',
      title: 'Фоновое видео (URL .mp4)',
      type: 'url',
      description: 'Загрузи видео на Cloudinary или Bunny CDN и вставь прямую ссылку на .mp4',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Фолбэк-изображение',
      type: 'image',
      options: { hotspot: true },
      description: 'Показывается если видео не загрузилось или на мобильных',
    }),
  ],
  preview: {
    select: { title: 'heading', media: 'backgroundImage' },
    prepare(selection: Record<string, any>) {
      return { title: selection.title || 'Hero секция', media: selection.media }
    },
  },
})
