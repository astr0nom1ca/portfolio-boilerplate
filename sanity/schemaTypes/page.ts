export default {
  name: 'page',
  type: 'document',
  title: 'Page Builder',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Page Title' // Good for internal organization (e.g., "Home Page")
    },
    {
      name: 'sections',
      type: 'array',
      title: 'Page Sections',
      of: [
        {
          type: 'reference',
          to: [
            { type: 'hero' },
            { type: 'about' },
            { type: 'project' },
            { type: 'contact' },
            { type: 'skills' },
            { type: 'service' }
          ]
        }
      ]
    }
  ]
}