import { schema } from 'nexus'

schema.extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneUser()
    t.crud.deleteOneUser()
    t.crud.updateOneUser()
  },
})
