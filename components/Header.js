/** @jsx jsx */
import * as React from 'react'
import Link from 'next/link'
import { Container } from 'theme-ui'
import { jsx, Link as Lstyle } from 'theme-ui'
import withAuth from "../lib/withAuth"

const Header = ({ user, loading, error, pathname }) => (
  <header
  sx={{
    variant: 'styles.header',
  }}>
  <div
    sx={{
      maxWidth: 1240,
      mx: 'auto',
      px: 35,
      display: 'flex',
      alignItems: 'baseline',
    }}>
    <Link href="/">
      <Lstyle 
        sx={{
          variant: 'styles.navlink',
          fontSize: 5,
          py: 2,
        }}>
        OnLife
      </Lstyle>
    </Link>
    <div sx={{ mx: 'auto' }} />
      <Link href="/example">
        <Lstyle
          sx={{
            variant: 'styles.navlink',
            ml: 4,
            py: 2,
          }}>
          Studovat
        </Lstyle>
      </Link>
      <Link href="/example">
        <Lstyle
          sx={{
            variant: 'styles.navlink',
            ml: 4,
            py: 2,
          }}>
          O kurzu
        </Lstyle>
      </Link>
      
      {
        (!loading && user) && <Link href="/profile">
          <Lstyle
            sx={{
              variant: 'styles.navlink',
              ml: 4,
              py: 2,
            }}>
              {user.photoURL && <img src={user.photoURL} style={{height: 28, marginRight: '.6em', position: 'relative', bottom: '-6px', borderRadius: '50%'}} /> }{user.displayName ? user.displayName : user.email }
          </Lstyle>
        </Link>
      }
      {   
        (!user && !loading) && <Link href="/signin">
        <Lstyle
          sx={{
            variant: 'styles.navlink',
            ml: 4,
            py: 2,
          }}>
          Přihlásit se
        </Lstyle>
      </Link>
      }

    </div>
  </header>
)

export default withAuth(Header)
