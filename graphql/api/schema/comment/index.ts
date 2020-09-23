import { schema } from 'nexus'

schema.objectType({
  name: 'Comment',
  definition(t) {
    t.model.id()
    t.model.users()
    t.model.task()
    t.model.timestamp()
    t.model.image()
    t.model.message()
  },
})

schema.objectType({
  name: 'CommentOnUser',
  definition(t) {
    t.model.cretedAt()
    t.model.user()
    t.model.comment()
  },
})
