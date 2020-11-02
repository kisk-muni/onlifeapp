import Router from 'next/router'
import { NextPage } from 'next'
import useUser from '../data/useUser'

function redirect(next?: string) {
  if (!next) {
    Router.push({
      pathname: '/api/login',
      query: { next: process.env.NEXT_PUBLIC_SITE_URL + Router.asPath },
    })
  } else {
    Router.push({
      pathname: '/api/login',
      query: { next: next },
    })
  }
}

const withAuthRedirect = (
  PageComponent: NextPage,
  { next = '', roles }: {next?: string, roles?: string[]} = {}
): NextPage => {
  return ({...pageProps}) => {
    const { user, loading, error } = useUser()
    if (!loading) {
      if (!user) {
        redirect(next)
        return (<></>)
      } else if (roles) {
        roles.forEach((role) => {
          switch (role) {
            case 'student':
              if (!user?.in_group) {
                redirect(next)
                return (<></>)
              }
              break;
            case 'teacher':
              if (!user?.is_teacher) {
                redirect(next)
                return (<></>)
              }
              break;
            default:
              break;
          }
        })
      }
      return (<PageComponent {...pageProps} />)
    }
    return (<></>)
  }
}

export default withAuthRedirect