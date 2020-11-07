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
import Color from '@biossun/color'
import fetcher from 'lib/fetcher'
import ReactMarkdown from 'react-markdown/with-html'
import { Response } from 'pages/api/quiz/submissions-list'
import useUser from 'data/useUser'

const parseHtml = htmlParser({
  isValidNode: node => node.type !== 'script'
})

const DatoText = ({text}) => (
  <ReactMarkdown
    source={text}
    escapeHtml={false}
    astPlugins={[parseHtml]}
  />
)

const QuizBlock = ({quizId, title, slug, points, maxPoints, progressLoading, userLogged, ...props}: {quizId: string, points?: number, maxPoints?: number, progressLoading?: boolean, userLogged?: boolean, title: string, slug: string}) => {
  const router = useRouter()
  return (
    <Link href={"/kviz/"+slug} passHref><a><Card variant="interactive" {...props}
      sx={{
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
        <AspectRatio ratio={1/.30}>
          <Box sx={{ml: 2}}>
            <Heading variant="subheadline" sx={{mb: 2, mt: 1}}>{ title }</Heading>
            {
              userLogged && 
              <Flex>
                {
                  progressLoading ?
                  <Spinner strokeWidth={3} size={24} />
                  :
                  <>{maxPoints != 0 ? <Donut variant="styles.progressDonut" strokeWidth={3} size={24} value={points/maxPoints} /> : <Donut variant="styles.progressDonut" strokeWidth={3} size={24} value={0} /> }</>
                }
                <Text sx={{ml: 2, mt: 0, fontSize: 2, color: 'primary-accent-3'}}>
                  {progressLoading ? '' : (maxPoints != 0 ?  points.toString() + '/' + maxPoints.toString() + ' otázek správně' : 'čeká na vyplnění')}
                </Text>
              </Flex>
            }
          </Box>
        </AspectRatio>
    </Card></a></Link>
  )
}

interface Props {
  allPosts: any
}

const Index: NextPage<Props> = ({ allPosts }) => {
  const user = useUser()
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
        {
          allPosts.map((post, index) => {
            const thumbnailCustomData = post.thumbnailPicture.customData
            const primaryColor = Color(thumbnailCustomData?.primaryColor)
            const secondaryColor = Color(thumbnailCustomData?.secondaryColor)
            //const colorIndex = 1
            //const brightness = brightnessByColor(colors[colorIndex].red, colors[colorIndex].green, colors[colorIndex].blue)
            //const isLight = primaryColor.isLight()
            //const filteredLeadingTexts = post.content?.filter((quizBlock, index) => quizBlock._modelApiKey === 'leading_text')
            return(
            <Box sx={{
              py: [2, 3, 4],
              bg: 'snow',
              }}>
            <Container sx={{position: 'relative', zIndex: 10}}>
              <Box key={index}>
                <Heading variant="title" sx={t => t.util.gxText(primaryColor.toString(), secondaryColor.toString())}>{post.titulek}</Heading>
                <Grid gap={3} columns={[1, 3, null, 4]} sx={{mt: 3}}>
                  { post.children.map((child, i) => {
                    if (!user.user || user.error) {
                      return (
                        <>
                          {child?.content?.map((quizBlock, index) => {
                            return (
                              quizBlock?.id &&
                                <QuizBlock
                                  key={index}
                                  quizId={quizBlock?.quizLink?.id}
                                  title={quizBlock?.quizLink?.title}
                                  slug={quizBlock?.quizLink?.slug}
                                  userLogged={false}
                                />
                            )
                          })}
                        </>
                      )
                    }
                    return (
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
                                userLogged
                              />
                          )
                        })}
                      </>
                    )})
                  }
                </Grid>
              </Box>
            </Container>
            </Box>
          )})
        }
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