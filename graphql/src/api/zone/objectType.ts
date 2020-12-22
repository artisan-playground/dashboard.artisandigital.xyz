import { objectType } from '@nexus/schema'

const zoneObjectType = objectType({
  name: 'Zone',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.longitude()
    t.model.latitude()
    t.model.timestamp()
    t.model.radius()
  },
})

export { zoneObjectType }
