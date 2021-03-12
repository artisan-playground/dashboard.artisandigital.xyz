import gql from 'graphql-tag'

export const TASK_QUERY = gql`
  query Task($taskId: Int!) {
    getTaskById(id: $taskId) {
      id
      isDone
      taskName
      taskType
      taskDetail
      startTime
      endTime
      project {
        id
        projectName
        projectType
        dueDate
        members {
          id
          name
          image {
            id
            fullPath
          }
        }
      }
      members {
        id
        name
        position
        department
        type
        startDate
        dueDate
        image {
          id
          fullPath
        }
      }
      comments {
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
      }
      files {
        id
        fileName
        fullPath
        path
        extension
        endpoint
      }
    }
  }
`
export const TOGGLE_STATUS = gql`
  mutation UpdateTask($id: Int!, $data: TaskUpdateInput!) {
    updateOneTask(where: { id: $id }, data: $data) {
      id
      isDone
    }
  }
`

export const ADD_TASK = gql`
  mutation CreateTask(
    $projectId: Int!
    $taskName: String!
    $taskType: String!
    $taskDetail: String!
    $startTime: DateTime!
    $endTime: DateTime!
    $isDone: Boolean!
    $members: [UserWhereUniqueInput!]
  ) {
    createOneTask(
      data: {
        project: { connect: { id: $projectId } }
        taskName: $taskName
        taskType: $taskType
        taskDetail: $taskDetail
        startTime: $startTime
        endTime: $endTime
        isDone: $isDone
        members: { connect: $members }
      }
    ) {
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
      }
      files {
        id
        fileName
        fullPath
        path
        extension
        endpoint
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
        message
      }
    }
  }
`

export const EDIT_TASK = gql`
  mutation UpdateTask($id: Int!, $taskName: String, $taskDetail: String, $taskType: String) {
    updateOneTask(
      where: { id: $id }
      data: {
        taskName: { set: $taskName }
        taskDetail: { set: $taskDetail }
        taskType: { set: $taskType }
      }
    ) {
      id
      taskName
      taskDetail
      taskType
    }
  }
`

export const DELETE_TASK = gql`
  mutation DeleteTask($id: Int!) {
    deleteOneTask(where: { id: $id }) {
      id
    }
  }
`

export const ADD_MEMBER_TO_TASK = gql`
  mutation($id: Int!, $members: [UserWhereUniqueInput!]) {
    updateOneTask(where: { id: $id }, data: { members: { connect: $members } }) {
      id
      members {
        id
        name
      }
    }
  }
`

export const DELETE_MEMBER_IN_TASK = gql`
  mutation deleteMemInTask($taskId: Int!, $memberId: Int!) {
    updateOneTask(where: { id: $taskId }, data: { members: { disconnect: { id: $memberId } } }) {
      id
      members {
        id
        name
      }
    }
  }
`
