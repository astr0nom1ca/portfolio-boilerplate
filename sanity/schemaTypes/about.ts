import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'about',
  title: 'About Me',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'About Me',
    }),
    defineField({
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
        }
      ]
    }),
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'array', 
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'stats',
      title: 'Quick Stats',
      type: 'array',
      description: 'Add things like "5+ Years Experience" or "100+ Projects"',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Label' },
            { name: 'value', type: 'string', title: 'Value' },
          ]
        }
      ]
    }),
  ],
})