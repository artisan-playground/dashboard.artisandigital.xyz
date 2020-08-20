import { schema } from 'nexus'

export interface Project {
  id: string
  name: string
}

schema.objectType({
  name: 'Project',
  definition(t) {
    t.string('id')
    t.string('name')
  },
})
