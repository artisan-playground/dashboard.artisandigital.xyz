import { schema } from 'nexus'

schema.extendType({
  type: 'Query',
  definition: (t) => {
    t.field('getFile', {
      type: 'File',
      args: { id: schema.intArg({ required: true }) },
      resolve: (_, args, ctx): any => {
        return ctx.db.file.findOne({ where: { id: args.id } }) || null
      },
    })
  },
})

schema.extendType({
  type: 'Query',
  definition(t) {
    t.list.field('getFiles', {
      type: 'File',
      resolve: (_, args, ctx) => {
        return ctx.db.file.findMany()
      },
    })
  },
})
