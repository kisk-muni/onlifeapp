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
import { getAllPostsForGroup } from '../utils/api'

interface Props {
  allPosts: any
}

const Trida: NextPage<Props> = ({ allPosts }) => {
  const router = useRouter()
  //const [ activeStudent, setActiveStudent ] = useState('')
  const [ activeCategory, setActiveCategory ] = useState('')
  const { data, loading, error } = useGroupQuery({variables: {id: router.query.trida as string}})

  useEffect(() => {
    setActiveCategory(router.query.category ? router.query.category : allPosts[0].slug)
  });
  let filteredPosts = allPosts
  if (activeCategory) {
    filteredPosts = allPosts.filter(post => {
      return post.slug === activeCategory
    })
  }

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
        { !loading && !(data?.group?.students?.length > 0) &&
        <Link as={"/studenti?trida="+(router.query.trida as string)} href={{ pathname: '/studenti', query: { trida: router.query.trida } }}>
          <Box sx={{
            boxShadow: 'rgba(0, 0, 0, 0.15) 0px 2px 6px',
            '&:hover': {
              boxShadow: 'rgba(0, 0, 0, 0.1) 0px 6px 12px',
              cursor: 'pointer',
            },
            '&:hover button': {
              background: '#1515f7',
              boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
            },
            mb: 4, py: 4, px: 4, backgroundColor: 'background', borderTop: '4px solid #ff8100', borderRadius: '5px'}}>
            <Heading sx={{fontSize: 5, mb: 3,}}>Začněte pozváním studentů do třídy</Heading>
            <Button>Pozvat studenty</Button>
          </Box>
        </Link>
        }
        <Flex
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
          }}>
          <Box
            sx={{
              position: 'relative',
              flexGrow: 1,
              flexBasis: 'resultsFilterSidebar',
            }}>
            <Box sx={{position: 'sticky', top: '143px'}}>
              <Heading sx={{mb: 4}}>Témata</Heading>
              {
                allPosts.map((post, i) => (
                  <Box key={i} sx={{mb: '16px'}}>
                    <Link passHref as={"/trida?trida="+router.query.trida+"&category="+post.slug} href={{ pathname: '/trida', query: { trida: router.query.trida, category: post.slug } }} scroll={false}>
                      <SLink sx={{
                        fontWeight: (activeCategory === post.slug ? 600 : 400),
                        color: (activeCategory === post.slug ? 'text' : 'gray'),
                        fontSize: 2,
                        '&:hover': {
                          color: 'text',
                          textDecoration: 'none',
                        }
                      }}>{post.titulek}</SLink>
                    </Link>
                  </Box>
                ))
              }
            </Box>
          </Box>
          <Box
            sx={{
              flexGrow: 99999,
              flexBasis: 0,
              minWidth: 400,
          }}>
            {
              filteredPosts.map((post) => (
                <Box sx={{mb: 3}}>
                  <Box>
                    <Flex sx={{mb: 4, pb: 3, alignItems: 'center', borderBottom: '1px dashed #ddd'}}>
                      <Heading sx={{fontSize: 6}}>{post.titulek}</Heading>
                      {post.url && <a href={post.url}><Button sx={{ml: 3, alignSelf: 'flex-start'}} variant="detailAction">Stránka tématu</Button></a>}
                    </Flex>
                  </Box>
                  { !(post.children.length > 0) && <Text sx={{color: 'gray', fontSize: 2}}>Téma nemá žádný interaktivní obsah</Text> }
                  { post.children.map((child, i) => (
                    <Box key={i} sx={{mb: 3}}>
                      <Box sx={{
                          mb: 2,
                          pb: 2,
                        }}>
                          <Box>
                            <Badge variant="primary" sx={{mr: 2, mb: 2, backgroundColor: '#000'}}>Podtéma</Badge>
                            <Flex sx={{mb: 3, alignItems: 'center'}}>
                              <Heading>{child.titulek}</Heading>
                              {child.url && <a href={child.url}><Button sx={{ml: 3, alignSelf: 'flex-start'}} variant="detailAction">Stránka podtématu</Button></a>}
                            </Flex>
                          </Box>
                        { child?.content?.map((quizBlock) => (
                          quizBlock.id && 
                          <Box sx={{
                            pt: 3,
                            pb: 4,
                            px: 4,
                            mb: 3,
                            backgroundColor: 'background',
                            borderRadius: '5px',
                            transition: 'box-shadow .1s ease 0s',  
                            boxShadow: 'rgba(0, 0, 0, 0.15) 0px 2px 6px',
                            '&:hover': {
                              boxShadow: 'rgba(0, 0, 0, 0.1) 0px 6px 12px',
                            },
                            '&:hover .text': {
                              color: '#000',
                            },
                          }}>
                            <Grid gap={2} columns={[2]}>
                              <Box>
                                <div><Badge variant="primary" sx={{mr: 2, mt: 2, mb: 3}}>Kvíz</Badge></div>
                                <Heading sx={{fontSize: 2, fontWeight: 600, mb: 3, mt: 2}}>{ quizBlock.quizLink.title }</Heading>
                                <Flex>
                                <Text className="text" sx={{color: 'gray', fontSize: 2}}>Zapojených studentů:</Text>
                                <Text sx={{color: 'text', ml: 3, fontSize: 2}}>0 / {data?.group?.students?.length}</Text>
                                </Flex>
                              </Box>
                              <Flex sx={{justifyContent: 'flex-end'}}>
                                <Button onClick={() => router.push("/stats/"+quizBlock.quizLink.slug+"?trida="+router.query.trida)} sx={{my: 1, alignSelf: 'flex-start'}} variant="detailAction">Odpovědi a Statistiky</Button>  
                                <Button onClick={() => router.push("/kviz/"+quizBlock.quizLink.slug)} sx={{my: 1, alignSelf: 'flex-start'}} variant="detailAction">Stránka kvízu</Button>
                              </Flex>
                            </Grid>
                          </Box>
                        )) }
                      </Box>
                    </Box>
                  )) }
                </Box>
              ))
            }
          </Box>
        </Flex>
        </Container>
      </Flex>
    </DashboardLayout>
  );
  
}

export async function getStaticProps({ preview = false }) {
  const allPosts = (await getAllPostsForGroup(false)) || []
  //const allPostsSorted = allPosts.sort((a, b) => (a.position - b.position))
  return {
    props: { allPosts },
  }
}

export default withApollo(withAuthRedirect(Trida, {roles: ['teacher'], next: 'ucitel'}))