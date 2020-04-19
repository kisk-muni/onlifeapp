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
const db = admin.firestore()

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
    async group(obj, {id}, {user}, info) {
      //console.log(user)
      try {
        let group = await db.collection("groups").doc(id).get()
        if (!group.exists) {
          throw 'No such document!'
        }
        let groupData = group.data()
        if (groupData.userId !== user.id) {
          throw "User is not owner of group."
        }
        return {
          id: group.id,
          name: groupData.name,
          color: 'orange',
        }
      } catch (error) {
        return null
      }
    },
    async groups(obj, args, {user}, info) {
      //console.log(user)
      try {
        let groupsRef = await db.collection("groups").where("userId", "==", user.id).get()
        let groups = []
        groupsRef.forEach(doc => {
          let data = doc.data()
          groups.push({
            id: doc.id,
            name: data.name,
            color: 'orange',
          })
        });
        return groups
      } catch (error) {
        console.log(error)
        return null
      }
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
    async addGroup(_parent, {input}, {user}, _info) {
      try {
        let docRef = await db.collection("groups").add({
          name: input.name,
          userId: user.id
        })
        return {
          name: input.name,
          color: 'orange',
          id: docRef.id
        }
      } catch (error) {
        return null
      }
    },
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
