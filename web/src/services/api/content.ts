import { gql } from '@apollo/client'

export const CONTENT = gql`
  query {
    contents {
      id
      subject
      content
      contentImage {
        id
        fullPath
      }
      timestamp
      user {
        id
        name
        email
        image {
          id
          fullPath
        }
      }
    }
  }
`

export const GET_CONTENT_BY_ID = gql`
  query getContent($id: Int!) {
    getContentById(id: $id) {
      id
      subject
      content
      contentImage {
        id
        fullPath
      }
      timestamp
      user {
        id
        name
        email
        image {
          id
          fullPath
        }
      }
    }
  }
`

export const CREATE_CONTENT = gql`
  mutation createContent(
    $subject: String!
    $content: String!
    $userId: Int!
    $contentImages: [ContentImageWhereUniqueInput!]
  ) {
    createOneContent(
      data: {
        subject: $subject
        content: $content
        user: { connect: { id: $userId } }
        contentImage: { connect: $contentImages }
      }
    ) {
      id
      subject
      content
      contentImage {
        id
        fullPath
      }
      timestamp
      user {
        id
        name
        email
        image {
          id
          fullPath
        }
      }
    }
  }
`

export const UPDATE_CONTENT = gql`
  mutation updateContent($id: Int!, $subject: String!, $content: String!) {
    updateOneContent(
      where: { id: $id }
      data: { subject: { set: $subject }, content: { set: $content } }
    ) {
      id
      subject
      content
      contentImage {
        id
        fullPath
      }
      timestamp
      user {
        id
        name
        email
        image {
          id
          fullPath
        }
      }
    }
  }
`

export const DELETE_CONTENT = gql`
  mutation deleteContent($id: Int!) {
    deleteOneContent(where: { id: $id }) {
      id
      subject
      content
      contentImage {
        id
        fullPath
      }
      timestamp
      user {
        id
        name
        email
        image {
          id
          fullPath
        }
      }
    }
  }
`
