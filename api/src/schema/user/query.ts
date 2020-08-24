import { schema } from 'nexus'

schema.extendType({
  type: 'Query',
  definition: (t) => {
    t.field('getUser', {
      type: 'User',
      args: { id: schema.stringArg({ required: true }) },
      resolve(_, args, ctx) {
        return ctx.db.users.find((u) => u.id === args.id) || null
      },
    })
  },
})

schema.extendType({
  type: 'Query',
  definition(t) {
    t.list.field('getUsers', {
      type: 'User',
      resolve(_, _args, ctx) {
        return ctx.db.users
      },
    })
  },
})
