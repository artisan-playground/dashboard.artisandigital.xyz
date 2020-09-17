import { schema } from 'nexus'

schema.extendType({
  type: 'Query',
  definition: (t) => {
    t.field('getProject', {
      type: 'Project',
      args: { id: schema.intArg({ required: true }) },
      resolve: (_, args, ctx) => {
        return ctx.db.project.findOne({ where: { id: args.id } }) || null
      },
    })
  },
})

schema.extendType({
  type: 'Query',
  definition(t) {
    t.list.field('getProjects', {
      type: 'Project',
      resolve: (_, args, ctx) => {
        return ctx.db.project.findMany()
      },
    })
  },
})
