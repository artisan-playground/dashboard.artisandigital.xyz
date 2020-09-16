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
    t.model.memberIds()
    t.model.files()
    t.model.comments()
  },
})
