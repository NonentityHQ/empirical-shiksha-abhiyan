import {defineField, defineType} from 'sanity'
import {seoFields} from './objects'

export const pageContent = defineType({
  name: 'pageContent',
  title: 'Website page',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Top section', default: true},
    {name: 'sections', title: 'Page sections'},
    {name: 'seo', title: 'Google & sharing'},
    {name: 'settings', title: 'Page settings'},
  ],
  fields: [
    defineField({name: 'pageKey', title: 'Page', type: 'string', readOnly: true, options: {list: [
      {title: 'Home', value: 'home'}, {title: 'About Us', value: 'about'}, {title: 'Our Initiatives', value: 'initiatives'},
      {title: 'Impact', value: 'impact'}, {title: 'Gallery', value: 'gallery'}, {title: 'Success Stories', value: 'success'},
      {title: 'Our Stars', value: 'stars'}, {title: 'Contact Us', value: 'contact'}, {title: 'Reports', value: 'reports'}
    ]}}),
    defineField({name: 'pageTitle', title: 'Internal page name', type: 'string', readOnly: true}),
    defineField({name: 'heroEyebrow', title: 'Small heading', type: 'string', group: 'hero'}),
    defineField({name: 'heroHeading', title: 'Main heading', type: 'string', group: 'hero'}),
    defineField({name: 'heroDescription', title: 'Short description', type: 'text', rows: 3, group: 'hero'}),
    defineField({name: 'heroImage', title: 'Main banner photo', type: 'imageWithAlt', group: 'hero'}),
    defineField({name: 'heroMobileImage', title: 'Mobile banner photo (optional)', type: 'imageWithAlt', group: 'hero'}),
    defineField({name: 'heroVideoUrl', title: 'Background video URL (optional)', type: 'url', group: 'hero'}),
    defineField({name: 'heroButtonLabel', title: 'Button text', type: 'string', group: 'hero'}),
    defineField({name: 'heroButtonUrl', title: 'Button link', type: 'string', group: 'hero'}),
    defineField({name: 'sections', title: 'Sections on this page (drag to reorder)', description: 'Har section ka naam simple rakhein, jaise “About — Founders” ya “Home — Photo Marquee”. Section ke andar text, photos, cards aur display settings edit hote hain.', type: 'array', of: [{type: 'pageSection'}], group: 'sections'}),
    ...seoFields.map((f) => ({...f, group: 'seo'})),
    defineField({name: 'published', title: 'Show this page on website', type: 'boolean', initialValue: true, group: 'settings'}),
  ],
  preview: {select: {title: 'pageTitle', subtitle: 'pageKey', media: 'heroImage'}, prepare({title, subtitle, media}) {return {title: title || 'Website page', subtitle: `Page: ${subtitle || 'not set'}`, media}}},
})

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Website-wide settings',
  type: 'document',
  groups: [{name: 'brand', title: 'Brand & contact', default: true}, {name: 'marquee', title: 'Scrolling photo strips'}, {name: 'footer', title: 'Footer & social links'}, {name: 'seo', title: 'Default SEO'}],
  fields: [
    defineField({name: 'organisationName', title: 'Organisation name', type: 'string', group: 'brand'}),
    defineField({name: 'logo', title: 'Website logo', type: 'imageWithAlt', group: 'brand'}),
    defineField({name: 'phone', title: 'Phone number', type: 'string', group: 'brand'}),
    defineField({name: 'email', title: 'Email address', type: 'string', group: 'brand'}),
    defineField({name: 'address', title: 'Address', type: 'text', rows: 2, group: 'brand'}),
    defineField({name: 'homeMarqueeTitle', title: 'Home scrolling strip title', type: 'string', group: 'marquee'}),
    defineField({name: 'homeMarqueeImages', title: 'Home scrolling photos (drag to reorder)', type: 'array', of: [{type: 'marqueeItem'}], group: 'marquee'}),
    defineField({name: 'aboutMarqueeTitle', title: 'About scrolling strip title', type: 'string', group: 'marquee'}),
    defineField({name: 'aboutMarqueeImages', title: 'About scrolling photos (drag to reorder)', type: 'array', of: [{type: 'marqueeItem'}], group: 'marquee'}),
    defineField({name: 'footerDescription', title: 'Footer description', type: 'text', rows: 3, group: 'footer'}),
    defineField({name: 'socialLinks', title: 'Social media links', type: 'array', of: [{type: 'object', fields: [
      {name: 'platform', title: 'Platform', type: 'string', options: {list: ['Instagram','YouTube','Facebook','LinkedIn','X','WhatsApp'].map((x) => ({title: x, value: x.toLowerCase()}))}},
      {name: 'url', title: 'Profile link', type: 'url'},
      {name: 'handle', title: 'Display name', type: 'string'},
    ], preview: {select: {title: 'platform', subtitle: 'handle'}}}], group: 'footer'}),
    ...seoFields.map((f) => ({...f, group: 'seo'})),
  ],
  preview: {prepare: () => ({title: 'Website-wide settings', subtitle: 'Logo, contact, marquee, footer and social links'})},
})

export const initiative = defineType({
  name: 'initiative',
  title: 'Initiative',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Initiative name', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'slug', title: 'Page address', type: 'slug', options: {source: 'title'}, validation: (Rule) => Rule.required()}),
    defineField({name: 'shortDescription', title: 'Short description', type: 'text', rows: 3}),
    defineField({name: 'heroImage', title: 'Banner photo', type: 'imageWithAlt'}),
    defineField({name: 'gallery', title: 'Photos for this initiative', type: 'array', of: [{type: 'imageWithAlt'}]}),
    defineField({name: 'content', title: 'Full story', type: 'richText'}),
    defineField({name: 'impactStats', title: 'Impact numbers', type: 'array', of: [{type: 'impactStat'}]}),
    defineField({name: 'active', title: 'Show on website', type: 'boolean', initialValue: true}),
  ],
  preview: {select: {title: 'title', subtitle: 'shortDescription', media: 'heroImage'}},
})

export const report = defineType({
  name: 'report',
  title: 'Financial / Annual report',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Report name', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'financialYear', title: 'Financial year', type: 'string', placeholder: 'FY 2026–27', validation: (Rule) => Rule.required()}),
    defineField({name: 'reportDate', title: 'Published date', type: 'date'}),
    defineField({name: 'description', title: 'What is this report about?', type: 'text', rows: 3}),
    defineField({name: 'documentFile', title: 'Upload PDF', type: 'file', options: {accept: '.pdf'}}),
    defineField({name: 'coverImage', title: 'Cover image', type: 'imageWithAlt'}),
    defineField({name: 'published', title: 'Visible on website', type: 'boolean', initialValue: false}),
  ],
  preview: {select: {title: 'title', subtitle: 'financialYear', media: 'coverImage'}},
})
