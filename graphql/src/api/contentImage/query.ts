import { extendType, intArg } from '@nexus/schema'

const contentImageQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('getContentImageById', {
      type: 'ContentImage',
      args: { id: intArg({ required: true }) },
      resolve: (_, args, ctx) => {
        return ctx.prisma.contentImage.findOne({ where: { id: args.id } })
      },
    })

    t.crud.contentImages({
      type: 'ContentImage',
      resolve: (_, args, ctx) => {
        return ctx.prisma.contentImage.findMany()
      },
    })
  },
})

export { contentImageQuery }
