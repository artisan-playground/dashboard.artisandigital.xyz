import { schema } from 'nexus'

export interface Task {
  id: string
  taskName: string
}

schema.objectType({
  name: 'Task',
  definition(t) {
    t.string('id')
    t.string('taskName')
  },
})
