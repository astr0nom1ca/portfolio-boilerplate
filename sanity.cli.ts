/**
* This configuration file lets you run `$ sanity [command]` in this folder
* Go to https://www.sanity.io/docs/cli to learn more.
**/
import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || '5ev142c0',
    dataset: process.env.SANITY_STUDIO_DATASET || 'production', 
  },
    deployment: {
    appId: 'd5c4z8uxv9fe0y7yr29ncxt4',
  },
})