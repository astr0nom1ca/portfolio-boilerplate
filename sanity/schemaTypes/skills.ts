import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'skills',
  title: 'Skills',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Technical Skills',
    }),
    defineField({
      name: 'skillList',
      title: 'Skill List',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Skill Name', type: 'string' },
            { name: 'icon', title: 'Skill Icon', type: 'image', options: { hotspot: true } },
          ],
        },
      ],
    }),
  ],
})