/** @jsx jsx */
import StarterLayout from '../components/StarterLayout'
import { withApollo } from '../lib/apollo'
import withApolloAuth from "../lib/withApolloAuth"
import withAuth from "../lib/withAuth"
import Link from 'next/link'
import GroupsList from '../components/GroupsList'
import { Flex, Box } from 'reflexbox'
import { jsx, Text, Heading, Button, Grid } from 'theme-ui'

const Index = ({user}) => {

  if (!user) {
    return (<StarterLayout>
      <Flex flexWrap="wrap" minHeight="80vh" sx={{variant: 'styles.decoratedBox'}}>
        <div sx={{variant: 'styles.decoratedBackground'}}></div>
        <div sx={{variant: 'styles.decoratedOverlay'}}></div>
        <Box
          sx={{ variant: 'styles.decoratedcontent' }}
          maxWidth={1240}
          px={35}
          pt={80}
          pb={120}
          alignSelf="center"
          width={[1, 5/6]}
          mx="auto">    
          <Heading sx={{color: 'background', fontWeight: 600, fontSize: 6, maxWidth: '400px'}}>S učitelským profilem budete mít výuku pod kontrolou!</Heading> 
          <Link href="/registrace"><Button variant="homepageprimary">Začít učit OnLife</Button></Link>
      </Box>
    </Flex>
    <Flex flexWrap='wrap' width="100%">
      <Box
        width={[1, 5/6]}
        maxWidth={1120}
        mx="auto"
        py={60}
      >
        <Grid gap="4" columns={3}>
          <Box>
            <Heading as='h3' sx={{color: 'text', fontSize: 3 }}>Proč?</Heading> 
            <Text sx={{fontSize: 2}}>lorem ipsum</Text>
          </Box>
          <Box>
            <Heading as='h3' sx={{color: 'text', fontSize: 3 }}>Feature 2</Heading>
            <Text sx={{fontSize: 2}}>lorem ipsum</Text> 
          </Box>  
          <Box>
            <Heading as='h3' sx={{color: 'text', fontSize: 3 }}>Výhoda 3</Heading>
            <Text sx={{fontSize: 2}}>lorem ipsum</Text> 
          </Box>
        </Grid>
      </Box>
    </Flex>
  </StarterLayout>)
  }
  
  if (user) {
    return (<StarterLayout>
      <Flex flexWrap="wrap" minHeight="50vh" sx={{variant: 'styles.decoratedBox'}}>
        <div sx={{variant: 'styles.decoratedOverlay'}}></div>
        <div sx={{variant: 'styles.createclassIllustration'}}></div>
        <Box
          sx={{ variant: 'styles.decoratedcontent' }}
          maxWidth={1240}
          px={35}
          pt={80}
          pb={120}
          width={[1, 5/6]}
          mx="auto">   
            <Heading sx={{color: 'background', mt: 5, fontWeight: 600, fontSize: 5}}>Vítejte v Onlife pro učitele!</Heading> 
            <Text sx={{color: 'background', fontSize: 2, my: 4, mb: 4}}>Mějte přehled o tom, jak si v kurzu vedou vaši studenti.</Text>
            <Button variant="createclass">Založit třídu</Button>
            {GroupsList("8sXott8IxgU2Sfo2ipoX9aJ6Qu72")}
          </Box>
      </Flex>
      <Flex backgroundColor="#f6f6f6" flexWrap='wrap' width="100%">
        <Box
          width={[1, 5/6]}
          maxWidth={1240}
          mx="auto"
          px={35}
          py={60}
        >
          <Box sx={{variant: 'styles.helpcard'}}>

          </Box>
        </Box>
      </Flex>
    </StarterLayout>) 
  }
}

export default withApollo()(withAuth(Index))