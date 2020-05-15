/** @jsx jsx */
import StarterLayout from '../../components/StarterLayout'
import { withApollo } from '../../apollo/client'
import { useQuizQuery } from '../../apollo/quiz.graphql'
import { useRouter } from 'next/router'
import { jsx, Embed, Flex, Box } from 'theme-ui'
import { NextPage } from 'next'
import { getAllGFQuizzesWithSlug, getGFQuizWithSlug } from '../../utils/api'
import withAuthRedirect from '../../utils/withAuthRedirect' 

const KvizPage: NextPage = ({quiz}: {quiz: any}) => {
  const router = useRouter()
  /* const { data, loading } = useQuizQuery({
    variables: { id: id },
  }) */
  return (
  <StarterLayout>
    <Flex sx={{flexWrap: 'wrap'}}>
      <Box sx={{minHeight: '100vh', width: '100%'}}>
        <div>
          {JSON.stringify(quiz)}
        </div>
        {/* {!loading && data?.quiz &&
          <Embed
            src={data!.quiz.gFormURL}
          />
        } */}
      </Box>
    </Flex>
  </StarterLayout>
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

export default withApollo(withAuthRedirect(KvizPage))