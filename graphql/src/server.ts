import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import { createContext } from './context'
import { schema } from './schema'

const port = process.env.PORT || 4000
const server = new ApolloServer({ schema, context: createContext })

const app = express()

var corsOptions = {
  origin: process.env.DOMAIN,
  credentials: true,
}

server.applyMiddleware({ app, cors: corsOptions })

app.listen({ port: port }, () => console.log(`🚀 Server ready at http://localhost:${port}`))
