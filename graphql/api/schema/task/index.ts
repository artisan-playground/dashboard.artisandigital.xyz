import { schema } from 'nexus'

schema.objectType({
  name: 'Task',
  definition(t) {
    t.model.id()
    t.model.projectId()
    t.model.taskName()
    t.model.startTime()
    t.model.endTime()
    t.model.taskDetail()
    t.model.isDone()
    t.model.members()
    t.model.files()
    t.model.comments()
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
