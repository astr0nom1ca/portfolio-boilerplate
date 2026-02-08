import { defineField, defineType } from 'sanity'

interface HeaderPreviewSelection {
  brandItems?: any[]
  navItems?: any[]
}

export default defineType({
  name: 'header',
  title: 'Header',
  type: 'document',
  fields: [
    defineField({
      name: 'brandItems',
      title: 'Brand & Social Links',
      description: 'Add your logo and social media icons here',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'brandItem',
          fields: [
            { name: 'image', title: 'Icon/Logo', type: 'image' },
            { name: 'alt', title: 'Alt Text', type: 'string' },
            { name: 'url', title: 'Link URL', type: 'url' },
          ],
        },
      ],
    }),
    defineField({
      name: 'navItems',
      title: 'Navigation Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'anchor', title: 'Anchor ID', type: 'string' },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      brandItems: 'brandItems',
      navItems: 'navItems',
    },
    prepare(selection: HeaderPreviewSelection) {
      const { brandItems, navItems } = selection;
      const brandCount = Array.isArray(brandItems) ? brandItems.length : 0;
      const navCount = Array.isArray(navItems) ? navItems.length : 0;

      return {
        title: 'Site Header Configuration',
        subtitle: `${brandCount} Brand/Social icons | ${navCount} Nav links`,
      };
    },
  },
})
