import { schema } from 'nexus'

schema.extendType({
  type: 'Query',
  definition: (t) => {
    t.field('getFile', {
      type: 'File',
      args: { id: schema.stringArg({ required: true }) },
      resolve: (_, args, ctx) => {
        return ctx.db.tasks.find((f) => f.id === args.id) || null
      },
    })
  },
})

schema.extendType({
  type: 'Query',
  definition(t) {
    t.list.field('getFiles', {
      type: 'File',
      resolve(_, _args, ctx) {
        return ctx.db.tasks
      },
    })
  },
})