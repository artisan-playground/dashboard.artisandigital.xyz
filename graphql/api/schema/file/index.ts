import { schema } from 'nexus'

schema.objectType({
  name: 'File',
  definition(t) {
    t.model.id()
    t.model.url()
    t.model.name()
    t.model.status()
    t.model.task()
  },
})