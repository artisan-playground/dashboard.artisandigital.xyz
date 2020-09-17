import { schema } from 'nexus'

schema.inputObjectType({
  name: 'CreateFileInput',
  definition(t) {
    t.string('url', { required: true })
    t.string('name', { required: true })
    t.string('status', { required: true })
  },
})

schema.extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('createFile', {
      type: 'File',
      args: { input: 'CreateFileInput' },
      resolve: (_root, args, ctx) => {
        return ctx.db.file.create({ data: args.input })
      },
    })
  },
})

schema.extendType({
  type: 'Mutation',
  definition: (t) => {
    t.list.field('deleteFile', {
      type: 'File',
      args: { id: schema.intArg({ required: true }) },
      resolve: (_root, args, ctx) => {
        return ctx.db.file.delete({ where: { id: args.id } })
      },
    })
  },
})
