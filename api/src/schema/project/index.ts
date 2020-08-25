import { schema } from 'nexus'
import { Team } from '../team'

export interface Project {
  id: string
  projectName: string
  projectType: string
  projectDetail: string
  status: string
  dueDate: Date
  team: Team
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
    t.list.field('team', {
      type: 'Team',
    })
  },
})
