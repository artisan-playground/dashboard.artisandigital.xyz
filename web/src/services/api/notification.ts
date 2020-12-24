import { gql } from '@apollo/client'

export const NOTIFICATION = gql`
  query {
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
  }
`

export const CREATE_NOTIFICATION = gql`
  mutation createNotification(
    $update: String!
    $receiverId: Int!
    $senderId: Int!
    $type: String!
  ) {
    createOneNotification(
      data: {
        update: $update
        receiver: { connect: { id: $receiverId } }
        sender: { connect: { id: $senderId } }
        type: $type
      }
    ) {
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
  }
`
