import { nanoid } from 'nanoid'
import { schema } from 'nexus'
import { Task } from '.'

const InputTaskType = schema.inputObjectType({
  name: 'CreateTaskInput',
  definition(t) {
    t.string('taskName', { required: true })
  },
})

schema.extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('createTask', {
      type: 'Task',
      args: { input: InputTaskType },
      resolve: (_, args, ctx) => {
        const task: Task = {
          id: nanoid(),
          taskName: args.input?.taskName || '',
        }
        return task
      },
    })
  },
})
