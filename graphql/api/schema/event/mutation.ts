import { schema } from 'nexus'

schema.extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneEvent()
    t.crud.deleteOneEvent()
    t.crud.updateOneEvent()
  },
})
