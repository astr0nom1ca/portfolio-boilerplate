import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'contact',
  title: 'Contact Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Get In Touch',
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'WhatsApp Number',
      description: 'Format: 2348012345678 (Include country code, no + or spaces)',
      type: 'string',
    }),
    defineField({
      name: 'formspreeId',
      title: 'Formspree Project ID',
      description: 'The unique ID provided by Formspree (e.g., "mregyoqy")',
      type: 'string',
    }),
  ],
})