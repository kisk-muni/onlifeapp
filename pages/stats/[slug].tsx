/** @jsx jsx */
import { useState, Fragment } from 'react'
import DashboardLayout from '../../components/dashboard/DashboardLayout'
import GroupHeader from '../../components/dashboard/GroupHeader'
import { withApollo } from '../../apollo/client'
import { useGroupQuizStatsQuery } from '../../apollo/groupQuizStats.graphql'
import { useRouter } from 'next/router'
import { jsx, Container, Button, Heading, Select, Text, Flex, Box } from 'theme-ui'
import { NextPage } from 'next'
import Link from 'next/link'
import FadeSpinner from '../../components/FadeSpinner'
import { getAllGFQuizzesWithSlug, getGFQuizWithSlug } from '../../utils/api'
import withAuthRedirect from '../../utils/withAuthRedirect' 
import { Props } from '../kviz/[slug]'
import Item from '../../components/stats/Item'
import Navigation from '../../components/stats/Navigation'
import FilterSelect from '../../components/stats/FilterSelect'
import Individual from '../../components/stats/Individual'
import { NextSeo } from 'next-seo'

const StatsPage: NextPage<Props> = ({quiz}) => {
  const router = useRouter()
  const [ filterValue, setFilterValue ] = useState('best')
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
      header={<GroupHeader currentPage={'Kvíz: ' + quiz?.title} hideSubnav />}
      stickHeaderByDefault>
      <NextSeo title="Odpovědi a statistiky" />
      <Container sx={{mt: 4}}>
        <Flex sx={{justifyContent: 'space-between', alignItems: 'center', mb: 0}}>
          <Heading sx={{mb: 2, mt: 1, fontSize: 6}}>Kvíz: { quiz?.title }</Heading>
          <Link href={"/kviz/"+quiz?.slug}>
            <Button sx={{px: 4, fontWeight: 500, fontSize: 2}}>Stránka kvízu</Button>
          </Link>
        </Flex>
      </Container>
      {router.query.tab === 'individual' ? 
        <Container sx={{pt: 2, mt: 2}}>
          {stats.loading
          ? <FadeSpinner />
          : <Individual students={stats?.data?.groupQuizStats?.engagedStudents} />
          }
        </Container>
      : <Container sx={{pt: 2, mt: 2}}>
          {stats.loading
          ? <FadeSpinner />
          : <Fragment>
              <Flex sx={{justifyContent: 'space-between', alignItems: 'center', mb: 3}}>
                <Text sx={{fontSize: 2}}>{engagedCount} {engagedText}</Text>
                <FilterSelect
                  value={filterValue}
                  defaultValue="best"
                  onChange={(e) => setFilterValue(e.target.value)}
                />
              </Flex>
              <Box>
                {stats?.data?.groupQuizStats?.questions.map((question, index) =>
                  <Item question={question} key={index} index={index} />
                )}
              </Box>
            </Fragment>
          }
        </Container> 
      }
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