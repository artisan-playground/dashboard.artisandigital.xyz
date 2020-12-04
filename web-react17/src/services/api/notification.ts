import { gql } from '@apollo/client'

export const NOTIFICATION = gql`
  query {
    notifications {
      id
      update
      timestamp
      user {
        id
        email
        name
        image {
          fullPath
        }
      }
    }
  }
`

export const CREATE_NOTIFICATION = gql`
  mutation createNotification($update: String!, $userId: Int!) {
    createOneNotification(data: { update: $update, user: { connect: { id: $userId } } }) {
      id
      update
      timestamp
      user {
        id
        email
        name
        image {
          fullPath
        }
      }
    }
  }
`
