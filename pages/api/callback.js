import { query as q } from 'faunadb'
import auth0 from 'lib/auth0'
import { serverClient } from 'utils/fauna-auth'

export default async function callback(req, res) {
  try {
    await auth0.handleCallback(req, res, {
      onUserLoaded: async (req, res, session, state) => {
        const user = session.user
        await serverClient.query(
          // if attempt exists
          q.If(
            q.Exists(q.Match(q.Index('user_by_auth0_id'), user.sub))
          ,
            "user_exists"
          ,
            q.Create(
              q.Collection('User'),
              {
                data: {
                  name: user?.name,
                  email: user?.email,
                  picture: user?.picture,
                  auth0_id: user.sub,
                  is_teacher: false
                }
              },
            )
          )
        )
        return {
          ...session,
          user: {
            ...session.user,
          }
        }
      }
    })
  } catch (error) {
    console.error(error)
    res.status(error.status || 500).end(error.message)
  }
}