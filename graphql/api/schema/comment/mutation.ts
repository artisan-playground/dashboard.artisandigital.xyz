import { schema } from 'nexus'

schema.extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneComment()
    t.crud.deleteOneComment()
    t.crud.updateOneComment()
  },
})
