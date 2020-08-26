import { schema } from 'nexus'

schema.extendType({
  type: 'Query',
  definition: (t) => {
    t.field('getTeam', {
      type: 'Team',
      args: { id: schema.stringArg({ required: true }) },
      resolve: (_, args, ctx): any => {
        const team = ctx.db.projects.map((p) => p.team?.filter((i) => i.id === args.id)) || []
        return team
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
