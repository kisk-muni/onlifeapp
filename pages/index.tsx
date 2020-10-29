/** @jsx jsx */
import StarterLayout from '../components/StarterLayout'
import { useRouter } from 'next/router'
import { jsx, Text, Heading, Container, Card, Donut, Link as SLink, Spinner, AspectRatio, Grid, Box, Flex } from 'theme-ui'
import { NextPage } from 'next'
import Link from 'next/link'
import { getAllPostsForGroup } from '../utils/api'
import { NextSeo } from 'next-seo'
import useSWR from 'swr'
import fetcher from '../lib/fetcher'
import { Response } from './api/quiz/submissions-list'

const QuizBlock = ({quizId, title, slug, points, maxPoints, progressLoading, ...props}: {quizId: string, points: number, maxPoints: number, progressLoading: boolean, title: string, slug: string}) => {
  const router = useRouter()
  return (
    <Link href={"/kviz/"+slug} passHref><a><Card variant="interactive" {...props}
      sx={{
        mb: 2,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'background',
        '&:hover .text': {
          color: '#000',
        },
        ":hover,:focus": {
          cursor: "pointer",
        },
        px: '14px!important', py: '18px!important',
      }}
    >
        <AspectRatio ratio={1/.29}>
          <Box sx={{ml: 2}}>
            <Heading variant="headline" sx={{mb: 3, mt: 1}}>{ title }</Heading>
            <Flex>
              {
                progressLoading ?
                <Spinner strokeWidth={3} size={24} />
                :
                <>{maxPoints != 0 ? <Donut strokeWidth={3} size={24} value={points/maxPoints} /> : <Donut strokeWidth={3} size={24} value={0} /> }</>
              }
              <Text sx={{ml: 2, fontSize: 2, color: 'primary-accent-3'}}>
                {progressLoading ? '' : (maxPoints != 0 ?  points.toString() + '/' + maxPoints.toString() + ' otázek správně' : 'čeká na vyplnění')}
              </Text>
            </Flex>
          </Box>
        </AspectRatio>
    </Card></a></Link>
  )
}

interface Props {
  allPosts: any
}

const Index: NextPage<Props> = ({ allPosts }) => {
  const {data, error} = useSWR<Response>('/api/quiz/submissions-list', fetcher)
  return (
    <StarterLayout>
      <NextSeo noindex title={'Přehled kvízů'} />
      <Flex sx={{
        flexDirection: 'column',
        flexGrow: 1,
        height: '100%',
        bg: 'sheet',
        justifyContent: 'space-between'
      }}>    
        <Container sx={{mt: 4}}>
        {
          allPosts.map((post) => (
            <Box sx={{mb: 5, mt: 4}}>
              <Flex sx={{mb: 4, alignItems: 'center'}}>
                <Heading variant="title">{post.titulek}</Heading>
                {post.url && <a sx={{variant: 'buttons.detailAction', ml: 3, px: 3, py: 2, alignSelf: 'flex-start', ':hover,:focus': {textDecoration: 'none'}}} href={post.url}>Stránka tématu</a>}
              </Flex>
              { !(post.children.length > 0) && <Text sx={{color: 'gray', fontSize: 2}}>Téma nemá žádný interaktivní obsah</Text> }
              <Grid gap="32px" columns={[1, 2, null, 3]}>
                { post.children.map((child, i) => (
                  <>
                      {child?.content?.map((quizBlock, index) => {
                        const quiz_progress = data?.submissions.filter((submission) => submission.quiz_id == quizBlock?.quizLink?.id)
                        const quiz_progress_sorted = quiz_progress?.sort((a, b) => b.points - a.points)
                        const loaded = quiz_progress_sorted?.length >= 1
                        return (
                          quizBlock?.id &&
                            <QuizBlock
                              key={index}
                              quizId={quizBlock?.quizLink?.id}
                              title={quizBlock?.quizLink?.title}
                              slug={quizBlock?.quizLink?.slug}
                              maxPoints={loaded ? quiz_progress_sorted[0].max_points : 0}
                              points={loaded ? quiz_progress_sorted[0].points : 0}
                              progressLoading={!data}
                            />
                        )
                      })}
                    </>
                  ))
                }
              </Grid>
            </Box>
          ))
        }
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