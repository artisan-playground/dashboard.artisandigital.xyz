import { ApolloServer } from 'apollo-server-express'
import createExpress from 'express'
import { createContext } from './context'
import { schema } from './schema'

const port = process.env.PORT || 4000
const apollo = new ApolloServer({ schema, context: createContext })

const express = createExpress()

apollo.applyMiddleware({ app: express, path: process.env.DOMAIN })

express.listen({ port: port }, () => console.log(`🚀 Server ready at: http://localhost:${port}`))
