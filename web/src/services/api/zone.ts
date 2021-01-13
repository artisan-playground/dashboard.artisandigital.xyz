import { gql } from '@apollo/client'

export const GET_ZONES = gql`
  query {
    zones {
      id
      name
      latitude
      longitude
      timestamp
      radius
      open
    }
  }
`

export const GET_ZONE = gql`
  query getZone($id: Int!) {
    getZoneById(id: $id) {
      id
      name
      latitude
      longitude
      timestamp
      radius
      open
    }
  }
`

export const CREATE_ZONE = gql`
  mutation($name: String!, $latitude: String!, $longitude: String!, $radius: String!) {
    createOneZone(
      data: { name: $name, latitude: $latitude, longitude: $longitude, radius: $radius }
    ) {
      id
      name
      latitude
      longitude
      timestamp
      radius
      open
    }
  }
`

export const UPDATE_ZONE = gql`
  mutation($id: Int!, $name: String!, $latitude: String!, $longitude: String!, $radius: String!) {
    updateOneZone(
      where: { id: $id }
      data: {
        name: { set: $name }
        latitude: { set: $latitude }
        longitude: { set: $longitude }
        radius: { set: $radius }
      }
    ) {
      id
      name
      latitude
      longitude
      timestamp
      radius
      open
    }
  }
`

export const DELETE_ZONE = gql`
  mutation($id: Int!) {
    deleteOneZone(where: { id: $id }) {
      id
      name
      latitude
      longitude
      timestamp
      radius
      open
    }
  }
`
