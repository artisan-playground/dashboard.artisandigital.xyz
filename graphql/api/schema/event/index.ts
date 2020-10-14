import { schema } from 'nexus'

schema.objectType({
  name: 'Event',
  definition(t) {
    t.model.id()
    t.model.eventName()
    t.model.eventDate()
    t.model.endDate()
    t.model.note()
    t.model.tag()
    t.model.invited()
  },
})
