import { schema } from 'nexus'

schema.objectType({
  name: 'Comment',
  definition(t) {
    t.model.id()
    t.model.user()
    t.model.task()
    t.model.timestamp()
    t.model.image()
    t.model.message()
  },
})
