import { extendType } from '@nexus/schema'

const notificationMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneNotification()
    t.crud.createOneNotification()
    t.crud.updateOneNotification()
  },
})

export { notificationMutation }
