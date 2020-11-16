import { gql } from '@apollo/client'

export const GET_USER = gql`
  query getUserByEmail($email: String!) {
    getUserByEmail(email: $email) {
      id
      email
      name
      image {
        fullPath
      }
      position
      skills
      department
      type
      startDate
      dueDate
      contacts {
        id
        facebook
        twitter
        instagram
        gitlab
        github
      }
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
          image
          message
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
      image {
        fullPath
      }
      position
      skills
      department
      type
      startDate
      dueDate
      contacts {
        id
        facebook
        twitter
        instagram
        gitlab
        github
      }
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
          image
          message
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
      image {
        fullPath
      }
      position
      skills
      department
      type
      startDate
      dueDate
      contacts {
        id
        facebook
        twitter
        instagram
        gitlab
        github
      }
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
          image
          message
        }
      }
    }
  }
`

export const CREATE_USER = gql`
  mutation CreateUser(
    $email: String!
    $name: String!
    $department: String!
    $type: String!
    $position: String!
  ) {
    createOneUser(
      data: {
        email: $email
        name: $name
        department: $department
        type: $type
        position: $position
      }
    ) {
      id
      email
      name
      image {
        fullPath
      }
      position
      skills
      department
      type
      startDate
      dueDate
      contacts {
        id
        facebook
        twitter
        instagram
        gitlab
        github
      }
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
    $type: String!
  ) {
    updateOneUser(
      where: { id: $id }
      data: {
        email: { set: $email }
        name: { set: $name }
        position: { set: $position }
        department: { set: $department }
        type: { set: $type }
      }
    ) {
      id
      email
      name
      image {
        fullPath
      }
      position
      skills
      department
      type
      startDate
      dueDate
      contacts {
        id
        facebook
        twitter
        instagram
        gitlab
        github
      }
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

export const UPDATE_USER_CONTACT = gql`
  mutation updateContact(
    $id: Int!
    $facebook: String!
    $twitter: String!
    $instagram: String!
    $gitlab: String!
    $github: String!
  ) {
    updateOneContact(
      where: { id: $id }
      data: {
        facebook: { set: $facebook }
        twitter: { set: $twitter }
        instagram: { set: $instagram }
        gitlab: { set: $gitlab }
        github: { set: $github }
      }
    ) {
      id
      facebook
      twitter
      instagram
      gitlab
      github
    }
  }
`

export const UPDATE_USER_SKILLS = gql`
  mutation updateSkills($id: Int!, $skills: [String!]!) {
    updateOneUser(where: { id: $id }, data: { skills: { set: $skills } }) {
      id
      email
      name
      image {
        fullPath
      }
      position
      skills
      department
      type
      startDate
      dueDate
      contacts {
        id
        facebook
        twitter
        instagram
        gitlab
        github
      }
    }
  }
`
