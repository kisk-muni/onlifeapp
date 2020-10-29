/** @jsx jsx */
import DashboardLayout from '../components/dashboard/DashboardLayout'
import Avatar from '../components/Avatar'
import GroupHeader from '../components/dashboard/GroupHeader'
import { useRouter } from 'next/router'
import { jsx, Text, Heading, Container, Grid, Box, Flex } from 'theme-ui'
import FullPageLoading from "../components/FullPageLoading"
import InviteStudentsBlock from '../components/dashboard/InviteStudentsBlock'
import { NextPage } from 'next'
import withAuthRedirect from '../utils/withAuthRedirect'
import { NextSeo } from 'next-seo'
import useGroup from '../data/useGroup'

const Studenti: NextPage = () => {
  const router = useRouter()
  const groupQuery = useGroup(router.query.trida as string)

  return (
    <DashboardLayout
      header={<GroupHeader />}
      stickHeaderByDefault> 
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
              <Heading sx={{mb: 3, fontSize: 7}}>Studenti</Heading>
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