import { objectType } from '@nexus/schema'

const notificationObjectType = objectType({
  name: 'Notification',
  definition(t) {
    t.model.id()
    t.model.message()
    t.model.timestamp()
    t.model.receiver()
    t.model.type()
    t.model.sender()
  },
})

export { notificationObjectType }
