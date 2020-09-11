import { schema } from 'nexus'
import { Comment } from '../comment'
import { File } from '../file'

export interface Task {
  id: string
  projectId: string
  taskName: string
  startTime: Date
  endTime: Date
  taskDetail: string
  isDone: boolean
  memberIds?: String[]
  files?: File[]
  comments?: Comment[]
}

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
