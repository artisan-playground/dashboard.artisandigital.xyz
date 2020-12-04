import { gql } from '@apollo/client'

export const GET_FILES = gql`
  query {
    files {
      id
      fileName
      path
      fullPath
      endpoint
      extension
      task {
        id
      }
    }
  }
`

export const GET_FILE = gql`
  query getImage($id: Int!) {
    file(where: { id: $id }) {
      id
      fileName
      path
      fullPath
      endpoint
      extension
      task {
        id
      }
    }
  }
`

export const UPLOAD_FILE = gql`
  mutation UploadFile($taskId: Int!, $file: Upload!) {
    uploadFile(taskId: { connect: { id: $taskId } }, file: $file) {
      id
      fileName
      path
      fullPath
      endpoint
      extension
      task {
        id
      }
    }
  }
`

export const UPDATE_FILE = gql`
  mutation UpdateFile($id: Int!, $file: Upload!) {
    updateFile(id: $id, file: $file) {
      id
      fileName
      path
      fullPath
      endpoint
      extension
      task {
        id
      }
    }
  }
`

export const DELETE_FILE = gql`
  mutation DeleteFile($id: Int!) {
    deleteOneFile(where: { id: $id }) {
      id
      fileName
      path
      fullPath
      endpoint
      extension
      task {
        id
      }
    }
  }
`
