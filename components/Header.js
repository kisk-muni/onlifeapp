/** @jsx jsx */
import { Fragment } from 'react'
import Link from 'next/link'
import { jsx, Link as Lstyle, Button, Container } from 'theme-ui'
import ProfileDropdown, { ProfileDropdownPlaceholder } from "./ProfileDropdown"
import useUser from '../data/useUser'

const Header = () => {
  const { user, loading, error } = useUser()
  let userNav
  if (!loading) {
    if (error || user.error) {
      userNav = <Fragment>
        <Link passHref href="/registrace-ucitele">
          <Lstyle
            sx={{
              variant: 'styles.navlink',
              ml: 4,
            }}>
            Pro učitele
          </Lstyle>
        </Link>
        <Link passHref href="/api/login">
          <Lstyle
            sx={{
              variant: 'styles.navlink',
              ml: 4,
            }}>
            Přihlásit se
          </Lstyle>
        </Link>
        <Link passHref href="/api/login">
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
    } else {
      userNav = <Fragment>
          <Link passHref href="/tridy">
            <Lstyle
              sx={{
                variant: 'styles.navlink',
                ml: 4,
                py: 2,
              }}>
              Přehled tříd
            </Lstyle>
          </Link>
          <Link passHref href="/pridat-se-ke-tride">
            <Lstyle
              sx={{
                variant: 'styles.navlink',
                ml: 4,
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
          <ProfileDropdown sx={{ml: 4}} name={user.name} photoURL={user.picture} />
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
      variant: 'styles.header',
      width: '100%',
      zIndex: 18
    }}>
    <Container
      sx={{
        mx: 'auto',
        display: 'flex',
        alignItems: 'center',
      }}>
      <Link passHref href="/">
      <Lstyle 
        sx={{
          variant: 'styles.navlogo',
          fontWeight: 700,
          fontSize: 4,
          letterSpacing: '1px',
        }}>
        ONLIFE
      </Lstyle>
      </Link>
        <span sx={{
          color: 'text',
          borderLeft: '1px solid',
          borderColor: '#ddd',
          pl: 2,
          ml: 2,
          fontSize: 2,
          lineHeight: '16px',
          transition: 'opacity .2s ease 0s',
          visibility: '.2s ease 0s'
          }}
        >Aplikace pro otestování znalostí v kurzu</span>
      <div sx={{ mx: 'auto' }} />
        {userNav}
      </Container>
    </header>
  )
}

export default Header
