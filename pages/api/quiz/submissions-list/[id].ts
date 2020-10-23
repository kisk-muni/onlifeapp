import { query as q } from 'faunadb'
import { NextApiRequest, NextApiResponse } from 'next'
import auth0 from '../../../../lib/auth0'
import { serverClient } from '../../../../utils/fauna-auth'
import { FeedbackItem } from '../../../../lib/quiz/itemFeedback'

export type Response = {
  submissions?: {
    points: number
    max_points: number
    created_at: {
      value: string
    }
    id: string
  }[]
  message?: string
}

interface FaunaData {
  data: {
    points: number
    max_points: number
    created_at: {
      value: string
    }
    id: string
  }[]
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
    return
  }
  if (id == null || id == '' || isNaN(Number(id))) {
    res.status(400).json({message: 'Id není číslo.'})
    return
  }
  try {
    const response: FaunaData = await serverClient.query(
      q.Let(
        {
            "user": q.Get(q.Match(q.Index("user_by_auth0_id"), user.sub)),
            "user_id": q.Select(["ref", "id"], q.Var("user"))
        },
        q.Map(
          q.Paginate(
            q.Match(q.Index("quizsubmission_by_user_and_quiz_id_desc"), [q.Ref(q.Collection("User"), "279453035805016581"), "4709925"])
          ),
          q.Lambda(
            ["points", "created_at", "max_points", "ref"], {
              "created_at": q.Var("created_at"), 
              "max_points": q.Var("max_points"), 
              "points": q.Var("points"), 
              "id": q.Select(["id"], q.Var("ref"))
            }
          )
        )
      )
    )
    if (response.data.length >= 1) {
      res.json({submissions: [response.data[0]]})
      return
    } else {
      res.json({submissions: []})
      return
    }
  } catch (error: any | FaunaError) {
    if (!error?.description) {
      res.status(400).json({message: error?.message})
      return
    } else {
      res.status(400).json({message: error?.description})
      return
    }
  }
})