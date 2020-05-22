/** @jsx jsx */
import { Fragment, useState, useEffect } from 'react'
import DashboardLayout from '../components/dashboard/DashboardLayout'
import Avatar from '../components/Avatar'
import GroupHeader from '../components/dashboard/GroupHeader'
import { withApollo } from '../apollo/client'
import { useRouter } from 'next/router'
import { useGroupQuery } from '../apollo/group.graphql'
import { jsx, Text, Heading, Container, Grid, Box, Flex } from 'theme-ui'
import FullPageLoading from "../components/FullPageLoading"
import InviteStudentsBlock from '../components/dashboard/InviteStudentsBlock'
import { NextPage } from 'next'
import withAuthRedirect from '../utils/withAuthRedirect'

const Studenti: NextPage = () => {
  const router = useRouter()
  //const [ activeStudent, setActiveStudent ] = useState('')
  const [ activeCategory, setActiveCategory ] = useState('')
  const { data, loading, error } = useGroupQuery({variables: {id: router.query.trida as string}})

  return (
    <DashboardLayout
      header={<GroupHeader />}
      stickHeaderByDefault> 
      <Flex sx={{
        flexDirection: 'column',
        flexGrow: 1,
        height: '100%',
        justifyContent: 'space-between'
      }}>
      <Container sx={{mt: 4}} variant="groupContainer">
      {
        loading ? <div>
          Načítání…
        </div>
        :
        <div>
          {
            data?.group?.students?.length > 0 ?
            <Box sx={{mb: 5}}>
              <Heading sx={{mb: 3, fontSize: 7}}>Studenti</Heading>
              <Grid gap={4} columns={4} sx={{mt: 4, position: 'static', zIndex: 2}}>
                {
                  data?.group?.students.map((student) =>
                    <Flex
                      sx={{                            
                        mb: '12px',
                        alignItems: 'center'
                      }}>
                        <Avatar sx={{height: 48, color: '#fff', width: 48, lineHeight: '48px', overflow: 'hidden', borderRadius: 24, fontSize: 3}} name={student.name} photoURL={student?.picture} />
                        <Text sx={{
                            ml: 3,
                            fontWeight: 500,
                            color: 'text',
                            fontSize: 4,
                            lineHeight: '32px',
                            display: 'inline-block'
                          }}>
                            {student!.name}
                        </Text>
                  </Flex>)
                }
              </Grid>
            </Box>
            : 
            <InviteStudentsBlock invitationCode={data.group.invitationCode} />
          }
        </div>
      }
      </Container>
      </Flex>
    </DashboardLayout>
  );
  
}

export default withApollo(withAuthRedirect(Studenti, {roles: ['teacher'], next: 'ucitel'}))