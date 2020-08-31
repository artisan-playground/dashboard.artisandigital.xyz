import { schema } from 'nexus'

schema.extendType({
  type: 'Query',
  definition: (t) => {
    t.list.field('getCommentByProjectId', {
      type: 'Comment',
      args: { projectId: schema.stringArg({ required: true }) },
      resolve: (_, args, ctx) => {
        return ctx.db.tasks.find((f) => f.projectId === args.projectId) || null
      },
    })
  },
})
