export interface User {
  id: string
  email: string
  name: string
  image: string
  position: string
  skills: string[]
}

export interface UserData {
  user: User
}
