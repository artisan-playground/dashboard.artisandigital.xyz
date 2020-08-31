export interface Project {
  id: string
  projectName: string
  projectType: string
  projectDetail: string
  projectImage?: string
  status: string
  dueDate: Date
  memberIds?: String[]
}
