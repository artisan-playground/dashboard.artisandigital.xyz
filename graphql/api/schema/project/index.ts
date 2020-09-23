import { schema } from 'nexus'

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
    t.model.members()
    t.model.tasks()
  },
})

schema.objectType({
  name: 'ProjectOnUser',
  definition(t) {
    t.model.createdAt()
    t.model.user()
    t.model.project()
  },
})
