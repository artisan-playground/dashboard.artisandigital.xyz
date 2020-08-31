import { schema, settings } from 'nexus'
import { projects, tasks, users } from './db'
settings.change({
  server: {
    port: process.env.PORT ? Number(process.env.PORT) : 4000,
  },
})

// schema.middleware((_config) => {
//   return async (root, args, ctx, info, next) {
//     ctx.log.trace('before resolver')
//     await next(root, args, ctx, info)
//     ctx.log.trace('after resolver')
//   }
// })

// import { use } from 'nexus'
// import { prisma } from 'nexus-plugin-prisma'
//
// use(prisma())

schema.addToContext((req) => {
  return {
    db: {
      projects,
      users,
      tasks,
    },
  }
})
