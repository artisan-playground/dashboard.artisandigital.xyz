import { schema, settings, use } from 'nexus'
import { projects, tasks, users } from './db'
import { prisma } from 'nexus-plugin-prisma'
import { PrismaClient } from 'nexus-plugin-prisma/client'

use(
  prisma({
    client: { instance: new PrismaClient() },
    features: { crud: true },
  })
)

settings.change({
  server: {
    port: process.env.PORT ? Number(process.env.PORT) : 4000,
  },
})

schema.addToContext((req) => {
  return {
    db: {
      projects,
      users,
      tasks,
    },
  }
})
