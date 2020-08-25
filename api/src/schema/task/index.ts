import { schema } from 'nexus'
import { Comment } from '../comment'
import { File } from '../file'
import { Team } from '../team'

export interface Task {
  id: string
  projectId: string
  taskName: string
  time: Date
  taskDetail: string
  isDone: boolean
  team: Team
  files: File
  comments: Comment
}

schema.objectType({
  name: 'Task',
  definition(t) {
    t.string('id', { nullable: false })
    t.string('projectId', { nullable: false })
    t.string('taskName')
    t.date('time')
    t.string('taskDetail')
    t.boolean('isDone')
    t.list.field('team', {
      type: 'Team',
    })
    t.list.field('files', {
      type: 'File',
    })
    t.list.field('comments', {
      type: 'Comment',
    })
  },
})
