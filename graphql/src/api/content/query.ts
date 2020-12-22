import { extendType, intArg } from '@nexus/schema'

const contentQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('getContentById', {
      type: 'Content',
      args: { id: intArg({ required: true }) },
      resolve: (_, args, ctx) => {
        return ctx.prisma.content.findOne({ where: { id: args.id } })
      },
    })

    t.crud.contents({
      type: 'Content',
      resolve: (_, args, ctx) => {
        return ctx.prisma.content.findMany()
      },
    })
  },
})

export { contentQuery }
