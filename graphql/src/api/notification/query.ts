import { extendType, intArg } from '@nexus/schema'

const notificationQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('notification', {
      type: 'Notification',
      args: { id: intArg({ required: true }) },
      resolve: (_, args, ctx) => {
        return ctx.prisma.notification.findOne({ where: { id: args.id } })
      },
    })

    t.crud.notifications({
      type: 'Notification',
      resolve: (_, args, ctx) => {
        return ctx.prisma.notification.findMany()
      },
    })
  },
})

export { notificationQuery }
