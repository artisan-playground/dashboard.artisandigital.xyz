import gql from 'graphql-tag'

export const TASK_QUERY = gql`
  query Task($taskId: Int!) {
    getTaskById(id: $taskId) {
      id
      isDone
      taskName
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
    $taskDetail: String!
    $startTime: DateTime!
    $endTime: DateTime!
    $isDone: Boolean!
    $members: Int!
  ) {
    createOneTask(
      data: {
        project: { connect: { id: $projectId } }
        taskName: $taskName
        taskDetail: $taskDetail
        startTime: $startTime
        endTime: $endTime
        isDone: $isDone
        members: { connect: [{ id: $members }] }
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
        image
        message
      }
    }
  }
`

export const EDIT_TASK = gql`
  mutation UpdateTask($id: Int!, $taskName: String, $taskDetail: String) {
    updateOneTask(
      where: { id: $id }
      data: { taskName: { set: $taskName }, taskDetail: { set: $taskDetail } }
    ) {
      id
      taskName
      taskDetail
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
  mutation UpdateTask($id: Int!, $data: TaskUpdateInput!) {
    updateOneTask(where: { id: $id }, data: $data) {
      id
      members {
        id
      }
    }
  }
`

export const DELETE_MEMBER_IN_TASK = gql`
  mutation deleteMemInTask($taskId: Int!, $memberId: Int!) {
    updateOneTask(where: { id: $taskId }, data: { members: { disconnect: { id: $memberId } } }) {
      id
    }
  }
`
