/** @jsx jsx */
import * as React from 'react'
import Link from 'next/link'
import { jsx, Link as Lstyle } from 'theme-ui'
import {CURRENT_USER} from "../lib/withApolloAuth"
import ProfileDropdown from "./ProfileDropdown";
import { Query } from 'react-apollo';

const Header = ({ data, loading, headerStyle, navlink, navlogo }) => (
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
      <Query query={CURRENT_USER}>
        {({loading, data}) => {
          if (!loading && data.user.isLoggedIn) {
            return <ProfileDropdown
              navlink={navlink}
              photoURL={data.user.photoURL}
              name={data.user.name}
              email={data.user.email} />
          } else {
            return <Link href="/prihlaseni">
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
        }}
      </Query>
    </div>
  </header>
)

export default Header
