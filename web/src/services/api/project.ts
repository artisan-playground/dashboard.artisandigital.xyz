import { gql } from '@apollo/client'

export const PROJECT = gql`
  query {
    projects {
      id
      projectName
      projectType
      projectDetail
      projectImage {
        id
        fileName
        fullPath
      }
      status
      createdAt
      dueDate
      members {
        id
        name
        email
        phone
        position
        department
        image {
          id
          fileName
          fullPath
        }
      }
      tasks {
        id
        project {
          id
        }
        taskName
        startTime
        endTime
        taskDetail
        taskType
        isDone
        members {
          id
          name
          image {
            id
            fileName
            fullPath
          }
        }
      }
    }
  }
`

export const GET_PROJECT_BY_ID = gql`
  query getProjectById($id: Int!) {
    project(id: $id) {
      id
      projectName
      projectType
      projectDetail
      projectImage {
        id
        fileName
        fullPath
      }
      status
      createdAt
      dueDate
      members {
        id
        name
        email
        phone
        position
        department
        image {
          id
          fileName
          fullPath
        }
      }
      tasks {
        id
        project {
          id
        }
        taskName
        startTime
        endTime
        taskDetail
        taskType
        isDone
        members {
          id
          name
          image {
            id
            fileName
            fullPath
          }
        }
      }
    }
  }
`

export const CREATE_PROJECT = gql`
  mutation CreateProject(
    $projectName: String!
    $projectType: String!
    $projectDetail: String!
    $dueDate: DateTime!
    $members: [UserWhereUniqueInput!]
    $file: Int!
  ) {
    createOneProject(
      data: {
        projectName: $projectName
        projectType: $projectType
        projectDetail: $projectDetail
        dueDate: $dueDate
        projectImage: { connect: { id: $file } }
        members: { connect: $members }
      }
    ) {
      id
      projectName
      projectType
      projectDetail
      projectImage {
        id
        fileName
        fullPath
      }
      status
      createdAt
      dueDate
      members {
        id
        name
        image {
          id
          fileName
          fullPath
        }
      }
    }
  }
`

export const UPDATE_PROJECT = gql`
  mutation UpdateProject(
    $id: Int!
    $projectName: String!
    $projectDetail: String!
    $projectType: String!
  ) {
    updateOneProject(
      where: { id: $id }
      data: {
        projectName: { set: $projectName }
        projectDetail: { set: $projectDetail }
        projectType: { set: $projectType }
      }
    ) {
      id
      projectName
      projectDetail
      projectType
      status
    }
  }
`

export const DELETE_PROJECT = gql`
  mutation DeleteProject($projectId: Int!) {
    deleteOneProject(where: { id: $projectId }) {
      id
    }
  }
`

export const UPDATE_PROJECT_STATUS = gql`
  mutation UpdateProjectStatus($id: Int!, $status: String) {
    updateOneProject(where: { id: $id }, data: { status: { set: $status } }) {
      id
    }
  }
`

export const ADD_MEMBER_TO_PROJECT = gql`
  mutation addMember($id: Int!, $memberId: Int!) {
    updateOneProject(where: { id: $id }, data: { members: { connect: { id: $memberId } } }) {
      id
      members {
        id
        name
      }
    }
  }
`

export const DELETE_MEMBER_FROM_PROJECT = gql`
  mutation DeleteMemberFromProject($projectId: Int!, $memberId: Int!) {
    updateOneProject(
      where: { id: $projectId }
      data: { members: { disconnect: [{ id: $memberId }] } }
    ) {
      id
    }
  }
`
