/** @jsx jsx */
import { Fragment } from 'react'
import Link from 'next/link'
import { jsx, Link as Lstyle, Grid, Container, Button, Badge, Text, Flex } from 'theme-ui'
import ProfileDropdown from "../ProfileDropdown"
import useUser from 'data/useUser'
import useGroup from 'data/useGroup'
import Router from 'next/router'

const GroupHeader = ({currentPage}: {currentPage?: string, hideSubnav?: boolean}) => {
  const { user, loading, error } = useUser()
  const groupQuery = useGroup(Router.query.trida as string)
  return (
  <header sx={{
      variant: 'styles.header',
      width: '100%',
      zIndex: 100
  }}>
    <Container sx={{maxWidth: '100%'}} >
      <Grid sx={{alignItems: 'center', gridTemplateColumns: 'repeat(3, 1fr)'}}>
        <Flex sx={{alignItems: 'center' }}>
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
          {groupQuery.loading
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
            </Fragment>
           : <Fragment>
                <Text sx={{fontSize: 4, fontWeight: 'normal', mx: 2, display: 'inline', color: '#ccc'}}>{'|'}</Text>
                <Link href={'/aktivita?trida='+Router.query.trida}>
                  <Text sx={{fontSize: 4, fontWeight: 'bold', ml: 1, display: 'inline'}}>{groupQuery?.group?.name}</Text>
                </Link>
                { currentPage
                  && <Fragment>
                        <Text sx={{fontSize: 2, ml: 3, display: 'inline'}}>{currentPage}</Text>
                      </Fragment>
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
                <Link as={"/aktivita?trida="+Router.query.trida} href={{ pathname: '/aktivita', query: { trida: Router.query.trida } }} passHref>
                  <Button
                    sx={{
                      variant: (Router.pathname  == '/aktivita' ? 'buttons.menuActive' : 'buttons.menu'),
                      mr: 2
                    }}>
                    Přehled aktivity
                  </Button>
                </Link>
                <Link as={"/studenti?trida="+Router.query.trida} href={{ pathname: '/studenti', query: { trida: Router.query.trida } }} passHref>
                  <Button
                    sx={{
                      variant: (Router.pathname  == '/studenti' ? 'buttons.menuActive' : 'buttons.menu'),
                    }}>
                    Studenti {!groupQuery.loading && <Badge variant="count" sx={{ml: 1}}>{groupQuery.group?.students?.length}</Badge> }
                  </Button>
                </Link>
              </Fragment>
          }
        </Flex>
        <Flex sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
          <Link passHref href="/tridy">
            <Lstyle
              sx={{
                variant: 'styles.navlink',
                ml: 4,
                py: 2,
              }}>
              Moje třídy
            </Lstyle>
          </Link>
          {
            loading
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
             : <ProfileDropdown sx={{ml: 4}} name={user.name} email={user.email} photoURL={user.picture} />
          }
        </Flex>
      </Grid>
      {/* !hideSubnav &&
        <Box>
          <Link as={"/aktivita?trida="+Router.query.trida} href={{ pathname: '/aktivita', query: { trida: Router.query.trida } }} passHref>
            <Lstyle
              sx={{
                variant: 'styles.navlink',
                color: (Router.pathname  == '/aktivita' ? 'text' : 'gray'),
                borderBottom: (Router.pathname  == '/aktivita' ? '2px solid #000' : '2px solid transparent'),
                pb: 3,
                mr: 4,
                pt: 3
              }}>
              Přehled
            </Lstyle>
          </Link>
          <Link as={"/studenti?trida="+Router.query.trida} href={{ pathname: '/studenti', query: { trida: Router.query.trida } }} passHref>
            <Lstyle
              sx={{
                variant: 'styles.navlink',
                color: (Router.pathname  == '/studenti' ? 'text' : 'gray'),
                borderBottom: (Router.pathname  == '/studenti' ? '2px solid #000' : '2px solid transparent'),
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
