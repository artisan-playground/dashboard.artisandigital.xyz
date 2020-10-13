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