import { schema } from 'nexus'

schema.extendType({
  type: 'Query',
  definition: (t) => {
    t.field('getTaskById', {
      type: 'Task',
      args: { id: schema.intArg({ required: true }) },
      resolve: (_, args, ctx) => {
        return ctx.db.task.findOne({ where: { id: args.id } }) || null
      },
    })
  },
})

schema.extendType({
  type: 'Query',
  definition(t) {
    t.list.field('getAllTasks', {
      type: 'Task',
      resolve: (_, args, ctx) => {
        return ctx.db.task.findMany()
      },
    })
  },
})
