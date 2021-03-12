import gql from 'graphql-tag'

export const ALL_COMMENT_QUERY = gql`
  query comment {
    comments {
      id
      user {
        id
        name
        role
        image {
          id
          fullPath
        }
      }
      task {
        id
        taskName
      }
      timestamp
      message
    }
  }
`

export const ADD_COMMENT = gql`
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
        image {
          id
          fullPath
        }
      }
      timestamp
      message
    }
  }
`

export const DELETE_COMMENT = gql`
  mutation deleteComment($id: Int!) {
    deleteOneComment(where: { id: $id }) {
      id
    }
  }
`

export const EDIT_COMMENT = gql`
  mutation UpdateComment($id: Int!, $message: String!) {
    updateOneComment(where: { id: $id }, data: { message: { set: $message } }) {
      id
      task {
        id
      }
      message
    }
  }
`
