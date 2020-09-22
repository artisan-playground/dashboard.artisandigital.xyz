import { gql } from '@apollo/client'

export const TASKS = gql`
  query {
    tasks {
      id
      projectId
      taskName
      startTime
      endTime
      taskDetail
      isDone
      members {
        user{
          id
        }
      }
      files {
        id
        url
        name
        status
      }
      comments {
        id
        timestamp
        userId
        image
        userImg
        userName
        message
        taskId
      }
    }
  }
`

export const TASKS_BY_ID = gql`
  query Task($projectId: String!) {
    task(projectId: $projectId) {
      id
      projectId
      taskName
      startTime
      endTime
      taskDetail
      isDone
      memberIds {
        id
        name
        email
        image
      }
      files {
        id
        url
        name
        status
      }
      comments {
        id
        timestamp
        userId
        image
        userImg
        userName
        message
        taskId
      }
    }
  }
`

export const TASKS_BY_TASKID = gql`
  query Task($id: String!) {
    task(id: $id) {
      id
      projectId
      taskName
      startTime
      endTime
      taskDetail
      isDone
      memberIds {
        id
        name
        email
        image
      }
      files {
        id
        url
        name
        status
      }
      comments {
        id
        timestamp
        userId
        image
        userImg
        userName
        message
        taskId
      }
    }
  }
`

export const TOGGLE_TASK_DONE = gql`
  mutation Task($id: String!) {
    toggleIsDone(id: $id) {
      id
      projectId
      taskName
      startTime
      endTime
      taskDetail
      isDone
      members {
        user {
          id
        }
      }
      files {
        id
        url
        name
        status
      }
      comments {
        id
        timestamp
        userId
        image
        userImg
        userName
        message
        taskId
      }
    }
  }
`

export const ADD_TASK = gql`
  mutation CreateTaskInput($input: CreateTaskInput) {
    createTask(input: $input) {
      id
      projectId
      taskName
      startTime
      endTime
      taskDetail
      isDone
    }
  }
`
