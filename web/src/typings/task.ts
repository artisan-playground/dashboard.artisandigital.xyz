export interface Task {
  id: string
  projectId: string
  taskName: string
  time: Date
  taskDetail: string
  isDone: boolean
  team: any[]
  files: any[]
  comments: Comment[] | any
}
