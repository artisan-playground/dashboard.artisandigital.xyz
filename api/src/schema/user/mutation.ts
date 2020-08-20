import { schema } from 'nexus'
import { nanoid } from 'nanoid'

const InputType = schema.inputObjectType({
  name: 'CreateUserInput',
  definition(t) {
    t.string('name', { required: true })
  },
})

schema.extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('createUser', {
      type: 'User',
      args: { input: InputType },
      resolve: (_, args, ctx) => {
        return {
          id: nanoid(),
          name: args.input?.name || '',
        }
      },
    })
  },
})
