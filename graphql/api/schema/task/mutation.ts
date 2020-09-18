import { schema } from 'nexus'

schema.extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneTask()
    t.crud.deleteOneTask()
    t.crud.updateOneTask()
  },
})
