import gql from 'graphql-tag'

export const CREATE_RECENT = gql`
  mutation addRecentActivity($message: String!, $userId: Int!, $projectId: Int!) {
    createOneRecentActivity(
      data: {
        message: $message
        user: { connect: { id: $userId } }
        project: { connect: { id: $projectId } }
      }
    ) {
      id
      message
      timestamp
      user {
        id
        image {
          id
          fullPath
        }
        name
      }
      project {
        id
      }
    }
  }
`

export const QUERY_RECENT = gql`
  query getRecentActivityByProjectId($projectId: Int!) {
    getRecentActivityByProjectId(id: $projectId) {
      id
      message
      timestamp
      user {
        id
        name
      }
      project {
        id
        projectName
      }
    }
  }
`
