import { objectType } from '@nexus/schema'

const recentActivityObjectType = objectType({
  name: 'RecentActivity',
  definition(t) {
    t.model.id()
    t.model.message()
    t.model.timestamp()
    t.model.user()
  },
})

export { recentActivityObjectType }
