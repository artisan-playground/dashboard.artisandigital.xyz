import { gql } from '@apollo/client'

export const GET_USER = gql`
  query User($email: String) {
    user(where: { email: $email }) {
      id
      email
      name
      image
      position
      skills
      contacts {
        id
        facebook
        twitter
        instagram
        gitlab
        github
      }
      projects {
        project {
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
            }
          }
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
      image
      position
      skills
      contacts {
        id
        facebook
        twitter
        instagram
        gitlab
        github
      }
      projects {
        project {
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
            }
          }
        }
      }
    }
  }
`

export const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
    }
  }
`

export const UPDATE_USER = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      id
    }
  }
`

export const DELETE_USER = gql`
  mutation DeleteUser($id: String!) {
    deleteUser(id: $id)
  }
`
