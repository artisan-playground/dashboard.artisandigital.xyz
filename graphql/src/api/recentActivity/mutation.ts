import { extendType } from '@nexus/schema'

const recentActivityMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneRecentActivity()
    t.crud.deleteOneRecentActivity()
    t.crud.updateOneRecentActivity()
  },
})

export { recentActivityMutation }
