import { schema } from 'nexus'

export interface User {
  id: string
  name: string
}

schema.objectType({
  name: 'User',
  definition(t) {
    t.string('id')
    t.string('name')
  },
})
