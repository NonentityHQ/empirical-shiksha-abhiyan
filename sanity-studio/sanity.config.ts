import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {presentationTool, defineLocations} from 'sanity/presentation'
import {schemaTypes} from './schemas'
import {BulkHoursTool} from './tools/BulkHoursTool'
import {deskStructure} from './structure'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'YOUR_PROJECT_ID'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'
const previewUrl = process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:5173'

export default defineConfig({
  name: 'empirical-shiksha',
  title: 'Empirical Shiksha | Website Manager',
  projectId,
  dataset,
  plugins: [
    structureTool({structure: deskStructure}),
    presentationTool({
      title: 'Live Website Preview',
      previewUrl: {
        initial: previewUrl,
      },
      allowOrigins: [previewUrl],
      resolve: {
        locations: {
          pageContent: defineLocations({
            select: {title: 'pageTitle', pageKey: 'pageKey'},
            resolve: (doc) => ({
              locations: [{
                title: doc?.title || 'Website page',
                href: doc?.pageKey === 'home' ? '/' : `/#/${doc?.pageKey || ''}`,
              }],
            }),
          }),
          beforeAfterSection: defineLocations({
            select: {visible: 'visible'},
            resolve: () => ({locations: [{title: 'Impact — Before & After', href: '/#/impact'}]}),
          }),
          siteSettings: defineLocations({message: 'These settings are used across the whole website.', tone: 'caution'}),
          initiative: defineLocations({
            select: {title: 'title', slug: 'slug.current'},
            resolve: (doc) => ({
              locations: [{title: doc?.title || 'Initiative', href: `/#/initiatives/${doc?.slug || ''}`}],
            }),
          }),
          report: defineLocations({
            select: {title: 'title'},
            resolve: (doc) => ({
              locations: [{title: doc?.title || 'Financial reports', href: '/#/reports'}],
            }),
          }),
          volunteer: defineLocations({
            select: {name: 'name', slug: 'slug.current', showPublicly: 'showPublicly'},
            resolve: (doc) => ({
              locations: doc?.showPublicly && doc?.slug
                ? [{title: doc.name || 'Volunteer profile', href: `/#/stars/${doc.slug}`}]
                : [],
            }),
          }),
          milestoneSettings: defineLocations({message: 'Milestones are shown on the Our Stars experience.', tone: 'positive'}),
        },
      },
    }),
  ],
  tools: (prev) => [
    ...prev,
    {
      name: 'bulk-hours',
      title: 'Bulk Student Hours',
      component: BulkHoursTool,
    },
  ],
  schema: {types: schemaTypes},
})