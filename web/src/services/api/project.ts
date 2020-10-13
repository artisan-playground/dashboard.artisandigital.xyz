import { gql } from '@apollo/client'

export const PROJECT = gql`
  query {
    projects {
      id
      projectName
      projectType
      projectDetail
      projectImage
      status
      dueDate
      members {
        id
        name
        image
        email
      }
      tasks {
        id
        project {
          id
        }
        taskName
        startTime
        endTime
        taskDetail
        isDone
        members {
          id
          name
          image
        }
      }
    }
  }
`
