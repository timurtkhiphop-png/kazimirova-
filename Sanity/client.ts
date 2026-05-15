import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: '29fou88c',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})
