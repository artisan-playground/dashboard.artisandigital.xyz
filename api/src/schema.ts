import { makeSchema } from '@nexus/schema'

import Query from './queries'

const schema = makeSchema({
  types: [Query],
  outputs: {
    schema: __dirname + '../schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
})
export default schema
