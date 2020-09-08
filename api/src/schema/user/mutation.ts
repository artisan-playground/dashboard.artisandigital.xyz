import { schema } from 'nexus'
import { nanoid } from 'nanoid'
import { User } from '.'

const InputType = schema.inputObjectType({
  name: 'CreateUserInput',
  definition(t) {
    t.string('email', { required: true })
    t.string('name', { required: true })
    t.string('image', { required: true })
    t.string('position', { required: true })
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
          email: args.input?.email || '',
          name: args.input?.name || '',
          image: args.input?.image,
          position: args.input?.position || '',
          skills: [],
          contacts: [],
          projectIds: [],
          taskIds: [],
        }
        ctx.db.users.push(user)
        return user
      },
    })
  },
})