import { schema } from 'nexus'

schema.extendType({
  type: 'Query',
  definition: (t) => {
    t.list.field('getTeamByProjectId', {
      type: 'Team',
      args: { projectId: schema.stringArg({ required: true }) },
      resolve: (_root, args, ctx) => {
        return ctx.db.projects
          .map((item) => item.id === args.projectId && item.team)
          .filter((x) => x)
          .flat()
      },
    })
  },
})

schema.extendType({
  type: 'Query',
  definition(t) {
    t.list.field('getTeams', {
      type: 'Team',
      resolve(_, _args, ctx) {
        return ctx.db.projects
      },
    })
  },
})
