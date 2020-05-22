/** @jsx jsx */
import { useState, Fragment } from 'react'
import DashboardLayout from '../../components/dashboard/DashboardLayout'
import GroupHeader from '../../components/dashboard/GroupHeader'
import { withApollo } from '../../apollo/client'
import { useGroupQuery } from '../../apollo/group.graphql'
import { useGroupQuizStatsQuery } from '../../apollo/groupQuizStats.graphql'
import { useRouter } from 'next/router'
import { jsx, Container, Button, Link as Lstyle, Heading, Select, Text, Flex, Box } from 'theme-ui'
import { NextPage } from 'next'
import Link from 'next/link'
import FadeSpinner from '../../components/FadeSpinner'
import StatsItem from '../../components/stats/StatsItem'
import { getAllGFQuizzesWithSlug, getGFQuizWithSlug } from '../../utils/api'
import withAuthRedirect from '../../utils/withAuthRedirect' 
import { Props } from '../kviz/[slug]'

const StatsPage: NextPage<Props> = ({quiz}) => {
  const router = useRouter()
  const [ filterValue, setFilterValue ] = useState('best')
  const { data, loading, error } = useGroupQuery({variables: {id: router.query.trida as string}})
  const stats = useGroupQuizStatsQuery({variables: {
    quizId: quiz?.id as string,
    groupId: router.query.trida as string,
    filter: filterValue
  }})
  let engagedText = ''
  const engagedCount = stats?.data?.groupQuizStats.engagedCount
  if (engagedCount === 0 || engagedCount >= 5 ) {
    engagedText = 'zapojených studentů'
  } else if (engagedCount === 1) {
    engagedText = 'zapojený student'
  } else {
    engagedText = 'zapojení studenti' 
  }
  return (
    <DashboardLayout
      header={<GroupHeader />}
      stickHeaderByDefault>
      <Box sx={{backgroundColor: 'background', boxShadow: '0 1px 0 0 rgba(0,0,0,0.1)'}}>
        <Container sx={{mt: 4}}>
          <Flex sx={{justifyContent: 'space-between', alignItems: 'center', mb: 0}}>
            <Heading sx={{mb: 3, mt: 1, fontSize: 6}}>Kvíz: { quiz?.title }</Heading>
            <Button sx={{px: 4, fontWeight: 500, fontSize: 2}}>Stránka kvízu</Button>
          </Flex>
          <Flex>
            <Link as={"/stats/"+router.query.slug+"?trida="+router.query.trida} href={{ pathname: '/studenti', query: { slug: router.query.slug, trida: router.query.trida } }} passHref>
              <Lstyle
                sx={{
                  variant: 'styles.navlink',
                  color: (router.pathname  === '/stats/[slug]' ? 'text' : 'gray'),
                  borderBottom: (router.pathname  === '/stats/[slug]' ? '2px solid #000' : '2px solid transparent'),
                  pb: 3,
                  mr: 4,
                  pt: 3
                }}>
                Statistika
              </Lstyle>
            </Link>
            <Link as={"/studenti?trida="+router.query.trida} href={{ pathname: '/studenti', query: { trida: router.query.trida } }} passHref>
              <Lstyle
                sx={{
                  variant: 'styles.navlink',
                  color: (router.pathname  == '/studenti' ? 'text' : 'gray'),
                  borderBottom: (router.pathname  == '/studenti' ? '2px solid #000' : '2px solid transparent'),
                  pb: 3,
                  mr: 4,
                  pt: 3
                }}>
                Individuální výsledky
              </Lstyle>
            </Link>
          </Flex>
        </Container>
      </Box>
      <Container sx={{pt: 2, mt: 2}}>
        <Flex sx={{justifyContent: 'space-between', alignItems: 'center', mb: 3}}>
          <Text sx={{fontSize: 2}}>{engagedCount} {engagedText}</Text>
          <Select sx={{maxWidth: '220px', backgroundColor: 'background', py: '6px', px: '12px', fontWeight: 500, '&:hover': {borderColor: '#000', color: '#000'}, borderColor: '#eaeaea', color: '#666'}} defaultValue={filterValue}>
            <option value="best">Nejlepší výsledky</option>
            <option value="first">Výsledky prvních pokusů</option>
            <option value="last">Výsledky posledních pokusů</option>
          </Select>
        </Flex>
        {stats.loading
        ? <FadeSpinner />
        : <Box>
            {stats?.data?.groupQuizStats?.questions.map((question, index) =>
              <StatsItem question={question} key={index} index={index} />
            )}
          </Box>
        }
      </Container>
    </DashboardLayout>
  )

}

export async function getStaticProps({ params, preview = false }) {
  const data = await getGFQuizWithSlug(params.slug, preview)
  return {
    props: {
      preview,
      quiz: {
        ...data?.gfquiz,
      },
    },
  }
}

export async function getStaticPaths() {
  const allGfquizzes = await getAllGFQuizzesWithSlug()
  return {
    paths: allGfquizzes?.map(quiz => `/stats/${quiz.slug}`) || [],
    fallback: true,
  }
}

export default withApollo(withAuthRedirect(StatsPage))