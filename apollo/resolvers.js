import { AuthenticationError, UserInputError, ValidationError } from 'apollo-server-micro'
import cookie from 'cookie'
import jwt from 'jsonwebtoken'
import getConfig from 'next/config'
import * as moment from 'moment'
import bcrypt from 'bcrypt'
import v4 from 'uuid/v4'
import { getGFQuizWithSlugforValidation } from '../utils/api'
import { customAlphabet } from 'nanoid'
import * as firebase from 'firebase'
import topics, { quizes } from '../data/topics'
import getFeedbackItem from './quiz/itemFeedback'
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
      //console.log('resolve group')
      let group = await db.collection("groups").doc(id).get()
      if (!group.exists) {
        throw new Error ('No such document!')
      }
      let groupData = group.data()
      if (groupData.userId !== user.id) {
        throw new Error ("User is not owner of group.")
      }
      let students = []
      if (groupData.students) {
        for (let [key, student] of Object.entries(groupData.students)) {
          students.push({
            id: key,
            name: student.name,
            email: student.email,
            picture: student.photoURL
          })
        }
      }
      return {
        id: group.id,
        name: groupData.name,
        students: students,
        invitationCode: groupData.invitationCode || '',
        color: 'orange',
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
      let groupsDoc = await db.collection("groups").where("userId", "==", user.id).get()
      let groupsRes = []
      groupsDoc.forEach(doc => {
        let data = doc.data()
        groupsRes.push({
          id: doc.id,
          name: data.name,
          link: "/trida?trida=" + doc.id,
        })
      });
      groupsRes.push({
        id: 'ucitel',
        name: 'Přehled tříd',
        link: '/ucitel'
      })
      // console.log(groupsRes)
      return groupsRes.reverse()
    },
    async user(obj, args, {user}) {
      console.log('User Resolver:', user)
      return user
    },
    async userQuizFeedback(obj, {quiz, attempt}, {user}, info) {
      if (!user) {
        throw new Error('User not present.')
      }
      let quizResponsesUsersRef = db.collection('quizResponses').doc(user.id).collection('quizzes').doc(quiz).collection('attempts').doc(attempt)
      let feedback = await quizResponsesUsersRef.get()
      if (!feedback.exists) {
        throw new Error('Attempt not present')
      }
      return {
        id: feedback.id,
        createdAt: feedback.data().createdAt.toDate(),
        feedback: feedback.data().feedback,
        points: feedback.data().points,
        maxPoints: feedback.data().maxPoints
      }
    },
    async userQuizFeedbackList(obj, {quiz}, {user}, info) {
      if (!user) {
        throw new Error('User not present.')
      }
      let quizResponsesUsersRef = db.collection('quizResponses').doc(user.id).collection('quizzes').doc(quiz).collection('attempts')
      let attempts = await quizResponsesUsersRef.orderBy('points', 'desc').get()
      const attemptsWithIds = attempts.docs.map(doc => {
        return {
          id: doc.id,
          createdAt: doc.data().createdAt.toDate(),
          feedback: doc.data().feedback,
          points: doc.data().points,
          maxPoints: doc.data().maxPoints
        }
      })
      const sorted = attemptsWithIds.sort((attemptA, attemptB) => {
        return new Date(parseInt(attemptB.createdAt)) - new Date(parseInt(attemptA.createdAt))
      })
      if (sorted.length >= 1) {
        return [sorted[0]]
      }
      return []
    },
    async quiz(obj, {id}, {user}, info) {
      // there should be some check that quiz exists
      if (!user) {
        throw new Error('User not present.')
      }
      return {
        prefill: 'necodsaf'
      }

      /* 
      let quizAttemptsRef = db.collection('users').doc(user.id).collection('quizAttempts')
      await quizAttemptsRef.doc(id).set({
        name: quiz.name
      }, {merge: true})
      let quizAttempts = await quizAttemptsRef.doc(id).collection('attempts').add({
        quizName: quiz.name,
        lastUpdateAt: admin.firestore.FieldValue.serverTimestamp(),
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      })
      return {
        id: id,
        display: true,
        gFormURL: quiz.gFormURL+quizAttempts.id
      }   */
    },
    async studentTopicsResults(obj, {id}, context, info) {
      // podivat se na studentovy pokusy
      // priradit pokusy podtematum
      /* let col = await db.collection('users').doc(id).collection('quizAttempts').get()
      
      let tudentAttempts = col.docs.map( async doc => {
        //console.log(doc.id)
        let tems = await db.collection('users').doc(id).collection('quizAttempts').doc(doc.id).collection('attempts').get()
        let attemptsfromDB = await Promise.alltems.docs.map(async docAttempt => {
          // pro kazdy attempt se podivam do realtime db
          let attemptRDBref = await rdb.ref('results/'+docAttempt.id).once('value')
          return {...attemptRDBref.val()}
        })
        return { [doc.id]: attemptsfromDB }
      });

      let completed = await Promise.all(
        tudentAttempts
      )
      console.log(completed) */

      //console.log(tudentAttempts)

      const quizAttempts = [
        {
          result: 4,
          detail: [
            {
              question: 'V České republice je nejpoužívanějším prohlížečem:',
              answer: 'Google',
            }
          ],
          time: '2020-04-29T08:00:51.821Z'
        }
      ]
      const studentAttempts = {
        'quiz-vyhledavani-na-internetu-i': {
          attempts: quizAttempts
        }
      }
      const topicsRes = topics.map(topic => {
        return {
          name: topic.name,
          subtopics: topic.subtopics.map(subtopic => {
              let quizAttemptsForStudent = null
              if (subtopic.quiz && typeof studentAttempts[subtopic.quiz] !== 'undefined') {
                quizAttemptsForStudent = studentAttempts[subtopic.quiz].attempts
              }
              return {
                name: subtopic.name,
                quizAttempts: quizAttemptsForStudent
              }
            }) 
        }
      })
      return topicsRes
    },
    async topics(obj, args, context, info) {
      return topics
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
      studentObject['students.' + user.id + '.email'] = user.email
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
    async submitQuiz(_paremt, {input}, {user}, _info) {
      if (!user) {
        throw new Error('User not present.')
      }
      if (!input.consent) {
        throw new Error('Uživatel musí souhlasit s podmínkami služby.')
      }
      // fetch quiz items
      const data = await getGFQuizWithSlugforValidation(input.slug, false)
      const originalQuiz = data?.gfquiz
      if (!originalQuiz) {
        throw new Error('Kvíz neexistuje.')
      }
      // loop over originalQuizItems and validate&check quiz submittion against it
      let feedbackItems = []
      let maxPoints = 0
      let points = 0
      originalQuiz?.items.forEach((item, index) => {
        // ignore discarded items (discarded items are not even in input variables)
        if (item.discarded) {
          return
        }
        maxPoints += 1
        const submittedItem = input.items.find(x => x.fieldName === item.id)
        if (!submittedItem) {
          throw new Error('Missing submitted item')
        }
        let feedbackItem = getFeedbackItem(item, submittedItem)
        if (feedbackItem.correct) {
          points += 1
        }
        feedbackItems.push(feedbackItem)
      })
      let batch = db.batch()
      let quizResponsesUsersRef = db.collection('quizResponses').doc(user.id).collection('quizzes').doc(originalQuiz.id)
      batch.set(quizResponsesUsersRef, {
        lastUpdateAt: admin.firestore.FieldValue.serverTimestamp()
      })
      let quizResponsesUsersAttemptsRef = quizResponsesUsersRef.collection('attempts')
      let newAttemptRef = quizResponsesUsersAttemptsRef.doc()
      batch.set(newAttemptRef, {
        feedback: feedbackItems,
        points: points,
        maxPoints: maxPoints,
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      })
      batch.commit()
      return {
        submitted: true,
        submittedQuiz: originalQuiz.id,
        responseAttempt: newAttemptRef.id,
        points: points,
        maxPoints: maxPoints
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
  }
}
