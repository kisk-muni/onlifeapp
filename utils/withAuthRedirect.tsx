import Router from 'next/router'
import { NextPage } from 'next'
import useUser from '../data/useUser'

function redirect(next?: string) {
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

const withAuthRedirect = (
  PageComponent: NextPage,
  { next, roles }: {next?: string, roles?: string[]} = {}
): NextPage => {
  return ({...pageProps}) => {
    const { user, loading, error } = useUser()
    if (!loading) {
      if (!user) {
        redirect(next)
      } else if (roles) {
        roles.forEach((role) => {
          switch (role) {
            case 'student':
              if (user?.isTeacher) {
                redirect(next)
              }
              break;
            case 'teacher':
              if (user?.isTeacher) {
                redirect(next)
              }
              break;
            case 'notInGroup':
              if (user?.isInGroup) {
                redirect(next)
              }
              break;
            default:
              break;
          }
        })
      }
      if (user) {
        return (<PageComponent {...pageProps} />)
      }
    }
    return <></>
  }
}

export default withAuthRedirect