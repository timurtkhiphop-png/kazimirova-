import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Настройки сайта',
  type: 'document',
  groups: [
    { name: 'hero', title: '🖼 Hero (главный экран)' },
    { name: 'social', title: '📱 Социальные сети' },
    { name: 'contacts', title: '📞 Контакты' },
    { name: 'seo', title: '🔍 SEO' },
  ],
  fields: [
    // ── HERO ──
    defineField({
      name: 'authorName',
      title: 'Имя автора (отображается в Hero)',
      type: 'string',
      group: 'hero',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Фото автора (в Hero)',
      type: 'image',
      group: 'hero',
      options: { hotspot: true },
      description: 'Главное фото на первом экране сайта',
    }),
    defineField({
      name: 'heroBio',
      title: 'Подпись под фото (1–2 предложения о себе)',
      type: 'text',
      group: 'hero',
      rows: 2,
      description: 'Показывается под фотографией в Hero. Коротко и по делу.',
      validation: (Rule) => Rule.max(200),
    }),

    // ── СОЦСЕТИ ──
    defineField({
      name: 'telegram',
      title: 'Telegram',
      type: 'url',
      group: 'social',
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram',
      type: 'url',
      group: 'social',
    }),
    defineField({
      name: 'vk',
      title: 'ВКонтакте',
      type: 'url',
      group: 'social',
    }),
    defineField({
      name: 'youtube',
      title: 'YouTube',
      type: 'url',
      group: 'social',
    }),
    defineField({
      name: 'tiktok',
      title: 'TikTok',
      type: 'url',
      group: 'social',
    }),

    // ── КОНТАКТЫ ──
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      group: 'contacts',
    }),
    defineField({
      name: 'footerText',
      title: 'Текст в подвале сайта',
      type: 'string',
      group: 'contacts',
      description: 'Например: Все права защищены · Политика конфиденциальности',
    }),

    // ── SEO ──
    defineField({
      name: 'seoDescription',
      title: 'Описание сайта (SEO)',
      type: 'text',
      group: 'seo',
      rows: 2,
    }),
    defineField({
      name: 'seoImage',
      title: 'OG-изображение',
      type: 'image',
      group: 'seo',
      description: 'Превью при расшаривании в соцсетях (1200×630px)',
    }),
  ],
})
