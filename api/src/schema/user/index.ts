import { schema } from 'nexus'
import { Project } from '../project'

export interface User {
  id: string
  name: string
  projects: Project
}

schema.objectType({
  name: 'User',
  definition(t) {
    t.string('id')
    t.string('name')
    t.list.field('projects', {
      type: 'Project',
      nullable: true,
      resolve(_root, args, ctx) {
        return ctx.db.projects.team.filter((item) => item.includes(args.id))
      },
    })
  },
})
