import { Project } from './project'

export interface User {
  id: string
  email: string
  name: string
  image: any
  position: string
  projects: Project[]
  role: string
}

export interface UserData {
  getUserByEmail: User
}
