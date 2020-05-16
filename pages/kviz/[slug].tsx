/** @jsx jsx */
import { Fragment } from 'react'
import StarterLayout from '../../components/StarterLayout'
import { withApollo } from '../../apollo/client'
import { useQuizQuery } from '../../apollo/quiz.graphql'
import { useRouter } from 'next/router'
import { jsx, Embed, Container, Text, Flex, Box } from 'theme-ui'
import { NextPage } from 'next'
import FadeSpinner from '../../components/FadeSpinner'
import { getAllGFQuizzesWithSlug, getGFQuizWithSlug } from '../../utils/api'
import withAuthRedirect from '../../utils/withAuthRedirect' 

const KvizPage: NextPage = ({quiz}: {quiz: any}) => {
  const router = useRouter()
  const { data, loading } = useQuizQuery({
    variables: { id: quiz?.id },
  })
  return (
  <StarterLayout>
    <Container variant="googleFormEmbed">
      {
        loading
        ? <Fragment>
          <Box sx={{
            backgroundColor: 'rgb(218, 36, 228)',
            borderTopLeftRadius: '8px',
            borderTopRightRadius: '8px',
            height: '10px',
            width: '576px',
            mx: 'auto',
            mt: '10px',
          }} />
          <Box sx={{
            borderLeft: '1px solid #ddd',
            borderRight: '1px solid #ddd',
            borderBottom: '1px solid #ddd',
            borderBottomLeftRadius: '8px',
            borderBottomRightRadius: '8px',
            width: '576px',
            mx: 'auto',
            height: quiz?.height ? quiz?.height+'px' : '1740px' }}>
            <div sx={{
              position: 'fixed',
              display: 'flex',
              top: '50vh',
              width: '100px',
              height: '100px',
              left: '50%',
              marginLeft: '-50px',
              flexDirection: 'column',
            }}>
              <FadeSpinner />
              <Text sx={{fontSize: 3, alignSelf: 'center', color: 'gray', mt: 3, textAlign: 'center'}}>Načítání</Text>
            </div>
          </Box></Fragment>
        : <Embed
            sx={{height: quiz?.height + 'px'}}
            src={quiz?.prefilledGoogleFormsQuizUrl + (data?.quiz.prefill as string) + '&embedded=true'}
          />
      }
    </Container>
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