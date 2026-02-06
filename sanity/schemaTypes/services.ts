import { defineField, defineType } from 'sanity'
import { Briefcase } from 'lucide-react'

export default defineType({
  name: 'service',
  title: 'Services',
  type: 'document',
  icon: Briefcase,
  fields: [
    defineField({
      name: 'serviceName',
      title: 'Service Name',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'image', // Renamed from ref-image for cleaner code
      title: 'Reference Image',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
})