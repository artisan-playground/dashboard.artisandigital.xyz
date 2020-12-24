export interface User {
  id: string
  email: string
  name: string
  image: any
  position: string
  skills: string[]
  role: string
}

export interface UserData {
  getUserByEmail: User
}
