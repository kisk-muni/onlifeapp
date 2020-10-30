import { query as q } from 'faunadb'
import { NextApiRequest, NextApiResponse } from 'next'
import auth0 from 'lib/auth0'
import { customAlphabet } from 'nanoid'
import { serverClient } from 'utils/fauna-auth'

interface ResponseItem {
  name: string
  id: string
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

// generate invitation code and check if exists until its unique
async function createGroupInvitationCode(length: number) {
  const nanoid = customAlphabet('123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ', length)
  let id = ''
  let isAlreadyUsed = false
  do {
    id = nanoid()
    isAlreadyUsed = await serverClient.query(
      q.If(
        q.Exists(q.Match(q.Index("group_by_invitation_code"), id)),
        true,
        false
      )
    )
    console.log(isAlreadyUsed)
  } while (isAlreadyUsed === true);
  // now we have unique id guaranteed
  return id
}

export default auth0.requireAuthentication(async function joinGroupAttempt(req: NextApiRequest, res: NextApiResponse<Response>) {
  const {
    body: { name },
    method,
  } = req
  if (method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${method} Not Allowed`)
  }
  if (typeof name !== 'string') {
    res.status(400).end('Property `name` must be a string.')
  }
  const cleanName = name.trim()
  if (cleanName === '') {
    res.status(400).end('Property `name` cannot be empty string.')
  }
  if (cleanName.length > 100) {
    res.status(400).end('Property `name` can be max 100 characters long.')
  }
  const { user } = await auth0.getSession(req)
  let invitationCode = await createGroupInvitationCode(6)
  const response: FaunaData = await serverClient.query(
      q.Create(
        q.Collection("Group"),
        {
          data: {
            name: name,
            invitation_code: invitationCode,
            user: q.Select("ref", q.Get(q.Match(q.Index("user_by_auth0_id"), user.sub)))
          }
        }
      )
    )
  res.json({
    name: response.data.name,
    id: response.ref.id
  })
})