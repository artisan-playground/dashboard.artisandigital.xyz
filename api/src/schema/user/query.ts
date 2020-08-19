import { schema } from 'nexus'
import { User } from '.'

schema.extendType({
  type: 'Query',
  definition: (t) => {
    t.field('user', {
      type: 'User',
      args: { id: schema.stringArg({ required: true }) },
      resolve: (_, args, ctx) => ctx.memoryDB.users.find((u: User) => u.id === args.id),
    })
  },
})

schema.extendType({
  type: 'Query',
  definition(t) {
    t.list.field('users', {
      type: 'User',
      resolve(_, _args, ctx) {
        return ctx.memoryDB.users
      },
    })
  },
})
