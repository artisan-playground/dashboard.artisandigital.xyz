import { nanoid } from 'nanoid'
import { schema } from 'nexus'
import { Task } from '.'

const InputTaskType = schema.inputObjectType({
  name: 'CreateTaskInput',
  definition(t) {
    t.string('taskName', { required: true })
    t.string('projectId', { required: true })
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

schema.extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('deleteTask', {
      type: 'Task',
      args: { id: schema.stringArg({ required: true }) },
      resolve: (_root, args, ctx): any => {
        let index = ctx.db.tasks.findIndex((t) => t.id === args.id)
        if (index !== -1) {
          ctx.db.tasks.splice(index, 1)
          return ctx.db.tasks
        } else {
          return new Error(`No data at id ${args.id} and index ${index}`)
        }
      },
    })
  },
})

schema.extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('toggleIsDone', {
      type: 'Task',
      args: { id: schema.stringArg({ required: true }) },
      resolve: (_root, args, ctx): any => {
        ctx.db.tasks.map((task, index) => {
          if (task.id === args.id) {
            task.isDone = !ctx.db.tasks[index].isDone
            return ctx.db.tasks
          } else {
            return new Error(`No data at id ${args.id}`)
          }
        })
      },
    })
  },
})
