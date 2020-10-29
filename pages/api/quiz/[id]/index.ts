import { query as q } from 'faunadb'
import { NextApiRequest, NextApiResponse } from 'next'
import auth0 from '../../../../lib/auth0'
import { serverClient } from '../../../../utils/fauna-auth'
import { FeedbackItem } from '../../../../lib/quiz/itemFeedback'

export type Response = {
  id?: string
  points?: number
  max_points?: number
  created_at?: string
  feedback?: FeedbackItem[]
  message?: string
}

interface FaunaData {
  ref: {
    id: string
  }
  ts: number
  data: {
    quiz_id: string
    user: {
      ref: {
        id: string
      }
    }
    points: number
    max_points: number
    feedback: FeedbackItem[]
    created_at: {
      value: string
    }
  }
}

interface FaunaError {
  description: string
}

export default auth0.requireAuthentication(async function joinGroupAttempt(req: NextApiRequest, res: NextApiResponse<Response>) {
  const {query: {id}, method} = req
  const { user } = await auth0.getSession(req)
  if (method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    res.status(405).json({message: `Method ${method} Not Allowed`})
  }
  if (id == null || id == '' || isNaN(Number(id))) {
    res.status(400).json({message: 'Id není číslo.'})
  }
  try {
    const response: FaunaData = await serverClient.query(
      q.Let(
        {
          "submission_ref": q.Ref(q.Collection('QuizSubmission'), id),
          "submission": q.Get(q.Var("submission_ref")),
          "user": q.Get(q.Match(q.Index("user_by_auth0_id"), user.sub))
        },
        q.Do(
          q.If(
            q.Not(q.Exists(q.Var("submission_ref"))),
            q.Abort("Pokus neexistuje."),
            "false"
          ),
          q.If(
            q.Not(
              q.Equals(
                q.Select(["ref"], q.Var("user")),
                q.Select(["data", "user"], q.Var("submission"))
              )
            ),
            q.Abort("Uživatel se neshoduje."),
            "false"
          ),
          q.Var("submission")
        )
      )
    )
    res.json({
      id: response.ref.id as string,
      points: response.data.points,
      max_points: response.data.max_points,
      feedback: response.data.feedback,
      created_at: response.data.created_at.value
    })
  } catch (error: any | FaunaError) {
    if (!error?.description) {
      res.status(400).json({message: error?.message})
    } else {
      res.status(400).json({message: error?.description})
    }
  }
})