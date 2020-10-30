import auth0 from 'lib/auth0'

export default async function login(req, res) {
  const {
    query: { next },
    method,
  } = req
  try {
    let redirectURL = '/'
    if (next) {
      redirectURL += next
    }
    await auth0.handleLogin(req, res, {
      getState: (req) => {
        return {
          someValue: '123',
          redirectTo: redirectURL
        };
      }
    });
  } catch (error) {
    console.error(error)
    res.status(error.status || 500).end()
  }
}