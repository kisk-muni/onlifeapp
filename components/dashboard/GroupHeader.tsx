/** @jsx jsx */
import { Fragment } from 'react'
import Link from 'next/link'
import { jsx, Link as Lstyle, Box, Grid, Container, Button, Text, Flex } from 'theme-ui'
import ProfileDropdown from "../ProfileDropdown"
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { MenuItem, Icon } from "@blueprintjs/core"
import { Select } from "@blueprintjs/select"
import useUser from '../../data/useUser'
import { useRouter } from 'next/router'

interface Student {
  id: string
  name: string
  email: string
  picture: string
}

interface Group {
  id: string
  name: string
  invitationCode: string
  students: Student[]
}

interface GroupSelectItem {
  id: string
  name: string
  link: string
}

export const GROUP_HEADER = gql`
query Group($id: ID!) {
  user {
    name
    photoURL
    email 
    id
  }
  groupsSelect {
    id
    name
    link
  }
  group(id: $id) {
    id
    name
    invitationCode
    students {
      id
      name
      picture
      email
    }
  }
}
`

interface HeaderQueryData {
  user: {
    name: string
    photoURL: string
    email: string
    id: string
  },
  groupsSelect: GroupSelectItem[],
  group: Group
}

interface HeaderQueryVars {
  id: string | string[]
}

const GroupHeader = ({currentPage, hideSubnav = false}: {currentPage?: string, hideSubnav?: boolean}) => {
  const router = useRouter();
  const userQuery = useUser()
  // variables for group: {id: router.query.trida}
  return (
  <header sx={{
      variant: 'styles.header',
      width: '100%',
      zIndex: 100
  }}>
    <Container sx={{maxWidth: '100%'}} >
      <Grid sx={{alignItems: 'center', gridTemplateColumns: 'repeat(3, 1fr)'}}>
        <Flex sx={{alignItems: 'center' }}>
          <Link passHref href="/">
            <Lstyle 
              sx={{
                variant: 'styles.navlogo',
                fontWeight: 700,
                fontSize: 4,
              }}>
              ONLIFE
            </Lstyle>
          </Link>
          {false
           ? <Fragment>
              <span sx={{
                  display: 'inline-block',
                  ml: 5,
                  background: '#eee',
                  borderRadius: '6px',
                  position: 'relative',
                  height: '32px',
                  my: 2,
                  width: '124px',
                }}></span>
                <span sx={{
                  display: 'inline-block',
                  ml: 5,
                  background: '#eee',
                  borderRadius: '6px',
                  position: 'relative',
                  py: 2,
                  height: '18px',
                  width: '124px',
                }}></span>
            </Fragment>
           : <Fragment>
                <Link href={'/trida?trida='+router.query.trida}>
                  <Button variant="groupSelect" sx={{mr: 1}}>{"data?.group.name"}</Button>
                </Link>
                { currentPage
                  ? <Fragment>
                      <Icon icon="caret-right" iconSize={14} sx={{mb: '2px', color: 'gray'}} />
                      <Text sx={{fontSize: 2, ml: 2, display: 'inline'}}>{currentPage}</Text>
                    </Fragment>
                  : <Text sx={{fontSize: 2, ml: 3, display: 'inline'}}>Kód pro přidání: <span sx={{letterSpacing: '2px', fontSize: 3}}>{"Code"}</span></Text>
                }
              </Fragment>
          }
        </Flex>
        <Flex sx={{ alignItems: 'center', justifyContent: 'center' }}>
          {
            false
            ? <Fragment>
                <span sx={{
                  display: 'inline-block',
                  ml: 5,
                  background: '#eee',
                  borderRadius: '6px',
                  position: 'relative',
                  height: '18px',
                  width: '124px',
                }}></span>
              </Fragment>
            : <Fragment>
                <Link as={"/trida?trida="+router.query.trida} href={{ pathname: '/trida', query: { trida: router.query.trida } }} passHref>
                  <Lstyle
                    sx={{
                      variant: 'styles.navlink',
                      color: (router.pathname  == '/trida' ? 'text' : 'gray'),
                      // borderBottom: (router.pathname  == '/trida' ? '2px solid #000' : '2px solid transparent'),
                      mr: 4
                    }}>
                    Přehled aktivity
                  </Lstyle>
                </Link>
                <Link as={"/studenti?trida="+router.query.trida} href={{ pathname: '/studenti', query: { trida: router.query.trida } }} passHref>
                  <Lstyle
                    sx={{
                      variant: 'styles.navlink',
                      color: (router.pathname  == '/studenti' ? 'text' : 'gray'),
                      //borderBottom: (router.pathname  == '/studenti' ? '2px solid #000' : '2px solid transparent'),
                      mr: 4,
                    }}>
                    Studenti
                  </Lstyle>
                </Link>
              </Fragment>
          }
        </Flex>
        <Flex sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
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
          {
            userQuery.loading
             ? <Fragment>
                <span sx={{
                  display: 'inline-block',
                  ml: 5,
                  background: '#eee',
                  borderRadius: '6px',
                  position: 'relative',
                  py: 2,
                  height: '18px',
                  width: '124px',
                }}></span>
                <div sx={{
                  display: 'inline-block',
                  height: '32px',
                  width: '32px',
                  marginLeft: '.6em',
                  background: '#eee',
                  borderRadius: '50%'
                  }}></div>
              </Fragment>
             : <ProfileDropdown sx={{ml: 4}} name={userQuery.user.name} email={userQuery.user.email} photoURL={userQuery.user.picture} />
          }
        </Flex>
      </Grid>
      {/* !hideSubnav &&
        <Box>
          <Link as={"/trida?trida="+router.query.trida} href={{ pathname: '/trida', query: { trida: router.query.trida } }} passHref>
            <Lstyle
              sx={{
                variant: 'styles.navlink',
                color: (router.pathname  == '/trida' ? 'text' : 'gray'),
                borderBottom: (router.pathname  == '/trida' ? '2px solid #000' : '2px solid transparent'),
                pb: 3,
                mr: 4,
                pt: 3
              }}>
              Přehled
            </Lstyle>
          </Link>
          <Link as={"/studenti?trida="+router.query.trida} href={{ pathname: '/studenti', query: { trida: router.query.trida } }} passHref>
            <Lstyle
              sx={{
                variant: 'styles.navlink',
                color: (router.pathname  == '/studenti' ? 'text' : 'gray'),
                borderBottom: (router.pathname  == '/studenti' ? '2px solid #000' : '2px solid transparent'),
                pb: 3,
                mr: 4,
                pt: 3
              }}>
              Studenti
            </Lstyle>
          </Link>
        </Box>
            */}
      </Container>
  </header>
  )
}

export default GroupHeader
