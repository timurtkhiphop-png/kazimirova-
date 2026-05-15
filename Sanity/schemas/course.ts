import { defineField, defineType } from 'sanity'

export const course = defineType({
  name: 'course',
  title: 'Курс',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Название курса',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL-адрес',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
      description: 'Генерируется автоматически. Не меняйте после публикации.',
    }),
    defineField({
      name: 'isActive',
      title: 'Показывать на сайте',
      type: 'boolean',
      initialValue: true,
      description: 'Снимите галочку чтобы временно скрыть курс — данные останутся.',
    }),
    defineField({
      name: 'isFeatured',
      title: 'Выделить как главный курс',
      type: 'boolean',
      initialValue: false,
      description: 'Показывается первым и крупнее остальных',
    }),
    defineField({
      name: 'courseType',
      title: 'Тип курса',
      type: 'string',
      options: {
        list: [
          { title: 'Разовая покупка', value: 'one-time' },
          { title: 'Подписка (ежемесячно)', value: 'subscription' },
        ],
        layout: 'radio',
      },
      initialValue: 'one-time',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Порядок на сайте',
      type: 'number',
      description: 'Чем меньше число — тем выше курс. 1 = первый.',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'image',
      title: 'Обложка курса (превью в карточке)',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
      description: 'Используется в карточке на главной странице',
    }),
    defineField({
      name: 'heroImage',
      title: 'Фото внутри курса (необязательно)',
      type: 'image',
      options: { hotspot: true },
      description: 'Если не заполнено — используется обложка. Можно загрузить другое фото для страницы курса.',
    }),
    defineField({
      name: 'shortDescription',
      title: 'Короткое описание',
      type: 'text',
      rows: 2,
      description: 'Показывается на карточке в списке курсов. До 150 символов.',
      validation: (Rule) => Rule.max(150),
    }),
    defineField({
      name: 'description',
      title: 'Полное описание курса',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Обычный', value: 'normal' },
            { title: 'Заголовок H2', value: 'h2' },
            { title: 'Заголовок H3', value: 'h3' },
            { title: 'Цитата', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Жирный', value: 'strong' },
              { title: 'Курсив', value: 'em' },
            ],
          },
        },
      ],
    }),
    defineField({
      name: 'benefits',
      title: 'Что входит в курс',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'duration',
      title: 'Длительность / доступ',
      type: 'string',
      description: 'Например: Материалы остаются навсегда, 4 недели',
    }),
    defineField({
      name: 'price',
      title: 'Цена (₽)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'oldPrice',
      title: 'Старая цена (₽)',
      type: 'number',
    }),
    defineField({
      name: 'prodamusUrl',
      title: 'Ссылка на оплату (Продамус)',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
  ],
  orderings: [
    {
      title: 'По порядку на сайте',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      price: 'price',
      isActive: 'isActive',
      courseType: 'courseType',
      isFeatured: 'isFeatured',
    },
    prepare({ title, media, price, isActive, courseType, isFeatured }: Record<string, any>) {
      const type = courseType === 'subscription' ? '/мес' : ''
      const badges = [
        !isActive ? '🙈 Скрыт' : null,
        isFeatured ? '⭐ Главный' : null,
      ].filter(Boolean).join(' · ')
      return {
        title,
        media,
        subtitle: [badges, price ? `${price.toLocaleString('ru')} ₽${type}` : 'Цена не указана']
          .filter(Boolean).join(' · '),
      }
    },
  },
})
