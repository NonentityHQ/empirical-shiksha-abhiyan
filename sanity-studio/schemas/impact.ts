import {defineField, defineType} from 'sanity'

/** One before/after pair. Editors add as many of these as they want. */
const photoField = (name: string, title: string, description: string) =>
  defineField({
    name,
    title,
    description,
    type: 'image',
    options: {hotspot: true},
    validation: (Rule) => Rule.required().error('Photo is required'),
    fields: [
      defineField({name: 'alt', title: 'Short description of the photo (optional)', type: 'string'}),
    ],
  })

export const beforeAfterItem = defineType({
  name: 'beforeAfterItem',
  title: 'Before & After',
  type: 'object',
  groups: [
    {name: 'photos', title: 'Photos', default: true},
    {name: 'text', title: 'Text'},
    {name: 'hindi', title: 'हिन्दी (optional)'},
    {name: 'display', title: 'Display'},
  ],
  fields: [
    photoField('beforeImage', 'BEFORE photo', 'Photo taken before the cleanup / work. Use the same angle as the After photo so the slider lines up.'),
    photoField('afterImage', 'AFTER photo', 'Photo of the same place after the work.'),
    defineField({name: 'kicker', title: 'Small line above the title', type: 'string', initialValue: 'Every Week at', group: 'text'}),
    defineField({name: 'title', title: 'Place / title', type: 'string', description: 'e.g. Rameshwar Kund', validation: (Rule) => Rule.required(), group: 'text'}),
    defineField({name: 'description', title: 'Short description', type: 'text', rows: 3, validation: (Rule) => Rule.max(220), group: 'text'}),
    defineField({name: 'date', title: 'Date / label (optional)', type: 'string', description: 'e.g. “October 2026”', group: 'text'}),
    defineField({name: 'kickerHi', title: 'Small line (Hindi)', type: 'string', group: 'hindi'}),
    defineField({name: 'titleHi', title: 'Place / title (Hindi)', type: 'string', group: 'hindi'}),
    defineField({name: 'descriptionHi', title: 'Short description (Hindi)', type: 'text', rows: 3, group: 'hindi'}),
    defineField({name: 'beforeLabel', title: 'Label on the Before side', type: 'string', initialValue: 'Before', group: 'display'}),
    defineField({name: 'afterLabel', title: 'Label on the After side', type: 'string', initialValue: 'After', group: 'display'}),
    defineField({name: 'startPosition', title: 'Where the slider starts (%)', type: 'number', description: '50 = middle. Lower shows more of the After photo.', initialValue: 50, validation: (Rule) => Rule.min(5).max(95), group: 'display'}),
    defineField({name: 'visible', title: 'Show on website', type: 'boolean', initialValue: true, group: 'display'}),
  ],
  preview: {
    select: {title: 'title', subtitle: 'date', before: 'beforeImage', visible: 'visible'},
    prepare: ({title, subtitle, before, visible}) => ({
      title: title || 'Before & After',
      subtitle: `${visible === false ? 'Hidden · ' : ''}${subtitle || 'Drag to reorder'}`,
      media: before,
    }),
  },
})

/** Singleton: the whole Before & After block on the Impact page. */
export const beforeAfterSection = defineType({
  name: 'beforeAfterSection',
  title: 'Before & After section (Impact page)',
  type: 'document',
  fields: [
    defineField({
      name: 'visible',
      title: 'Show this section on the Impact page',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'items',
      title: 'Before & After pairs',
      description: 'Click “Add item” for a new pair. Drag to change the order — the first one shows first. With more than one pair, visitors get arrows to move between them.',
      type: 'array',
      of: [{type: 'beforeAfterItem'}],
    }),
  ],
  preview: {prepare: () => ({title: 'Before & After section', subtitle: 'Impact page'})},
})
