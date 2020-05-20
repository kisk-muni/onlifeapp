/** @jsx jsx */
import { Fragment } from 'react'
import DashboardLayout from '../../components/dashboard/DashboardLayout'
import GroupHeader from '../../components/dashboard/GroupHeader'
import { withApollo } from '../../apollo/client'
import { useGroupQuery } from '../../apollo/group.graphql'
import { useRouter } from 'next/router'
import { jsx, Badge, Container, Heading, Text, Flex, Box } from 'theme-ui'
import { NextPage } from 'next'
import FadeSpinner from '../../components/FadeSpinner'
import { getAllGFQuizzesWithSlug, getGFQuizWithSlug } from '../../utils/api'
import withAuthRedirect from '../../utils/withAuthRedirect' 

interface Props {
  quiz: {
    id: string
    height: string
    slug: string
    title: string
    prefilledGoogleFormsQuizUrl: string
  }
}

const questions: {question: string}[] = [{question: 'Nějaká otázka'}]

const StatsPage: NextPage<Props> = ({quiz}) => {
  const router = useRouter()
  const { data, loading, error } = useGroupQuery({variables: {id: router.query.trida as string}})
  return (
    <DashboardLayout
      header={<GroupHeader />}
      stickHeaderByDefault>
    <Container sx={{mt: 4}} variant="statsContainer">
      <Badge variant="primary" sx={{mr: 2, borderRadius: '30px', mb: 2}}>Odpovědi a statistiky kvízu</Badge>
      <Heading sx={{mb: 4, mt: 2, fontSize: 5}}>{ quiz?.title }</Heading>
      {questions.map((q) => (
        <Box sx={{borderRadius: '8px', border: '1px solid #ddd', backgroundColor: 'background', p: 3}}>
          <Heading sx={{mb: 2, fontSize: 4, fontWeight: 'regular'}}>{ q.question }</Heading>
          <Text sx={{fontSize: 2}}>Správných odpovědí: 23/27</Text>
        </Box>
      ))}
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