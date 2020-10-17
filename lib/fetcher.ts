import Router from 'next/router'

interface Error {
  name: string
  message: string
  stack?: string
  info?: string
  status?: number
}

function redirectToLogin(next?: string) {
  if (!next) {
    Router.push({
      pathname: '/prihlaseni',
      query: { next: Router.asPath },
    })
  } else {
    Router.push({
      pathname: '/prihlaseni',
      query: { next: next },
    })
  }
}

export default async function fetcher<JSON = any>(
input: RequestInfo,
    init?: RequestInit
  ): Promise<JSON> {
    const res = await fetch(input, init)
    if (!res.ok) {
      // if not authenticated for route/action different than standard user data fetch,
      // redirect user to the login page
      if (res.status === 401 && Router.pathname !== '/prihlaseni' && input !== '/api/me') {
        redirectToLogin()
      }
      const error: Error = new Error('An error occurred while fetching the data.')
      error.info = await res.json()
      error.status = res.status
      throw error
    }
    return res.json()
  }