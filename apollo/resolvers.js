import { AuthenticationError, UserInputError } from 'apollo-server-micro'
import cookie from 'cookie'
import jwt from 'jsonwebtoken'
import getConfig from 'next/config'
import * as moment from 'moment'
import bcrypt from 'bcrypt'
import v4 from 'uuid/v4'
import { customAlphabet } from 'nanoid'
import * as firebase from 'firebase'
import topics from '../data/topics'
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

async function createGroupInvitationCode(groupRef) {
  const nanoid = customAlphabet('123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ', 6)
  // generate invitation code and check if exists until its unique
  let id = ''
  do {
    id = nanoid()
  } while (await db.collection('invitationCodes').doc(id).get().exists);
  // now we have unique id guaranteed
  await db.collection('invitationCodes').doc(id).set({group: groupRef})
  return id
}

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
    async topic(obj, {id}, context, info) {    
      return topics.find(topic => topic.id === id)
    },
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
        console.log(groupData)
        return {
          id: group.id,
          name: groupData.name,
          invitationCode: groupData.invitationCode || '',
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
        let colors = ['orange', 'green', 'blue', 'red', 'black']
        let i = 0
        groupsRef.forEach(doc => {
          let data = doc.data()
          groups.push({
            id: doc.id,
            name: data.name,
            color: colors[i%colors.length],
          })
          i+=1
        });
        return groups.reverse()
      } catch (error) {
        console.log(error)
        return null
      }
    },
    async groupsSelect(obj, args, {user}, info) {
      //console.log(user)
      try {
        let groupsRef = await db.collection("groups").where("userId", "==", user.id).get()
        let groups = []
        groupsRef.forEach(doc => {
          let data = doc.data()
          groups.push({
            id: doc.id,
            name: data.name,
            link: "/trida/" + doc.id,
          })
        });
        groups.push({link: '/ucitel', name: 'Přehled tříd'})
        return groups.reverse()
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
      try {
        console.log(topics)
        return topics
      } catch (error) {
        return []
      } 
    }
  },
  Mutation: {
    async joinGroupAttempt(_paremt, {input}, {user}, _info) {
      const maxAttemptsCount = 6
      const maxTotalAttemptsCount = 60
      let attemptRef = await db.collection('joinGroupAttempts').doc(user.id).get() 
      if (attemptRef.exists) {

        if (attemptRef.data().used) {
          throw new UserInputError('Vaše možnost připojení ke třídě již byla vyčerpána.')
        }
        let count = attemptRef.data().count + 1
        if (count > maxAttemptsCount) {
          if (moment(attemptRef.data().lastUpdateAt.toDate()).isAfter(moment().subtract(1, 'hours'))) {
            // surpased max counts in time window
            throw new UserInputError('Překročili jste maximální počet pokusů. Zkuste to prosím později.')
          } else {
            // surpased max counts but should be able to continue
            count = 1
          }
        }
        let totalCount = attemptRef.data().totalCount + 1
        if (totalCount > maxTotalAttemptsCount) {
          throw new UserInputError('Překročili jste celkový maximální počet pokusů. Pokud chcete pokračovat, kontaktujte nás.')
        }
        // update existing attempt
        attemptRef = await db.collection('joinGroupAttempts').doc(user.id).update({
          count: count,
          totalCount: totalCount,
          lastUpdateAt: admin.firestore.FieldValue.serverTimestamp()
        })
      } else {
        // attempt does not exist create an attempt
        attemptRef = await db.collection('joinGroupAttempts').doc(user.id).set({
          count: 1,
          used: false,
          totalCount: 1,
          lastUpdateAt: admin.firestore.FieldValue.serverTimestamp(),
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
        })
      }
      // check code
      let invitationCodeRef = await db.collection('invitationCodes').doc(input.code).get()
      if (!invitationCodeRef.exists) {
        throw new UserInputError('Zadaný kód je neplatný.')
      }
      // user is allowed to continue
      return {
        name: 'sfafasd'
      }
    },
    async joinGroup(_parent, args, {user}, _info) {
      console.log('resolver joinGroup invoked')
      // check last attempt
      // join group
      return {
        joined: true
      }
    },
    async addGroup(_parent, {input}, {user}, _info) {
      try {
        let groupRef = await db.collection("groups").add({
          name: input.name,
          userId: user.id,
        })
        let invitationId = await createGroupInvitationCode(groupRef)
        groupRef.update({invitationCode: invitationId})
        return {
          name: input.name,
          color: 'orange',
          id: groupRef.id
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
