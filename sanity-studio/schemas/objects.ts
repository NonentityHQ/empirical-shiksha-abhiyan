import {defineField, defineType} from 'sanity'

export const seoFields = [
  defineField({name: 'seoTitle', title: 'Google title', type: 'string', validation: (Rule) => Rule.max(60)}),
  defineField({name: 'seoDescription', title: 'Google description', type: 'text', rows: 3, validation: (Rule) => Rule.max(160)}),
  defineField({name: 'shareImage', title: 'Social sharing image', type: 'image', options: {hotspot: true}}),
]

export const richText = defineType({
  name: 'richText',
  title: 'Formatted text',
  type: 'array',
  of: [
    {type: 'block', styles: [{title: 'Normal', value: 'normal'}, {title: 'Heading 2', value: 'h2'}, {title: 'Heading 3', value: 'h3'}, {title: 'Quote', value: 'blockquote'}],
      marks: {decorators: [{title: 'Bold', value: 'strong'}, {title: 'Italic', value: 'em'}, {title: 'Underline', value: 'underline'}],
        annotations: [{name: 'link', type: 'object', title: 'Link', fields: [
          {name: 'href', type: 'url', title: 'Website address', validation: (Rule: any) => Rule.uri({scheme: ['http', 'https', 'mailto', 'tel']})}
        ]}]}}
  ],
})

export const imageWithAlt = defineType({
  name: 'imageWithAlt',
  title: 'Photo',
  type: 'image',
  options: {hotspot: true, metadata: ['blurhash', 'lqip', 'palette']},
  fields: [
    defineField({name: 'alt', title: 'What is in this photo? (important for accessibility)', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'caption', title: 'Caption (optional)', type: 'string'}),
  ],
})

export const section = defineType({
  name: 'pageSection',
  title: 'Website section',
  type: 'object',
  groups: [
    {name: 'content', title: 'Text & content', default: true},
    {name: 'media', title: 'Photos & video'},
    {name: 'layout', title: 'Display settings'},
  ],
  fields: [
    defineField({name: 'sectionName', title: 'Section name (shown in the editor)', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'sectionType', title: 'What kind of section is this?', type: 'string', options: {layout: 'dropdown', list: [
      {title: 'Text / Story', value: 'text'}, {title: 'Photo with text', value: 'imageText'},
      {title: 'Photo gallery', value: 'gallery'}, {title: 'Scrolling photo marquee', value: 'marquee'},
      {title: 'Numbers / Impact stats', value: 'stats'}, {title: 'Cards', value: 'cards'},
      {title: 'Timeline / Milestones', value: 'timeline'}, {title: 'Video', value: 'video'},
      {title: 'Call to action', value: 'cta'}, {title: 'FAQ', value: 'faq'}
    ]}, validation: (Rule) => Rule.required(), group: 'content'}),
    defineField({name: 'eyebrow', title: 'Small heading', type: 'string', group: 'content'}),
    defineField({name: 'heading', title: 'Main heading', type: 'string', group: 'content'}),
    defineField({name: 'subheading', title: 'Short description', type: 'text', rows: 3, group: 'content'}),
    defineField({name: 'body', title: 'Full content', type: 'richText', group: 'content'}),
    defineField({name: 'primaryButtonLabel', title: 'Button text', type: 'string', group: 'content'}),
    defineField({name: 'primaryButtonUrl', title: 'Button link', type: 'string', group: 'content'}),
    defineField({name: 'secondaryButtonLabel', title: 'Second button text', type: 'string', group: 'content'}),
    defineField({name: 'secondaryButtonUrl', title: 'Second button link', type: 'string', group: 'content'}),
    defineField({name: 'image', title: 'Main photo', type: 'imageWithAlt', group: 'media'}),
    defineField({name: 'images', title: 'Photos in this section (drag to reorder)', type: 'array', of: [{type: 'imageWithAlt'}], group: 'media'}),
    defineField({name: 'videoUrl', title: 'YouTube / video link', type: 'url', group: 'media'}),
    defineField({name: 'items', title: 'Cards / timeline / FAQ items', type: 'array', of: [{type: 'object', fields: [
      {name: 'title', title: 'Title', type: 'string'},
      {name: 'description', title: 'Description', type: 'text', rows: 3},
      {name: 'image', title: 'Photo', type: 'imageWithAlt'},
      {name: 'value', title: 'Number / value', type: 'string'},
      {name: 'date', title: 'Date / label', type: 'string'},
      {name: 'link', title: 'Link', type: 'string'},
    ], preview: {select: {title: 'title', subtitle: 'description', media: 'image'}}}], group: 'content'}),
    defineField({name: 'backgroundStyle', title: 'Section background', type: 'string', options: {layout: 'radio', list: [
      {title: 'White', value: 'white'}, {title: 'Soft cream', value: 'cream'}, {title: 'Soft green', value: 'green'}, {title: 'Dark blue', value: 'navy'}
    ]}, initialValue: 'white', group: 'layout'}),
    defineField({name: 'visible', title: 'Show this section on website', type: 'boolean', initialValue: true, group: 'layout'}),
  ],
  preview: {select: {title: 'sectionName', subtitle: 'sectionType', media: 'image'}, prepare({title, subtitle, media}) {return {title: title || 'Untitled section', subtitle: subtitle ? `Section type: ${subtitle}` : 'Website section', media}}},
})

export const marqueeItem = defineType({
  name: 'marqueeItem',
  title: 'Marquee photo',
  type: 'object',
  fields: [
    defineField({name: 'image', title: 'Photo', type: 'imageWithAlt', validation: (Rule) => Rule.required()}),
    defineField({name: 'label', title: 'Small caption (optional)', type: 'string'}),
    defineField({name: 'link', title: 'Link (optional)', type: 'string'}),
  ],
  preview: {select: {title: 'label', media: 'image'}, prepare({title, media}) {return {title: title || 'Marquee photo', media}}},
})

export const impactStat = defineType({
  name: 'impactStat',
  title: 'Impact number',
  type: 'object',
  fields: [
    defineField({name: 'label', title: 'What does this number represent?', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'value', title: 'Number / value', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'suffix', title: 'Suffix (e.g. +, hrs)', type: 'string'}),
    defineField({name: 'icon', title: 'Icon name (optional)', type: 'string'}),
  ],
  preview: {select: {title: 'label', subtitle: 'value'}, prepare({title, subtitle}) {return {title, subtitle}}},
})
