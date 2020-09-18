import { schema } from 'nexus'

schema.extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneContact()
    t.crud.deleteOneContact()
    t.crud.updateOneContact()
  },
})
