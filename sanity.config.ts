'use client'

import { Iframe } from 'sanity-plugin-iframe-pane'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { presentationTool } from 'sanity/presentation'
// 1. Import the widget creators directly from the dashboard package
import { dashboardTool, projectInfoWidget, projectUsersWidget } from '@sanity/dashboard'

import { apiVersion} from './sanity/env'
import { schema } from './sanity/schemaTypes' 
import { structure } from './sanity/structure'

const devUrl = 'http://localhost:3000';
const prodUrl = 'https://portfolio-boilerplate.vercel.app';

export default defineConfig({
  basePath: '/studio',
  projectId:'5ev142c0', 
  dataset:'production',
  schema: {
    types: schema.types, 
  },
  plugins: [
structureTool({
  defaultDocumentNode: (S, { schemaType }) => {
    // Check if the current document type is in our allowed list
    if (['page'].includes(schemaType)) {
      return S.document().views([
        S.view.form(),
        S.view
          .component(Iframe)
          .options({
            url: {
              origin: 'same-origin',
              previewMode: { enable: '/api/draft' },
            },
          })
          .title('Preview'),
      ]);
    }
    return S.document().views([S.view.form()]);
  },
}),
    // 2. Use the widget functions inside the array
    dashboardTool({
      widgets: [
        projectInfoWidget({
          layout: { width: 'medium' }
        }),
        projectUsersWidget({
          layout: { width: 'small' }
        })
      ]
    }),

    presentationTool({
      previewUrl: {
        origin: typeof window !== 'undefined' && window.location.hostname === 'localhost' 
          ? devUrl 
          : prodUrl,
        previewMode: { enable: '/api/draft' },
      },
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})