import { nanoid } from 'nanoid'
import { schema } from 'nexus'
import { Project } from '.'

const InputType = schema.inputObjectType({
  name: 'CreateProjectInput',
  definition(t) {
    t.string('projectName', { required: true })
    t.string('projectType', { required: true })
    t.string('projectDetail', { required: true })
    t.string('projectImage', { required: true })
    t.date('dueDate', { required: true })
  },
})

const InputEditType = schema.inputObjectType({
  name: 'EditProjectInput',
  definition(t) {
    t.string('id', { required: true })
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
      args: { input: InputType },
      resolve: (_, args, ctx) => {
        const project: Project = {
          id: nanoid(),
          projectName: args.input?.projectName || '',
          projectType: args.input?.projectType || '',
          projectDetail: args.input?.projectDetail || '',
          projectImage: args.input?.projectImage,
          status: 'undone',
          dueDate: args.input?.dueDate || new Date(),
          memberIds: [],
        }
        ctx.db.projects.push(project)
        return project
      },
    })
  },
})

schema.extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('editProject', {
      type: 'Project',
      args: { input: InputEditType },
      resolve: (_, args, ctx): any => {
        ctx.db.projects.map((item, i) => {
          if (item.id === args.input?.id) {
            ctx.db.projects[i] = {
              id: args.input?.id || '',
              projectName: args.input?.projectName || '',
              projectType: args.input?.projectType || '',
              projectDetail: args.input?.projectDetail || '',
              projectImage: args.input?.projectImage,
              status: args.input?.status || 'undone',
              dueDate: new Date(),
              memberIds: [],
            }
            return ctx.db.projects
          } else {
            return new Error(`No data at id ${args.input?.id}`)
          }
        })
      },
    })
  },
})
