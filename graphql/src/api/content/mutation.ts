import { extendType } from '@nexus/schema'

const contentMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneContent()
    t.crud.deleteOneContent()
    t.crud.updateOneContent()
  },
})

export { contentMutation }
