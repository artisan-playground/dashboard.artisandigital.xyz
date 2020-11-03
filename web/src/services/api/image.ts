import { gql } from '@apollo/client'

export const GET_IMAGES = gql`
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

export const GET_IMAGE = gql`
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

export const UPLOAD_IMAGE = gql`
  mutation Upload($file: Upload!) {
    uploadImage(image: $file) {
      id
      fileName
      path
      fullPath
      endpoint
      extension
    }
  }
`
