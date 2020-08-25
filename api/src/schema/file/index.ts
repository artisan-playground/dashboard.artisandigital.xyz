import { schema } from 'nexus'

export interface File {
  id: string
  file: string
}

schema.objectType({
  name: 'File',
  definition(t) {
    t.string('id')
    t.string('file')
  },
})
