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
          name
          image
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
              name
              image
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
  query getTaskByProjectId($id: Int!) {
    getTaskByProjectId(id: $id) {
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
          name
          image
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
              name
              image
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
          name
          image
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
              name
              image
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
  mutation Task($data: TaskUpdateInput!, $id: Int!) {
    updateOneTask(where: { id: $id }, data: { isDone: $data }) {
      id
      taskName
      startTime
      endTime
      taskDetail
      isDone
      members {
        user {
          id
          name
          image
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
              name
              image
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
  mutation CreateTask($data: TaskCreateInput!) {
    createOneTask(data: $data) {
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
    }
  }
`
