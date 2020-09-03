import { schema } from 'nexus'

schema.extendType({
  type: 'Query',
  definition: (t) => {
    t.list.field('getContact', {
      type: 'Contact',
      args: { id: schema.stringArg({ required: true }) },
      resolve: (_root, args, ctx) => {
        return ctx.db.users
          .map((item) => item.id === args.id && item.contacts)
          .filter((x) => x)
          .flat()
      },
    })
  },
})

schema.extendType({
  type: 'Query',
  definition(t) {
    t.list.field('getContacts', {
      type: 'Contact',
      resolve(_, _args, ctx) {
        return ctx.db.users
          .map((item) => item.contacts)
          .filter((x) => x)
          .flat()
      },
    })
  },
})
