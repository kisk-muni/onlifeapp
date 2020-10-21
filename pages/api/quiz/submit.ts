import { query as q } from 'faunadb'
import { NextApiRequest, NextApiResponse } from 'next'
import auth0 from '../../../lib/auth0'
import { customAlphabet } from 'nanoid'
import { serverClient } from '../../../utils/fauna-auth'
import { getGFQuizWithSlugforValidation } from '../../../utils/api'
import getFeedbackItem from '../../../lib/quiz/itemFeedback'

interface ResponseItem {
  name?: string
  id?: string
  message?: string
}

export type Response = ResponseItem

interface FaunaData {
  ref: {
    id: string
  }
  ts: number
  data: {
    user_id: string 
    name: string
  }
}

export default auth0.requireAuthentication(async function joinGroupAttempt(req: NextApiRequest, res: NextApiResponse<Response>) {
  const {
    body: { slug, consent, items },
    method,
  } = req
  if (method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    res.status(405).json({message: `Method ${method} Not Allowed`})
  }
  const { user } = await auth0.getSession(req)
  // fetch quiz items
  const data = await getGFQuizWithSlugforValidation(slug, false)
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
    const submittedItem = //input.items.find(x => x.fieldName === item.id)
    if (!submittedItem) {
      throw new Error('Missing submitted item')
    }
    let feedbackItem = getFeedbackItem(item, submittedItem)
    if (feedbackItem.correct) {
      points += 1
    }
    feedbackItems.push(feedbackItem)
  })
  console.log(feedbackItems)
//   let batch = db.batch()
//   let quizResponsesUsersRef = db.collection('quizResponses').doc(user.id).collection('quizzes').doc(originalQuiz.id)
//   batch.set(quizResponsesUsersRef, {
//     lastUpdateAt: admin.firestore.FieldValue.serverTimestamp()
//   })
//   let quizResponsesUsersAttemptsRef = quizResponsesUsersRef.collection('attempts')
//   let newAttemptRef = quizResponsesUsersAttemptsRef.doc()
//   batch.set(newAttemptRef, {
//     feedback: feedbackItems,
//     points: points,
//     maxPoints: maxPoints,
//     createdAt: admin.firestore.FieldValue.serverTimestamp()
//   })
//   batch.commit()
//   return {
//     submitted: true,
//     submittedQuiz: originalQuiz.id,
//     responseAttempt: newAttemptRef.id,
//     points: points,
//     maxPoints: maxPoints
//   }
//   const response: FaunaData = await serverClient.query(
//     )
  res.json({
    name: response.data.name,
    id: response.ref.id
  })
})