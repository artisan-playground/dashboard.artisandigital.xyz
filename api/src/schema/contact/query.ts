import { schema } from 'nexus'

schema.extendType({
  type: 'Query',
  definition: (t) => {
    t.field('getContact', {
      type: 'Contact',
      args: { id: schema.stringArg({ required: true }) },
      resolve: (_, args, ctx): any => {
        const contact = ctx.db.users.map((p) => p.contacts?.filter((i) => i.id === args.id)) || []
        return contact
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
      },
    })
  },
})
