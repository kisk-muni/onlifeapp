/** @jsx jsx */
import DashboardLayout from 'components/dashboard/DashboardLayout'
import Avatar from 'components/Avatar'
import GroupHeader from 'components/dashboard/GroupHeader'
import { useRouter } from 'next/router'
import { jsx, Text, Heading, Container, IconButton, Grid, Card, Input, Box, Flex, Button } from 'theme-ui'
import FullPageLoading from "components/FullPageLoading"
import InviteStudentsBlock from 'components/dashboard/InviteStudentsBlock'
import { NextPage } from 'next'
import withAuthRedirect from 'utils/withAuthRedirect'
import { NextSeo } from 'next-seo'
import useGroup from 'data/useGroup'
import { useState } from 'react'
import CopyButton from 'components/CopyButton'

const Studenti: NextPage = () => {
  const router = useRouter()
  const [showInvitationInfo, setShowInvitationInfo] = useState(false)
  const groupQuery = useGroup(router.query.trida as string)

  return (
    <DashboardLayout header={<GroupHeader />} > 
      <NextSeo noindex title={groupQuery?.group?.name ? groupQuery?.group?.name : 'Načítání' } />
      <Flex sx={{
        flexDirection: 'column',
        flexGrow: 1,
        height: '100%',
        justifyContent: 'space-between'
      }}>
      <Container sx={{mt: 4}}>
      {
        groupQuery.loading ? <FullPageLoading />
        :
        <div>
          {
            groupQuery?.group?.students?.length > 0 ?
            <Box sx={{mb: 5}}>
              <Flex sx={{justifyContent: 'space-between', mb: 3}}>
                <Heading sx={{mb: 3, fontSize: 7}}>Studenti</Heading>
                { !showInvitationInfo && <Button variant="cta" sx={{alignSelf: 'center', bg: 'foreground', color: 'background'}} onClick={() => setShowInvitationInfo(true)}>Pozvat studenty</Button> }
              </Flex>
              {
                showInvitationInfo && <Card sx={{
                  backgroundImage: t => t.util.gx('#18daff', '#5bffcd'),
                  color: 'black',
                  position: 'relative',
                }}>
                  <IconButton onClick={() => setShowInvitationInfo(false)}
                    sx={{
                      position: 'absolute',
                      top: '16px',
                      right: '16px',
                      transition: "transform .125s ease-in-out",
                      ':focus,:hover': {cursor: 'pointer', transform: 'scale(1.2)'}
                    }}
                  >
                    <svg sx={{height: '32px', width: '32px', fill: 'currentcolor'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"></path></svg>
                  </IconButton>
                  <Heading variant="headling" sx={{fontSize: 5}}>Pozvěte studenty do webové aplikace ONLIFE</Heading>
                  <Text variant="lead">Vyzvěte studenty k registraci v této webové aplikaci a předejte jim tajný kód pro připojení ke třídě.</Text>        
                  <Heading variant="headline" sx={{fontSize: 3, mb: 2}}>Kód</Heading>
                  <Flex sx={{alignItems: 'center'}}>
                    <Input
                      sx={{mr: 3, fontSize: 3, px: 3, border: 'none', bg: 'white', maxWidth: 100}}
                      onFocus={(event) => event.target.select()}
                      defaultValue={groupQuery?.group?.invitation_code}
                      readOnly
                    />
                    <CopyButton textToCopy={groupQuery?.group?.invitation_code} />
                  </Flex>
                </Card>
              }
              <Grid gap={4} columns={4} sx={{mt: 4, position: 'static', zIndex: 2}}>
                {
                  groupQuery?.group?.students.map((student) =>
                    <Flex
                      sx={{                            
                        mb: '12px',
                        alignItems: 'center'
                      }}>
                        <Avatar sx={{height: 48, color: '#fff', width: 48, lineHeight: '48px', overflow: 'hidden', borderRadius: 24, fontSize: 3}} name={student.data.name} photoURL={student?.data?.picture} />
                        <Text sx={{
                            ml: 3,
                            fontWeight: 500,
                            color: 'text',
                            fontSize: 4,
                            lineHeight: '32px',
                            display: 'inline-block'
                          }}>
                            {student?.data.name}
                        </Text>
                  </Flex>)
                }
              </Grid>
            </Box>
            : 
            <InviteStudentsBlock invitationCode={groupQuery?.group.invitation_code} />
          }
        </div>
      }
      </Container>
      </Flex>
    </DashboardLayout>
  );
  
}

export default withAuthRedirect(Studenti, {roles: ['teacher']})