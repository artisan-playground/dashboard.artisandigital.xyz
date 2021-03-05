import { objectType } from '@nexus/schema'

const formObjectType = objectType({
  name: 'Form',
  definition(t) {
    t.model.id()
    t.model.firstName()
    t.model.lastName()
    t.model.email()
    t.model.phone()
    t.model.position()
    t.model.leaveStart()
    t.model.leaveEnd()
    t.model.leaveType()
    t.model.leaveDetail()
    t.model.createdAt()
  },
})

export { formObjectType }
