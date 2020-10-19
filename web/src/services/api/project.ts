import { gql } from '@apollo/client'

export const PROJECT = gql`
  query {
    projects {
      id
      projectName
      projectType
      projectDetail
      projectImage
      status
      dueDate
      members {
        id
        name
        image
        email
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
          image
        }
      }
    }
  }
`

export const GET_PROJECT_BY_ID = gql`
  query Project($id: Int!) {
    project(where: { id: $id }) {
      id
      projectName
      projectType
      projectDetail
      projectImage
      status
      dueDate
      members {
        id
        email
        name
        image
      }
      tasks {
        id
        taskName
        startTime
        endTime
        taskDetail
        isDone
        members {
          id
          email
          name
          image
        }
        files {
          id
          url
          name
          status
          task {
            id
          }
        }
        comments {
          id
          task {
            id
          }
          timestamp
          image
          message
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
      projectImage
      status
      dueDate
      members {
        id
      }
    }
  }
`

export const UPDATE_PROJECT_NAME = gql`
mutation UpdateProjectName($id: Int!, $projectName: String) {
  updateOneProject(
    where: { id: $id }
    data: { projectName: { set: $projectName } }
  ) {
    id
  }
}
`

export const UPDATE_PROJECT_DETAIL = gql`
mutation UpdateProjectDetail($id: Int!, $projectDetail: String) {
  updateOneProject(
    where: { id: $id }
    data: { projectDetail: { set: $projectDetail } }
  ) {
    id
  }
}
`

export const UPDATE_PROJECT_TYPE = gql`
mutation UpdateProjectType($id: Int!, $projectType: String) {
  updateOneProject(
    where: { id: $id }
    data: { projectType: { set: $projectType } }
  ) {
    id
  }
}
`