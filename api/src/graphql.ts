import { schema } from 'nexus'
import { Project } from './schema/project'
import { User } from './schema/user'

const projects: Project[] = [
  { id: '1', name: 'Project 1' },
  { id: '2', name: 'Project 2' },
]

const users: User[] = [
  { id: '1', name: 'User 1' },
  { id: '2', name: 'User 2' },
]

schema.addToContext((req) => {
  return {
    memoryDB: {
      projects,
      users,
    },
  }
})
