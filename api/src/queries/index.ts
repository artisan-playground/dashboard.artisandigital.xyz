import { objectType } from '@nexus/schema'

const Query = objectType({
  name: 'Query',
  definition(t) {
    t.string('hello', () => 'Hello, World')
  },
})
export default Query
