import gql from 'graphql-tag'

export const UPLOAD_USER_IMG = gql`
  mutation Upload($file: Upload!) {
    uploadImage(image: $file) {
      id
      fullPath
    }
  }
`

export const UPLOAD_PROJECT_IMG = gql`
  mutation Upload($file: Upload!) {
    uploadProjectImage(image: $file) {
      id
      fullPath
    }
  }
`

export const UPDATE_PROJECT_IMG = gql`
  mutation Upload($id: Int!, $file: Upload!) {
    updateProjectImage(id: $id, image: $file) {
      id
      fileName
      path
      fullPath
      endpoint
      extension
    }
  }
`

export const ALL_PROJECT_IMG = gql`
  query images {
    images {
      id
      fileName
      fullPath
    }
  }
`

export const UPLOAD_TASK_FILE = gql`
  mutation Upload($taskId: Int!, $file: Upload!) {
    uploadFile(taskId: { connect: { id: $taskId } }, file: $file) {
      id
      fileName
      path
      fullPath
      endpoint
      extension
    }
  }
`

export const DELETE_TASK_FILE = gql`
  mutation deleteOneFile($id: Int!) {
    deleteOneFile(where: { id: $id }) {
      id
    }
  }
`
