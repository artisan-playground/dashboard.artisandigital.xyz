export interface User {
  id: string
  email: string
  name: string
  image: any
  position: string
  skills: string[]
}

export interface UserData {
  getUserByEmail: User
}
