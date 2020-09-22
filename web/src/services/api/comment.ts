import { gql } from '@apollo/client'

export const COMMENT = gql`
  mutation CreateCommentInput($input: CreateCommentInput) {
    createComment(input: $input) {
      id
      timestamp
      userId
      image
      userImg
      userName
      message
    }
  }
`

export const DELETE_COMMENT = gql`
  mutation Comment($commentId: String!, $taskId: String!) {
    deleteComment(commentId: $commentId, taskId: $taskId) {
      id
      timestamp
      userId
      image
      userImg
      userName
      message
    }
  }
`
