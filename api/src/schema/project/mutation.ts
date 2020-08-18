import { schema } from 'nexus'
import { nanoid } from 'nanoid'
import { Project } from '.'

const InputType = schema.inputObjectType({
  name: 'CreateProjectInput',
  definition(t) {
    t.string('name', { required: true })
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
          name: args.input?.name || '',
        }
        return project
      },
    })
  },
})
