import { query as q } from 'faunadb'
import auth0 from 'lib/auth0'
import  { ManagementClient } from 'auth0'
import { serverClient } from 'utils/fauna-auth'

export default async function callback(req, res) {
  try {
    await auth0.handleCallback(req, res, {
      onUserLoaded: async (req, res, session, state) => {

        const authUtil = new ManagementClient({
          domain: process.env.NEXT_PUBLIC_AUTH0_DOMAIN,
          clientId: process.env.AUTH0_MANAGEMENT_CLIENT_ID,
          clientSecret: process.env.AUTH0_MANAGEMENT_SECRET,
          scope: 'read:users update:users read:users_app_metadata',
        });
        const user = session.user
        

        const userObjectWithMetadata = await authUtil.getUser({ id: user.sub });
        //console.log(userObjectWithMetadata)

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
                  is_teacher: userObjectWithMetadata.app_metadata.roles?.includes('teacher'),
                  is_student: userObjectWithMetadata.app_metadata.roles?.includes('student'),
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