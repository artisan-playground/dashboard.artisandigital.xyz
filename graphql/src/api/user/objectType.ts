import { objectType } from '@nexus/schema'

const userObjectType = objectType({
  name: 'User',
  definition(t) {
    t.model.id()
    t.model.email()
    t.model.name()
    t.model.image()
    t.model.position()
    t.model.department()
    t.model.type()
    t.model.phone()
    t.model.projects()
    t.model.comments()
    t.model.event()
    t.model.tasks()
    t.model.startDate()
    t.model.dueDate()
    t.model.notifications()
    t.model.contents()
    t.model.role()
  },
})

export { userObjectType }
