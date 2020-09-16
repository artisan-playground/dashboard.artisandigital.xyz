import { schema } from 'nexus'

schema.objectType({
  name: 'User',
  definition(t) {
    t.model.id()
    t.model.email()
    t.model.name()
    t.model.image()
    t.model.position()
    t.model.skills()
    t.model.contacts()
    t.model.projectIds()
    t.model.taskIds()
  },
})