export interface Task {
  id: string
  projectId: string
  taskName: string
  time: Date
  taskDetail: string
  isDone: boolean
  memberIds: any[]
  files: any[]
  comments: Comment[] | any
}
