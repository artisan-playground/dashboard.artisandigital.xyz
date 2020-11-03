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
      projectImageId
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

export const MEMBER_QUERY = gql`
  query User($memberId: Int!) {
    user(where: { id: $memberId }) {
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
        projectImage
        status
        projectDetail
        members {
          id
          name
          image {
            id
            fullPath
          }
        }
      }
      tasks {
        id
        taskName
        taskDetail
      }
    }
  }
`

export const PROJECT_QUERY = gql`
  query($projectId: Int!) {
    project(where: { id: $projectId }) {
      id
      projectName
      projectType
      projectImage
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
          fileName
        }
      }
    }
  }
`
export const TASK_QUERY = gql`
  query Task($taskId: Int!) {
    task(where: { id: $taskId }) {
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
            fileName
          }
        }
      }
      members {
        id
        name
        image {
          fileName
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
