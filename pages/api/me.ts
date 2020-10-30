import { query as q } from 'faunadb'
import { NextApiRequest, NextApiResponse } from 'next'
import auth0 from 'lib/auth0'
import { serverClient } from 'utils/fauna-auth'

export type Response = {
  name?: string
  email?: string
  picture?: string
  auth0_id?: string
  in_group?: boolean
  is_teacher?: boolean
  message?: string
}

interface FaunaData {
  ref: {
    id: string
  }
  ts: number
  data: {
    name: string
    email: string
    picture: string
    auth0_id: string
    is_teacher: boolean
    group?: {
      data: {
        name: string
        invitation_code: string
      }
    }
  }
}

export default auth0.requireAuthentication(async function joinGroupAttempt(req: NextApiRequest, res: NextApiResponse<Response>) {
  const { method } = req
  if (method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    res.status(405).json({message: `Method ${method} Not Allowed`})
  }
  try {
    const { user } = await auth0.getSession(req)
    const response: FaunaData = await serverClient.query(
      q.Get(q.Match(
        q.Index("user_by_auth0_id"), user.sub
      ))
    )
    res.json({
      name: response.data.name,
      email: response.data.email,
      picture: response.data.picture,
      auth0_id: response.data.auth0_id,
      in_group: typeof response.data?.group !== 'undefined',
      is_teacher: response.data.is_teacher
    })
  } catch (error) {
    res.status(error.status || 500).end(error.message)
  }
})