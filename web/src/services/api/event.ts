import { gql } from '@apollo/client'

export const EVENT = gql`
  query {
    events {
      id
      eventName
      eventDate
      endDate
      note
      tag
      invited {
        id
        email
        name
        image {
          fullPath
        }
      }
    }
  }
`

export const CREATE_EVENT = gql`
  mutation createEvent(
    $eventName: String!
    $eventDate: DateTime!
    $endDate: DateTime!
    $note: String!
    $tag: String!
    $invited: Int!
  ) {
    createOneEvent(
      data: {
        eventName: $eventName
        eventDate: $eventDate
        endDate: $endDate
        note: $note
        tag: $tag
        invited: { connect: [{ id: $invited }] }
      }
    ) {
      id
      eventName
      eventDate
      endDate
      note
      tag
      invited {
        id
        email
        name
        image {
          fullPath
        }
      }
    }
  }
`

export const DELETE_EVENT = gql`
  mutation deleteEvent($id: Int!) {
    deleteOneEvent(where: { id: $id }) {
      id
      eventName
      eventDate
      endDate
      note
      tag
      invited {
        id
        email
        name
        image {
          fullPath
        }
      }
    }
  }
`
