import { nanoid } from 'nanoid'
import { schema } from 'nexus'
import { Comment } from '.'

const InputComment = schema.inputObjectType({
  name: 'CreateCommentInput',
  definition(t) {
    t.string('userId', { required: true })
    t.string('userImg', { required: true })
    t.string('userName', { required: true })
    t.string('message', { required: true })
    t.string('taskId', { required: true })
  },
})

schema.extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('createComment', {
      type: 'Comment',
      args: { input: InputComment },
      resolve: (_root, args, ctx) => {
        const comment: Comment = {
          id: nanoid(),
          timestamp: new Date(),
          userId: args.input?.userId || '',
          userImg: args.input?.userImg || '',
          userName: args.input?.userName || '',
          image: '',
          message: args.input?.message || '',
          taskId: args.input?.taskId || '',
        }
        ctx.db.tasks.find((t) => t.id === args.input?.taskId).comments.push(comment)
        return comment
      },
    })
  },
})
