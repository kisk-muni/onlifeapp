/** @jsx jsx */
import { Fragment } from 'react';
import StarterLayout from '../../components/StarterLayout'
import { withApollo } from '../../apollo/client'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Flex, Box } from 'reflexbox'
import { jsx, Text, Heading, Link as Lstyle, AspectImage, AspectRatio } from 'theme-ui'

export const GET_TOPIC = gql`
query Topic($id: ID!) {
  topic(id: $id) {
    id
    picture
    name
    subtopics {
      id
      name
      quiz
    }
  }
}
`

const TopicPage = () => {
  const router = useRouter()
  const { data, loading, error } = useQuery(GET_TOPIC, {variables: {id: router.query.id}})
  
  // return <div>{JSON.stringify({loading, data, error})}</div>

  return (
    <StarterLayout
      showDescription={() => false}>
        {
          <Fragment>
            <Flex flexWrap="wrap" mb="5">
              <Box width={[1]}>
                {
                  loading
                  ?
                    <AspectRatio
                      ratio={32/9}
                      sx={{bg: '#f5f5f5'}}                    
                    />
                  :
                    <AspectImage
                      ratio={32/9}
                      src={data.topic.picture}
                    />
                }
              </Box>
              { !loading &&
                <Fragment>
                  <Box mt={5} width={[1]}>
                    <Heading sx={{color: 'text', textAlign: 'center', mb: 3, fontWeight: 700, fontSize: 7}}>
                      { data.topic.name }
                    </Heading>
                    <Text sx={{fontSize: 5, textAlign: 'center', color: 'gray'}}>Zde může být cokoliv</Text>
                  </Box>
                  <Box
                    mt={5}
                    px={2}
                    width={['620px']}
                    mx="auto">
                    {
                      data.topic.subtopics.map((subtopic) => (
                        <Flex
                          justifyContent="space-between"
                          sx={{
                            pb: 3
                          }}
                        >
                          <Box>
                            <Text sx={{fontSize: 3, fontWeight: 500}}>{subtopic.name}</Text>
                          </Box>
                          <Box>
                            { subtopic.quiz &&
                              <Text sx={{fontSize: 3}}><Link passHref href={"/kviz/"+subtopic.quiz}><Lstyle>Kvíz</Lstyle></Link></Text>
                            }
                          </Box>
                        </Flex>
                      ))
                    }
                  </Box>
                </Fragment>
              }
            </Flex>
          </Fragment>
      }
    </StarterLayout>
  )

}

export default withApollo(TopicPage)