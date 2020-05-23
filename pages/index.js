/** @jsx jsx */
import StarterLayout from '../components/StarterLayout'
import { withApollo } from '../apollo/client'
import Link from 'next/link'
import { Image as DatoImage } from 'react-datocms'
import { getAllPostsForHome } from '../utils/api'
import { Flex, Box } from 'reflexbox'
import { jsx, Text, Heading, Grid, Image } from 'theme-ui'
import { NextSeo } from 'next-seo'

const Topic = ({name, slug, responsiveImage}) => 
  <Box sx={{variant: 'styles.topicCard', mb: 3}}>
    <Link href={"/tema/[slug]"} as={"/tema/"+slug} passHref>
      <a sx={{
        '&:hover, &:focus': {
          textDecoration: 'none'
        }
      }}>
        <div
          className="aspect-image"
          sx={{
            borderRadius: '6px',
            overflow: 'hidden',
            width: '100%',
            transition: 'box-shadow: .1s cubic-bezier(0.4, 0, 0.2, 1)',
          }}>
          <DatoImage
            data={{
              ...responsiveImage,
            }}
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


const Index = ({ allPosts }) => {
 // const router = useRouter()

  return (
  <StarterLayout
    showDescription={(fromTop, fromBottom) => -fromTop > 180}>
    <NextSeo
      title="Kurz informační gramotnosti"
      description="Online kurz informační gramotnosti pro studenty středních škol vyvíjen na kabinetu informačních studií a knihovnictví Masarykovy univerzity."
    />
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
        <Grid gap="4" columns={2}>
          {
            allPosts && allPosts.map((post, index) => <Topic key={index} slug={post.slug} name={post.titulek} responsiveImage={post.thumbnailPicture.responsiveImage} />)
          }
        </Grid>
      </Box>
    </Flex>

    <Flex flexWrap="wrap" minHeight="60vh" backgroundColor="promobg">
      <Box
        px={35}
        pt={130}
        pb={60}
        width={[1]}>    
          <Heading sx={{color: 'text', textAlign: 'center', mb: 4, fontWeight: 700, fontSize: '40px'}}>
            Kurz připravili odborníci z Masarykovy Univerzity
          </Heading>
          <Text sx={{textAlign: 'center', fontSize: 5, color: 'gray'}}>Propagace univerzity, KISKU, dnu otevřených dveří.</Text>
          <Flex width={[1]} mt="5" mb="5" flexDirection="row" justifyContent="center" alignItems="center">
            <Flex flexDirection="row" mr="4" >
              <Flex sx={{borderRadius: 9999, overflow: 'hidden', px: 48, px: 48, width: 168, height: 168, border: '1px solid', borderColor: 'lighten', boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 30px 0px', alignContent: 'center', background: '#fff'}}>
                <Image src="https://res.cloudinary.com/diwkzuny7/image/upload/c_scale,q_auto:best,w_70/v1589197379/index/tacr-logo.png" width='100%' sx={{alignSelf: 'center'}} />
              </Flex>
              <Flex sx={{borderRadius: 9999, ml: -4, overflow: 'hidden', width: 168, height: 168, border: '1px solid', borderColor: 'lighten', boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 30px 0px', alignContent: 'center', background: '#0000dc'}}>
                <Image src="https://res.cloudinary.com/diwkzuny7/image/upload/c_scale,q_auto:best,w_166/v1589197379/index/muni-lg-white.png" width='100%' sx={{alignSelf: 'center'}} />
              </Flex>
            </Flex>
            <Flex mx="4" justifyContent="center" flexDirection="column" alignItems="center">
              <Flex sx={{borderRadius: 9999, overflow: 'hidden', width: 112, height: 112, border: '1px solid', borderColor: '#eaeaea', boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 30px 0px', alignContent: 'center'}}>
                <Image src="https://res.cloudinary.com/diwkzuny7/image/upload/c_scale,q_auto:best,w_110/v1589197379/index/hanka-tulinska.jpg" width='100%' sx={{borderRadius: 9999, alignSelf: 'center'}} />
              </Flex>
              <Heading as='h3' sx={{
                mt: 3,
                textAlign: 'center',
                color: 'text',
                fontSize: 4
                }}>Hanka Tulinská</Heading>
            </Flex>
            <Flex ml="4" mr="5" justifyContent="center" flexDirection="column" alignItems="center">
              <Flex sx={{borderRadius: 9999, overflow: 'hidden', width: 112, height: 112, border: '1px solid', borderColor: '#eaeaea', boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 30px 0px', alignContent: 'center'}}>
                <Image src="https://res.cloudinary.com/diwkzuny7/image/upload/c_scale,q_auto:best,w_110/v1589197379/index/michal-cerny.jpg" width='100%' sx={{borderRadius: 9999, alignSelf: 'center'}} />
              </Flex>
              <Heading as='h3' sx={{
                mt: 3,
                textAlign: 'center',
                color: 'text',
                fontSize: 4
                }}>Michal Černý</Heading>
            </Flex>
          </Flex>
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
  </StarterLayout>
  )

}

export async function getStaticProps() {
  const allPosts = (await getAllPostsForHome(false)) || []
  console.log(allPosts)
  return {
    props: { allPosts },
  }
}

export default withApollo(Index)