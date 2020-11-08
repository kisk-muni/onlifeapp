import { query as q } from 'faunadb'
import { NextApiRequest, NextApiResponse } from 'next'
import auth0 from 'lib/auth0'
import { serverClient } from 'utils/fauna-auth'

export type Response = {
  count?: number
  message?: string
}

interface FaunaData {
  count: number
}

interface FaunaError {
  description: string
}

export default auth0.requireAuthentication(async function joinGroupAttempt(req: NextApiRequest, res: NextApiResponse<Response>) {
  const {query: {id, group_id}, method} = req
  const { user } = await auth0.getSession(req)
  if (method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    res.status(405).json({message: `Method ${method} Not Allowed`})
  }
  if (id == null || id == '' || isNaN(Number(id))) {
    res.status(400).json({message: 'Id není číslo.'})
  }
  if (group_id == null || group_id == '' || isNaN(Number(group_id))) {
    res.status(400).json({message: 'group_id není číslo.'})
  }
  try {
    const response: FaunaData = await serverClient.query(
      q.Call(q.Function("group_quiz_engagement_count"), [
        user.sub,
        group_id,
        id
      ])
    )
    res.json({
      count: response.count,
    })
  } catch (error) {
    if (!error?.description) {
      res.status(400).json({message: error?.message})
    } else {
      res.status(400).json({message: error?.description})
    }
  }
})