import { query as q } from 'faunadb'
import { NextApiRequest, NextApiResponse } from 'next'
import auth0 from '../../lib/auth0'
import { serverClient } from '../../utils/fauna-auth'

interface ResponseItem {
  name: string
  id: string
}

export type Response = ResponseItem[]

interface FaunaData {
  data: {
    ref: {
      id: string
    }
    ts: number
    data: {
      name: string
      user_id: string
    }
  }[]
}

export default auth0.requireAuthentication(async function joinGroupAttempt(req: NextApiRequest, res: NextApiResponse<Response>) {
  // there is no check for teacher role
  const { user } = await auth0.getSession(req)
  const listRes: FaunaData = await serverClient.query(
      q.Map(
        q.Paginate(q.Match(q.Index("group_by_user"), q.Select(
          "ref",
          q.Get(q.Match(q.Index("user_by_auth0_id"), user.sub))
        ))),
        q.Lambda("X", q.Get(q.Var("X")))
      )
    )
  res.json(listRes?.data?.map(item => {
    return ({
      name: item?.data.name,
      id: item?.ref?.id
    })
  }))
})