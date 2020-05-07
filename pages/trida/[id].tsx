/** @jsx jsx */
import { Fragment, useState } from 'react'
import DashboardLayout from '../../components/dashboard/DashboardLayout'
import GroupHeader from '../../components/dashboard/GroupHeader'
import { withApollo } from '../../apollo/client'
import { useRouter } from 'next/router'
import { useGroupQuery } from '../../apollo/group.graphql'
import { ResultsComponent, StudentSubtopicsResult, StudentTopicsResult } from '../../apollo/studentResults.graphql'
import { jsx, Text, Heading, AspectRatio, Link as SLink, Grid, Box, Flex, Close } from 'theme-ui'
import FullPageLoading from "../../components/FullPageLoading"
import InviteStudentsBlock from '../../components/dashboard/InviteStudentsBlock'
import { Collapse } from '@blueprintjs/core'

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

interface StudentSubtopicsResultWithIndex extends StudentSubtopicsResult {
  index: number
}

const Subtopic = ({name, quizAttempts, index}: StudentSubtopicsResultWithIndex) => {
  const [showDetail, setShowDetail] = useState(false) 
  return (
    <Box sx={{
      pb: '6px',
      pt: '6px',
      px: 2,
      background: ((index % 2) == 1 ? '#fff' : '#f5f5f5'),
      borderRadius: '6px',
      borderBottom: showDetail ? '1px solid #ddd' : 'none',
      mb: showDetail ? 2 : 0,
    }}>
      <Flex sx={{
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Box><Text sx={{fontSize: showDetail ? 4 : 2, fontWeight: showDetail ? '700' : '400'}}>{name}</Text></Box>
        <Flex>
          { quizAttempts && quizAttempts.length > 0 &&
            <Fragment>
              <SLink sx={{mr: 2, color: 'text'}} onClick={() => setShowDetail(!showDetail)}>
                {!showDetail ? 'Detail' : 'Zavřít'}
              </SLink>
              <SuccessIcon />
            </Fragment>
          }
        </Flex>
      </Flex>
      <Collapse isOpen={showDetail}>
        {quizAttempts && quizAttempts?.length > 0 && quizAttempts.map((attempt, index) => (
          <Box sx={{py: 2}}>
            <Heading as="h3" sx={{mb: 2}}>Pokus {index+1}</Heading>
            <Box sx={{pl: 3}}>
              <Text>Počet bodů: {attempt?.result}</Text>
              <Text>Čas: {attempt?.time}</Text>
              <Heading as="h4" sx={{mt: 3, mb: 2}}>Odpovědi</Heading>
              <ul>
                {attempt?.detail && attempt?.detail.length > 0 && attempt?.detail.map((item) => (
                  <li>
                    <Box>{item?.question}</Box>
                    <Box>{item?.answer}</Box>
                  </li>
                ))}
              </ul>
            </Box>
          </Box>
        ))}
      </Collapse>
    </Box>
  )
}

const Topic = ({name, subtopics}: StudentTopicsResult) => {
  return (
    <Box sx={{mb: 2, variant: 'styles.groupCard' }}>
      <Heading sx={{fontSize: 5, pb: 2, mb: 2}}>
        {name}
      </Heading>
      {subtopics?.map((subtopic, index) => <Subtopic name={subtopic?.name} index={index} quizAttempts={subtopic?.quizAttempts} />)}
    </Box>
  )
}

interface Student {
  id: string
  name: string
  email: string
  picture: string
}

const Trida = () => {
  const router = useRouter();
  const [ activeStudent, setActiveStudent ] = useState('')
  const { data, loading, error } = useGroupQuery({variables: {id: router.query.id as string}})

  return (
    <DashboardLayout
      header={<GroupHeader />}
      stickHeaderByDefault>
      { (loading || error || !data?.group) ? <FullPageLoading dashboard /> : 
        <Flex sx={{
          flexDirection: 'column',
          flexGrow: 1,
          height: '100%',
          justifyContent: 'space-between'
        }}>
          <Box
            sx={{
              maxWidth: 1280,
              px: 35,
              pt: 50,
              width: '100%',
              mx: 'auto'
            }}
          >
            {
              data?.group?.students && data?.group?.students.length > 0
              ?
              <Fragment>
                <Box sx={{ mb: '42px' }}>
                  <Heading sx={{fontSize: '40px', mb: '42px', lineHeight: '42px', color: 'text'}}>
                    { activeStudent === ''
                      ? 'Vyberte studenta pro zobrazení výsledků'
                      : <Flex sx={{alignItems: 'baseline'}}>
                          <span sx={{color: 'gray', mr: 2}}>Výsledky studenta:</span>
                          { data?.group.students.find(x => x!.id === activeStudent)!.name }
                          <Close
                            sx={{
                              ml: 3,
                              transform: 'scale(1.5)',
                              position: 'relative',
                              bottom: '0px',
                              color: 'gray',
                              '&:hover': {
                                cursor: 'pointer',
                                color: 'text'
                              },
                              '&:focus': {
                                outline: 'none'
                              }
                            }}
                            onClick={() => setActiveStudent('')} />
                        </Flex>
                    }
                  </Heading>
                  <Grid gap={4} columns={4} sx={{position: 'static', zIndex: 2}}>
                    {
                      data?.group?.students.map((student) =>
                        <Flex>
                          <Box
                            onClick={() => setActiveStudent(student!.id)}
                            sx={{                            
                              mb: '12px',
                              '&:hover': {
                                cursor: 'pointer'
                              },
                              '&:hover > img': {
                                opacity: '1'
                              },
                              '&:hover > div': {
                                color: 'text'
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
                                  opacity: (student!.id === activeStudent ? '1' : '.5'),
                                  display: 'inline-block',
                                  height: '32px',
                                  borderRadius: '50%',
                                  mr: '14px',
                                  mb: -2,
                                }}
                              />}
                            <Text sx={{
                                fontWeight: (student!.id === activeStudent ? 700 : 400),
                                textDecoration: (student!.id === activeStudent ? 'underline' : 'none'),
                                color: (student!.id === activeStudent ? 'text' : 'gray'),
                                fontSize: 3,
                                lineHeight: '32px',
                                display: 'inline-block'
                              }}>
                                {student!.name}
                            </Text>
                          </Box>
                            {student!.id === activeStudent &&
                              <Close
                                sx={{
                                  position: 'relative',
                                  bottom: '-2px',
                                  color: 'gray',
                                  '&:hover': {
                                    cursor: 'pointer',
                                    color: 'text'
                                  },
                                  '&:focus': {
                                    outline: 'none'
                                  }
                                }}
                                onClick={() => setActiveStudent('')}
                              />
                            }
                        </Flex>)
                    }
                  </Grid>
                </Box>  
                <Box sx={{ mb: '50px' }}>
                  <Box>
                      { activeStudent &&
                        <ResultsComponent variables={{id: activeStudent}}>
                          {({loading, data, error}) => {
                            if (loading || error || !data?.studentTopicsResults) {
                              let placeholders = [1, 2, 3, 4, 5, 6]
                              return (
                                <Grid gap={4} columns={2}>
                                  {placeholders.map(item => (
                                    <Box sx={{mb: 2, borderRadius: '6px', background: '#eee'}}>
                                      <AspectRatio ratio={1} />
                                    </Box>
                                  ))}
                                </Grid>
                              )
                            }
                            return (
                              <Grid gap={4} columns={2}>
                                {data?.studentTopicsResults.map((topic) => <Topic name={topic!.name!} subtopics={topic?.subtopics} />)}
                              </Grid>
                            ) 
                          }}
                        </ResultsComponent>
                      }
                  </Box>
                </Box>
              </Fragment>
              :
              <Box>
                <InviteStudentsBlock groupName={data?.group.name} invitationCode={data!.group!.invitationCode!} />
              </Box>  
            }
          </Box>
          <Box
            sx={{
              maxWidth: 1280,
              px: 35,
              pt: 50,
              alignSelf: 'flex-end',
              width: '100%',
              mx: 'auto'
            }}
          >
                  <Box
                    sx={{ variant: 'styles.groupHelpCard', height: '208px'}}
                    >
                    <Heading as="h3" sx={{fontSize: 3, color: '#333', mb: 3}}>Nápověda</Heading>
                  </Box>
                </Box>
        </Flex>
      }
    </DashboardLayout>
  );
  
}

export default withApollo(Trida)