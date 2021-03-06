import { gql } from '@apollo/client'

export const RECENT_ACTIVITY = gql`
  query {
    recentActivities {
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

export const RECENT_ACTIVITY_BY_PROJECT_ID = gql`
  query recentActivityByProjectId($id: Int!) {
    getRecentActivityByProjectId(id: $id) {
      id
      message
      timestamp
      user {
        id
        name
        image {
          id
          fullPath
        }
      }
      project {
        id
      }
    }
  }
`

export const ADD_RECENT_ACTIVITY = gql`
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
