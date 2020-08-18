import { schema } from 'nexus'

export interface Project {
  id: string
  name: string
}

export const Project = schema.objectType({
  name: 'Project',
  definition(t) {
    t.string('id')
    t.string('name')
  },
})
