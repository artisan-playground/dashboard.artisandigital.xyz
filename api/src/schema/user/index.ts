import { schema } from 'nexus'
import { Contact } from '../contact'

export interface User {
  id: string
  name: string
  email: string
  image?: string
  position: string
  skills?: String[]
  contacts?: Contact[]
  projectIds?: String[]
  taskIds?: String[]
}

schema.objectType({
  name: 'User',
  definition(t) {
    t.model.id()
    t.model.email()
    t.model.name()
    t.model.image()
    t.model.position()
    t.model.skills()
    t.model.contacts()
    t.model.projectIds()
    t.model.taskIds()
  },
})