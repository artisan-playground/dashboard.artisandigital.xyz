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
        user {
          id
          name
          image
        }
      }
      tasks {
        id
        taskName
        startTime
        endTime
        taskDetail
        isDone
        members {
          user {
            id
          }
        }
      }
    }
  }
`
