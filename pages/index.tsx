/** @jsx jsx */
import { useState, useEffect, Fragment } from 'react'
import StarterLayout from '../components/StarterLayout'
import GroupHeader from '../components/dashboard/GroupHeader'
import { useRouter } from 'next/router'
import InviteStudentsBlock from '../components/dashboard/InviteStudentsBlock'
import { jsx, Text, Heading, Container, Card, Link as SLink, Badge, Grid, Button, Box, Flex } from 'theme-ui'
import { NextPage } from 'next'
import Link from 'next/link'
import { getAllPostsForGroup } from '../utils/api'
import { NextSeo } from 'next-seo'

const QuizBlock = ({quizId, title, slug, ...props}: {quizId: string, title: string, slug: string}) => {
  const router = useRouter()
  return (
    <Card variant="interactive" {...props}
      sx={{
        mb: 3,
        backgroundColor: 'background',
        transition: 'box-shadow .1s ease 0s',
        '&:hover .text': {
          color: '#000',
        },
        ":hover,:focus": {
          cursor: "pointer",
        },
      }}
      onClick={() => router.push("/kviz/"+slug)}
    >
      <Grid gap={2} columns={[2]}>
        <Box>
          <div><Badge variant="badges.pill" sx={{mr: 2, mt: 0, mb: 3}}>Kvíz</Badge></div>
          <Heading sx={{fontSize: 2, fontWeight: 600, mb: 3, mt: 2}}>{ title }</Heading>
        </Box>
      </Grid>
    </Card>
  )
}

interface Props {
  allPosts: any
}

const Index: NextPage<Props> = ({ allPosts }) => {
  const router = useRouter()
  const [ activeCategory, setActiveCategory ] = useState('')
  //const { data, loading, error } = useGroupQuery({variables: {id: router.query.trida as string}})
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
    <StarterLayout stickHeaderByDefault>
      <NextSeo noindex title={'Přehled kvízů'} />
      <Flex sx={{
        flexDirection: 'column',
        flexGrow: 1,
        height: '100%',
        bg: 'sheet',
        justifyContent: 'space-between'
      }}>    
      <Container sx={{mt: 4}}>
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
                    <Link passHref as={"/?category="+post.slug} href={{ pathname: '/', query: { category: post.slug } }} scroll={false}>
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
    </StarterLayout>
  );
  
}

export async function getStaticProps({ preview = false }) {
  const allPosts = (await getAllPostsForGroup(false)) || []
  //const allPostsSorted = allPosts.sort((a, b) => (a.position - b.position))
  return {
    props: { allPosts },
  }
}

export default Index