import { schema } from 'nexus'

schema.extendType({
  type: 'Query',
  definition: (t) => {
    t.list.field('getComment', {
      type: 'Comment',
      args: { id: schema.intArg({ required: true }) },
      resolve: (_root, args, ctx) => {
        return ctx.db.comment.findOne({ where: { id: args.id } }) || null
      },
    })
  },
})
