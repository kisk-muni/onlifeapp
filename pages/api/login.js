import auth0 from 'lib/auth0'

export default async function login(req, res) {
  const {
    query: { next },
    method,
  } = req
  try {
    let redirectURL = process.env.SITE_URL
    if (next) {
      if (next.charAt(0) === '/') {
        redirectURL += next
      } else {
        redirectURL += '/' + next
      }
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