import { objectType } from '@nexus/schema'

const contentObjectType = objectType({
  name: 'Content',
  definition(t) {
    t.model.id()
    t.model.subject()
    t.model.content()
    t.model.contentImage()
    t.model.timestamp()
    t.model.user()
  },
})

export { contentObjectType }
