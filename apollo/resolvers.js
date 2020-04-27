import { AuthenticationError, UserInputError, ValidationError } from 'apollo-server-micro'
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
      if (
        typeof input.code !== 'string' ||
        input.code.length !== 6
      ) {
        throw new ValidationError('Zadaný kód je neplatný.')
      }
      const maxAttemptsCount = 6
      const maxTotalAttemptsCount = 60
      let attemptRef = db.collection('joinGroupAttempts').doc(user.id) 
      let attempt = await attemptRef.get()
      if (attempt.exists) {
        if (attempt.data().used) {
          throw new UserInputError('Vaše možnost připojení ke třídě již byla vyčerpána.')
        }
        let count = attempt.data().count + 1
        if (count > maxAttemptsCount) {
          if (moment(attempt.data().lastUpdateAt.toDate()).isAfter(moment().subtract(1, 'hours'))) {
            // surpased max counts in time window
            throw new UserInputError('Překročili jste maximální počet pokusů. Zkuste to prosím později.')
          } else {
            // surpased max counts but should be able to continue
            count = 1
          }
        }
        let totalCount = attempt.data().totalCount + 1
        if (totalCount > maxTotalAttemptsCount) {
          throw new UserInputError('Překročili jste celkový maximální počet pokusů. Pokud chcete pokračovat, kontaktujte nás.')
        }
        // update existing attempt
        let attemptUpdated = await attemptRef.update({
          count: count,
          totalCount: totalCount,
          lastGroup: '',
          lastUpdateAt: admin.firestore.FieldValue.serverTimestamp()
        })
      } else {
        // attempt does not exist create an attempt
        let attemptCreated = await attemptRef.set({
          count: 1,
          used: false,
          totalCount: 1,
          lastGroup: '',
          lastUpdateAt: admin.firestore.FieldValue.serverTimestamp(),
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
        })
      }
      // check code
      let invitationCode = await db.collection('invitationCodes').doc(input.code).get()
      if (!invitationCode.exists) {
        throw new UserInputError('Zadaný kód je neplatný.')
      }
      let group = await invitationCode.data().group.get()
      if (!group.exists) {
        throw new UserInputError('Zadaný kód je neplatný.')
      }
      await attemptRef.update({
        lastGroup: 'groups/' + group.id,
        lastUpdateAt: admin.firestore.FieldValue.serverTimestamp()
      })
      // user is allowed to join
      return {
        name: group.data().name
      }
    },
    async joinGroup(_parent, args, {user}, _info) {
      if (user.isInGroup) {
        throw new Error('User already is in group.')
      }
      const maxAttemptsCount = 6
      const maxTotalAttemptsCount = 60
      let attemptRef = db.collection('joinGroupAttempts').doc(user.id) 
      let attempt = await attemptRef.get()
      if (!attempt.exists) {
        throw new Error('Attempt does not exist.')
      }
      if (attempt.data().used) {
        throw new Error('Attempt is already used.')
      }
      if (attempt.data().count > maxAttemptsCount) {
        throw new Error('Attempts count surpassed.')
      }
      if (attempt.data().totalCount > maxTotalAttemptsCount) {
        throw new Error('Total attempts count surpassed.')
      }
      if (attempt.data().lastGroup === '') {
        throw new Error('Group reference is empty.')
      }
      if (moment(attempt.data().lastUpdateAt.toDate()).isBefore(moment().subtract(1, 'hours'))) {
        throw new UserInputError('Od zadání kódu uplynula hodina. Zadejte kód znovu.')
      }
      let attemptGroupRef = db.doc(attempt.data().lastGroup)
      let attemptGroup = await attemptGroupRef.get()
      if (!attemptGroup.exists) {
        throw new Error('Attempt group does not exist in database.')
      }
      let batch = db.batch()
      // assign group to user
      let userRef = db.collection('users').doc(user.id)
      batch.set(userRef, { isInGroup: true, group: attemptGroupRef }, {merge: true})
      // assign user to group
      let studentObject = {};
      studentObject['students.' + user.id + '.name'] = user.name
      studentObject['students.' + user.id + '.photoURL'] = user.photoURL
      studentObject['students.' + user.id + '.user'] = userRef
      studentObject['merge'] = true;
      batch.update(attemptGroupRef, studentObject)
      // disable further group joining
      batch.update(attemptRef, {used: true})
      batch.commit()
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
