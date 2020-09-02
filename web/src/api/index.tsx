import { ApolloClient, gql, InMemoryCache } from '@apollo/client'

export const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
})

client
  .query({
    query: gql`
      query {
        getUsers {
          id
          name
          email
          image
        }
      }
    `,
  })
  .then((result) => console.log(result))

export const PROJECT = gql`
  query {
    getProjects {
      id
      projectName
      projectType
      projectDetail
      projectImage
      status
      dueDate
      memberIds {
        id
        email
        name
        image
      }
    }
  }
`

export const TASKS = gql`
  query {
    getProjects {
      id
      projectId
      taskName
      time
      taskDetail
      isDone
      memberIds {
        id
        name
        email
        image
      }
      files {
        uid
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
  query Tasks($projectId: String!) {
    getTaskByProjectId(projectId: $projectId) {
      id
      projectId
      taskName
      time
      taskDetail
      isDone
      memberIds {
        id
        name
        email
        image
      }
      files {
        uid
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
  query Tasks($id: String!) {
    getTaskById(id: $id) {
      id
      projectId
      taskName
      time
      taskDetail
      isDone
      memberIds {
        id
        name
        email
        image
      }
      files {
        uid
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
  mutation Tasks($id: String!) {
    toggleIsDone(id: $id) {
      id
      projectId
      taskName
      time
      taskDetail
      isDone
      memberIds {
        id
        name
        email
        image
      }
      files {
        uid
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

export const GET_USERS = gql`
  query User {
    getUsers {
      id
      name
      email
      image
    }
  }
`
