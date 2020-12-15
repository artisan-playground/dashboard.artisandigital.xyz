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
export const UPLOAD_TASK_FILE = gql`
  mutation Upload($taskId: Int!, $file: Upload!) {
    uploadFile(file: $file, taskId: { connect: { id: $taskId } }) {
      id
      fullPath
    }
  }
`
