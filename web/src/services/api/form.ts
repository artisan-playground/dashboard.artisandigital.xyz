import { gql } from '@apollo/client'

export const GET_FORMS = gql`
  query {
    forms {
      id
      firstName
      lastName
      email
      phone
      position
      leaveStart
      leaveEnd
      leaveType
      leaveDetail
      createdAt
    }
  }
`

export const GET_FORM = gql`
  query getForm($id: Int!) {
    getFormById(id: $id) {
      id
      firstName
      lastName
      email
      phone
      position
      leaveStart
      leaveEnd
      leaveType
      leaveDetail
      createdAt
    }
  }
`

export const CREATE_FORM = gql`
  mutation($leaveType: String!) {
    createOneForm(data: { leaveType: $leaveType }) {
      id
      firstName
      lastName
      email
      phone
      position
      leaveStart
      leaveEnd
      leaveType
      leaveDetail
      createdAt
    }
  }
`

export const UPDATE_FORM = gql`
  mutation($id: Int!, $leaveType: String!) {
    updateOneForm(where: { id: $id }, data: { leaveType: { set: $leaveType } }) {
      id
      firstName
      lastName
      email
      phone
      position
      leaveStart
      leaveEnd
      leaveType
      leaveDetail
      createdAt
    }
  }
`

export const DELETE_FORM = gql`
  mutation($id: Int!) {
    deleteOneForm(where: { id: $id }) {
      id
      firstName
      lastName
      email
      phone
      position
      leaveStart
      leaveEnd
      leaveType
      leaveDetail
      createdAt
    }
  }
`
