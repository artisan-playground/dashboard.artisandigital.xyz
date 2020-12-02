import gql from 'graphql-tag'

export const UPLOAD = gql`
  mutation Upload($file: Upload!) {
    uploadImage(image: $file) {
      id
      fullPath
    }
  }
`
