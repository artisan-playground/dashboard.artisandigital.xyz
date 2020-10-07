import { gql } from '@apollo/client'

export const COMMENT = gql`
  mutation CreateComment($timestamp: DateTime!, $message: String!, $taskId: Int!, $userId: Int!) {
    createOneComment(
      data: {
        timestamp: $timestamp
        message: $message
        task: { connect: { id: $taskId } }
        user: { connect: { id: $userId } }
      }
    ) {
      id
      task {
        id
      }
      user {
        id
        name
        image
      }
      timestamp
      image
      message
    }
  }
`

export const DELETE_COMMENT = gql`
  mutation DeleteComment($id: Int!) {
    deleteOneComment(where: { id: $id }) {
      id
    }
  }
`

export const UPDATE_COMMENT = gql`
  mutation UpdateComment($id: Int!, $message: String!) {
    updateOneComment(where: { id: $id } data: { message: { set: $message } }) {
      id
      task {
        id
      }
      timestamp
      image
      message
    }
  }
`
