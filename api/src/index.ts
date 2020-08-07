import { GraphQLServer } from 'graphql-yoga'

import schema from './schema'

const port = process.env.PORT || 8080

new GraphQLServer({ schema }).start({ port }, () =>
  console.log(`🚀 Server is running on localhost:${port}`)
)
