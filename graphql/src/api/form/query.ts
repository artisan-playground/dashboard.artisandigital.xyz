import { extendType, intArg } from '@nexus/schema'

const formQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('getFormById', {
      type: 'Form',
      args: { id: intArg({ required: true }) },
      resolve: (_, args, ctx) => {
        return ctx.prisma.form.findOne({ where: { id: args.id } })
      },
    })

    t.crud.forms({
      type: 'Form',
      resolve: (_, args, ctx) => {
        return ctx.prisma.form.findMany()
      },
    })
  },
})

export { formQuery }
