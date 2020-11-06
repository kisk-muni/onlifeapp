/** @jsx jsx */
import {useEffect} from 'react'
import StarterLayout from 'components/StarterLayout'
import Router from 'next/router'
import Message from 'components/Message'
import { jsx, Text, Heading, Container, Card, AspectRatio, Button, Image, Grid, Box, Flex } from 'theme-ui'
import { NextPage } from 'next'
import Link from 'next/link'
import { getAllPostsForGroup } from 'utils/api'
import { NextSeo } from 'next-seo'
import Color from '@biossun/color'
import useUser from 'data/useUser'

interface Props {
  allPosts: any
}

const Index: NextPage<Props> = ({ allPosts }) => {
  const user = useUser()
  useEffect(() => {
    if (!user.loading && user.user) {
      Router.push('/prehled')
    }
  });
  //const {data, error} = useSWR<Response>('/api/quiz/submissions-list', fetcher)
  return (
    <StarterLayout>
      <NextSeo noindex title={'Přehled kvízů'} />
      <Box sx={{py: [5, 6]}}>
        <Container>
          <Grid columns={[2]}>
            <Flex sx={{justifyContent: 'center', flexDirection: 'column'}}>
              <Heading variant="specialtitle" sx={t => t.util.gxText('instagram', 'primary')}>Kvízy<br/>informační<br/>gramotnosti<br/>pro SŠ</Heading>
              <Text sx={{mt: 5, mb: 3, fontSize: 2, maxWidth: 400}}>Klepnutím na Zaregistrovat se vyjádříte svůj souhlas s našimi <Link href="/podminky-sluzby" passHref><a>smluvními podmínkami</a></Link>.</Text>
              <Flex sx={{alignItems: 'center'}}>
                <Link passHref href="/api/registrace">
                  <Button
                    variant="ctaLg"
                    sx={{
                      borderRadius: 'small',
                      fontSize: 3,
                      mr: 4,
                      bg: 'foreground',
                    }}>
                    Zaregistrovat se
                  </Button>
                </Link>
                <Link passHref href="/api/login">
                  <a sx={{fontSize: 3, color: 'primary-accent-4', ':hover,:focus': {color: 'primary-accent-8'}}}>
                    Již mám účet
                  </a>
                </Link>
              </Flex>
            </Flex>
            <Flex sx={{justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
              <Box>
                <Heading sx={{textAlign: 'center', mb: 4, fontSize: 6, color: 'muted'}}>
                  Kdy je <span sx={{borderRadius: '6px', backgroundColor: 'rgb(255 193 7 / 41%)', color: '#976ae8', padding: '0 3px', margin: '0 -3px'}}>vhodné</span> použít<br/>výsečový graf?
                  </Heading>
                <Box sx={{bg: 'white', maxWidth: 450, mb: 3, py: 3, px: '24px', borderRadius: 'default', boxShadow: 'rgba(0, 0, 0, 0.1) 0px 3px 30px 0px', }}>
                  <Text sx={{fontSize: 3}}><b>A.</b> Vývoj HDP České republiky</Text>
                </Box>
                <Box sx={{bg: 'white', maxWidth: 450, mb: 3, py: 3, px: '24px', transform: "scale(1.0625)", borderRadius: 'default', boxShadow: 'rgba(0, 0, 0, 0.1) 0px 3px 30px 0px', }}>
                  <Text sx={{fontSize: 3, color: '#09986e'}}><b>B.</b> Výsledky ankety o nejoblíbenější značku bot</Text>
                </Box>
                <Box sx={{bg: 'white', maxWidth: 450, py: 3, px: '24px', borderRadius: 'default', boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 40px 0px', }}>
                  <Text sx={{fontSize: 3}}><b>C.</b> Srovnání platů v jednotlivých městech v ČR</Text>
                </Box>
              </Box>
            </Flex>
          </Grid>
        </Container>
      </Box>
      <Box sx={{py: 6, bg: 'snow'}}>
        <Container>
          <Grid columns={[2]}>
            <Flex sx={{flexDirection: 'column', justifyContent: 'center'}}>
              <Heading variant="ultratitle" sx={{mb: 4}}>
                Otázky pro<br/>každé téma.
              </Heading>
              <Flex>
                <Flex sx={{justifyContent: 'flex-end', flexDirection: 'column', mr: 4}}>
                  <Heading sx={{fontSize: 8, color: 'orange'}}>360+</Heading>
                  <Text variant="caption" sx={{textTransform: 'uppercase', fontSize: 3}}>otázek</Text>
                </Flex>
                <Flex sx={{justifyContent: 'flex-end', flexDirection: 'column', mr: 4}}>
                  <Heading variant="ultratitle">60+</Heading>
                  <Text variant="caption" sx={{textTransform: 'uppercase', fontSize: 3}}>kvízů</Text>
                </Flex>
                <Flex sx={{justifyContent: 'flex-end', flexDirection: 'column'}}>
                  <Heading variant="ultratitle">12</Heading>
                  <Text variant="caption" sx={{textTransform: 'uppercase', fontSize: 3}}>témat</Text>
                </Flex>
              </Flex>
            </Flex>
            <Grid columns={[4]}>    
              {
                allPosts.map((post, index) => {
                  const thumbnailCustomData = post.thumbnailPicture.customData
                  const primaryColor = Color(thumbnailCustomData?.primaryColor)
                  const secondaryColor = Color(thumbnailCustomData?.secondaryColor)
                  //const colorIndex = 1
                  //const brightness = brightnessByColor(colors[colorIndex].red, colors[colorIndex].green, colors[colorIndex].blue)
                  //const isLight = primaryColor.isLight()
                  //const filteredLeadingTexts = post.content?.filter((quizBlock, index) => quizBlock._modelApiKey === 'leading_text')
                  return(
                    <Card key={index} sx={{backgroundImage: t => t.util.gx(primaryColor.toString(), secondaryColor.toString()), color: 'white', px: '16px!important', py:  '16px!important'}}>
                      <Heading variant="subtitle" sx={{m: 0}}>{post.titulek}</Heading>
                      {/*
                        filteredLeadingTexts?.length > 0 && filteredLeadingTexts.map((leadingText, ltIndex) => (
                          <Text variant="lead">
                            <DatoText text={leadingText.text} />
                          </Text>
                        ))
                      */}
                      {/*post.url && <a sx={{variant: 'buttons.lg', bg: 'rgba(0,0,0,.5)', color: 'background', mt: 2, mb: 3, px: 3, py: 3, alignSelf: 'flex-start', ':hover,:focus': {textDecoration: 'none', color: 'background'}}} href={post.url}>Stránka tématu<svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none" shape-rendering="geometricPrecision"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><path d="M15 3h6v6"/><path d="M10 14L21 3"/></svg></a>*/}
          
                  </Card>
                )})
              }
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box sx={{py: 6, bg: 'background'}}>
        <Container>
          <Grid columns={[2]}>
            <Flex sx={{ alignItems: 'center', justifyContent: 'flex-end'}}>
              <Box sx={{maxWidth: 400}}>
                <Message avatar="/hanka-tulinska.jpg" message="Ano! Práce s uvozovkami je velmi dobrý nápad. Pokud výrazu přidáme uvozovky, pak výsledky budou obsahovat speciálně tento pojem…" name="Hanka Tulinská" />
              </Box>
            </Flex>
            <Flex sx={{justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
              <Box>
                <Heading variant="ultratitle">
                  Zpětná<br/>vazba.
                </Heading>
                <Text variant="lead">
                  U každé otázky dostanete<br/>zpětnou vazbu našich tutorů.
                </Text>
              </Box>
            </Flex>
          </Grid>
        </Container>
      </Box>
      <Box sx={{bg: 'snow', py: 6}}>
        <Container>
          <Container variant="narrow">
            <Heading variant="ultratitle" sx={{textAlign: 'center'}}>
              Připraveno odborníky<br/>z Masarykovy Univerzity.
            </Heading>
            <Text variant="lead" sx={{textAlign: 'center'}}>
              Vzdělávací program tvoří odborníci, kteří se tématem rozvoje informační gramotnosti zabývají mnoho let. Spolupracují při tom se studenty KISK MUNI, učiteli a žáky středních škol. Kurz podpořila Technologická agentura České republiky.
            </Text>
          </Container>
          <Flex sx={{mt: 5, mb: 5,  flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
            <Flex sx={{flexDirection: "row", mr: "4"}}>
              <Flex sx={{borderRadius: 9999, overflow: 'hidden', px: 48, width: 168, height: 168, boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 30px 0px', alignContent: 'center', background: '#fff'}}>
                <Image src="https://res.cloudinary.com/diwkzuny7/image/upload/c_scale,q_auto:best,w_70/v1589197379/index/tacr-logo.png" width='100%' sx={{alignSelf: 'center'}} />
              </Flex>
              <Flex sx={{borderRadius: 9999, ml: -4, overflow: 'hidden', width: 168, height: 168, boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 30px 0px', alignContent: 'center', background: '#0000dc'}}>
                <Image src="https://res.cloudinary.com/diwkzuny7/image/upload/c_scale,q_auto:best,w_166/v1589197379/index/muni-lg-white.png" width='100%' sx={{alignSelf: 'center'}} />
              </Flex>
            </Flex>
            <Flex sx={{mx: "4", justifyContent: "center", flexDirection: "column", alignItems: "center",}}>
              <Flex sx={{borderRadius: 9999, overflow: 'hidden', width: 112, height: 112, boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 30px 0px', alignContent: 'center'}}>
                <Image src="https://res.cloudinary.com/diwkzuny7/image/upload/c_scale,q_auto:best,w_110/v1589197379/index/hanka-tulinska.jpg" width='100%' sx={{borderRadius: 9999, alignSelf: 'center'}} />
              </Flex>
              <Heading as='h3' sx={{
                mt: 3,
                textAlign: 'center',
                color: 'text',
                fontSize: 3
                }}>Mgr. Hanka Tulinská</Heading>
            </Flex>
            <Flex sx={{ml:"4", mr: "5", justifyContent: "center", flexDirection: "column", alignItems: "center"}}>
              <Flex sx={{borderRadius: 9999, overflow: 'hidden', width: 112, height: 112, boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 30px 0px', alignContent: 'center'}}>
                <Image src="https://res.cloudinary.com/diwkzuny7/image/upload/c_scale,q_auto:best,w_110/v1589197379/index/michal-cerny.jpg" width='100%' sx={{borderRadius: 9999, alignSelf: 'center'}} />
              </Flex>
              <Heading as='h3' sx={{
                mt: 3,
                textAlign: 'center',
                color: 'text',
                fontSize: 3
                }}>RNDr. Michal Černý</Heading>
            </Flex>
          </Flex>
        </Container>
      </Box>
    </StarterLayout>
  );
  
}

export async function getStaticProps({ preview = false }) {
  const allPosts = (await getAllPostsForGroup(false)) || []
  //const allPostsSorted = allPosts.sort((a, b) => (a.position - b.position))
  return {
    props: { allPosts },
  }
}

export default Index