import { schema } from 'nexus'

schema.extendType({
  type: 'Query',
  definition(t) {
    t.crud.contact()
    t.crud.contacts()
  },
})
