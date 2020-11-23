import gql from 'graphql-tag'

export const ALL_MEMBER_QUERY = gql`
  query Users {
    users {
      id
      name
      image {
        id
        fullPath
      }
      email
      department
      position
      type
      skills
      startDate
      dueDate
    }
  }
`
export const MEMBER_QUERY = gql`
  query User($userId: Int!) {
    user(id: $userId) {
      id
      name
      image {
        id
        fullPath
      }
      email
      department
      position
      type
      skills
      startDate
      dueDate
      projects {
        id
        projectName
        projectType
        status
        members {
          id
          image {
            id
            fullPath
          }
        }
        projectImage {
          id
          fullPath
        }
        projectDetail
      }
      tasks {
        id
        taskName
        taskDetail
        isDone
      }
    }
  }
`
