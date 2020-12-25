import { gql } from '@apollo/client'

export const NOTIFICATION = gql`
  query {
    notifications {
      id
      message
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
  }
`

export const CREATE_NOTIFICATION = gql`
  mutation createNotification(
    $message: String!
    $receiverId: Int!
    $senderId: Int!
    $type: String!
  ) {
    createOneNotification(
      data: {
        message: $message
        receiver: { connect: { id: $receiverId } }
        sender: { connect: { id: $senderId } }
        type: $type
      }
    ) {
      id
      message
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
  }
`
