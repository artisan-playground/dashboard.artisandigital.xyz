import gql from 'graphql-tag'

// Query
export const ALL_EVENT = gql`
  query {
    events {
      id
      eventName
      eventDate
      endDate
      note
      tag
      invited {
        id
        email
        name
        image {
          fileName
        }
      }
    }
  }
`

export const ALL_MEMBER_QUERY = gql`
  query Users {
    users {
      id
      name
      image {
        id
        fullPath
      }
      email
      department
      position
      type
      skills
      startDate
      dueDate
    }
  }
`

export const ALL_PROJECT_QUERY = gql`
  query {
    projects {
      id
      projectName
      projectType
      projectImage {
        id
        fullPath
      }
      projectDetail
      status
      dueDate
      members {
        id
        name
        email
        image {
          id
          fullPath
        }
      }
    }
  }
`

export const ALL_COMMENT_QUERY = gql`
  query comment {
    comments {
      id
      user {
        id
        name
        image {
          id
          fullPath
        }
      }
      task {
        id
        taskName
      }
      timestamp
      image
      message
    }
  }
`

export const MEMBER_QUERY = gql`
  query User($userId: Int!) {
    user(id: $userId) {
      id
      name
      image {
        id
        fullPath
      }
      email
      department
      position
      type
      skills
      startDate
      dueDate
      projects {
        id
        projectName
        projectType
        status
        members {
          id
          image {
            id
            fullPath
          }
        }
        projectImage {
          id
          fullPath
        }
        projectDetail
      }
      tasks {
        id
        taskName
        taskDetail
        isDone
      }
    }
  }
`

export const PROJECT_QUERY = gql`
  query($projectId: Int!) {
    project(id: $projectId) {
      id
      projectName
      projectType
      projectImage {
        id
        fullPath
      }
      projectDetail
      status
      dueDate
      tasks {
        id
        taskName
        startTime
        endTime
        taskDetail
        isDone
        members {
          id
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
    }
  }
`
export const TASK_QUERY = gql`
  query Task($taskId: Int!) {
    getTaskById(id: $taskId) {
      id
      isDone
      taskName
      taskDetail
      project {
        id
        projectName
        projectType
        dueDate
        members {
          id
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

// Mutation
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
        url
        name
        status
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
