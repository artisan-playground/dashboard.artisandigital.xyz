import gql from 'graphql-tag'

export const ALL_EVENT = gql`
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
          id
          fullPath
          fileName
        }
      }
    }
  }
`
export const EVENT_QUERY = gql`
  query Event($eventId: Int!) {
    getEventById(id: $eventId) {
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
          id
          fullPath
          fileName
        }
      }
    }
  }
`
