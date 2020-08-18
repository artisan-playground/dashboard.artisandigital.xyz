import { schema } from 'nexus'
import { Project } from '.'

schema.extendType({
  type: 'Query',
  definition: (t) => {
    t.field('project', {
      type: 'Project',
      args: { id: schema.stringArg({ required: true }) },
      resolve: (_, args, ctx) => ctx.memoryDB.projects.find((p: Project) => p.id === args.id),
    })
  },
})

schema.extendType({
  type: 'Query',
  definition(t) {
    t.list.field('projects', {
      type: 'Project',
      resolve(_, _args, ctx) {
        return ctx.memoryDB.projects
      },
    })
  },
})
