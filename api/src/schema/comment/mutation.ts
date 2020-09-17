import { schema } from 'nexus'

schema.inputObjectType({
  name: 'CreateCommentInput',
  definition(t) {
    t.string('userId', { required: true })
    t.string('userImg', { required: true })
    t.string('userName', { required: true })
    t.string('message', { required: true })
    t.string('taskId', { required: true })
  },
})

schema.inputObjectType({
  name: 'EditCommentInput',
  definition(t) {
    t.int('id', { required: true })
    t.string('userId', { required: true })
    t.string('message', { required: true })
    t.string('taskId', { required: true })
  },
})

schema.extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('createComment', {
      type: 'Comment',
      args: { input: 'CreateCommentInput' },
      resolve: (_, args, ctx) => {
        return ctx.db.comment.create({ data: args.input! })
      },
    })
  },
})

schema.extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('editComment', {
      type: 'Comment',
      args: { input: 'EditCommentInput', id: schema.intArg({ required: true }) },
      resolve: (_, args, ctx) => {
        return ctx.db.comment.update({ where: { id: args.id }, data: args.input! })
      },
    })
  },
})

schema.extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('deleteComment', {
      type: 'Comment',
      args: { id: schema.intArg({ required: true }) },
      resolve: (_, args, ctx) => {
        return ctx.db.comment.delete({ where: { id: args.id } })
      },
    })
  },
})
