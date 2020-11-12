import { ApolloClient, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { createUploadLink } from 'apollo-upload-client'

const httpLink = createUploadLink({
  uri: 'https://develop-artisan-dashboard-backend-utkbnolsxq-as.a.run.app/graphql',
})

const authLink = setContext((_, { headers }) => {
  const token = ''
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})
