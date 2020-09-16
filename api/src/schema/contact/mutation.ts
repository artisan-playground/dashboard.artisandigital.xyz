import { schema } from 'nexus'

schema.inputObjectType({
  name: 'CreateContactInput',
  definition(t) {
    t.string('facebook', { required: true })
    t.string('twitter', { required: true })
    t.string('instagram', { required: true })
    t.string('gitlab', { required: true })
    t.string('github', { required: true })
  },
})

schema.extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('createContact', {
      type: 'Contact',
      args: { input: 'CreateContactInput' },
      resolve: (_, args, ctx) => {
        return ctx.db.contact.create(args.input)
      },
    })
  },
})

schema.extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('editContact', {
      type: 'Contact',
      args: { id: schema.intArg({ required: true }) },
      resolve: (_, args, ctx) => {
        return ctx.db.contact.update(args.id)
      },
    })
  },
})
