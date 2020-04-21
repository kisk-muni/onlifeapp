/** @jsx jsx */
import StarterLayout from '../../components/StarterLayout'
import { withApollo } from '../../apollo/client'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Flex, Box } from 'reflexbox'
import { jsx, Text, Heading, Grid, Button } from 'theme-ui'

export const GET_TOPICS = gql`
{
  topics {
    picture
    name
    id
  }
}
`

const TopicPage = () => {
  const router = useRouter()
  const { data, loading, error } = useQuery(GET_TOPICS)
  return (
  <StarterLayout
    showDescription={() => false}>
      <Flex flexWrap="wrap">
        <Box
          px={35}
          mt={4}
          mb={6}
          width={[1]}>    
            <Heading sx={{color: 'text', textAlign: 'center', fontWeight: 700, fontSize: 7}}>
              {router.query.id}
            </Heading>
        </Box>
      </Flex>
    
    <Flex flexWrap='wrap'>
      <Box
        width={[1, 5/6]}
        maxWidth={1240}
        px={35}
        mx="auto"
        pb={80}
      >
        <Grid gap="4" columns={2}>
        </Grid>
      </Box>
    </Flex>
  </StarterLayout>
  )

}

export default withApollo(TopicPage)