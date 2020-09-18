import { schema } from 'nexus'

schema.objectType({
  name: 'Comment',
  definition(t) {
    t.model.id()
    t.model.timestamp()
    t.model.userId()
    t.model.image()
    t.model.userImg()
    t.model.userName()
    t.model.message()
    t.model.taskId()
  },
})
