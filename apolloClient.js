import { resolvers, typeDefs } from "./resolvers";
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
//import createFirebaseLink from 'apollo-link-firebase-ng'
//import { createFirestoreLink } from 'apollo-link-cloud-firestore'

export default function createApolloClient(initialState, ctx) {
  // The `ctx` (NextPageContext) will only be present on the server.
  // use it to extract auth headers (ctx.req) or similar.
  
  let cache = new InMemoryCache().restore(initialState)
  const client =  new ApolloClient({
    cache,
    ssrMode: Boolean(ctx),
    /* link: createFirestoreLink({
      database: firebase.database(),
      partialSchema: 
    }), */
    typeDefs,
    resolvers
  })

  return client
}
