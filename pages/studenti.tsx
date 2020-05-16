/** @jsx jsx */
import { Fragment, useState, useEffect } from 'react'
import DashboardLayout from '../components/dashboard/DashboardLayout'
import GroupHeader from '../components/dashboard/GroupHeader'
import { withApollo } from '../apollo/client'
import { useRouter } from 'next/router'
import { useGroupQuery } from '../apollo/group.graphql'
import { ResultsComponent, StudentSubtopicsResult, StudentTopicsResult } from '../apollo/studentResults.graphql'
import { jsx, Text, Heading, Container, Alert, AspectRatio, Link as SLink, Badge, Grid, Button, Box, Flex, Close } from 'theme-ui'
import FullPageLoading from "../components/FullPageLoading"
import InviteStudentsBlock from '../components/dashboard/InviteStudentsBlock'
import { Collapse } from '@blueprintjs/core'
import { NextPage, GetServerSideProps } from 'next'
import Link from 'next/link'
import withAuthRedirect from '../utils/withAuthRedirect'
import { getAllPostsForGroup, getAllCategoriesForGroupWithSlug } from '../utils/api'

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
                    <Box
                      sx={{                            
                        mb: '12px',
                        '&:hover': {
                          cursor: 'pointer'
                        }
                      }}>
                      { student?.picture &&
                        <img
                          src={student!.picture}
                          sx={{
                            boxShadow: '0 4px 14px 0 rgba(0,0,0,0.1)',
                            boxSizing: 'content-box',
                            position: 'static',
                            zIndex: 2,
                            display: 'inline-block',
                            height: '32px',
                            borderRadius: '50%',
                            mr: '14px',
                            mb: -2,
                          }}
                        />}
                        <Text sx={{
                            fontWeight: 500,
                            color: 'text',
                            fontSize: 3,
                            lineHeight: '32px',
                            display: 'inline-block'
                          }}>
                            {student!.name}
                        </Text>
                  </Box>)
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