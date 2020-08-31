import { schema } from 'nexus'

export interface Team {
  id: string
  email: string
  name: string
  image: string
}

schema.objectType({
  name: 'Team',
  definition(t) {
    t.string('id')
    t.string('email')
    t.string('name')
    t.string('image')
  },
})
