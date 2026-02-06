import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Website Management')
    .items([
      // 1. THE ARCHITECT: This is where you build your layouts
      S.documentTypeListItem('page').title('Pages (Site Builder)'),
      
      S.divider(),

      // 2. GLOBAL SINGLETONS: Fixed elements like the Header
      S.listItem()
        .title('Global Header')
        .id('header-singleton')
        .child(
          S.document()
            .schemaType('header')
            .documentId('header') 
        ),
      
      S.divider(),

      // 3. THE SECTION LIBRARY: Individual blocks you can pull into Pages
      // Hero (The new schema we made)
      S.documentTypeListItem('hero').title('Hero Sections'),

      // About (Kept as singleton for easy editing)
      S.listItem()
        .title('About Me')
        .id('about-singleton')
        .child(
          S.document()
            .schemaType('about')
            .documentId('about') 
        ),

      // Skills (Kept as singleton)
      S.listItem()
        .title('Skills')
        .id('skills-singleton')
        .child(
          S.document()
            .schemaType('skills')
            .documentId('skills') 
        ),

      // Services & Projects (Lists)
      S.documentTypeListItem('service').title('Services'),
      S.documentTypeListItem('project').title('Projects'),

      S.divider(),

      // Contact (Kept as singleton)
      S.listItem()
        .title('Contact Me')
        .id('contact-singleton')
        .child(
          S.document()
            .schemaType('contact')
            .documentId('contact') 
        ), 
    ])
    