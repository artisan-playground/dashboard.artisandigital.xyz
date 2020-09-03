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
    t.string('uid')
    t.string('url')
    t.string('name')
    t.string('status')
  },
})
