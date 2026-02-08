'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { presentationTool } from 'sanity/presentation'
// 1. Import the widget creators directly from the dashboard package
import { dashboardTool, projectInfoWidget, projectUsersWidget } from '@sanity/dashboard'

import { apiVersion, dataset, projectId } from './sanity/env'
import { schema } from './sanity/schemaTypes' 
import { structure } from './sanity/structure'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema: {
    types: schema.types, 
  },
  plugins: [
    structureTool({ structure }),
    
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
        origin: 'http://localhost:3000',
        previewMode: { enable: '/api/draft' },
      },
    }),
    
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})