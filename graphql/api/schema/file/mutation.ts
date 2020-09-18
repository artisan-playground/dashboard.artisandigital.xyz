import { schema } from 'nexus'

schema.extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneFile()
    t.crud.deleteOneFile()
    t.crud.updateOneFile()
  },
})
