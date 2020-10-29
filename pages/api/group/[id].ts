import { query as q } from 'faunadb'
import { NextApiRequest, NextApiResponse } from 'next'
import auth0 from '../../../lib/auth0'
import { serverClient } from '../../../utils/fauna-auth'

export type Response = {
  id?: string
  name?: string
  invitation_code?: string
  message?: string
  students?: {
    ref: {
      id: string
    }
    ts: number
    data: {
      name: string
      picture: string
      email: string
    }
  }[]
}

interface FaunaData {
  ref: {
    id: string
  }
  ts: number
  data: {
    name: string
    invitation_code: string
    user: {
      data: {
        auth0_id: string
      }
    }
  }
  students?: {
    ref: {
      id: string
    }
    ts: number
    data: {
      name: string
      picture: string
      email: string
    }
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
  }
  if (id == null || id == '' || isNaN(Number(id))) {
    res.status(400).json({message: 'Id není číslo.'})
  }
  try {
    const response: FaunaData = await serverClient.query(
      q.Let(
        {
          "group": q.Ref(q.Collection('Group'), id),
          "user": q.Select(
              "ref",
              q.Get(q.Match(q.Index("user_by_auth0_id"), user.sub))
            ),
        },
        q.Do(
          q.If(
            q.Not(q.Exists(q.Var("group"))),
            q.Abort("Třída neexistuje."),
            "false"
          ),
          q.If(
            q.Not(q.Equals(q.Select(["data", "user"], q.Get(q.Var("group")), q.Var("user")))),
            q.Abort("Třída uživateli nepatří."),
            "false"
          ),
          q.Merge(
            q.Get(q.Var("group")),
            {
              students: q.Select(
                "data",
                q.Map(
                  q.Paginate(
                    q.Match(q.Index("user_by_group"), q.Ref(q.Collection("Group"), id))
                  ),
                  q.Lambda("X", q.Get(q.Var("X")))
                )
              )
            }
          )
        )
      )
    )
    
    res.json({
      name: response.data.name,
      invitation_code: response.data.invitation_code,
      id: id as string,
      students: response.students
    })
  } catch (error) {
    if (!error?.description) {
      res.status(400).json({message: error?.message})
    } else {
      res.status(400).json({message: error?.description})
    }
  }
})