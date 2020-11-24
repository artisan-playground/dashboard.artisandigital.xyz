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
          id
          fullPath
          fileName
        }
      }
    }
  }
`

export const EVENT_QUERY = gql`
  query Event($eventId: Int!) {
    getEventById(id: $eventId) {
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
          id
          fullPath
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

export const PROJECT_STATUS = gql`
  mutation UpdateProject($id: Int!, $data: ProjectUpdateInput!) {
    updateOneProject(where: { id: $id }, data: $data) {
      id
      status
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

export const ADD_COMMENT = gql`
  mutation CreateComment($timestamp: DateTime!, $message: String!, $taskId: Int!, $userId: Int!) {
    createOneComment(
      data: {
        timestamp: $timestamp
        message: $message
        task: { connect: { id: $taskId } }
        user: { connect: { id: $userId } }
      }
    ) {
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
`

export const DELETE_COMMENT = gql`
  mutation deleteComment($id: Int!) {
    deleteOneComment(where: { id: $id }) {
      id
    }
  }
`

export const ADD_PROJECT = gql`
  mutation CreateProject($data: ProjectCreateInput!) {
    createOneProject(data: $data) {
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
      }
    }
  }
`

export const ADD_MEMBER_TO_PROJECT = gql`
  mutation updateProject($id: Int!, $data: ProjectUpdateInput!) {
    updateOneProject(where: { id: $id }, data: $data) {
      id
      members {
        id
      }
    }
  }
`
