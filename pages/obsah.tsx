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
      <Box sx={{backgroundImage: t => t.util.gx('red', 'primary'), color: 'white'}}>
        <Container sx={{py: 5, mb: 5}}>
          <Heading variant="ultratitle">Obsah</Heading>
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