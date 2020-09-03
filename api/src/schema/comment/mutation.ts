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
        // ctx.db.comment.create({ data: comment })
        return comment
      },
    })
  },
})

schema.extendType({
  type: 'Mutation',
  definition: (t) => {
    t.list.field('deleteComment', {
      type: 'Comment',
      args: {
        commentId: schema.stringArg({ required: true }),
        taskId: schema.stringArg({ required: true }),
      },
      resolve: (_root, args, ctx): any => {
        let taskIndex = ctx.db.tasks.map((t) => t.id).indexOf(args.taskId)
        let commentIndex = ctx.db.tasks[taskIndex].comments
          .map((c: any) => c.id)
          .indexOf(args.commentId)
        if (commentIndex !== -1 && taskIndex !== -1) {
          ctx.db.tasks[taskIndex].comments.splice(commentIndex, 1)
          return ctx.db.tasks[taskIndex].comments
        } else {
          return new Error(`No data at comment id ${args.commentId} and project id ${args.taskId}`)
        }
      },
    })
  },
})
