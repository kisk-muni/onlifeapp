/** @jsx jsx */
import Layout from '../components/Layout'
import { withApollo } from '../apollo/client'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Flex, Box } from 'reflexbox'
import { jsx, Text, Heading, Grid, Button } from 'theme-ui'
import FullPageLoading from "../components/FullPageLoading"

export const USER_TOPICS = gql`
query MyQueryName {
  user {
    name
    photoURL
    email 
    id
  }
}
`

const KvizPage = () => {
  const router = useRouter()
  const { data, loading, error } = useQuery(USER_TOPICS)

  return <div>{JSON.stringify({data, loading, error})}</div>

  if (loading === false && 
    typeof window !== 'undefined' &&
    data.user === null
    ) {      
    router.push('/prihlaseni')
  }
  

  if (loading) {
    return <FullPageLoading />
  }
  return <FullPageLoading />

  
  return (
    <Layout>
      <Flex flexWrap="wrap" minHeight="80vh">
        <Box
          sx={{ variant: 'styles.decoratedcontent' }}
          py={50}
          maxWidth={1240}
          width={[1, 5/6]}
          mx="auto">    
            <Heading as="h1" sx={{mb: 4}}>Seznam kvízů</Heading>
            <Grid gap="4" columns={2}>
              {data.topics && data.topics.topics.map(topic => <Box>
                <Heading as="h2" sx={{mb: 2}}>{topic.name}</Heading>
                <ul sx={{px: 0, mt: 0, listStyle: 'none'}}>
                  {topic.subtopics.map(subtopic => 
                    <li key={subtopic.name}><Link href={"/kviz/" + topic.name + ";" + subtopic.name}>
                      <Text sx={{
                        display: 'inline',
                        fontSize: 2,
                        cursor: 'pointer'
                        }}>{subtopic.name}</Text></Link>
                    </li>
                  )}
                </ul>
              </Box>)}
            </Grid>
      </Box>
    </Flex>
  </Layout>
  )

}

export default withApollo(KvizPage)