/** @jsx jsx */
import StarterLayout from '../../components/StarterLayout'
import { withApollo } from '../../apollo/client'
import { useQuizQuery } from '../../apollo/quiz.graphql'
import { useRouter } from 'next/router'
import { jsx, Embed, Flex, Box } from 'theme-ui'
import { NextPage } from 'next'
import withAuthRedirect from '../../utils/withAuthRedirect' 

const KvizPage: NextPage = () => {
  const router = useRouter()
  const id = router.query.id as string
  const { data, loading } = useQuizQuery({
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

export default withApollo(withAuthRedirect(KvizPage, {roles: ['student']}))