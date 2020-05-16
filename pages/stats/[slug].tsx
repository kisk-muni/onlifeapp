/** @jsx jsx */
import { Fragment } from 'react'
import DashboardLayout from '../../components/dashboard/DashboardLayout'
import GroupHeader from '../../components/dashboard/GroupHeader'
import { withApollo } from '../../apollo/client'
import { useGroupQuery } from '../../apollo/group.graphql'
import { useRouter } from 'next/router'
import { jsx, Embed, Container, Heading, Text, Flex, Box } from 'theme-ui'
import { NextPage } from 'next'
import FadeSpinner from '../../components/FadeSpinner'
import { getAllGFQuizzesWithSlug, getGFQuizWithSlug } from '../../utils/api'
import withAuthRedirect from '../../utils/withAuthRedirect' 

const StatsPage: NextPage = ({quiz}: {quiz: any}) => {
  const router = useRouter()
  const { data, loading, error } = useGroupQuery({variables: {id: router.query.trida as string}})
  return (
    <DashboardLayout
      header={<GroupHeader />}
      stickHeaderByDefault>
    <Container sx={{mt: 4}} variant="groupContainer">
      <Heading sx={{mb: 3, fontSize: 7}}>Kvíz</Heading>
    </Container>
  </DashboardLayout>
  )

}

export async function getStaticProps({ params, preview = false }) {
  const data = await getGFQuizWithSlug(params.slug, preview)
  //const content = await markdownToHtml(data?.post?.content || '')
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
    paths: allGfquizzes?.map(quiz => `/tema/${quiz.slug}`) || [],
    fallback: true,
  }
}

export default withApollo(withAuthRedirect(StatsPage))