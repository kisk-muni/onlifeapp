import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { persistCache } from "apollo-cache-persist"
import createFirebaseLink from 'apollo-link-firebase-ng'
import * as firebase from 'firebase'
import initFirebase from './utils/auth/initFirebase'


/* const config = {
  apiKey: process.env.FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
} */

/* export function checkLoginStatus() {
  return new Promise((resolve, reject) => {
      const unsubscribe = firebase.auth().onAuthStateChanged(user => {
          unsubscribe();
          resolve(user);
      }, reject('api failed'));
  });
} */

export default async function createApolloClient(initialState) {
  // Init the Firebase app.
  initFirebase()
  
  const cache = new InMemoryCache({
    addTypename: true,
  })

  if (typeof window !== 'undefined') {
    try {
      await persistCache({
        cache,
        storage: window.localStorage,
      });  
    } catch (error) {
      console.error('Error restoring Apollo cache', error);
    }
  }

  
  const typeDefs = `
    extend type User {
      uid: String!
      isLoggedIn: Boolean!
    }

    extend type Group {
      name: String
    }

    extend type Query {
      isLoggedIn: Boolean!
      user: User
      groups: [Group]
    }
  `;

  // The `ctx` (NextPageContext) will only be present on the server.
  // use it to extract auth headers (ctx.req) or similar.
  const client = new ApolloClient({
    cache,
    link: createFirebaseLink({
      database: firebase.database(),
    }),
    typeDefs,
    resolvers: {
      userss: async () => {
        return new Promise((resolve, reject) =>
          app.auth().onAuthStateChanged(user => {
              
              if (user) {
                // User is signed in.
                isLoggedIn = !!user
                resolve({isLoggedIn: isLoggedIn, uid: isLoggedIn ? user.uid : "", __typename: 'User'})
              } else {
                // No user is signed in.
                resolve({isLoggedIn: false, uid: "", __typename: 'User'})
              }
            },
            // Prevent console error
            error => reject(error)
          )
        )
      },
      userss: () => {
        let userLoaded = false
        let isLoggedIn = false
        return new Promise((resolve, reject) => {
          if (userLoaded) {
            let user = firebase.auth().currentUser
            isLoggedIn = !!user
            resolve({isLoggedIn: isLoggedIn, uid: isLoggedIn ? user.uid : "", __typename: 'User'})
          }
          const unsubscribe = firebase.auth().onAuthStateChanged(user => {
             userLoaded = true;
             isLoggedIn = !!user
             unsubscribe();
             resolve({isLoggedIn: isLoggedIn, uid: isLoggedIn ? user.uid : "", __typename: 'User'})
          }, reject);
        });
      },
      users: async () => {
        try {
          let user = await checkLoginStatus();
          console.log('try | react side: ', user); 
          if (user && user.email) {
            return {
              uid: user.uid,
              isLoggedIn: true,
              __typename: 'User'
            }  
            /* this.setState({
                  isLoggedIn: true,
              }); */
            console.log('user is found: ', user.email);
          }
        } catch(err) {
          console.log('catch | error: ', err);   
        }

      },
    },
    connectToDevTools: true
  })

  let user = firebase.auth().currentUser
  let isLoggedIn = !!user

  cache.writeData({
    data: {
      user: {
        uid: isLoggedIn ? user.uid : "",
        isLoggedIn: isLoggedIn,
        __typename: "User"
      },
      groups: []
    }
  });

  return client
}
