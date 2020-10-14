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
        image
      }
    }
  }
`
