/** @jsx jsx */
import { useState, Fragment } from 'react'
import DashboardLayout from 'components/dashboard/DashboardLayout'
import GroupHeader from 'components/dashboard/GroupHeader'
import { useRouter } from 'next/router'
import { jsx, Container, Button, Heading, Select, Spinner, Text, Flex, Box } from 'theme-ui'
import { NextPage } from 'next'
import Link from 'next/link'
import { getAllGFQuizzesWithSlug, getGFQuizWithSlug } from 'utils/api'
import withAuthRedirect from 'utils/withAuthRedirect' 
import { Props } from 'pages/kviz/[slug]'
import Item from 'components/stats/Item'
// import Navigation from 'components/stats/Navigation'
import FilterSelect from 'components/stats/FilterSelect'
import Individual from 'components/stats/Individual'
import { NextSeo } from 'next-seo'
import fetcher from 'lib/fetcher'
import useSWR from 'swr'
import { Response } from 'pages/api/quiz/[id]/[group_id]/stats'

const StatsPage: NextPage<Props> = ({quiz}) => {
  const router = useRouter()
  const [ filterValue, setFilterValue ] = useState('best')
  // const stats = useGroupQuizStatsQuery({variables: {
  //   quizId: quiz?.id as string,
  //   groupId: router.query.trida as string,
  //   filter: filterValue
  // }})
  let engagedText = ''
  const stats = useSWR<Response>('/api/quiz/' + quiz?.id as string + '/' + router.query.trida + '/stats', fetcher)
  console.log(stats.data)
  let engagedCount = 0
  stats.data?.submissions.forEach(s => {
    if (s) {
      engagedCount+=1
    }
  });
  if (engagedCount === 0 || engagedCount >= 5 ) {
    engagedText = 'zapojených studentů'
  } else if (engagedCount === 1) {
    engagedText = 'zapojený student'
  } else {
    engagedText = 'zapojení studenti' 
  }
  return (
    <DashboardLayout header={<GroupHeader />}>
      <NextSeo title="Odpovědi a statistiky" />
      <Container sx={{mt: 4}}>
        <Flex sx={{justifyContent: 'space-between', alignItems: 'flex-start', mb: 0}}>
          <Box>
            <Heading variant="eyebrow">Statistika kvízu</Heading>
            <Heading variant="ultratitle">{ quiz?.title }</Heading>
          </Box>
          <Link href={"/kviz/"+quiz?.slug}>
            <Button sx={{px: 4, fontWeight: 500, fontSize: 2}}>Stránka kvízu</Button>
          </Link>
        </Flex>
      </Container>
      {router.query.tab === 'individual' ? 
        <Container sx={{pt: 2, mt: 2}}>
          {!stats.data
          ? <Spinner size={24} />
          : <Individual students={[]/*stats?.data?.groupQuizStats?.engagedStudents*/} />
          }
        </Container>
      : <Container sx={{pt: 2, mt: 2}}>
          {!quiz?.items
          ? <Spinner size={24} />
          : <Fragment>
              <Flex sx={{justifyContent: 'space-between', alignItems: 'center', mb: 3}}>
                <Text sx={{fontSize: 2}}>{engagedCount} {engagedText}</Text>
                {/*<FilterSelect
                  value={filterValue}
                  defaultValue="best"
                  onChange={(e) => setFilterValue(e.target.value)}
                />*/}
              </Flex>
              <Box>
                {!stats.data
                ? <Spinner size={24} />
                : <Box sx={{mb: 3}}>
                    {stats.data.submissions.map(submission => {
                      if (submission) {
                        return (
                          <Flex>
                            <Text sx={{mr: 2}}>{
                            stats.data.students[submission?.data.user['@ref'].id].name}</Text>
                            <Text>
                              {submission?.data?.points}{'/'}{submission?.data?.max_points}
                            </Text>
                          </Flex>
                        )
                      }
                    })}
                  </Box>
                }
                {
                  quiz?.items.map((question, index) => {
                    //return <Box>{question.question}</Box>
                    const stat = stats?.data?.questions?.filter(statQuestion => statQuestion.id == question.id)
                    // choices={stat.length > 0 ? stat[0].choices : {}}
                    return (
                      <>
                      <Item question={question} key={index} statsQuestion={stat?.length > 0 ? stat[0] : undefined} index={index} />
                      {/*<p>{JSON.stringify(question)}</p>*/}
                      </>
                    )
                  })
                }
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

export default withAuthRedirect(StatsPage)
