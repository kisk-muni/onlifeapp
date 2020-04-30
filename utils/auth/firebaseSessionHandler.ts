import fetch from 'isomorphic-unfetch'
import { User } from 'firebase'

export const setSession = (user: User) => {
  // Log in.
  if (user) {
    return user.getIdToken().then(token => {
      return fetch('/api/login', {
        method: 'POST',
        // eslint-disable-next-line no-undef
        headers: new Headers({ 'Content-Type': 'application/json' }),
        credentials: 'same-origin',
        body: JSON.stringify({ token }),
      })
    })
  }
  // Log out.
  return fetch('/api/logout', {
    method: 'POST',
    credentials: 'same-origin',
  })
}