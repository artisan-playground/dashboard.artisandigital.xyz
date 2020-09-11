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
    t.model.id()
    t.model.facebook()
    t.model.twitter()
    t.model.instagram()
    t.model.gitlab()
    t.model.github()
  },
})
