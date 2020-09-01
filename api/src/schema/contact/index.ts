import { schema } from 'nexus'

export interface Contact {
  id: string
  facebook: string
  twitter: string
  instagram: string
  gitlab: string
  github: string
}

schema.objectType({
  name: 'Contact',
  definition(t) {
    t.string('id')
    t.string('facebook')
    t.string('twitter')
    t.string('instagram')
    t.string('gitlab')
    t.string('github')
  },
})
