import auth0 from 'lib/auth0'

export default async function signup(req, res) {
    try {
      await auth0.handleLogin(req, res, {
        authParams: {
          screen_hint: 'signup',
          is_teacher: true
        },
      });
    } catch (error) {
      console.error(error);
      res.status(error.status || 500).end(error.message);
    }
  }