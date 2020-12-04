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
      dueDate
      members {
        id
        name
        email
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
      dueDate
      members {
        id
        name
        email
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
    $projectImage: String!
    $dueDate: DateTime!
    $members: Int!
  ) {
    createOneProject(
      data: {
        projectName: $projectName
        projectType: $projectType
        projectDetail: $projectDetail
        projectImage: $projectImage
        dueDate: $dueDate
        members: { connect: [{ id: $members }] }
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
    $projectName: String
    $projectDetail: String
    $projectType: String
    $status: String
  ) {
    updateOneProject(
      where: { id: $id }
      data: {
        projectName: { set: $projectName }
        projectDetail: { set: $projectDetail }
        projectType: { set: $projectType }
        status: { set: $status }
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

export const UPDATE_PROJECT_NAME = gql`
  mutation UpdateProjectName($id: Int!, $projectName: String) {
    updateOneProject(where: { id: $id }, data: { projectName: { set: $projectName } }) {
      id
    }
  }
`

export const UPDATE_PROJECT_DETAIL = gql`
  mutation UpdateProjectDetail($id: Int!, $projectDetail: String) {
    updateOneProject(where: { id: $id }, data: { projectDetail: { set: $projectDetail } }) {
      id
    }
  }
`

export const UPDATE_PROJECT_TYPE = gql`
  mutation UpdateProjectType($id: Int!, $projectType: String) {
    updateOneProject(where: { id: $id }, data: { projectType: { set: $projectType } }) {
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
