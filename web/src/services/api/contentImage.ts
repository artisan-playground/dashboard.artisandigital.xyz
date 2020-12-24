import { gql } from '@apollo/client'

export const GET_CONTENT_IMAGES = gql`
  query {
    contentImages {
      id
      fileName
      path
      fullPath
      endpoint
      extension
    }
  }
`

export const GET_CONTENT_IMAGE = gql`
  query getImage($id: Int!) {
    getContentImageById(id: $id) {
      id
      fileName
      path
      fullPath
      endpoint
      extension
    }
  }
`

export const UPLOAD_CONTENT_IMAGE = gql`
  mutation Upload($file: Upload!) {
    uploadContentImage(contentImage: $file) {
      id
      fileName
      path
      fullPath
      endpoint
      extension
    }
  }
`

export const UPDATE_CONTENT_IMAGE = gql`
  mutation Upload($id: Int!, $file: Upload!) {
    updateContentImage(id: $id, contentImage: $file) {
      id
      fileName
      path
      fullPath
      endpoint
      extension
    }
  }
`
