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

interface FaunaError {
  description: string
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
  console.log(slug, data)
  const originalQuiz = data?.gfquiz
  if (!originalQuiz) {
    res.status(405).json({message: `Kvíz neexistuje`})
  }
  // loop over originalQuizItems and validate&check quiz submittion against it
  // worst case scenario is O((n/2)*(n+1)) as the order is not guaranteed
  let feedbackItems = []
  let maxPoints = 0
  let points = 0
  originalQuiz?.items.forEach((item, index) => {
    // ignore discarded items (discarded items are not even in input variables)
    if (item.discarded) {
      return
    }
    maxPoints += 1
    const submittedItem = items.find(x => x.fieldName === item.id)
    if (!submittedItem) {
      res.status(405).json({message: `Missing submitted item.`})
    }
    let feedbackItem = getFeedbackItem(item, submittedItem)
    if (feedbackItem.correct) {
      points += 1
    }
    feedbackItems.push(feedbackItem)
  })
  try {
    const response: FaunaData = await serverClient.query(
      q.Let(
        {
          "user": q.Get(q.Match(q.Index("user_by_auth0_id"), user.sub)),
          "user_ref": q.Select("ref", q.Var("user")),
          "submission": q.Create(q.Collection("QuizSubmission"),
            {
              data: {
                quiz_id: originalQuiz.id,
                user: q.Var("user_ref"),
                points: points,
                max_points: maxPoints,
                // by storing feedback to the submission, we can ensure fast retrieval
                feedback: feedbackItems,
                created_at: q.Now()
              }
            }
          ),
          "submission_ref": q.Select(["ref"], q.Var("submission"))
        },
        // save feedback responses submissions according to user
        q.Do(
          q.Foreach(
            q.Select(["data", "feedback"], q.Var("submission")),
            q.Lambda('feedback_item',
              q.Create(q.Collection("QuizSubmissionFeedback"),
                {
                  data: q.Merge(
                    {
                      user: q.Var("user_ref"),
                      quiz_id: originalQuiz.id,
                      submission: q.Var("submission_ref")
                    },
                    q.Var("feedback_item")
                  )
                }
              )
            )
          ),
          // return submission ref id
          q.Var("submission")
        )
      )
    )
    res.json({
      id: response.ref.id
    })
  } catch (error: any) {
    if (!error?.description) {
      res.status(400).json({message: error?.message})
    } else {
      res.status(400).json({message: error?.description})
    }
  }
})