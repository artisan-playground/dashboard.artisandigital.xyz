import { schema } from 'nexus'

schema.extendType({
  type: 'Query',
  definition: (t) => {
    t.list.field('getProject', {
      type: 'Project',
      args: { id: schema.stringArg({ required: true }) },
      resolve: (_, args, ctx) => {
        return ctx.db.projects.filter((p) => p.id === args.id) || []
      },
    })
  },
})

schema.extendType({
  type: 'Query',
  definition(t) {
    t.list.field('getProjects', {
      type: 'Project',
      resolve(_, _args, ctx) {
        return ctx.db.projects
      },
    })
  },
})
