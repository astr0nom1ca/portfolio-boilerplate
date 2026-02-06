'use client'

/**
 * This configuration is used for the Sanity Studio mounted on the `\app\studio\[[...tool]]\page.tsx` route
 */
import { presentationTool } from 'sanity/presentation'
import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from './sanity/env'
import { schema } from './sanity/schemaTypes' // This usually exports { types: [...] }
import { structure } from './sanity/structure'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  // Ensure we are passing the 'types' array specifically
  schema: {
    types: schema.types, 
  },
  plugins: [
    // Passes our custom Singleton structure logic
    structureTool({ structure }),
    
    presentationTool({
      previewUrl: {
        origin: 'http://localhost:3000',
        previewMode: {
          enable: '/api/draft',
        },
      },
    }),
    
    // Vision is for querying with GROQ from inside the Studio
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})