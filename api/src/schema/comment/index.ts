import { schema } from 'nexus'

export interface Comment {
  id: string
  timestamp: Date
  userId: string
  image: string
  userImg: string
  userName: string
  message: string
  taskId: string
}

schema.objectType({
  name: 'Comment',
  definition(t) {
    t.string('id')
    t.date('timestamp')
    t.string('userId')
    t.string('image')
    t.string('userImg')
    t.string('userName')
    t.string('message')
    t.string('taskId')
  },
})
