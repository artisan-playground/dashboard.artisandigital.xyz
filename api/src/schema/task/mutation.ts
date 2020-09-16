import { schema } from 'nexus'

schema.inputObjectType({
  name: 'CreateTaskInput',
  definition(t) {
    t.string('projectId', { required: true })
    t.string('taskName', { required: true })
    t.string('taskDetail', { required: false })
    t.date('startTime', { required: false })
    t.date('endTime', { required: false })
    t.list.string('memberIds')
  },
})

schema.extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('createTask', {
      type: 'Task',
      args: { input: 'CreateTaskInput' },
      resolve: (_root, args, ctx) => {
        return ctx.db.task.create(args.input)
      },
    })
  },
})

schema.extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('deleteTask', {
      type: 'Task',
      args: { id: schema.intArg({ required: true }) },
      resolve: (_root, args, ctx): any => {
        return ctx.db.task.delete(args.id)
      },
    })
  },
})

schema.extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('toggleIsDone', {
      type: 'Task',
      args: { id: schema.intArg({ required: true }) },
      resolve: (_root, args, ctx): any => {
        return ctx.db.task.update(args.id)
      },
    })
  },
})
