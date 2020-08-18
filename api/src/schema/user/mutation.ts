import { schema } from 'nexus'
import { nanoid } from 'nanoid'
import { User } from '.'

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
        const user: User = {
          id: nanoid(),
          name: args.input?.name || '',
        }
        return user
      },
    })
  },
})
