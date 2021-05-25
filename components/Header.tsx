/** @jsx jsx */
import { Fragment } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import { jsx, Link as Lstyle, Button, Container, Text, Heading } from 'theme-ui'
import ProfileDropdown from "./ProfileDropdown"
import useUser from 'data/useUser'

const Header = () => {
  const { user, loading, error } = useUser()
  let userNav
  if (!loading) {
    if (!user || error) {
      userNav = <Fragment>
        {
          Router.asPath !== '/' && <Fragment>
            <Link passHref href="/api/login">
              <Lstyle
                sx={{
                  variant: 'styles.navlink',
                  ml: 4,
                }}>
                Přihlásit se
              </Lstyle>
            </Link>
            <Link passHref href="/api/registrace">
              <Button
                sx={{
                  ml: 4,
                  py: 2,
                  px: 3,
                  fontSize: 2
                }}>
                Zaregistrovat se
              </Button>
            </Link>
          </Fragment>
        }
      </Fragment>
    } else {
      userNav = <Fragment>
          {
            user?.is_teacher && <Link passHref href="/tridy">
              <Lstyle
                sx={{
                  variant: 'styles.navlink',
                  ml: 4,
                  py: 2,
                }}>
                Přehled tříd
              </Lstyle>
            </Link>
          }
          {
            !user?.in_group && <Link passHref href="/pridat-se-ke-tride">
              <Lstyle
                sx={{
                  variant: 'styles.navlink',
                  mx: 4,
                }}>
                  <Button
                    sx={{
                      py: 2,
                      px: 3
                    }}>
                    Přidat se ke třídě
                  </Button>
              </Lstyle>
            </Link>
          }
          <ProfileDropdown name={user.name} email={user.email} photoURL={user.picture} />
      </Fragment>
    }
  } else {
    userNav = <Fragment>
    <span sx={{
        display: 'inline-block',
        ml: 4,
        background: '#fff',
        borderRadius: '6px',
        position: 'relative',
        height: '40px',
        width: '40px',
    }}></span>
    </Fragment>
  }

  return (
    <header
      sx={{
        variant: 'styles.header'
      }}>
    <Container
      sx={{
        mx: 'auto',
        display: 'flex',
        alignItems: 'center',
      }}>
      <Link passHref href={!user ? '/' : '/prehled'}>
        <Lstyle
          onContextMenu={(e) => {
            e.preventDefault()
            Router.push('/design')
          }}
          sx={t => t.util.gxText('instagram', 'primary')}
          as="h1" 
        >
          ONLIFE
        </Lstyle>
      </Link>
      <div sx={{ mx: 'auto' }} />
        {userNav}
      </Container>
    </header>
  )
}

export default Header
