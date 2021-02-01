import { gql } from '@apollo/client'

export const TASKS = gql`
  query {
    tasks {
      id
      project {
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
          name
          image {
            id
            fullPath
          }
        }
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
          fullPath
        }
      }
      files {
        id
        fileName
        path
        fullPath
        endpoint
        extension
        task {
          id
        }
      }
      comments {
        id
        task {
          id
        }
        user {
          id
          name
          image {
            id
            fullPath
          }
        }
        timestamp
        message
      }
    }
  }
`

export const TASKS_BY_ID = gql`
  query getTaskByProjectId($id: Int!) {
    getTaskByProjectId(id: $id) {
      id
      project {
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
          name
          image {
            id
            fullPath
          }
        }
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
          fullPath
        }
      }
      files {
        id
        fileName
        path
        fullPath
        endpoint
        extension
        task {
          id
        }
      }
      comments {
        id
        task {
          id
        }
        user {
          id
          name
          image {
            id
            fullPath
          }
        }
        timestamp
        message
      }
    }
  }
`

export const TASKS_BY_TASKID = gql`
  query Task($id: Int!) {
    getTaskById(id: $id) {
      id
      project {
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
          name
          image {
            id
            fullPath
          }
        }
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
          fullPath
        }
      }
      files {
        id
        fileName
        path
        fullPath
        endpoint
        extension
        task {
          id
        }
      }
      comments {
        id
        task {
          id
        }
        user {
          id
          name
          image {
            id
            fullPath
          }
        }
        timestamp
        message
      }
    }
  }
`

export const TOGGLE_TASK_DONE = gql`
  mutation UpdateTask($id: Int!, $isDone: Boolean!) {
    updateOneTask(where: { id: $id }, data: { isDone: { set: $isDone } }) {
      id
      project {
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
          name
          image {
            id
            fullPath
          }
        }
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
          fullPath
        }
      }
      files {
        id
        fileName
        path
        fullPath
        endpoint
        extension
        task {
          id
        }
      }
      comments {
        id
        task {
          id
        }
        user {
          id
          name
          image {
            id
            fullPath
          }
        }
        timestamp
        message
      }
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
    $members: [UserWhereUniqueInput!]
  ) {
    createOneTask(
      data: {
        project: { connect: { id: $projectId } }
        taskName: $taskName
        taskDetail: $taskDetail
        startTime: $startTime
        endTime: $endTime
        members: { connect: $members }
      }
    ) {
      id
      project {
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
          name
          image {
            id
            fullPath
          }
        }
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
          fullPath
        }
      }
      files {
        id
        fileName
        path
        fullPath
        endpoint
        extension
        task {
          id
        }
      }
      comments {
        id
        task {
          id
        }
        user {
          id
          name
          image {
            id
            fullPath
          }
        }
        timestamp
        message
      }
    }
  }
`

export const UPDATE_TASK = gql`
  mutation UpdateTask($id: Int!, $taskName: String!, $taskDetail: String!, $taskType: String!) {
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

export const UPDATE_TASK_MEMBER = gql`
  mutation UpdateTaskMember($id: Int!, $members: [UserWhereUniqueInput!]) {
    updateOneTask(where: { id: $id }, data: { members: { connect: $members } }) {
      id
      members {
        id
        name
      }
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

export const DELETE_MEMBER_FROM_TASK = gql`
  mutation DeleteMemberFromTask($taskId: Int!, $members: Int!) {
    updateOneTask(where: { id: $taskId }, data: { members: { disconnect: [{ id: $members }] } }) {
      id
    }
  }
`
