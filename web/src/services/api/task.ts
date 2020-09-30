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
  mutation UpdateTask($id: Int!, $isDone: Boolean!) {
    updateOneTask(where: { id: $id }, data: { isDone: { set: $isDone } }) {
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
        members: { create: { user: { connect: { id: $members } } } }
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
