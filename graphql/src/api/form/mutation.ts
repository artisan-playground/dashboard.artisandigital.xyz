import { extendType } from '@nexus/schema'

const formMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneForm()
    t.crud.deleteOneForm()
    t.crud.updateOneForm()
  },
})

export { formMutation }
