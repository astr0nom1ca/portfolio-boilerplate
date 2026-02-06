import { type SchemaTypeDefinition } from 'sanity'
import project from './projects'
import header from './header'
import about from './about'
import skills from './skills'
import services from './services'
import contact from './contact'
import hero from './hero'
import page from './page'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [page, project, header, about, skills, services, contact, hero],
}
