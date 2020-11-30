import gql from 'graphql-tag'

export const ALL_COMMENT_QUERY = gql`
  query comment {
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
      task {
        id
        taskName
      }
      timestamp
      image
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
      image
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
  mutation updateComment($id: Int!, $data: CommentUpdateInput!) {
    updateOneComment(where: { id: $id }, data: $data) {
      id
      message
    }
  }
`
