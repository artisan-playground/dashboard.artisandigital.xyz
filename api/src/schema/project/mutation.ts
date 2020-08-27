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
          dueDate: new Date(),
          team: [],
        }
        ctx.db.projects.push(project)
        return project
      },
    })
  },
})
