/** @jsx jsx */
import StarterLayout from '../../components/StarterLayout'
import { withApollo } from '../../apollo/client'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { useRouter } from 'next/router'
import { jsx, Embed, Flex, Box } from 'theme-ui'

export const CURRENT_QUIZ = gql`
query($id: ID!) {
  quiz(id: $id) {
    gFormURL
    display
  }
}
`

interface QuizQueryData {
  quiz: {
    id: string
    display: string
    gFormURL: string
  }
}

interface QuizQueryVars {
  id: string
}

const KvizPage = () => {
  const router = useRouter()
  const id = router.query.id as string
  const { data, loading } = useQuery<QuizQueryData, QuizQueryVars>(CURRENT_QUIZ, {
    variables: { id: id },
  })
  return (
  <StarterLayout>
    <Flex sx={{flexWrap: 'wrap'}}>
      <Box sx={{minHeight: '100vh', width: '100%'}}>
        {!loading && data?.quiz &&
          <Embed
            src={data!.quiz.gFormURL}
          />
        }
      </Box>
    </Flex>
  </StarterLayout>
  )

}

export default withApollo(KvizPage)