import { nanoid } from 'nanoid'
import { schema } from 'nexus'
import { Task } from '.'

const InputTaskType = schema.inputObjectType({
  name: 'CreateTaskInput',
  definition(t) {
    t.string('taskName', { required: true })
    t.string('projectId', { required: true })
    t.string('taskDetail', { required: false })
    t.string('taskDetail', { required: false })
  },
})

schema.extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('createTask', {
      type: 'Task',
      args: { input: InputTaskType },
      resolve: (_root, args, ctx) => {
        const task: Task = {
          id: nanoid(),
          taskName: args.input?.taskName || '',
          projectId: args.input?.projectId || '',
          time: new Date(),
          taskDetail: args.input?.taskDetail || '',
          isDone: false,
        }
        ctx.db.tasks.push(task)
        return task
      },
    })
  },
})
