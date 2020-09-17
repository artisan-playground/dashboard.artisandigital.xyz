import { schema } from 'nexus'

schema.inputObjectType({
  name: 'CreateTaskInput',
  definition(t) {
    t.string('taskName', { required: true })
    t.string('taskDetail', { required: true })
    t.date('startTime', { required: true })
    t.date('endTime', { required: true })
    t.boolean('isDone', { required: true })
  },
})

schema.inputObjectType({
  name: 'EditTaskInput',
  definition(t) {
    t.int('id', { required: true })
    t.string('taskName', { required: true })
    t.string('taskDetail', { required: false })
    t.date('startTime', { required: false })
    t.date('endTime', { required: true })
    t.boolean('isDone', { required: true })
  },
})

schema.extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('createTask', {
      type: 'Task',
      args: { input: 'CreateTaskInput' },
      resolve: (_, args, ctx) => {
        return ctx.db.task.create({ data: args.input! })
      },
    })
  },
})

schema.extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('deleteTask', {
      type: 'Task',
      args: { id: schema.intArg({ required: true }) },
      resolve: (_, args, ctx): any => {
        return ctx.db.task.delete({ where: { id: args.id } })
      },
    })
  },
})

schema.extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('toggleIsDone', {
      type: 'Task',
      args: { input: 'EditTaskInput', id: schema.intArg({ required: true }) },
      resolve: (_, args, ctx): any => {
        return ctx.db.task.update({ where: { id: args.id }, data: args.input! })
      },
    })
  },
})
