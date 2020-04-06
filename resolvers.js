import gql from "graphql-tag";
import * as firebase from 'firebase'
import initFirebase from './utils/auth/initFirebase'
// Required for side-effects
require("firebase/firestore");
initFirebase()
const db = firebase.firestore()

export const typeDefs = gql`
extend type Query {
  isLoggedIn: Boolean!
  cartItems: [ID!]!
}

extend type Launch {
  isInCart: Boolean!
}

extend type Mutation {
  addOrRemoveFromCart(id: ID!): [ID!]!
}
`;

export const resolvers = {
  Query: {
    async currentUser(obj, {id}, {cache}, info) {
      try {
        let user = await db.collection("users").doc(id).get()
        if (user.exists) {
          return {
            ...user.data(),
            id: id,
            __typename: 'CurrentUser'
          }
        }
        
      } catch (error) {
        
      }
    },
    async user() {
      try {
        const user = await new Promise((resolve, reject) =>
        firebase.auth().onAuthStateChanged(
          user => {
            if (user) {
              resolve(user) // User is signed in.
            } else {
              reject('no user logged in') // No user is signed in.
            }
          },
          // Prevent console error
          error => reject(error)
          )
          )
          console.log(user.displayName, 'islogged in')
          return {
            isLoggedIn: true,
            name: user.displayName ? user.displayName : '',
            email: user.email ? user.email : '',
            id: user.uid ? user.uid : '',
            photoURL: user.photoURL ? user.photoURL : '',
            __typename: 'CurrentUser'
          }
        } catch (error) {
          console.log('should not be logged')
          return {
            isLoggedIn: false,
            name: '',
            email: '',
            photoURL: '',
            id: '',
            __typename: 'CurrentUser'
          }
        }
      },
    },
    Mutation: {
      async logout(obj, args, {cache, getCacheKey}, info) {
        try {
          const id = getCacheKey({ __typename: 'CurrentUser' })
          const loggedOutUser = {
            isLoggedIn: false,
            name: '',
            email: '',
            photoURL: '',
            id: '',
            __typename: 'CurrentUser'
          }
          cache.writeData({ id, loggedOutUser });
          return null
          
        } catch (error) {
          return null
        }
      }
    }
  };