export interface Task {
  id: string
  projectId: string
  taskName: string
  time: Date
  taskDetail: string
  isDone: boolean
  members: any[]
  comments: any[]
  files: any[]
}
