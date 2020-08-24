import { schema, settings } from 'nexus'

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

const projects = [
  { id: '1', name: 'Project 1' },
  { id: '2', name: 'Project 2' },
]

const tasks = [
  { id: '1', taskName: 'TASK 1' },
  { id: '2', taskName: 'TASK 2' },
]

const users = [
  { id: '1', name: 'User 1' },
  { id: '2', name: 'User 2' },
]

schema.addToContext((req) => {
  return {
    db: {
      projects,
      users,
      tasks,
    },
  }
})
