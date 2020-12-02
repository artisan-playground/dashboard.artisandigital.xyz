import gql from 'graphql-tag'

export const ALL_PROJECT_QUERY = gql`
  query {
    projects {
      id
      projectName
      projectType
      projectImage {
        id
        fullPath
      }
      projectDetail
      status
      dueDate
      members {
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

export const PROJECT_QUERY = gql`
  query($projectId: Int!) {
    project(id: $projectId) {
      id
      projectName
      projectType
      projectImage {
        id
        fullPath
      }
      projectDetail
      status
      dueDate
      tasks {
        id
        taskName
        startTime
        endTime
        taskDetail
        isDone
        members {
          id
          image {
            id
            fullPath
          }
        }
      }
      members {
        id
        name
        image {
          id
          fullPath
        }
      }
    }
  }
`

export const PROJECT_STATUS = gql`
  mutation UpdateProject($id: Int!, $data: ProjectUpdateInput!) {
    updateOneProject(where: { id: $id }, data: $data) {
      id
      status
    }
  }
`

export const ADD_PROJECT = gql`
  mutation CreateProject($data: ProjectCreateInput!) {
    createOneProject(data: $data) {
      id
      projectName
      projectType
      projectDetail
      projectImage {
        id
        fullPath
      }
      status
      dueDate
      members {
        id
      }
    }
  }
`

export const ADD_MEMBER_TO_PROJECT = gql`
  mutation updateProject($id: Int!, $data: ProjectUpdateInput!) {
    updateOneProject(where: { id: $id }, data: $data) {
      id
      members {
        id
      }
    }
  }
`

export const DELETE_MEMBER_FROM_PROJECT = gql`
  mutation UpdateUserProject($projectId: Int!, $memberId: Int!) {
    updateOneProject(
      where: { id: $projectId }
      data: { members: { disconnect: { id: $memberId } } }
    ) {
      id
      projectName
      members {
        id
      }
    }
  }
`

export const EDIT_PROJECT = gql`
  mutation UpdateProject(
    $id: Int!
    $projectName: String
    $projectDetail: String
    $projectType: String
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
  mutation deleteOneProject($id: Int!) {
    deleteOneProject(where: { id: $id }) {
      id
    }
  }
`
