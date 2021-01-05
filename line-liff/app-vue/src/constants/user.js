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
        startTime
        endTime
      }
    }
  }
`

export const GET_USER_EMAIL = gql`
  query getUserByEmail($email: String!) {
    getUserByEmail(email: $email) {
      id
      email
      name
      startDate
      dueDate
      role
      image {
        id
        fileName
        fullPath
        path
        extension
        endpoint
      }
      position
      department
      type
      projects {
        id
        projectName
        projectType
        projectDetail
        projectImage {
          id
          fullPath
        }
        status
        dueDate
        members {
          id
          email
          name
          image {
            id
            fullPath
          }
        }
        tasks {
          id
          project {
            id
            projectName
          }
        }
      }
      tasks {
        id
        taskName
        taskType
        taskDetail
        startTime
        endTime
        isDone
        project {
          id
          projectName
          projectImage {
            id
            fullPath
          }
        }
        members {
          id
          name
          image {
            id
            fullPath
          }
        }
        comments {
          id
          user {
            id
            name
            image {
              id
              fullPath
            }
          }
        }
        files {
          id
          fullPath
          fileName
        }
      }
    }
  }
`

export const EDIT_PROFILE = gql`
  mutation updateOneUser($id: Int!, $name: String, $position: String) {
    updateOneUser(
      where: { id: $id }
      data: { name: { set: $name }, position: { set: $position } }
    ) {
      id
      name
      email
    }
  }
`
