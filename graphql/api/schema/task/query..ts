import { schema } from 'nexus'

schema.extendType({
  type: 'Query',
  definition(t) {
    t.crud.task()
    t.crud.tasks()
  },
})
