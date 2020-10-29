import { query as q } from 'faunadb'
import { NextApiRequest, NextApiResponse } from 'next'
import auth0 from '../../lib/auth0'
import { serverClient } from '../../utils/fauna-auth'

interface ResponseItem {
  joined?: boolean  
  message?: string  
}

export type Response = ResponseItem

interface FaunaData {
  ref: {
    id: string
  }
  ts: number
  data: {
    last_group?: {
      data: {
        name: string
        invitation_code: string
      }
    }
    count: number
  }
}

enum Errors {
  USER_HAS_GROUP = "User already has group assigned.",
  ATTEMPT_NOT_EXIST = "Attempt does not exist.",
  ATTEMPT_USED = "Attempt is already used.",
  COUNT_SURPASSED= "Attempts count surpassed.",
  TOTAL_COUNT_SURPASSED= "Attempts total count surpassed.",
  TIMEOUT_EXPIRED = "Timeout for joining has exipired.",
  GROUP_NOT_EXIST = "Group does not exist.",
}

interface FaunaError {
  description: Errors
}

export default auth0.requireAuthentication(async function joinGroupAttempt(req: NextApiRequest, res: NextApiResponse<Response>) {
  const maxAttemptsCount = 6
  const maxTotalAttemptsCount = 60
  const { method } = req
  if (method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    res.status(405).json({message: `Method ${method} Not Allowed`})
  }
  const { user } = await auth0.getSession(req)
  try {
    const response: FaunaData = await serverClient.query(
      // 1- check if group with code exists 
      q.Let(
        {
          "attempt_match": q.Match(q.Index("join_group_attempt_by_auth0_id"), user.sub),
          "attempt_exists": q.Exists(q.Var("attempt_match")),
          "group_ref": q.Select(["data", "last_group", "ref"], q.Get(q.Var("attempt_match"))),
          "group_exists": q.Exists(q.Var("group_ref"))
        },
        q.Do(
          q.If(
            q.ContainsField('group', q.Select(["data", "user", "data"], q.Get(q.Var("attempt_match")))),
            q.Abort(Errors.USER_HAS_GROUP),
            "false"
          ),
          q.If(
            q.Not(q.Var("attempt_exists")),
            q.Abort(Errors.ATTEMPT_NOT_EXIST),
            "false"
          ),
          q.If(
            q.Select(["data", "joined"], q.Get(q.Var("attempt_match"))),
            q.Abort(Errors.ATTEMPT_USED),
            "false"
          ),
          q.If(
            q.LT( // maxAttemptsCount < count
              maxAttemptsCount,
              q.Select(["data", "count"], q.Get(q.Var("attempt_match"))),
            ),
            q.Abort(Errors.COUNT_SURPASSED),
            "false"
          ),
          q.If(
            q.LT( // maxTotalAttemptsCount < total_count
              maxTotalAttemptsCount,
              q.Select(["data", "total_count"], q.Get(q.Var("attempt_match"))),
            ),
            q.Abort(Errors.TOTAL_COUNT_SURPASSED),
            "false"
          ),
          q.If(
            q.Not(q.LT( // before hour < last change
              q.TimeSubtract(q.Now(), 30, 'minutes'),
              q.Select(["data", "last_update_at"], q.Get(q.Var("attempt_match"))),
            )),
            q.Abort(Errors.TIMEOUT_EXPIRED),
            "false"
          ),
          q.If(
            q.Not(q.Var("group_exists")),
            q.Abort(Errors.GROUP_NOT_EXIST),
            "false"
          ),
          q.Update(q.Select("ref", q.Get(q.Var("attempt_match"))),
            {
              data: {
                joined: true,
                last_update_at: q.Now()
              }
            }
          ),
          q.Update(q.Select(["data", "user", "ref"], q.Get(q.Var("attempt_match"))),
            {
              data: {
                group: q.Var("group_ref"),
              }
            }
          ),
        )
      )
    )
    res.json({
      joined: true
    })
  } catch (error: any) {
    if (!error?.description) {
      res.status(400).json({message: error?.message})
    } else {
      res.status(400).json({message: error?.description})
    }
  }
})