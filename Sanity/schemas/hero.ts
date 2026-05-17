import { defineField, defineType } from 'sanity'

export const hero = defineType({
  name: 'hero',
  title: 'Главный экран (Hero)',
  type: 'document',
  fields: [
    defineField({
      name: 'backgroundImage',
      title: 'Фоновое изображение',
      type: 'image',
      options: { hotspot: true },
      description: 'Фон за фотографией автора',
    }),
    defineField({
      name: 'backgroundVideo',
      title: 'Фоновое видео (URL .mp4)',
      type: 'url',
      description: 'Если загружено — заменяет фото. Вставь прямую ссылку на .mp4',
    }),
    defineField({
      name: 'buttonText',
      title: 'Текст кнопки "Смотреть курсы"',
      type: 'string',
      initialValue: 'Смотреть курсы',
      description: 'Кнопка прокручивает к блоку с курсами',
    }),
  ],
  preview: {
    select: { media: 'backgroundImage' },
    prepare() {
      return { title: 'Главный экран' }
    },
  },
})
