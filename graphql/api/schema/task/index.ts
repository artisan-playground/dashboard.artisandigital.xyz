import { schema } from 'nexus'

schema.objectType({
  name: 'Task',
  definition(t) {
    t.model.id()
    t.model.project()
    t.model.taskName()
    t.model.startTime()
    t.model.endTime()
    t.model.taskDetail()
    t.model.isDone()
    t.model.members()
    t.model.comments()
    t.model.files()
  },
})

schema.objectType({
  name: 'TaskOnUser',
  definition(t) {
    t.model.cretedAt()
    t.model.user()
    t.model.task()
  },
})

schema.objectType({
  name: 'FileOnTask',
  definition(t) {
    t.model.cretedAt()
    t.model.task()
    t.model.file()
  },
})

schema.objectType({
  name: 'CommentOnTask',
  definition(t) {
    t.model.cretedAt()
    t.model.task()
    t.model.comment()
  },
})