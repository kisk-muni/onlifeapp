import { AuthenticationError, UserInputError } from 'apollo-server-micro'
import cookie from 'cookie'
import jwt from 'jsonwebtoken'
import getConfig from 'next/config'
import bcrypt from 'bcrypt'
import v4 from 'uuid/v4'
import * as firebase from 'firebase'
import initFirebase from '../utils/auth/initFirebase'
// Required for side-effects
import * as admin from 'firebase-admin'
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_CREDENTIALS_JSON_STRING)),
    databaseURL: process.env.FIREBASE_DATABASE_URL
  })
}
const rdb = admin.database();
//require("firebase/firestore");
// initFirebase()
//const db = firebase.firestore()

const JWT_SECRET = getConfig().serverRuntimeConfig.JWT_SECRET

const users = []

function createUser(data) {
  const salt = bcrypt.genSaltSync()

  return {
    id: v4(),
    email: data.email,
    hashedPassword: bcrypt.hashSync(data.password, salt),
  }
}

function validPassword(user, password) {
  return bcrypt.compareSync(password, user.hashedPassword)
}

export const resolvers = {
  Query: {
    async groups(obj, args, {user}, info) {
      //console.log(user)
      return await [{name: 'neco', id: 'nejkakeid'}, {name: 'neco jineho', id: 'dsfasf'}]
      
      /* try {
        let group = await db.collection("groups").where("userId", "==", user.id).get()
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
        
      } */
    },
    async user(obj, args, {user}) {
      console.log('User Resolver:', user)
      return user
    },
    async quizz(obj, {quizz}, {cache}, info) {
      try {
        let quizz_ref = await firebase.database().ref('sheets/' + quizz).once('value')
        return {
          ...quizz_ref.val()
        }
      } catch (error) {
        return { quizz: null }
      }  
    },
    async topics(obj, args, context, info) {
      return {
        topics: []
      }
      try {
        let topics = await rdb.ref('/sheets').once('value')
      } catch (error) {
        return {
          topics: []
        }
      }
    }
  },
  Mutation: {
    async signUp(_parent, args, _context, _info) {
      const user = createUser(args.input)

      users.push(user)

      return { user }
    },

    async signIn(_parent, args, context, _info) {
      const user = users.find(user => user.email === args.input.email)

      if (user && validPassword(user, args.input.password)) {
        const token = jwt.sign(
          { email: user.email, id: user.id, time: new Date() },
          JWT_SECRET,
          {
            expiresIn: '6h',
          }
        )

        context.res.setHeader(
          'Set-Cookie',
          cookie.serialize('token', token, {
            httpOnly: true,
            maxAge: 6 * 60 * 60,
            path: '/',
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
          })
        )

        return { user }
      }

      throw new UserInputError('Invalid email and password combination')
    },
    async signOut(_parent, _args, context, _info) {
      context.res.setHeader(
        'Set-Cookie',
        cookie.serialize('token', '', {
          httpOnly: true,
          maxAge: -1,
          path: '/',
          sameSite: 'lax',
          secure: process.env.NODE_ENV === 'production',
        })
      )

      return true
    },
  },
}
