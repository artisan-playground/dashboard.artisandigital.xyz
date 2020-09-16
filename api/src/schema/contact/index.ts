import { schema } from 'nexus'

schema.objectType({
  name: 'Contact',
  definition(t) {
    t.model.id()
    t.model.facebook()
    t.model.twitter()
    t.model.instagram()
    t.model.gitlab()
    t.model.github()
  },
})
