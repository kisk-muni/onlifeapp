import { query as q } from 'faunadb'
import { NextApiRequest, NextApiResponse } from 'next'
import auth0 from '../../../../lib/auth0'
import { serverClient } from '../../../../utils/fauna-auth'

export type Response = {
  submissions?: {
    points: number
    max_points: number
    quiz_id: string
  }[]
  message?: string
}

interface FaunaData {
  data: {
    points: number
    max_points: number
    quiz_id: string
  }[]
}

interface FaunaError {
  description: string
}

export default auth0.requireAuthentication(async function joinGroupAttempt(req: NextApiRequest, res: NextApiResponse<Response>) {
  const {method} = req
  const { user } = await auth0.getSession(req)
  if (method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    res.status(405).json({message: `Method ${method} Not Allowed`})
    return
  }
  try {
    const response: FaunaData = await serverClient.query(
      q.Call(
          q.Function("quiz_submissions_by_auth0_id"),
          user.sub
      )
    )
    res.json({submissions: response.data})
    return
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