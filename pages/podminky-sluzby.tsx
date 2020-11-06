/** @jsx jsx */
import StarterLayout from 'components/StarterLayout'
import { useRouter } from 'next/router'
import htmlParser from 'react-markdown/plugins/html-parser'
import { jsx, Text, Heading, Container, Card, Donut, Link as SLink, Spinner, AspectRatio, Grid, Box, Flex } from 'theme-ui'
import { NextPage } from 'next'
import Link from 'next/link'
import { getAllPostsForGroup } from 'utils/api'
import { NextSeo } from 'next-seo'

interface Props {
  allPosts: any
}

const Index: NextPage<Props> = ({ allPosts }) => {
  return (
    <StarterLayout>
      <NextSeo noindex title={'Přehled kvízů'} />
      <Box sx={{backgroundImage: t => t.util.gx('red', 'primary'), color: 'white'}}>
        <Container sx={{py: 6, mb: 5}}>
          <Heading variant="specialtitle" sx={{color: 'background'}}>Podmínky služby</Heading>
          <Text variant="subtitle">Nějaký nadpis</Text>
        </Container>
      </Box>
      <Container>
          <Text>Lorem ipsum dolor</Text>
      </Container>
    </StarterLayout>
  );
  
}

export default Index