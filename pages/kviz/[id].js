/** @jsx jsx */
import Layout from '../../components/Layout'
import { withApollo } from '../../apollo/client'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Flex, Box } from 'reflexbox'
import { jsx, Text, Heading, Grid, Button } from 'theme-ui'

export const CURRENT_USER = gql`
query {
  user {
    name
    photoURL
    email 
    id
  }
  quizz (id: $path) {
    link
    display
  }
}
`

const KvizPage = () => {
  const router = useRouter()
  const queryParts = router.query.id.split(";") 
  const topic = queryParts[0]
  const subtopic = queryParts[1]
  const { data, loading } = useQuery(CURRENT_USER, {
    variables: { path: topic + '/' + subtopic },
  })

  if (loading === false) {
    if (
      typeof window !== 'undefined' &&
      (typeof data?.user === 'undefined' || data?.user?.isLoggedIn === false || typeof data?.quizz === 'undefined')) {      
        router.push('/prihlaseni')
    }
  }
  const quizz = data?.quizz
  

  return (
    <Layout>
      <Flex flexWrap="wrap" minHeight="80vh" sx={{background: 'pink'}}>
        <Box
          width={[1]}
          mx="auto">
            {!!quizz && 
              <iframe sx={{width: '100%', border: 'none', height: '100%'}} src={quizz.link + btoa("userid;groupid;topicid;attemptid;")}></iframe>
            }
      </Box>
    </Flex>
  </Layout>
  )

}

export default withApollo(KvizPage)