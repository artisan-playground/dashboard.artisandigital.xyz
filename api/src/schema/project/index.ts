import { schema } from 'nexus'

export interface Project {
  id: string
  projectName: string
  projectType: string
  projectDetail: string
  projectImage?: string
  status: string
  dueDate: Date
  memberIds?: String[]
}

schema.objectType({
  name: 'Project',
  definition(t) {
    t.string('id')
    t.string('projectName')
    t.string('projectType')
    t.string('projectDetail')
    t.string('status')
    t.date('dueDate')
    t.list.field('memberIds', {
      type: 'User',
      resolve: (_root, args, ctx): any => {
        return ctx.db.users.filter((u) => _root.memberIds.includes(u.id))
      },
    })
  },
})
