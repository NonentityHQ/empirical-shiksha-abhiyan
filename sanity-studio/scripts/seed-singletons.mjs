import {createClient} from '@sanity/client'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'
const token = process.env.SANITY_API_TOKEN

if (!projectId || projectId === 'YOUR_PROJECT_ID' || !token) {
  throw new Error('Set SANITY_STUDIO_PROJECT_ID and SANITY_API_TOKEN in sanity-studio/.env before seeding.')
}

const client = createClient({projectId, dataset, apiVersion: '2026-07-01', useCdn: false, token})

const pages = [
  ['home', 'Home Page'], ['about', 'About Us'], ['initiatives', 'Our Initiatives'],
  ['impact', 'Impact'], ['gallery', 'Gallery'], ['success', 'Success Stories'],
  ['stars', 'Our Stars'], ['contact', 'Contact Us'], ['reports', 'Reports'],
]

for (const [pageKey, pageTitle] of pages) {
  await client.createIfNotExists({
    _id: `page-${pageKey}`,
    _type: 'pageContent',
    pageKey,
    pageTitle,
    published: true,
    sections: [],
  })
}

await client.createIfNotExists({
  _id: 'site-settings',
  _type: 'siteSettings',
  organisationName: 'Empirical Shiksha Abhiyan Samiti',
  phone: '7400845669',
  email: 'empiricalshikshaabhiyan@gmail.com',
  homeMarqueeImages: [],
  aboutMarqueeImages: [],
  socialLinks: [
    {platform: 'youtube', handle: '@EmpiricalShikshaAbhiyan', url: 'https://www.youtube.com/@empiricalinstituteabhiyan'},
    {platform: 'instagram', handle: '@empirical_institute', url: 'https://www.instagram.com/empirical_institute/'},
  ],
})

await client.createIfNotExists({
  _id: 'before-after-section',
  _type: 'beforeAfterSection',
  visible: true,
  items: [], // empty = website shows its built-in sample until you add a pair in the Studio
})

await client.createIfNotExists({
  _id: 'milestone-settings',
  _type: 'milestoneSettings',
  title: 'Your service journey',
  milestones: [
    {hours: 25, name: 'Green Starter', shortName: 'First Step', icon: 'sprout', color: '#3A7D44'},
    {hours: 50, name: 'Active Volunteer', shortName: 'Active Volunteer', icon: 'users', color: '#1A7F78'},
    {hours: 100, name: 'Community Contributor', shortName: 'Community Contributor', icon: 'star', color: '#EE9B13'},
    {hours: 200, name: 'Impact Leader', shortName: 'Impact Leader', icon: 'trophy', color: '#D8501F'},
    {hours: 400, name: 'Changemaker', shortName: 'Changemaker', icon: 'crown', color: '#7A4A8E'},
  ],
})

console.log('Created missing page, site settings, before/after and milestone documents. Existing documents were left unchanged.')
