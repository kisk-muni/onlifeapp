import { query as q } from 'faunadb'
import { NextApiRequest, NextApiResponse } from 'next'
import auth0 from 'lib/auth0'
import { serverClient } from 'utils/fauna-auth'

interface ResponseItem {
  name?: string
  invitation_code?: string
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

export default auth0.requireAuthentication(async function joinGroupAttempt(req: NextApiRequest, res: NextApiResponse<Response>) {
  const maxAttemptsCount = 6
  const maxTotalAttemptsCount = 60
  const numberOfMinutesWaiting = 30
  const {
    body: { code },
    method,
  } = req
  if (method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    res.status(405).json({message: `Method ${method} Not Allowed`})
  }
  if (typeof code !== 'string') {
    res.status(400).json({message: 'Property `code` must be a string.'})
  }
  console.log(code)
  const cleancode = code.trim()
  if (cleancode === '') {
    res.status(400).json({message: 'Property `code` cannot be empty string.'})
  }
  if (cleancode.length !== 6) {
    res.status(400).json({message: 'Property `code` must be 100 characters long.'})
  }
  
  const { user } = await auth0.getSession(req)
  try {
    const response: FaunaData = await serverClient.query(
      // 1- check if group with code exists 
      q.Let(
        {
          "group_match": q.Match(q.Index("group_by_invitation_code"), code),
          "group_exists": q.Exists(q.Var('group_match')),
          "attempt_match": q.Match(q.Index("join_group_attempt_by_auth0_id"), user.sub),
          "attempt_exists": q.Exists(q.Var("attempt_match")),
          //"increased_count": q.Add(q.Select("count", q.Get(q.Var("attempt_match"))), 1),
          //"increased_total_count": q.Add(q.Select("total_count", q.Get(q.Var("attempt_match"))), 1),
        },
        q.If(
          q.Var("attempt_exists"),
          // 2- If attempt exists, validate it and update
          q.Do(
            q.If(
              q.Select(["data", "joined"], q.Get(q.Var("attempt_match"))),
              q.Abort("Vaše možnost připojení ke třídě již byla vyčerpána."),
              "ok"
            ),
            q.If(
              q.And(
                q.LT(
                  maxAttemptsCount,
                  q.Add(q.Select(["data", "count"], q.Get(q.Var("attempt_match"))), 1),
                ),
                q.LT( // before hour < last change
                  q.TimeSubtract(q.Now(), numberOfMinutesWaiting, 'minutes'),
                  q.Select(["data", "last_update_at"], q.Get(q.Var("attempt_match"))),
                )
              ),
              q.Abort(
                q.Concat(
                  [
                    "Vyčerpali jste všechny pokusy.",
                    "Zkuste to prosím za ",
                    q.ToString(q.Subtract(numberOfMinutesWaiting, q.ToNumber(q.TimeDiff(q.Select(["data", "last_update_at"], q.Get(q.Var("attempt_match"))), q.Now(), 'minutes')))) ,
                    "minut."
                  ],
                  ' '
                )
              ),
              "do nothing",
            ),
            q.If(
              q.LT( // increased_totalCount > maxTotalAttemptsCount
                maxTotalAttemptsCount,
                q.Add(q.Select(["data", "total_count"], q.Get(q.Var("attempt_match"))), 1),
              ),
              q.Abort("Překročili jste celkový maximální počet pokusů. Pokud chcete pokračovat, kontaktujte nás."),
              "ok"
            ),
            // 4- Update attempt properly and return result which can be used for final api response
            // based on group existence (if group exists, return updated attempt, otherwise return error)
            q.Update(q.Select("ref", q.Get(q.Var("attempt_match"))),
              {
                data: {
                  count: q.If(
                    q.And(
                      q.Not(q.LT( // před_hodinou < posledni_zmena
                        q.TimeSubtract(q.Now(), numberOfMinutesWaiting, 'minutes'),
                        q.Select(["data", "last_update_at"], q.Get(q.Var("attempt_match"))),
                      )),
                      q.LT(
                        maxAttemptsCount,
                        q.Add(q.Select(["data", "count"], q.Get(q.Var("attempt_match"))), 1),
                      )
                    ),
                    1,
                    q.Add(q.Select(["data", "count"], q.Get(q.Var("attempt_match"))), 1)
                  ),
                  total_count: q.Add(q.Select(["data", "total_count"], q.Get(q.Var("attempt_match"))), 1),
                  last_group: q.If(q.Var("group_exists"), q.Get(q.Var("group_match")), null),
                  last_update_at: q.Now()
                }
              }
            )
          ),
          // 3- If attempt does not exists, init first attempt based on group existence
          // If group exists, assign group ref to the last_group, otherwise assign null
          // Save total_count of attempts, just in case for checking
          q.Create(
            q.Collection("JoinGroupAttempt"),
            {
              data: {
                user: q.Get(q.Match(q.Index("user_by_auth0_id"), user.sub)),
                count: 1,
                joined: false,
                total_count: 1,
                last_group: q.If(q.Var("group_exists"), q.Get(q.Var("group_match")), null),
                last_update_at: q.Now(),
                created_at: q.Now()
              }
            }
          )
        )
      )
    )
    const lastGroup = response?.data?.last_group?.data
    if (!lastGroup?.invitation_code) {
      res.status(400).json({
        message: 'Třída s tímto kódem neexistuje. Počet zbývajících pokusů: ' + (maxAttemptsCount - response?.data?.count).toString() + '',
      })
    } else {
      res.json({
        name: lastGroup?.name,
        invitation_code: lastGroup?.invitation_code
      })
    }
  } catch (error) {
    console.log(error)
    res.status(400).json({message: error?.description})
  }
})