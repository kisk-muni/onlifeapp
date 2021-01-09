/** @jsx jsx */
import {useEffect} from 'react'
import Layout from 'components/Layout'
import Router from 'next/router'
import Message from 'components/Message'
import { jsx, Text, Heading, Container, Card, AspectRatio, Button, Image, Grid, Box, Flex } from 'theme-ui'
import { NextPage } from 'next'
import Link from 'next/link'
import { getMainTopics } from 'utils/sanity-api'
import { NextSeo } from 'next-seo'
import Color from '@biossun/color'

interface Props {
  allPosts: any
}

const Index: NextPage<Props> = ({ allPosts }) => {
  return (
    <Layout>
      <NextSeo noindex title={'Přehled kvízů'} />
      <Box sx={{py: [5, 6], color: 'background', textAlign: 'center', bg: 'instagram'}}>
        <Container>
          <Heading variant="title">Testujte své znalosti v kurzu</Heading>   
          <Button sx={{
            mt: 3,
          }}>Chci se testovat</Button>
        </Container>
      </Box>
      <Box sx={{py: [5, 6]}}>
        <Container>
          <Grid columns={[6]}>
          {
            allPosts.map((post, index) => (
              <Box key={index}>
                <Text>{post.title}</Text>
              </Box>
            ))
          }
          </Grid>
        </Container>
      </Box>
      <Box sx={{py: [5, 6]}}>
        <Container>
        </Container>
      </Box>
    </Layout>
  );
  
}

export async function getStaticProps({ preview = false }) {
  const allPosts = (await getMainTopics()) || []
  // console.log('allPosts', allPosts)
  return {
    props: { allPosts },
  }
}

export default Index
