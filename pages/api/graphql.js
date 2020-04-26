import { ApolloServer, AuthenticationError, UserInputError, ValidationError } from 'apollo-server-micro'
import { schema } from '../../apollo/schema'
import * as admin from 'firebase-admin'

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_CREDENTIALS_JSON_STRING)),
    databaseURL: process.env.FIREBASE_DATABASE_URL
  })
}

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
    
    let userRef = await admin.firestore().collection("users").doc(firebaseUser.uid).get()
    let isTeacher = false
    let isInGroup = false
    if (userRef.exists) {
      isTeacher = userRef.data().isTeacher
      isInGroup = userRef.data().isInGroup
    }
    const user = {
      id: firebaseUser.uid,
      isTeacher: isTeacher || false,
      isInGroup: isInGroup || false,
      email: firebaseUser.email || '',
      name: firebaseUser.name || '',
      photoURL: firebaseUser.picture || '',
    }
    return { user: user }
    //return { user: { id: claims.user_id, email: claims.email, name: claims.displayName } };
  } catch (err) {
    return { user: null };
  }
};

const apolloServer = new ApolloServer({
  schema,
  formatError: (err) => {
    if (
      err.originalError instanceof AuthenticationError ||
      err.originalError instanceof UserInputError ||
      err.originalError instanceof ValidationError
    ) {
      console.log('condition not')
      return err;
    }
    // Don't give the other errors to the client.
    console.log(err)
    return new Error('Internal server error');
  },
  context
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default apolloServer.createHandler({ path: '/api/graphql' })
