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
