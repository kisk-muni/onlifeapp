/** @jsx jsx */
import StarterLayout from '../components/StarterLayout'
import { withApollo } from '../apollo/client'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Flex, Box } from 'reflexbox'
import { jsx, Text, Heading, Grid, Button } from 'theme-ui'

export const CURRENT_USER = gql`
{
  user {
    name
    photoURL
    email 
    id
  }
}
`

const Topic = ({name, link, photo}) => 
  <Box sx={{variant: 'styles.topicCard', mb: 3}}>
    <Link href="#neco" passHref>
      <a sx={{
        '&:hover, &:focus': {
          textDecoration: 'none'
        }
      }}>
        <Box sx={{
          height: '300px',
          borderRadius: '6px',
          border: '1px solid #e5e5e5',
          transition: 'box-shadow: .1s cubic-bezier(0.4, 0, 0.2, 1)',
          }}></Box>
        <Heading as='h3' sx={{
          mt: 3,
          color: 'text',
          fontSize: 5
          }}>{name}</Heading>
      </a>
    </Link>
  </Box>


const Index = () => {
  const router = useRouter()
  const { data, loading, error } = useQuery(CURRENT_USER)

  return (
  <StarterLayout
    showDescription={(fromTop, fromBottom) => -fromTop > 180}>
      <Flex flexWrap="wrap" minHeight="50vh">
        <Box
          px={35}
          pt={130}
          pb={20}
          width={[1]}>    
            <Heading sx={{color: 'text', textAlign: 'center', fontWeight: 700, fontSize: 7}}>
            Kurz informační gramotnosti<br />pro studenty středních škol
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
          <Topic name="Fáze práce s informacemi" />
          <Topic name="Práce s informacemi a učení" />
          <Topic name="Média a občanství" />
          <Topic name="Práce s dokumenty" />
          <Topic name="Interakce, vzájemnost a zpětná vazba" />
          <Topic name="Bezpečí a férovost" />
        </Grid>
      </Box>
    </Flex>

    <Flex flexWrap="wrap" minHeight="60vh" backgroundColor="#fafafa">
      <Box
        px={35}
        pt={130}
        pb={20}
        width={[1]}>    
          <Heading sx={{color: 'text', textAlign: 'center', mb: 4, fontWeight: 700, fontSize: 7}}>
            Kurz s láskou připravila <br /> Masarykova Univerzita v Brně
          </Heading>
          <Text sx={{textAlign: 'center', fontSize: 4, color: 'gray'}}>Propagace univerzity, KISKU, dnu otevřených dveří.</Text>
      </Box>
    </Flex>

    <Flex flexWrap="wrap" minHeight="60vh">
      <Box
        px={35}
        pt={130}
        pb={20}
        width={[1]}>    
          <Heading sx={{color: 'text', textAlign: 'center', mb: 4, fontWeight: 700, fontSize: 7}}>
            Spojte se s námi
          </Heading>
          <Text sx={{textAlign: 'center', fontSize: 4, mb: 4, color: 'gray'}}>Pojtřebujete pomoc … ?</Text>
          <Text sx={{textAlign: 'center', fontSize: 4, mb: 4, color: 'gray'}}>Ikonky sociálních sítí</Text>
      </Box>
    </Flex>

    <Flex flexWrap='wrap'>
      <Box
        width={[1, 5/6]}
        maxWidth={1240}
        px={35}
        mx="auto"
        py={60}
      >
        <Grid gap="4" columns={3}>
          <Box>
            <Heading as='h3' sx={{color: 'text', fontSize: 5, mb: 2 }}>Proč?</Heading> 
            <Text sx={{fontSize: 4, color: 'gray'}}>Lorem ipsum</Text>
          </Box>
          <Box>
            <Heading as='h3' sx={{color: 'text', fontSize: 5, mb: 2 }}>K čemu?</Heading>
            <Text sx={{fontSize: 4, color: 'gray'}}>Lorem ipsum</Text>
          </Box>  
          <Box>
            <Heading as='h3' sx={{color: 'text', fontSize: 5, mb: 2 }}>Proč?</Heading>
            <Text sx={{fontSize: 4, color: 'gray'}}>Lorem ipsum</Text>
          </Box>
        </Grid>
      </Box>
    </Flex>

  </StarterLayout>
  )

}

export default withApollo(Index)