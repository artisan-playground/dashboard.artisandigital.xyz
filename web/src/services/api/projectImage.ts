import { gql } from '@apollo/client'

export const GET_PROJECT_IMAGES = gql`
  query {
    projectImages {
      id
      fileName
      path
      fullPath
      endpoint
      extension
    }
  }
`

export const GET_PROJECT_IMAGE = gql`
  query getImage($id: Int!) {
    getProjectImageById(id: $id) {
      id
      fileName
      path
      fullPath
      endpoint
      extension
    }
  }
`

export const UPLOAD_PROJECT_IMAGE = gql`
  mutation UploadProjectImage($file: Upload!) {
    uploadProjectImage(projectImage: $file) {
      id
      fileName
      path
      fullPath
      endpoint
      extension
    }
  }
`

export const UPDATE_PROJECT_IMAGE = gql`
  mutation Upload($id: Int!, $file: Upload!) {
    updateProjectImage(id: $id, projectImage: $file) {
      id
      fileName
      path
      fullPath
      endpoint
      extension
    }
  }
`
