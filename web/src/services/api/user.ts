import { gql } from '@apollo/client'

export const GET_USER = gql`
  query getUserByEmail($email: String!) {
    getUserByEmail(email: $email) {
      id
      email
      name
      role
      image {
        id
        fullPath
      }
      position
      department
      type
      startDate
      dueDate
      phone
      projects {
        id
        projectName
        projectType
        projectDetail
        projectImage {
          fullPath
        }
        status
        dueDate
        members {
          id
          name
          image {
            fullPath
          }
        }
        tasks {
          id
        }
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
        taskType
        isDone
        members {
          id
          name
          image {
            fullPath
          }
        }
        files {
          id
          path
          fileName
          extension
          task {
            id
          }
        }
        comments {
          id
          task {
            id
          }
          user {
            id
            name
            image {
              fullPath
            }
          }
          timestamp
          message
        }
      }
      notifications {
        id
        update
        timestamp
        type
        receiver {
          id
          email
          name
          image {
            fullPath
          }
        }
        sender {
          id
          email
          name
          image {
            fullPath
          }
        }
      }
      contents {
        id
        subject
        content
        timestamp
        contentImage {
          id
          fullPath
        }
      }
    }
  }
`

export const GET_USER_BY_ID = gql`
  query getUserById($id: Int!) {
    user(id: $id) {
      id
      email
      name
      role
      image {
        id
        fullPath
      }
      position
      department
      type
      startDate
      dueDate
      phone
      projects {
        id
        projectName
        projectType
        projectDetail
        projectImage {
          fullPath
        }
        status
        dueDate
        members {
          id
          name
          image {
            fullPath
          }
        }
        tasks {
          id
        }
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
        taskType
        isDone
        members {
          id
          name
          image {
            fullPath
          }
        }
        files {
          id
          path
          fileName
          extension
          task {
            id
          }
        }
        comments {
          id
          task {
            id
          }
          user {
            id
            name
            image {
              fullPath
            }
          }
          timestamp
          message
        }
      }
      notifications {
        id
        update
        timestamp
        type
        receiver {
          id
          email
          name
          image {
            fullPath
          }
        }
        sender {
          id
          email
          name
          image {
            fullPath
          }
        }
      }
      contents {
        id
        subject
        content
        timestamp
        contentImage {
          id
          fullPath
        }
      }
    }
  }
`

export const GET_USERS = gql`
  query {
    users {
      id
      email
      name
      role
      image {
        id
        fullPath
      }
      position
      department
      type
      startDate
      dueDate
      phone
      projects {
        id
        projectName
        projectType
        projectDetail
        projectImage {
          fullPath
        }
        status
        dueDate
        members {
          id
          name
          image {
            fullPath
          }
        }
        tasks {
          id
        }
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
        taskType
        isDone
        members {
          id
          name
          image {
            fullPath
          }
        }
        files {
          id
          path
          fileName
          extension
          task {
            id
          }
        }
        comments {
          id
          task {
            id
          }
          user {
            id
            name
            image {
              fullPath
            }
          }
          timestamp
          message
        }
      }
      notifications {
        id
        update
        timestamp
        type
        receiver {
          id
          email
          name
          image {
            fullPath
          }
        }
        sender {
          id
          email
          name
          image {
            fullPath
          }
        }
      }
      contents {
        id
        subject
        content
        timestamp
        contentImage {
          id
          fullPath
        }
      }
    }
  }
`

export const CREATE_USER = gql`
  mutation CreateUser(
    $email: String!
    $name: String!
    $position: String!
    $phone: String!
    $department: String!
    $type: String!
  ) {
    createOneUser(
      data: {
        email: $email
        name: $name
        position: $position
        phone: $phone
        department: $department
        type: $type
      }
    ) {
      id
      email
      name
      role
      image {
        id
        fullPath
      }
      position
      skills
      department
      type
      startDate
      dueDate
      phone
    }
  }
`

export const UPDATE_USER = gql`
  mutation UpdateUser(
    $id: Int!
    $email: String!
    $name: String!
    $position: String!
    $department: String!
    $phone: String!
    $type: String!
    $startDate: DateTime!
    $dueDate: DateTime!
    $file: Int!
  ) {
    updateOneUser(
      where: { id: $id }
      data: {
        email: { set: $email }
        name: { set: $name }
        position: { set: $position }
        department: { set: $department }
        phone: { set: $phone }
        type: { set: $type }
        startDate: { set: $startDate }
        dueDate: { set: $dueDate }
        image: { connect: { id: $file } }
      }
    ) {
      id
      email
      name
      role
      image {
        id
        fullPath
      }
      position
      skills
      department
      type
      startDate
      dueDate
      phone
    }
  }
`

export const DELETE_USER = gql`
  mutation DeleteUser($id: Int!) {
    deleteOneUser(where: { id: $id }) {
      id
    }
  }
`
