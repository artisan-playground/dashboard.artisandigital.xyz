import { schema } from 'nexus'

schema.inputObjectType({
  name: 'CreateUserInput',
  definition(t) {
    t.string('email', { required: true })
    t.string('name', { required: true })
    t.string('image', { required: false })
    t.string('position', { required: true })
  },
})

schema.inputObjectType({
  name: 'EditUserInput',
  definition(t) {
    t.int('id', { required: true })
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
        return ctx.db.user.create({ data: args.input! })
      },
    })
  },
})

schema.extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('updateUser', {
      type: 'User',
      args: { input: 'EditUserInput', id: schema.intArg({ required: true }) },
      resolve: (_, args, ctx) => {
        return ctx.db.user.update({ where: { id: args.id }, data: args.input! })
      },
    })
  },
})
