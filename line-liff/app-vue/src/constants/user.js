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
      phone
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
      email
      role
      phone
      image {
        id
        fullPath
      }
      position
      department
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

export const EDIT_PROFILE_FULLTIME_UPDATE = gql`
  mutation updateOneUser(
    $id: Int!
    $email: String!
    $name: String!
    $position: String!
    $department: String!
    $phone: String!
    $type: String!
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
      }
    ) {
      id
      name
      email
      position
      department
      type
      phone
    }
  }
`

export const EDIT_PROFILE_INTERN_UPDATE = gql`
  mutation updateOneUser(
    $id: Int!
    $email: String!
    $name: String!
    $position: String!
    $department: String!
    $phone: String!
    $type: String!
    $startDate: DateTime!
    $dueDate: DateTime!
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
      }
    ) {
      id
      name
      email
      position
      department
      type
      startDate
      dueDate
      phone
    }
  }
`

export const EDIT_PROFILE_UPLOAD_INTERN = gql`
  mutation updateOneUser(
    $id: Int!
    $name: String
    $email: String!
    $position: String
    $department: String!
    $phone: String!
    $type: String!
    $startDate: DateTime!
    $dueDate: DateTime!
    $imageId: Int!
  ) {
    updateOneUser(
      where: { id: $id }
      data: {
        name: { set: $name }
        email: { set: $email }
        position: { set: $position }
        department: { set: $department }
        phone: { set: $phone }
        type: { set: $type }
        startDate: { set: $startDate }
        dueDate: { set: $dueDate }
        image: { connect: { id: $imageId } }
      }
    ) {
      id
      name
      email
    }
  }
`

export const EDIT_PROFILE_UPLOAD_FULLTIME = gql`
  mutation updateOneUser(
    $id: Int!
    $name: String
    $email: String!
    $position: String
    $department: String!
    $phone: String!
    $type: String!
    $imageId: Int!
  ) {
    updateOneUser(
      where: { id: $id }
      data: {
        name: { set: $name }
        email: { set: $email }
        position: { set: $position }
        department: { set: $department }
        phone: { set: $phone }
        type: { set: $type }
        image: { connect: { id: $imageId } }
      }
    ) {
      id
      name
      email
    }
  }
`
