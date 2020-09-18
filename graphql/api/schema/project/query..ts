import { schema } from 'nexus'

schema.extendType({
  type: 'Query',
  definition(t) {
    t.crud.project()
    t.crud.projects()
  },
})
