/** @jsx jsx */
import { Fragment } from 'react'
import Link from 'next/link'
import { jsx, Link as Lstyle, Button, Flex } from 'theme-ui'
import ProfileDropdown, { ProfileDropdownPlaceholder } from "../ProfileDropdown"
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

export const CURRENT_USER = gql`
{
  user {
    name
    photoURL
    email 
    id
  }
}
`

const Header = ({ description = 'Kurz informační gramotnosti pro studenty středních škol', showDescription = false }) => (
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
    <span sx={{color: 'text', borderLeft: '1px solid #ddd', pl: 2, ml: 2, lineHeight: '16px', opacity: showDescription ? 1 : 0, visibility: showDescription ? 'visible' : 'hidden', transition: 'opacity .2s ease 0s, visibility .2s ease 0s'}}>
      {description}
    </span>
    <div sx={{ mx: 'auto' }} />
      <Query query={CURRENT_USER} >
        {({loading, data}) => {
          if (loading === false && data.user !== null) {
            return <Fragment>
                <Link passHref href="/">
                  <Lstyle
                    sx={{
                      variant: 'styles.navlink',
                      ml: 4,
                      py: 2,
                    }}>
                    Kurz
                  </Lstyle>
                </Link>
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
                <ProfileDropdown
                  sx={{ml: 4}}
                  photoURL={data.user.photoURL}
                  name={data.user.name}
                  email={data.user.email} />
              </Fragment>
          }
          return <Fragment>
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
        }}
      </Query>
    </div>
  </header>
)

export default Header
