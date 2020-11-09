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
          fullPath
        }
        status
        dueDate
        members {
          id
          name
          image {
            fullPath
          }
        }
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
          fullPath
        }
      }
      files {
        id
        path
        fileName
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
            fullPath
          }
        }
        timestamp
        image
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
          fullPath
        }
        status
        dueDate
        members {
          id
          name
          image {
            fullPath
          }
        }
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
          fullPath
        }
      }
      files {
        id
        path
        fileName
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
            fullPath
          }
        }
        timestamp
        image
        message
      }
    }
  }
`

export const TASKS_BY_TASKID = gql`
  query Task($id: Int!) {
    task(id: $id) {
      id
      project {
        id
        projectName
        projectType
        projectDetail
        projectImage {
          fullPath
        }
        status
        dueDate
        members {
          id
          name
          image {
            fullPath
          }
        }
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
          fullPath
        }
      }
      files {
        id
        path
        fileName
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
            fullPath
          }
        }
        timestamp
        image
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
          fullPath
        }
        status
        dueDate
        members {
          id
          name
          image {
            fullPath
          }
        }
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
          fullPath
        }
      }
      files {
        id
        path
        fileName
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
            fullPath
          }
        }
        timestamp
        image
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
        projectName
        projectType
        projectDetail
        projectImage {
          fullPath
        }
        status
        dueDate
        members {
          id
          name
          image {
            fullPath
          }
        }
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
          fullPath
        }
      }
      files {
        id
        path
        fileName
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
            fullPath
          }
        }
        timestamp
        image
        message
      }
    }
  }
`

export const UPDATE_TASK_NAME = gql`
  mutation UpdateTaskName($id: Int!, $taskName: String!) {
    updateOneTask(where: { id: $id }, data: { taskName: { set: $taskName } }) {
      id
    }
  }
`

export const UPDATE_TASK_DETAIL = gql`
  mutation UpdateTaskDetail($id: Int!, $taskDetail: String!) {
    updateOneTask(where: { id: $id }, data: { taskDetail: { set: $taskDetail } }) {
      id
    }
  }
`

export const UPDATE_TASK_MEMBER = gql`
  mutation UpdateTaskMember($id: Int!, $members: Int!) {
    updateOneTask(where: { id: $id }, data: { members: { connect: { id: $members } } }) {
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
