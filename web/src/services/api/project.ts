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

export const GET_PROJECT_BY_ID = gql`
  query Project($id: Int!) {
    project(where: { id: $id }) {
      projectName
      projectType
      projectDetail
      projectImage
      status
      dueDate
      members {
        id
      }
      tasks {
        id
        taskName
        startTime
        endTime
        taskDetail
        isDone
        members {
          id
        }
        files {
          id
          url
          name
          status
          task {
            id
          }
        }
        comments {
          id
          task {
            id
          }
          timestamp
          image
          message
        }
      }
    }
  }
`
