import { gql } from '@apollo/client'

export const COMMENT = gql`
  mutation CreateComment($userId: Int!, $taskId: Int!, $timestamp: DateTime!, $message: String!) {
    createOneComment(
      data: {
        users: { create: { user: { connect: { id: $userId } } } }
        task: { create: { task: { connect: { id: $taskId } } } }
        timestamp: $timestamp
        message: $message
      }
    ) {
      id
      task {
        task {
          id
        }
      }
      users {
        user {
          id
        }
      }
      timestamp
      image
      message
    }
  }
`

export const DELETE_COMMENT = gql`
  mutation Comment($commentId: String!, $taskId: String!) {
    deleteComment(commentId: $commentId, taskId: $taskId) {
      id
      users {
        user {
          id
        }
      }
      task {
        task {
          id
        }
      }
      timestamp
      image
      message
    }
  }
`
