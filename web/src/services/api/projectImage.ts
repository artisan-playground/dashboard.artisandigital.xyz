import { gql } from '@apollo/client'

export const GET_PROJECT_IMAGES = gql`
  query {
    images {
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
    image(where: { id: $id }) {
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
  mutation Upload($file: Upload!) {
    uploadProjectImage(image: $file) {
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
