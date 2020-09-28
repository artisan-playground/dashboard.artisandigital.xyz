import { schema } from 'nexus'

schema.extendType({
  type: 'Query',
  definition(t) {
    t.crud.task()
    t.crud.tasks()
  },
})

schema.extendType({
  type: 'Query',
  definition: (t) => {
    t.list.field('getTaskByProjectId', {
      type: 'Task',
      args: { id: schema.intArg({ required: true }) },
      resolve: (_, args, ctx): any =>
        ctx.db.task.findMany({ where: { projectId: args.id } }),
    })
  },
})
