export interface Task {
  id: string
  projectId: string
  taskName: string
  time: Date
  taskDetail: string
  isDone: boolean
  project: any
  members: any[]
  comments: any[]
  files: any[]
  taskType: string
}
