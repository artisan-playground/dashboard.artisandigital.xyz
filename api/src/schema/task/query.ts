import { schema } from 'nexus'

schema.extendType({
  type: 'Query',
  definition: (t) => {
    t.field('getTask', {
      type: 'Task',
      args: { id: schema.stringArg({ required: true }) },
      resolve: (_, args, ctx) => {
        return ctx.db.tasks.find((p) => p.id === args.id) || null
      },
    })
  },
})

schema.extendType({
  type: 'Query',
  definition(t) {
    t.list.field('getTasks', {
      type: 'Task',
      resolve(_, _args, ctx) {
        return ctx.db.tasks
      },
    })
  },
})
