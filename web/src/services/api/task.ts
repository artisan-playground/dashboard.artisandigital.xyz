import { gql } from '@apollo/client'

export const TASKS = gql`
  query {
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
        user {
          id
        }
      }
      files {
        file {
          id
          url
          name
          status
          task {
            task {
              id
            }
          }
        }
      }
      comments {
        comment {
          id
          task {
            task {
              id
            }
          }
          users {
            user {
              id
            }
          }
          timestamp
          image
          message
        }
      }
    }
  }
`

export const TASKS_BY_ID = gql`
  query Task($projectId: Int!) {
    task(projectId: $projectId) {
      id
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
        file {
          id
          url
          name
          status
          task {
            task {
              id
            }
          }
        }
      }
      comments {
        comment {
          id
          task {
            task {
              id
            }
          }
          users {
            user {
              id
            }
          }
          timestamp
          image
          message
        }
      }
    }
  }
`

export const TASKS_BY_TASKID = gql`
  query Task($id: Int!) {
    task(id: $id) {
      id
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
        file {
          id
          url
          name
          status
          task {
            task {
              id
            }
          }
        }
      }
      comments {
        comment {
          id
          task {
            task {
              id
            }
          }
          users {
            user {
              id
            }
          }
          timestamp
          image
          message
        }
      }
    }
  }
`

export const TOGGLE_TASK_DONE = gql`
  mutation Task($id: Int!) {
    toggleIsDone(id: $id) {
      id
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
        file {
          id
          url
          name
          status
          task {
            task {
              id
            }
          }
        }
      }
      comments {
        comment {
          id
          task {
            task {
              id
            }
          }
          users {
            user {
              id
            }
          }
          timestamp
          image
          message
        }
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
