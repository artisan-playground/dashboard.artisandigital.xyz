import { schema } from 'nexus'

schema.inputObjectType({
  name: 'CreateProjectInput',
  definition(t) {
    t.string('projectName', { required: true })
    t.string('projectType', { required: true })
    t.string('projectDetail', { required: true })
    t.string('projectImage', { required: true })
    t.date('dueDate', { required: true })
  },
})

schema.inputObjectType({
  name: 'EditProjectInput',
  definition(t) {
    t.int('id', { required: true })
    t.string('projectName', { required: true })
    t.string('projectType', { required: true })
    t.string('projectDetail', { required: true })
    t.string('projectImage', { required: true })
    t.string('status', { required: true })
    t.date('dueDate', { required: true })
  },
})

schema.extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('createProject', {
      type: 'Project',
      args: { input: 'CreateProjectInput' },
      resolve: (_, args, ctx) => {
        return ctx.db.project.create({ data: args.input! })
      },
    })
  },
})

schema.extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('editProject', {
      type: 'Project',
      args: { input: 'EditProjectInput', id: schema.intArg({ required: true }) },
      resolve: (_, args, ctx): any => {
        return ctx.db.project.update({ where: { id: args.id }, data: args.input! })
      },
    })
  },
})
