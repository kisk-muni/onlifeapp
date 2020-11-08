/** @jsx jsx */
import StarterLayout from 'components/StarterLayout'
import { useRouter } from 'next/router'
import htmlParser from 'react-markdown/plugins/html-parser'
import { jsx, Text, Heading, Container, Card, Donut, Link as SLink, Spinner, AspectRatio, Grid, Box, Flex } from 'theme-ui'
import { NextPage } from 'next'
import Link from 'next/link'
import { getAllPostsForGroup } from 'utils/api'
import { NextSeo } from 'next-seo'
import useSWR from 'swr'
import fetcher from 'lib/fetcher'
import { Response } from 'pages/api/quiz/submissions-list'
import useUser from 'data/useUser'

interface Props {
  allPosts: any
}

const Index: NextPage<Props> = ({ allPosts }) => {
  const user = useUser()
  const {data, error} = useSWR<Response>('/api/quiz/submissions-list', fetcher)
  return (
    <StarterLayout>
      <NextSeo noindex title={'Přehled kvízů'} />
      <Box sx={{backgroundImage: t => t.util.gx('red', 'primary'), color: 'white'}}>
        <Container sx={{py: 6, mb: 5}}>
          <Heading variant="specialtitle" sx={{color: 'background'}}>Obsah</Heading>
          <Text variant="subtitle">Celkový přehled obsahu v aplikaci.</Text>
        </Container>
      </Box>
      <Container>
        {
          allPosts.map((post, index) => {
            return(
            <Box key={index} sx={{mb: 5}}>
              <Heading variant="title" sx={{mb: 4}}>{post.titulek}</Heading>
              <Box>
                { post.children.map((child, i) => {
                  return (
                    <>
                      {child?.content?.map((quizBlock, cindex) => {
                        return (
                          quizBlock?.id &&
                            <Box key={cindex} sx={{mb: 4}}>
                              <Heading variant="subheadline" sx={{mb: 1}}>{quizBlock?.quizLink?.title}</Heading>
                              <Text>{process.env.NEXT_PUBLIC_SITE_URL + "/kviz/" + quizBlock?.quizLink?.slug}</Text>
                            </Box>
                        )
                      })}
                    </>
                  )})
                }
              </Box>
            </Box>
          )})
        }
      </Container>
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