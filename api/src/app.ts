import { schema, settings } from 'nexus'
import { projects, tasks, users } from './db'
// import { prisma,settings, use } from 'nexus-plugin-prisma'

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
// use(prisma({ features: { crud: true } }))
