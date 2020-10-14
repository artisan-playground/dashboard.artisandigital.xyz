import { schema } from 'nexus'

schema.extendType({
  type: 'Query',
  definition(t) {
    t.crud.event()
    t.crud.events()
  },
})
