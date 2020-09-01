import { schema } from 'nexus'
import { nanoid } from 'nanoid'
import { Contact } from '.'

const InputType = schema.inputObjectType({
  name: 'CreateContactInput',
  definition(t) {
    t.string('facebook', { required: true })
    t.string('twitter', { required: true })
    t.string('instagram', { required: true })
    t.string('gitlab', { required: true })
    t.string('github', { required: true })
  },
})

schema.extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('createContact', {
      type: 'Contact',
      args: { input: InputType },
      resolve: (_, args, ctx) => {
        const contact: Contact = {
          id: nanoid(),
          facebook: args.input?.facebook || '',
          twitter: args.input?.twitter || '',
          instagram: args.input?.instagram || '',
          gitlab: args.input?.gitlab || '',
          github: args.input?.github || '',
        }
        ctx.db.tasks.find((t) => t.id === args.input?.id).contacts.push(contact)
        return contact
      },
    })
  },
})
