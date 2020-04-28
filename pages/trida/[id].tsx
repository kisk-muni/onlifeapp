/** @jsx jsx */
import { Fragment } from 'react'
import DashboardLayout from '../../components/dashboard/DashboardLayout'
import GroupHeader from '../../components/dashboard/GroupHeader'
import { withApollo } from '../../apollo/client'
// import Link from 'next/link'
import { useRouter } from 'next/router'
import { jsx, Text, Heading, Grid, Close, Box, Flex } from 'theme-ui'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import FullPageLoading from "../../components/FullPageLoading"
import InviteStudentsBlock from '../../components/dashboard/InviteStudentsBlock'

export const GROUP = gql`
  query Group($id: ID!) {
    group(id: $id) {
      id
      name
      invitationCode
      students {
        id
        name
        email
        picture
      }
    }
  }
`

const SuccessIcon = () => (
  <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="green"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      shapeRendering="geometricPrecision"
      style={{color:'green', fill: 'green', stroke: '#fff'}}>
      <path
        d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z"
        fill="green"
        stroke="green">
      </path>
      <path
        d="M8 11.8571L10.5 14.3572L15.8572 9"
        fill="none" stroke="#fff">
      </path>
    </svg>
)

const topics: {
  name: string,
  subtopics: string[]
}[] = [
  {
    name: 'Fáze práce s informacemi',
    subtopics: [
      'Vyhledávání na internetu I ',
      'Vyhledávání na internetu II: Kde vyhledávat?',
      'Vyhledávání na internetu III: Jak vyhledávat?',
      'Filtrování výsledků',
      'Hodnocení informací',
      'Hodnocení informací: Dezinformace a manipulace s informacemi',
      'Hodnocení informací: Wikipedie',
      'Využití informací',
      'S informacemi k řešení problému',
    ]
  },
  {
    name: 'Fáze práce s informacemi',
    subtopics: [
      'Vyhledávání na internetu I ',
      'Vyhledávání na internetu II: Kde vyhledávat?',
      'Vyhledávání na internetu III: Jak vyhledávat?',
      'Filtrování výsledků',
      'Hodnocení informací',
      'Hodnocení informací: Dezinformace a manipulace s informacemi',
      'Hodnocení informací: Wikipedie',
      'Využití informací',
      'S informacemi k řešení problému',
    ]
  },
  {
    name: 'Práce s informacemi a učení',
    subtopics: [
      'Vyhledávání na internetu I ',
      'Vyhledávání na internetu II: Kde vyhledávat?',
      'Vyhledávání na internetu III: Jak vyhledávat?',
      'Filtrování výsledků',
      'Hodnocení informací',
      'Hodnocení informací: Dezinformace a manipulace s informacemi',
      'Hodnocení informací: Wikipedie',
      'Využití informací',
      'S informacemi k řešení problému',
    ]
  },
  {
    name: 'Média a občanství',
    subtopics: [
      'Vyhledávání na internetu I ',
      'Vyhledávání na internetu II: Kde vyhledávat?',
      'Vyhledávání na internetu III: Jak vyhledávat?',
      'Filtrování výsledků',
      'Hodnocení informací',
      'Hodnocení informací: Dezinformace a manipulace s informacemi',
      'Hodnocení informací: Wikipedie',
      'Využití informací',
      'S informacemi k řešení problému',
    ]
  },
  {
    name: 'Práce s dokumenty',
    subtopics: [
      'Vyhledávání na internetu I ',
      'Vyhledávání na internetu II: Kde vyhledávat?',
      'Vyhledávání na internetu III: Jak vyhledávat?',
      'Filtrování výsledků',
      'Hodnocení informací',
      'Hodnocení informací: Dezinformace a manipulace s informacemi',
      'Hodnocení informací: Wikipedie',
      'Využití informací',
      'S informacemi k řešení problému',
    ]
  },
  {
    name: 'Interakce, vzájemnost a zpětná vazba',
    subtopics: [
      'Vyhledávání na internetu I ',
      'Vyhledávání na internetu II: Kde vyhledávat?',
      'Vyhledávání na internetu III: Jak vyhledávat?',
      'Filtrování výsledků',
      'Hodnocení informací',
      'Hodnocení informací: Dezinformace a manipulace s informacemi',
      'Hodnocení informací: Wikipedie',
      'Využití informací',
      'S informacemi k řešení problému',
    ]
  },
]

interface Student {
  id: string
  name: string
  email: string
  picture: string
}

interface GroupQueryData {
  group: {
    id: string
    name: string,
    invitationCode: string
    students: Student[]
  }
}

interface GroupQueryVars {
  id: string | string[]
}

const Trida = () => {
  const router = useRouter();
  const { data, loading, error } = useQuery<GroupQueryData, GroupQueryVars>(GROUP, {variables: {id: router.query.id}})

  return (
    <DashboardLayout
      header={<GroupHeader />}
      stickHeaderByDefault>
      { loading ? <FullPageLoading dashboard /> : 
        <Flex sx={{flexWrap: 'wrap'}}>
          <Box
            sx={{
              maxWidth: 1240,
              px: 35,
              pt: 50,
              alignSelf: 'center',
              width: '100%',
              mx: 'auto'
            }}
          >
            {
              !loading && data?.group && data?.group?.students.length > 0
              ?
              <Fragment>
                <Box sx={{ mb: '42px' }}>
                  <Text sx={{fontSize: 4, mb: '42px', color: 'text'}}>Vyberte studenta pro filtrování výsledků</Text>
                  <Grid gap={4} columns={4} sx={{position: 'static', zIndex: 2}}>
                    {
                      data?.group?.students.map((student) =>
                      <Box sx={{mb: '12px'}}>
                          {student.picture && <img src={student.picture} sx={{boxShadow: '0 4px 14px 0 rgba(0,0,0,0.1)', position: 'static', zIndex: 2, opacity: '1', display: 'inline-block', height: '32px', borderRadius: '16px', mr: '14px', mb: -2,}} />}
                          <Text sx={{fontSize: 3, fontWeight: 400, color: 'text', textDecoration: 'none',  display: 'inline-block' }}>
                            {student.name}
                          </Text>
                        </Box>)
                    }
                  </Grid>
                </Box>  
                <Box sx={{ mb: '50px' }}>
                  <Box>
                      <Grid gap={4} columns={2}>
                        {topics.map((topic) => 
                          <Box sx={{mb: 2, variant: 'styles.groupCard' }}>
                            <Heading sx={{fontSize: 5, pb: 2, mb: 2}}>
                              {topic.name}
                            </Heading>
                              {topic.subtopics.map((subtopic, index) => (
                                <Flex sx={{
                                  justifyContent: 'space-between',
                                  pb: '2px',
                                  pt: '6px',
                                  px: 2,
                                  background: (index % 2 == 1 ? '#fff' : '#f6f6f6'),
                                  borderRadius: '6px'
                                }}>
                                  <Box><Text sx={{fontSize: 2}}>{subtopic}</Text></Box>
                                  <Box><SuccessIcon /></Box>
                                </Flex>
                              ))}
                          </Box>)}
                      </Grid>
                  </Box>
                </Box>
                <Box>
                  <Box
                    sx={{ variant: 'styles.groupHelpCard', height: '208px'}}
                    >
                    <Heading as="h3" sx={{fontSize: 3, color: '#333', mb: 3}}>Nápověda</Heading>
                  </Box>
                </Box>
              </Fragment>
              :
              <Box>
                <InviteStudentsBlock groupName={data!.group.name} invitationCode={data!.group.invitationCode} />
              </Box>  
            }
          </Box>
        </Flex>
      }
    </DashboardLayout>
  );
  
}

export default withApollo(Trida)