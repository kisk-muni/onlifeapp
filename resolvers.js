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
    async currentUserGroups(obj, {id}, {cache}, info) {
      try {
        let group = await db.collection("groups").where("userId", "==", id).get()
        let groups = []
        group.forEach(doc => {
          groups.push({
            id: doc.id,
            ...doc.data(),
            __typename: 'Group'
          })
        });
        console.log(groups)
        return {
          groups: groups,
          __typename: 'CurrentUserGroups'
        }
      } catch (error) {
        
      }
    },
    async user(obj, args, context, info) {

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
          // console.log('should not be logged')
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
      async topics(obj, args, {cache}, info) {
        try {
          console.log('trying get topics')
          let topics = await firebase.database().ref('/sheets').once('value')
          let topics_array = []
          topics.forEach(topic => {
            let subtopics = []
            for (let [key, value] of Object.entries(topic.val())) {
              subtopics.push({
                __typename: 'SubTopic',
                name: key,
                display: value.display || false,
                link: value.link  || 'false' 
              })
            }
            topics_array.push({
              __typename: 'Topic',
              name: topic.key,
              subtopics: subtopics
            })
          })
          console.log(topics_array)
          return {
            topics: topics_array,
            __typename: 'Topics'
          }
        } catch (error) {
          
        }  
      },
      async quizz(obj, {quizz}, {cache}, info) {
        try {
          let quizz_ref = await firebase.database().ref('sheets/' + quizz).once('value')
          return {
            ...quizz_ref.val(),
            __typename: 'Quizz'
          }
        } catch (error) {
          
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
      },
      async addGroup(obj, {name, uid}, context, info) {
        try {
          let docref = await db.collection("groups").add({
            name: name,
            userId: uid
          })
          console.log({
            name: name,
            userId: uid
          })
          return {
            name: name,
            id: docref.id,
            __typename: 'Group'
          }
          
        } catch (error) {
          return null
        }
      }
    }
  };