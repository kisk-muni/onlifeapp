/** @jsx jsx */
import StarterLayout from '../components/StarterLayout'
import { withApollo } from '../apollo/client'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Flex, Box } from 'reflexbox'
import { jsx, Text, Heading, AspectRatio, AspectImage, Grid, Button } from 'theme-ui'
import Reveal from '../components/Reveal'
import { keyframes } from '@emotion/core'

export const GET_TOPICS = gql`
{
  topics {
    thumbnail
    name
    id
  }
}
`

const placeholderTopicsArray = [0, 1, 2, 3, 4, 5]

const changeBg = keyframes({
  from: {
    background: 'background',
  },
  to: {
    background: '#fafafa',
  }
})

const TopicPlaceholder = () => 
  <Box sx={{variant: 'styles.topicCard', mb: 3}}>
    <AspectRatio
      ratio={16/9}
      sx={{
        background: 'white',
        animationName: changeBg.toString(),
        animationTimingFunction: 'linear',
        animationDuration: '100 ms',
        animationDelay: '1000 ms',
        animationFillMode: 'forwards',
        borderRadius: '6px'
      }}
    >
    </AspectRatio>
    <Box sx={{
      background: 'white',
      animationName: changeBg.toString(),
      animationTimingFunction: 'linear',
      animationDuration: '100 ms',
      animationDelay: '1000 ms',
      animationFillMode: 'forwards',
      height: '28px',
      width: '230px',
      mt: '16px',
      borderRadius: '6px'
      }}></Box>
  </Box>

const Topic = ({name, id, picture}) => 
  <Box sx={{variant: 'styles.topicCard', mb: 3}}>
    <Link href={"/tema/"+id} passHref>
      <a sx={{
        '&:hover, &:focus': {
          textDecoration: 'none'
        }
      }}>
        <div
          className="aspect-image"
          sx={{
            width: '100%',
            borderRadius: '6px',
            overflow: 'hidden',
            transition: 'box-shadow: .1s cubic-bezier(0.4, 0, 0.2, 1)',
          }}>
          <AspectImage 
            ratio={16/9}
            src={picture}
          />
        </div>
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
  const { data, loading, error } = useQuery(GET_TOPICS)

  return (
  <StarterLayout
    showDescription={(fromTop, fromBottom) => -fromTop > 180}>  
    <Heading sx={{
      color: 'text',
      textAlign: 'center',
      fontWeight: 700,
      fontSize: 7,
      px: 35,
      mt: 5,
      mb: 6,
    }}>
      Kurz informační gramotnosti<br />pro studenty středních škol
    </Heading>
    <Flex flexWrap='wrap'>
      <Box
        width={[1]}
        maxWidth={1240}
        px={35}
        mx="auto"
        pb={80}
      >
        { loading ? 
          <Grid gap="4" columns={2}>
            { placeholderTopicsArray.map(() => <TopicPlaceholder />) }
          </Grid>
          :
          <Reveal duration={800}>
            <Grid gap="4" columns={2}>
              {data.topics.map((topic, index) => <Topic key={index} picture={topic.thumbnail} id={topic.id} name={topic.name} />)}
            </Grid>
          </Reveal>
        }
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
          <Box key={1}>
            <Heading as='h3' sx={{color: 'text', fontSize: 5, mb: 2 }}>Proč?</Heading> 
            <Text sx={{fontSize: 4, color: 'gray'}}>Lorem ipsum</Text>
          </Box>
          <Box key={2}>
            <Heading as='h3' sx={{color: 'text', fontSize: 5, mb: 2 }}>K čemu?</Heading>
            <Text sx={{fontSize: 4, color: 'gray'}}>Lorem ipsum</Text>
          </Box>  
          <Box key={3}>
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