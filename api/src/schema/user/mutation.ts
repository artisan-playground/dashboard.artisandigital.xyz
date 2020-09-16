import { schema } from 'nexus'

schema.inputObjectType({
  name: 'CreateUserInput',
  definition(t) {
    t.string('email', { required: true })
    t.string('name', { required: true })
    t.string('image', { required: true })
    t.string('position', { required: true })
  },
})

schema.extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('createUser', {
      type: 'User',
      args: { input: 'CreateUserInput' },
      resolve: (_, args, ctx) => {
        return ctx.db.user.create(args.input)
      },
    })
  },
})

schema.extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('updateUser', {
      type: 'User',
      args: { id: schema.intArg({ required: true }) },
      resolve: (_, args, ctx) => {
        return ctx.db.user.update(args.id)
      },
    })
  },
})
