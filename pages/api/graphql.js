import { ApolloServer } from 'apollo-server-micro'
import { schema } from '../../apollo/schema'

// https://www.apollographql.com/docs/apollo-server/features/authentication.html
const context = async ({ req, res }) => {
  const { addSession } = require('../../lib/middleware/cookieSession')
      addSession(req, res)
  //await applySession(req)
  // Take the cookies sessions token that was populated via the firebase admin sdk
  //console.log('\n\nGRAPHQL', req.session?.decodedToken)
  const firebaseUser = req.session?.decodedToken;
  
  try {
    // verify token including revocation check
    // if it fails in anyway set context of user to null
    console.log('\nGRAPHQL CONTEXT\n', firebaseUser)
    
    return { user: {
      id: firebaseUser.uid,
      email: firebaseUser.email || '',
      name: firebaseUser.name || '',
      photoURL: firebaseUser.picture || '',
    } }
    //return { user: { id: claims.user_id, email: claims.email, name: claims.displayName } };
  } catch (err) {
    return { user: null };
  }
};

const apolloServer = new ApolloServer({
  schema,
  context
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default apolloServer.createHandler({ path: '/api/graphql' })
