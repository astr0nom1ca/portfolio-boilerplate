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
    // Determine the base URL (matching your presentationTool logic)
    const remoteUrl = 'https://portfolio-boilerplate.vercel.app';
    const localUrl = 'http://localhost:3000';
    const baseUrl = typeof window !== 'undefined' && window.location.hostname === 'localhost' 
      ? localUrl 
      : remoteUrl;

    if (['page'].includes(schemaType)) {
      return S.document().views([
        S.view.form(),
        S.view
          .component(Iframe)
          .options({
            url: (doc: any) => {
              // If it's the home page, slug might be empty. 
              // This logic ensures it always points to a real route.
              const slug = doc?.slug?.current === 'index' ? '' : doc?.slug?.current || '';
              const remoteUrl = 'https://portfolio-boilerplate.vercel.app';
              const localUrl = 'http://localhost:3000';
              const baseUrl = typeof window !== 'undefined' && window.location.hostname === 'localhost' 
                ? localUrl 
                : remoteUrl;

              return `${baseUrl}/api/draft?slug=${slug}`;
            },
            reload: { button: true },
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