import gql from 'graphql-tag'

export const UPLOAD_IMAGE = gql`
  mutation UploadImage($file: Upload!) {
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

export const UPDATE_IMAGE = gql`
  mutation UpdateImage($id: Int!, $file: Upload!) {
    updateImage(id: $id, image: $file) {
      id
      fileName
      path
      fullPath
      endpoint
      extension
    }
  }
`
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
