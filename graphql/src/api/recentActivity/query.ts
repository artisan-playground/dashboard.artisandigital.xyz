import { extendType, intArg } from '@nexus/schema'

const recentActivityQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('getRecentActivityById', {
      type: 'RecentActivity',
      args: { id: intArg({ required: true }) },
      resolve: (_, args, ctx) => {
        return ctx.prisma.recentActivity.findOne({ where: { id: args.id } })
      },
    })

    t.crud.recentActivities({
      type: 'RecentActivity',
      resolve: (_, args, ctx) => {
        return ctx.prisma.recentActivity.findMany()
      },
    })

    t.list.field('getRecentActivityByProjectId', {
      type: 'RecentActivity',
      args: { id: intArg({ required: true }) },
      resolve: (_, args, ctx): any =>
        ctx.prisma.recentActivity.findMany({ where: { projectId: args.id } }),
    })
  },
})

export { recentActivityQuery }
