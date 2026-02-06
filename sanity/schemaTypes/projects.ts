import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  // 1. Define the groups so the 'metrics' tab actually shows up
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'metrics', title: 'Lighthouse Metrics' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      group: 'content',
    }),
    defineField({
      name: 'image',
      title: 'Project Image',
      type: 'image',
      options: { hotspot: true },
      group: 'content',
    }),
    defineField({
      name: 'link',
      title: 'Project Link',
      type: 'url',
      group: 'content',
    }),
    defineField({
      name: 'performanceScore',
      title: 'Lighthouse Performance',
      type: 'number',
      group: 'metrics', // Now this matches the group defined above
      validation: (Rule) => Rule.min(0).max(100).precision(0),
    }),
  ],
})