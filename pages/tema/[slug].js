/** @jsx jsx */
import { Fragment } from 'react';
import StarterLayout from '../../components/StarterLayout'
import { withApollo } from '../../apollo/client'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { useRouter } from 'next/router'
import { Image as DatoImage } from 'react-datocms'
import Link from 'next/link'
import { getAllPostsWithSlug, getPostAndMorePosts } from '../../utils/api'
import { Flex, Box } from 'reflexbox'
import { jsx, Text, Heading, Button, Container, Link as Lstyle, AspectImage, AspectRatio } from 'theme-ui'
import ReactMarkdown from 'react-markdown/with-html'
import htmlParser from 'react-markdown/plugins/html-parser'

const parseHtml = htmlParser({
  isValidNode: node => node.type !== 'script'
})

const DatoText = ({text}) => (
  <Container variant="articleContentContainer">
    <ReactMarkdown
      source={text}
      escapeHtml={false}
      astPlugins={[parseHtml]}
    />
  </Container>
)

const TopicPage = ({ post, preview }) => {
  const router = useRouter()
  //const { data, loading, error } = useQuery(GET_TOPIC, {variables: {id: router.query.id}})
  
  // return <div>{JSON.stringify({loading, data, error})}</div>

  return (
    <StarterLayout
      showDescription={() => false}>
        {
        <Flex flexWrap="wrap" mb="5">
          {post?.picture && <Box width={[1]}>
            <DatoImage
              data={{
                ...post.picture.responsiveImage,
              }}
            />
          </Box> }
          <Box mt={5} width={[1]}>
            <Heading sx={{color: 'text', textAlign: 'center', mb: 5, mt: 3, fontWeight: 700, fontSize: 7}}>
              { post?.titulek }
            </Heading>
          </Box>
          <Container>
            {
              post?.content?.length > 0 &&
              post?.content?.map((block) => {
                switch (block._modelApiKey) {
                  case 'text':
                    return (<DatoText text={block.text} />)
                    break;
                  case 'quizblock':
                    return (
                        <Container sx={{
                          my: 4,
                          py: 4,
                          px: 4,
                          borderRadius: '5px',
                          border: '1px solid rgb(234, 234, 234)',
                          boxShadow: 'rgba(0, 0, 0, 0.15) 0px 2px 6px',
                          transition: 'box-shadow .1s ease 0s',
                            '&:hover': {
                              boxShadow: 'rgba(0, 0, 0, 0.1) 0px 6px 12px',
                              cursor: 'pointer',
                            },
                            '&:hover button': {
                              background: '#2626fb',
                              boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
                            },
                            '&:hover div': {
                              color: '#000',
                            }
                          }} variant="articleQuizBlockContainer">
                            <Link href={"/kviz/[slug]"} as={"/kviz/"+block.quizLink.slug}>
                              <a sx={{display: 'flex', flexDirection: 'column', flexWrap: 'wrap', '&:hover': {
                                textDecoration: 'none'
                              }}}>
                                <Heading sx={{fontWeight: 600, fontSize: 3, mb: 2, color: 'text'}}>Test {block.quizLink.title}</Heading>
                                <Text sx={{fontSize: 2, mb: 2, transition: 'color .1s ease 0s', color: 'gray'}}>{block.description}</Text>
                                <Button sx={{alignSelf: 'flex-start', transition: 'box-shadow .1s ease 0s, background-color .1s ease 0s'}}>Přejít na test</Button>
                              </a>
                            </Link>
                            {/*<iframe
                              src={block.quizLink.prefilledGoogleFormsQuizUrl + '&embedded=true'}
                              width="640"
                              height="1713"
                              frameborder="0"
                              marginheight="0"
                              marginwidth="0">
                              Načítání…
                            </iframe>*/}
                          </Container>
                          
                    )
                    break;
                  case 'leading_text':
                    return (<div className="leading-text"><DatoText text={block.text} /></div>)
                    break;
                  default:
                    break;
                }
              })
            }
            <Container sx={{my: 4}} variant="articleContentContainer">
              { post?.children.length > 0 && 
                <Heading sx={{color: 'text', mb: 4, mt: 5, fontWeight: 700, fontSize: 6}}>
                  Podtémata
                </Heading>
              }
              {
                post?.children.map((child, index) => (
                  <Link key={index} href={"/tema/[slug]"} as={"/tema/"+child.slug} passHref>
                    <Lstyle><Text sx={{fontSize: 3, mb: 2, fontWeight: 500}}>{child.titulek}</Text></Lstyle>
                  </Link>
                ))
              }
            </Container>
            <style jsx global>{`
            p {
              font-size: 18px;    
            }
            .leading-text {
              margin-bottom: 48px;
            }
            .leading-text p {
              font-size: 24px;
              margin-bottom: 1em;
            }
            `}</style>
          </Container>
        </Flex>
      }
    </StarterLayout>
  )

}

export async function getStaticProps({ params, preview = false }) {
  const data = await getPostAndMorePosts(params.slug, preview)
  //const content = await markdownToHtml(data?.post?.content || '')

  return {
    props: {
      preview,
      post: {
        ...data?.post,
      },
    },
  }
}

export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlug()
  return {
    paths: allPosts?.map(post => `/tema/${post.slug}`) || [],
    fallback: true,
  }
}

export default withApollo(TopicPage)