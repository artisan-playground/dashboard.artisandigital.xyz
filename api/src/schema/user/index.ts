import { schema } from 'nexus'
import { Project } from '../project'
import { Task } from '../task'
import { Contact } from '../contact'

export interface User {
  id: string
  name: string
  email: string
  image?: string
  position: string
  skills?: []
  contacts?: Contact[]
  projects?: Project[]
  tasks?: Task[]
}

schema.objectType({
  name: 'User',
  definition(t) {
    t.string('id')
    t.string('email')
    t.string('name')
    t.string('image')
    t.string('position')
    t.list.string('skills')
    t.list.field('contacts', {
      type: 'Contact',
    })
    t.list.field('projects', {
      type: 'Project',
    })
    t.list.field('tasks', {
      type: 'Task',
    })
  },
})