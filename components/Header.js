/** @jsx jsx */
import { Fragment } from 'react'
import Link from 'next/link'
import { jsx, Link as Lstyle, Button } from 'theme-ui'
import ProfileDropdown, { ProfileDropdownPlaceholder } from "./ProfileDropdown"
import { useUserQuery } from '../apollo/user.graphql'

const Header = ({description = 'Kurz informační gramotnosti',  showDescription = false }) => {
  const { loading, data } = useUserQuery()

  let userNav
  if (!loading) {
    if (data.user !== null) {
      userNav = <Fragment>
        { data?.user.isTeacher && 
          <Link passHref href="/tridy">
            <Lstyle
              sx={{
                variant: 'styles.navlink',
                ml: 5,
                py: 2,
              }}>
              Přehled tříd
            </Lstyle>
          </Link>
        }
        {
          (!data?.user.isTeacher && !data?.user.isInGroup) &&
          <Link passHref href="/pridat-se-ke-tride">
            <Lstyle
              sx={{
                variant: 'styles.navlink',
                ml: 5,
              }}>
                <Button
                  sx={{
                    py: 2,
                    px: 4
                  }}>
                  Přidat se ke třídě
                </Button>
            </Lstyle>
          </Link>
        }
        <ProfileDropdown
          sx={{ml: 4}}
          photoURL={data?.user.photoURL}
          name={data?.user.name}
          email={data?.user.email} />
      </Fragment>
    } else {
      userNav = <Fragment>
          <Link passHref href="/prihlaseni">
          <Lstyle
            sx={{
              variant: 'styles.navlink',
              ml: 5,
              py: 2,
            }}>
            Přihlásit se
          </Lstyle>
        </Link>
        <Link passHref href="/registrace">
          <Button
            sx={{
              ml: 5,
              py: 2,
              px: 3,
              fontSize: 2
            }}>
            Zaregistrovat se
          </Button>
        </Link>
      </Fragment>
    }
  } else {
    userNav = <Fragment>
        <span sx={{
            display: 'inline-block',
            ml: 4,
            background: '#eee',
            borderRadius: '6px',
            position: 'relative',
            height: '21px',
            width: '145px',
        }}></span>
      <ProfileDropdownPlaceholder />
    </Fragment>
  }

  return (
    <header
    sx={{
      variant: 'styles.header',
      width: '100%',
      zIndex: 18
    }}>
    <div
      sx={{
        mx: 'auto',
        px: 35,
        minHeight: '48px',
        display: 'flex',
        alignItems: 'center',
      }}>
      <Link passHref href="/">
      <Lstyle 
        sx={{
          variant: 'styles.navlogo',
          fontWeight: 700,
          fontSize: 5,
        }}>
        OnLife
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
          opacity: showDescription ? 1 : 0,
          visibility: showDescription ? 'visible' : 'hidden',
          transition: 'opacity .2s ease 0s',
          visibility: '.2s ease 0s'
          }}
        >{description}</span>
      <div sx={{ mx: 'auto' }} />
        {userNav}
      </div>
    </header>
  )
}

export default Header
