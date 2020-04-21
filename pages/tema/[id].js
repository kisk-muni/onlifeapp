/** @jsx jsx */
import { Fragment } from 'react';
import StarterLayout from '../../components/StarterLayout'
import { withApollo } from '../../apollo/client'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Flex, Box } from 'reflexbox'
import { jsx, Text, Heading, Link as Lstyle, Button } from 'theme-ui'
import FullPageLoading from '../../components/FullPageLoading'

export const GET_TOPIC = gql`
query Topic($id: ID!) {
  topic(id: $id) {
    id
    picture
    name
    subtopics {
      id
      name
      display
      gFormURL
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
          loading ? <FullPageLoading />
          : 
          <Fragment>
            <Flex flexWrap="wrap" mb="5">
              <img
                src={data.topic.picture}
                width="100%" />
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
                        <Text sx={{fontSize: 3}}><Link passHref href={"/kviz/"+subtopic.id}><Lstyle>Kvíz</Lstyle></Link></Text>
                      </Box>
                    </Flex>
                  ))
                }
              </Box>
            </Flex>
          </Fragment>
      }
    </StarterLayout>
  )

}

export default withApollo(TopicPage)