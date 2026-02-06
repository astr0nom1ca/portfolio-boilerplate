import { defineField, defineType } from 'sanity'
export default defineType({
  name: 'hero',
  type: 'document',
  title: 'Hero Section',
  fields: [
    defineField({
      name: 'heading',
      type: 'string',
      title: 'Main Heading',
    }),
    defineField({
      name: 'subheading',
      type: 'text',
      title: 'Subheading/Introduction',
    }),
    defineField({
      name: 'backgroundImage',
      type: 'image',
      title: 'Background Image',
      options: { hotspot: true }, // Allows you to crop the image in Sanity
    }),
    defineField({
      name: 'ctaButtons',
      title: 'CTA Buttons',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'ctaText', title: 'CTA Text', type: 'string' },
            { name: 'ctaLink', title: 'CTA Button Link', type: 'string', description: 'Use #contact for smooth scroll or a full URL for external links', initialValue: '#contact'},
          ],
        },
      ],

    })
  ],
})