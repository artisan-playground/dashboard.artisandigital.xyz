import { schema } from 'nexus'

schema.extendType({
  type: 'Query',
  definition: (t) => {
    t.field('getUser', {
      type: 'User',
      args: { id: schema.intArg({ required: true }) },
      resolve: (_, args, ctx) => {
        return ctx.db.user.findOne({ where: { id: args.id } }) || null
      },
    })
  },
})

schema.extendType({
  type: 'Query',
  definition(t) {
    t.list.field('getUsers', {
      type: 'User',
      resolve: (_, args, ctx) => {
        return ctx.db.user.findMany()
      },
    })
  },
})
