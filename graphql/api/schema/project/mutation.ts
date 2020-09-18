import { schema } from 'nexus'

schema.extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneProject()
    t.crud.deleteOneProject()
    t.crud.updateOneProject()
  },
})
