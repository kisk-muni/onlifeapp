/** @jsx jsx */
import { Fragment } from 'react'
import Link from 'next/link'
import { jsx, Link as Lstyle, Button } from 'theme-ui'
import ProfileDropdown from "./ProfileDropdown"
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import Reveal from '../components/Reveal'

export const CURRENT_USER = gql`
{
  user {
    name
    isTeacher
    photoURL
    email 
    id
  }
}
`

const Header = ({description = 'Kurz informační gramotnosti pro studenty středních škol', showDescription = false }) => (
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
      <span sx={{color: 'text', borderLeft: '1px solid #ddd', pl: 2, ml: 2, lineHeight: '16px', opacity: showDescription ? 1 : 0, visibility: showDescription ? 'visible' : 'hidden', transition: 'opacity .2s ease 0s, visibility .2s ease 0s'}}>{description}</span>
    <div sx={{ mx: 'auto' }} />
      <Query query={CURRENT_USER} >
        {({loading, data}) => {
          if (loading === false) {

            if (data?.user !== null) {
              return <Fragment>
                  { data?.user.isTeacher ? 
                    <Link passHref href="/ucitel">
                      <Lstyle
                        sx={{
                          variant: 'styles.navlink',
                          ml: 4,
                          py: 2,
                        }}>
                        Učitelský přehled
                      </Lstyle>
                    </Link>
                    :
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
                  }
                  <ProfileDropdown
                    sx={{ml: 4}}
                    photoURL={data?.user.photoURL}
                    name={data?.user.name}
                    email={data?.user.email} />
                </Fragment>
            } else {
              return <Fragment>
                  <Link passHref href="/prihlaseni">
                  <Lstyle
                    sx={{
                      variant: 'styles.navlink',
                      ml: 4,
                      py: 2,
                    }}>
                    Přihlásit se
                  </Lstyle>
                </Link>
                <Link passHref href="/registrace">
                  <Button
                    sx={{
                      ml: 4,
                      py: 2,
                      px: 3
                    }}>
                    Zaregistrovat se
                  </Button>
                </Link>
              </Fragment>
            }
          }
          return <div></div>

        }}
      </Query>
    </div>
  </header>
)

export default Header
