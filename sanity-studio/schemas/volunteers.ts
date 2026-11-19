import {defineField, defineType} from 'sanity'

export const volunteer = defineType({
  name: 'volunteer',
  title: 'Student / Volunteer',
  type: 'document',
  groups: [
    {name: 'profile', title: 'Basic details', default: true},
    {name: 'public', title: 'Public profile'},
    {name: 'impact', title: 'Impact & achievements'},
  ],
  fields: [
    defineField({name: 'name', title: 'Full name', type: 'string', validation: (Rule) => Rule.required(), group: 'profile'}),
    defineField({name: 'slug', title: 'Profile link', type: 'slug', options: {source: 'name'}, group: 'profile'}),
    defineField({name: 'photo', title: 'Profile photo', type: 'image', options: {hotspot: true}, group: 'profile'}),
    defineField({name: 'category', title: 'Area of service', type: 'string', options: {list: [
      {title: 'Education', value: 'Education'}, {title: 'Environment', value: 'Environment'},
      {title: 'Cleanliness', value: 'Community'}, {title: 'Mental Health', value: 'Mental Health'}
    ]}, group: 'profile'}),
    defineField({name: 'role', title: 'Role / designation', type: 'string', group: 'profile'}),
    defineField({name: 'joinedAt', title: 'Joined on', type: 'date', group: 'profile'}),
    defineField({name: 'active', title: 'Active volunteer', type: 'boolean', initialValue: true, group: 'profile'}),
    defineField({name: 'showPublicly', title: 'Show this person on Our Stars page', type: 'boolean', initialValue: false, group: 'public'}),
    defineField({name: 'bio', title: 'Short introduction', type: 'text', rows: 4, group: 'public'}),
    defineField({name: 'quote', title: 'Personal quote', type: 'text', rows: 2, group: 'public'}),
    defineField({name: 'targetHours', title: 'Annual / profile target hours', type: 'number', initialValue: 400, validation: (Rule) => Rule.min(0), group: 'public'}),
    defineField({name: 'publicImpact', title: 'Impact numbers shown on profile', type: 'array', of: [{type: 'object', fields: [
      {name: 'label', title: 'Label', type: 'string'}, {name: 'value', title: 'Value', type: 'string'}
    ]}], group: 'impact'}),
    defineField({name: 'badges', title: 'Achievements / badges', type: 'array', of: [{type: 'object', fields: [
      {name: 'name', title: 'Achievement name', type: 'string'}, {name: 'icon', title: 'Icon name', type: 'string'}
    ]}], group: 'impact'}),
  ],
  preview: {select: {title: 'name', subtitle: 'role', media: 'photo'}, prepare({title, subtitle, media}) {return {title, subtitle: subtitle || 'Student / Volunteer', media}}},
})

export const volunteerDrive = defineType({
  name: 'volunteerDrive',
  title: 'Drive / Activity',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Drive / activity name', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'date', title: 'Date of drive', type: 'date', validation: (Rule) => Rule.required()}),
    defineField({name: 'defaultHours', title: 'Hours per selected student', type: 'number', validation: (Rule) => Rule.required().min(0.25).max(24)}),
    defineField({name: 'notes', title: 'What did the team do?', type: 'text', rows: 3}),
    defineField({name: 'status', title: 'Processing status', type: 'string', options: {list: ['processing','complete','needs attention'].map((x) => ({title: x, value: x}))}, initialValue: 'processing', readOnly: true}),
    defineField({name: 'participantCount', title: 'Number of students', type: 'number', readOnly: true}),
    defineField({name: 'totalHours', title: 'Total hours added', type: 'number', readOnly: true}),
  ],
  preview: {select: {title: 'title', subtitle: 'date'}, prepare({title, subtitle}) {return {title, subtitle: subtitle || 'Drive'}}},
})

export const volunteerHourEntry = defineType({
  name: 'volunteerHourEntry',
  title: 'Student hour entry',
  type: 'document',
  fields: [
    defineField({name: 'volunteer', title: 'Student / Volunteer', type: 'reference', to: [{type: 'volunteer'}], validation: (Rule) => Rule.required()}),
    defineField({name: 'drive', title: 'Drive / activity', type: 'reference', to: [{type: 'volunteerDrive'}], validation: (Rule) => Rule.required()}),
    defineField({name: 'date', title: 'Activity date', type: 'date', validation: (Rule) => Rule.required()}),
    defineField({name: 'activityTitle', title: 'Activity name', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'hours', title: 'Hours added', type: 'number', validation: (Rule) => Rule.required().min(-24).max(24).custom((value) => value === 0 ? 'Hours cannot be zero.' : true)}),
    defineField({name: 'entryType', title: 'Entry type', type: 'string', options: {list: [
      {title: 'Hours added', value: 'add'}, {title: 'Correction / adjustment', value: 'adjustment'}
    ]}, initialValue: 'add'}),
    defineField({name: 'reason', title: 'Reason (required for correction)', type: 'string', validation: (Rule) => Rule.custom((value, context) => (context.document as any)?.entryType === 'adjustment' && !value ? 'Please explain this correction.' : true)}),
  ],
  preview: {select: {title: 'activityTitle', subtitle: 'date', volunteer: 'volunteer.name'}, prepare({title, subtitle, volunteer}) {return {title: title || 'Hours entry', subtitle: `${volunteer || 'Volunteer'} · ${subtitle || ''}`}}},
})

export const milestoneSettings = defineType({
  name: 'milestoneSettings',
  title: 'Milestones & badges',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Heading shown on website', type: 'string', initialValue: 'Your service journey'}),
    defineField({name: 'milestones', title: 'Milestones (drag to reorder)', type: 'array', of: [{type: 'object', fields: [
      {name: 'hours', title: 'Hours required', type: 'number', validation: (Rule: any) => Rule.required().min(1)},
      {name: 'name', title: 'Milestone name', type: 'string', validation: (Rule: any) => Rule.required()},
      {name: 'shortName', title: 'Short label', type: 'string'},
      {name: 'description', title: 'What this achievement means', type: 'text', rows: 2},
      {name: 'icon', title: 'Icon name', type: 'string'},
      {name: 'badgeImage', title: 'Badge image (optional)', type: 'image'},
      {name: 'color', title: 'Badge colour (hex)', type: 'string'},
    ]}]})
  ],
  preview: {prepare: () => ({title: 'Milestones & badges', subtitle: 'Change hour thresholds, names, descriptions and badge images'})},
})
