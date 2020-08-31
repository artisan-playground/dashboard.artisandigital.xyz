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
