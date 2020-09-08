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
    t.string('id')
    t.string('email')
    t.string('name')
    t.string('image')
    t.string('position')
    t.list.string('skills')
    t.list.field('contacts', {
      type: 'Contact',
    })
    t.list.field('projectIds', {
      type: 'Project',
      resolve: (_root, args, ctx): any => {
        return ctx.db.projects.filter((p) => _root.projectIds.includes(p.id))
      },
    })
    t.list.field('taskIds', {
      type: 'Task',
      resolve: (_root, args, ctx): any => {
        return ctx.db.tasks.filter((t) => _root.taskIds.includes(t.id))
      },
    })
  },
})