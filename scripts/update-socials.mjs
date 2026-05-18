import { createClient } from 'next-sanity'

const client = createClient({
  projectId: '29fou88c', dataset: 'production',
  apiVersion: '2024-01-01', useCdn: false,
  token: process.env.SANITY_TOKEN,
})

const doc = await client.fetch(`*[_type == "siteSettings"][0]{ _id }`)
console.log('siteSettings id:', doc._id)

await client.patch(doc._id).set({
  instagram: 'https://instagram.com/kazimirova_julia',
  telegram: 'https://t.me/kazimirova_juliya',
  youtube: 'https://youtube.com/@kazimirova-julia',
}).commit()

console.log('✅ Соцсети обновлены')
