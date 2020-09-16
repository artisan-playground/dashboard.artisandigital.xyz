import { schema } from 'nexus'

schema.extendType({
  type: 'Query',
  definition: (t) => {
    t.list.field('getContact', {
      type: 'Contact',
      args: { id: schema.intArg({ required: true }) },
      resolve: (_root, args, ctx) => {
        return ctx.db.contact.findOne({ where: { id: args.id } }) || null
      },
    })
  },
})

schema.extendType({
  type: 'Query',
  definition(t) {
    t.list.field('getContacts', {
      type: 'Contact',
      resolve(_, args, ctx) {
        return ctx.db.contact
      },
    })
  },
})
