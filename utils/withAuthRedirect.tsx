import { useUserQuery } from '../apollo/user.graphql'
import Router from 'next/router'
import { NextPage } from 'next'

function redirect(next?: string) {
  if (!next) {
    Router.push({
      pathname: '/prihlaseni'
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
    const { data, loading, error } = useUserQuery()
    if (!loading) {
      if (!data?.user) {
        redirect(next)
      } else if (roles) {
        roles.forEach((role) => {
          switch (role) {
            case 'student':
              if (data?.user?.isTeacher) {
                redirect(next)
              }
              break;
            case 'teacher':
              if (!data?.user?.isTeacher) {
                redirect(next)
              }
              break;
            case 'notInGroup':
              if (data?.user?.isInGroup) {
                redirect(next)
              }
              break;
            default:
              break;
          }
        })
      }
    }
    return (<PageComponent {...pageProps} />)
  }
}

export default withAuthRedirect