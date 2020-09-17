import { schema } from 'nexus'

schema.extendType({
  type: 'Query',
  definition: (t) => {
    t.field('getComment', {
      type: 'Comment',
      args: { id: schema.intArg({ required: true }) },
      resolve: (_, args, ctx) => {
        return ctx.db.comment.findOne({ where: { id: args.id } }) || null
      },
    })
  },
})
