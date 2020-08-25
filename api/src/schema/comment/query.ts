import { schema } from 'nexus'

schema.extendType({
  type: 'Query',
  definition: (t) => {
    t.list.field('getCommentWhereByProjectId', {
      type: 'Comment',
      args: { projectId: schema.stringArg({ required: true }) },
      resolve: (_, args, ctx) => {
        return ctx.db.tasks.filter((f) => f.projectId === args.projectId) || null
      },
    })
  },
})
