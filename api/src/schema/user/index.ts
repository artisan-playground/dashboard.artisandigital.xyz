import { schema } from 'nexus'
import { Project } from '../project'

export interface User {
  id: string
  name: string
  email: string
  image: string
  skill?: []
  contacts?: []
  projects?: Project[]
  task?: []
}

schema.objectType({
  name: 'User',
  definition(t) {
    t.string('id')
    t.string('name')
    t.string('email')
    t.string('image')
    t.list.field('projects', {
      type: 'Project',
    })
  },
})
