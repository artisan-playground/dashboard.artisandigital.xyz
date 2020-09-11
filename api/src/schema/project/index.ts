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
    t.model.id()
    t.model.projectName()
    t.model.projectType()
    t.model.projectDetail()
    t.model.projectImage()
    t.model.status()
    t.model.dueDate()
    t.model.memberIds()
  },
})
