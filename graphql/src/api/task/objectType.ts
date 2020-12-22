import { objectType } from '@nexus/schema'

const taskObjectType = objectType({
  name: 'Task',
  definition(t) {
    t.model.id()
    t.model.project()
    t.model.taskName()
    t.model.taskType()
    t.model.taskDetail()
    t.model.startTime()
    t.model.endTime()
    t.model.isDone()
    t.model.members()
    t.model.comments()
    t.model.files()
  },
})

export { taskObjectType }
