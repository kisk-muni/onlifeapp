/** @jsx jsx */
import { useState, useEffect, Fragment } from 'react'
import DashboardLayout from '../components/dashboard/DashboardLayout'
import GroupHeader from '../components/dashboard/GroupHeader'
import { useRouter } from 'next/router'
import InviteStudentsBlock from '../components/dashboard/InviteStudentsBlock'
import { jsx, Text, Heading, Container, Card, Link as SLink, Badge, Grid, Button, Box, Flex } from 'theme-ui'
import { NextPage } from 'next'
import Link from 'next/link'
import useGroup from '../data/useGroup'
import withAuthRedirect from '../utils/withAuthRedirect'
import { getAllPostsForGroup } from '../utils/api'
import { NextSeo } from 'next-seo'

const QuizBlock = ({groupId, studentsCount, quizId, title, slug, ...props}: {groupId: string, studentsCount: number, quizId: string, title: string, slug: string}) => {
  const router = useRouter()
  // const quizEngagement = useGroupQuizEngagementQuery({
  //   variables: {
  //     quizId: quizId,
  //     groupId: groupId
  //   }
  // })
  return (
    <Card {...props} sx={{
      mb: 3,
      backgroundColor: 'background',
      transition: 'box-shadow .1s ease 0s',
      '&:hover .text': {
        color: '#000',
      },
    }}>
      <Grid gap={2} columns={[2]}>
        <Box>
          <div><Badge variant="badges.pill" sx={{mr: 2, mt: 0, mb: 3}}>Kvíz</Badge></div>
          <Heading sx={{fontSize: 2, fontWeight: 600, mb: 3, mt: 2}}>{ title }</Heading>
          <Flex>
          <Text className="text" sx={{color: 'gray', fontSize: 2}}>Zapojených studentů:</Text>
          <Text sx={{color: 'text', ml: 3, fontSize: 2}}>{ true ? 'načítání' : 'engaged_count'} / {studentsCount}</Text>
          </Flex>
        </Box>
        <Flex sx={{justifyContent: 'flex-end'}}>
          <Button onClick={() => router.push("/stats/"+slug+"?trida="+router.query.trida)} sx={{my: 1, mr: 2, alignSelf: 'flex-start'}} variant="detailAction">Odpovědi a Statistiky</Button>  
          <Button onClick={() => router.push("/kviz/"+slug)} sx={{my: 1, alignSelf: 'flex-start'}} variant="detailAction">Stránka kvízu</Button>
        </Flex>
      </Grid>
    </Card>
  )
}

interface Props {
  allPosts: any
}

const Trida: NextPage<Props> = ({ allPosts }) => {
  const router = useRouter()
  const [ activeCategory, setActiveCategory ] = useState('')
  //const { data, loading, error } = useGroupQuery({variables: {id: router.query.trida as string}})
  const groupQuery = useGroup(router.query.trida as string)

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
      <NextSeo noindex title={groupQuery?.group?.name ? groupQuery?.group?.name : 'Načítání' } />
      <Flex sx={{
        flexDirection: 'column',
        flexGrow: 1,
        height: '100%',
        justifyContent: 'space-between'
      }}>    
      <Container sx={{mt: 4}}>
        { !groupQuery.loading && !(groupQuery?.group?.students?.length > 0) &&
          <Fragment>
            <Heading variant="ultratitle" sx={{mt: 3, textAlign: 'center'}}>Vítejte! Začněte pozváním studentů</Heading>
            <Text variant="subtitle" sx={{mt: 3, mb: 4, textAlign: 'center'}}>Kdokoli se v kurzu může připojit k vaší třídě pomocí odkazu nebo zadáním kódu.</Text>
            <InviteStudentsBlock invitationCode={groupQuery?.group?.invitation_code} sx={{mb: 5}} />
          </Fragment>
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
            <Box sx={{position: 'sticky', top: '116px'}}>
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
                      {post.url && <a sx={{variant: 'buttons.detailAction', ml: 3, px: 3, py: 2, alignSelf: 'flex-start', ':hover:focus': {textDecoration: 'none'}}} href={post.url}>Stránka tématu</a>}
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
                            <Flex sx={{mb: 3, alignItems: 'center'}}>
                              <Heading>{child.titulek}</Heading>
                              {child.url && <a sx={{variant: 'buttons.detailAction', ml: 3, px: 3, py: 2, alignSelf: 'flex-start', '&:hover&:focus': {textDecoration: 'none'}}} href={child.url}>Stránka podtématu</a>}
                            </Flex>
                          </Box>
                        {child?.content?.map((quizBlock, index) => (quizBlock?.id &&
                          <QuizBlock
                            key={index}
                            groupId={router.query.trida as string}
                            studentsCount={groupQuery.group?.students?.length}
                            quizId={quizBlock?.quizLink?.id}
                            title={quizBlock?.quizLink?.title}
                            slug={quizBlock?.quizLink?.slug}
                          />
                        ))}
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

export default withAuthRedirect(Trida, {roles: ['teacher']})