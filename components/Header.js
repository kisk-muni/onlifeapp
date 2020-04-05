/** @jsx jsx */
import * as React from 'react'
import Link from 'next/link'
import { jsx, Link as Lstyle } from 'theme-ui'
import withAuth from "../lib/withAuth"
import ProfileDropdown from "./ProfileDropdown";

const Header = ({ user, loading, error, pathname, color, headerStyle, navlink, navlogo }) => (
  <header
  sx={{
    variant: headerStyle || 'styles.header',
    width: '100%'
  }}>
  <div
    sx={{
      mx: 'auto',
      px: 35,
      display: 'flex',
      alignItems: 'baseline',
    }}>
    <Link href="/">
      <Lstyle 
        sx={{
          variant: navlogo || 'styles.navlogo',
          fontSize: 4,
          py: 2,
        }}>
        Onlife
      </Lstyle>
    </Link>
    <div sx={{ mx: 'auto' }} />
      <Lstyle href="https://kisk.phil.muni.cz/onlife"
        sx={{
          variant: navlink || 'styles.navlink',
          ml: 4,
          py: 2,
        }}>
        Web kurzu
      </Lstyle>
      {
        (!loading && user) && <ProfileDropdown navlink={navlink} photoURL={user.photoURL} name={user.displayName} email={user.email} />
      }
      {   
        (!user && !loading) && <Link href="/prihlaseni">
        <Lstyle
          sx={{
            variant: navlink || 'styles.navlink',
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
