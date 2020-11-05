/** @jsx jsx */
import {useEffect} from 'react'
import StarterLayout from 'components/StarterLayout'
import Router from 'next/router'
import htmlParser from 'react-markdown/plugins/html-parser'
import { jsx, Text, Heading, Container, Card, Button, Link as SLink, Spinner, AspectRatio, Grid, Box, Flex } from 'theme-ui'
import { NextPage } from 'next'
import Link from 'next/link'
import { getAllPostsForGroup } from 'utils/api'
import { NextSeo } from 'next-seo'
import useSWR from 'swr'
import Color from '@biossun/color'
import fetcher from 'lib/fetcher'
import ReactMarkdown from 'react-markdown/with-html'
import { Response } from 'pages/api/quiz/submissions-list'
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
      <Box sx={{py: [4, 5]}}>
        <Container>
          <Heading as="h1" sx={{mb: 4, fontSize: ['32px', '48px', '78px'], textAlign: 'center'}} >Kvízy informační<br/>gramotnosti</Heading>
          <Flex sx={{alignItems: 'center', justifyContent: 'center'}}>
            <Link passHref href="/api/registrace">
              <Button
                variant="ctaLg"
                sx={{
                  borderRadius: 'small',
                  fontSize: 3,
                  mr: 4,
                  backgroundImage: t => t.util.gx('instagram', 'purple'),
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
        </Container>
      </Box>
      <Container>
      <Flex sx={{mb: 5}}>
        <Flex sx={{justifyContent: 'flex-end', flexDirection: 'column', mr: 4}}>
          <Heading sx={{fontSize: 9, color: 'primary'}}>360+</Heading>
          <Text variant="caption" sx={{textTransform: 'uppercase', fontSize: 3}}>otázek</Text>
        </Flex>
        <Flex sx={{justifyContent: 'flex-end', flexDirection: 'column', mr: 4}}>
          <Heading sx={{fontSize: 8, color: 'orange'}}>60+</Heading>
          <Text variant="caption" sx={{textTransform: 'uppercase', fontSize: 3}}>kvízů</Text>
        </Flex>
        <Flex sx={{justifyContent: 'flex-end', flexDirection: 'column'}}>
          <Heading variant="ultratitle">12</Heading>
          <Text variant="caption" sx={{textTransform: 'uppercase', fontSize: 3}}>oblastí</Text>
        </Flex>
      </Flex>
      <Heading  variant="ultratitle">Kvízy pro každou oblast.</Heading>
      <Text variant="lead"></Text>
      <Grid columns={[4]} sx={{
        flexGrow: 1,
        mt: 4,
        mx: -4,
        mb: 6,
        bg: 'background',
      }}>    
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
              <Card key={index} sx={{backgroundImage: t => t.util.gx(primaryColor.toString(), secondaryColor.toString()), color: 'white', px: '32px!important', py:  '24px!important'}}>
                <Heading variant="headline"># {post.titulek}</Heading>
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
      </Container>
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