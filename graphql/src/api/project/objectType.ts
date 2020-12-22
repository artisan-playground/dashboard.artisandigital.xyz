import { objectType } from '@nexus/schema'

const projectObjectType = objectType({
  name: 'Project',
  definition(t) {
    t.model.id()
    t.model.projectName()
    t.model.projectType()
    t.model.projectDetail()
    t.model.projectImage()
    t.model.status()
    t.model.dueDate()
    t.model.createAt()
    t.model.members()
    t.model.tasks()
  },
})

export { projectObjectType }
