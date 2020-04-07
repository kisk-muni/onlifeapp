/** @jsx jsx */
import StarterLayout from '../components/StarterLayout'
import { withApollo } from '../lib/apollo'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Flex, Box } from 'reflexbox'
import { jsx, Text, Heading, Grid, Button } from 'theme-ui'

export const CURRENT_USER = gql`
query CurrentUser {
  user @client {
    isLoggedIn
    name
    photoURL
    email 
    id
  }
}
`

const Index = () => {
  const router = useRouter()
  const { data, loading } = useQuery(CURRENT_USER)

  if (
    loading === false &&
    data.user !== null &&
    data.user.isLoggedIn &&
    typeof window !== 'undefined'
  ) {
    router.push('/u')
  }
  
  return (
    <StarterLayout>
      <Flex flexWrap="wrap" minHeight="80vh" sx={{variant: 'styles.decoratedBox'}}>
        <div sx={{variant: 'styles.decoratedBackground'}}></div>
        <div sx={{variant: 'styles.decoratedOverlay'}}></div>
        <Box
          sx={{ variant: 'styles.decoratedcontent' }}
          maxWidth={1240}
          px={35}
          pt={130}
          pb={120}
          alignSelf="center"
          width={[1, 5/6]}
          mx="auto">    
            <Heading sx={{color: 'background', fontWeight: 600, fontSize: 7, maxWidth: '400px'}}>S učitelským profilem budete mít výuku pod kontrolou!</Heading> 
            <Link href="/registrace"><Button variant="homepageprimary">Začít učit OnLife</Button></Link>
      </Box>
    </Flex>
    <Flex flexWrap='wrap' width="100%">
      <Box
        width={[1, 5/6]}
        maxWidth={1240}
        px={35}
        mx="auto"
        py={60}
      >
        <Grid gap="4" columns={3}>
          <Box>
            <Heading as='h3' sx={{color: 'text', fontSize: 3 }}>Proč?</Heading> 
            <Text sx={{fontSize: 2}}>lorem ipsum</Text>
          </Box>
          <Box>
            <Heading as='h3' sx={{color: 'text', fontSize: 3 }}>K čemu?</Heading>
            <Text sx={{fontSize: 2}}>lorem ipsum</Text> 
          </Box>  
          <Box>
            <Heading as='h3' sx={{color: 'text', fontSize: 3 }}>Proč?</Heading>
            <Text sx={{fontSize: 2}}>lorem ipsum</Text> 
          </Box>
        </Grid>
      </Box>
    </Flex>
  </StarterLayout>
  )

}

export default withApollo({ssr: true})(Index)