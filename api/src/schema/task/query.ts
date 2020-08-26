import { schema } from 'nexus'

schema.extendType({
  type: 'Query',
  definition: (t) => {
    t.field('getTaskById', {
      type: 'Task',
      args: { id: schema.stringArg({ required: true }) },
      resolve: (_, args, ctx): any => {
        return ctx.db.tasks.filter((p) => p.id === args.id)
      },
    })
  },
})

schema.extendType({
  type: 'Query',
  definition(t) {
    t.list.field('getAllTasks', {
      type: 'Task',
      resolve(_, _args, ctx) {
        return ctx.db.tasks
      },
    })
  },
})
