import { schema } from 'nexus'

export interface File {
  uid: string
  url: string
  name: string
  status: string
}

schema.objectType({
  name: 'File',
  definition(t) {
    t.model.uid()
    t.model.url()
    t.model.name()
    t.model.status()
  },
})
